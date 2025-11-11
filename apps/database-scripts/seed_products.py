#!/usr/bin/env python3
"""
Seed script to populate Supabase database with products from JSON file.
"""

import json
import os
import sys
import secrets
import string
from pathlib import Path
from dotenv import load_dotenv
import psycopg
from slugify import slugify

# Load environment variables from api/.env
env_path = Path(__file__).parent.parent / 'api' / '.env'
load_dotenv(env_path)

def generate_cuid():
    """Generate a CUID-like ID."""
    # Simple CUID-like implementation
    timestamp = hex(int(os.times()[4] * 1000))[2:]
    random_part = ''.join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(16))
    return f"c{timestamp}{random_part}"[:25]

def get_db_connection():
    """Create a connection to the PostgreSQL database."""
    try:
        # Use DIRECT_URL for seeding (better for batch operations)
        db_url = os.getenv('DIRECT_URL')
        if not db_url:
            print("❌ DIRECT_URL not found in .env file")
            sys.exit(1)
        
        conn = psycopg.connect(db_url)
        return conn
    except Exception as e:
        print(f"❌ Error connecting to database: {e}")
        sys.exit(1)

def create_category(conn, name):
    """Create a category if it doesn't exist and return its ID."""
    cursor = conn.cursor()
    
    slug = slugify(name)
    
    # Check if category exists
    cursor.execute("SELECT id FROM categories WHERE slug = %s", (slug,))
    result = cursor.fetchone()
    
    if result:
        category_id = result[0]
    else:
        # Create new category (using camelCase as per Prisma schema)
        category_id = generate_cuid()
        cursor.execute(
            """
            INSERT INTO categories (id, name, slug, description, "createdAt", "updatedAt")
            VALUES (%s, %s, %s, %s, NOW(), NOW())
            """,
            (category_id, name, slug, f"{name} football jerseys")
        )
        conn.commit()
        print(f"✅ Created category: {name}")
    
    cursor.close()
    return category_id

def get_or_create_default_category(conn):
    """Get or create a default 'Football Jerseys' category."""
    return create_category(conn, "Football Jerseys")

def generate_sku(product_name, product_id):
    """Generate a unique SKU for the product."""
    # Create SKU from product name and ID
    name_part = ''.join(filter(str.isalnum, product_name.upper().replace(' ', '')))[:10]
    return f"{name_part}-{product_id}"

def seed_products(conn, products_data):
    """Seed products into the database."""
    cursor = conn.cursor()
    
    # Get or create default category
    category_id = get_or_create_default_category(conn)
    
    products_to_insert = []
    
    # Combine all products from newArrivals and topSelling
    all_products = []
    if 'newArrivals' in products_data:
        all_products.extend(products_data['newArrivals'])
    if 'topSelling' in products_data:
        all_products.extend(products_data['topSelling'])
    
    for product in all_products:
        name = product['name']
        slug = slugify(name)
        price = float(product['price'])
        sale_price = float(product.get('originalPrice', 0)) if 'originalPrice' in product else None
        image_url = product.get('imageUrl')
        hover_image = product.get('hoverImageUrl')
        rating = product.get('rating', 0)
        discount = product.get('discountPercentage', 0)
        
        # Build images array
        images = []
        if image_url:
            images.append(image_url)
        if hover_image:
            images.append(hover_image)
        
        # Check if product already exists
        cursor.execute("SELECT id FROM products WHERE slug = %s", (slug,))
        if cursor.fetchone():
            print(f"⏭️  Skipping existing product: {name}")
            continue
        
        # Generate SKU
        sku = generate_sku(name, product['id'])
        
        # Create metadata JSON
        metadata = {
            'rating': rating,
            'discountPercentage': discount,
            'originalProductId': product['id']
        }
        
        products_to_insert.append((
            name,
            slug,
            f"High-quality replica of {name}",  # description
            price,
            sale_price,
            sku,
            50,  # stock (default to 50)
            image_url,
            images,
            category_id,
            True,  # isActive
            'newArrivals' in products_data and product in products_data['newArrivals'],  # isFeatured
            json.dumps(metadata)
        ))
    
    if products_to_insert:
        # Bulk insert products (using camelCase as per Prisma schema)
        query = """
            INSERT INTO products 
            (id, name, slug, description, price, "salePrice", sku, stock, "imageUrl", images, 
             "categoryId", "isActive", "isFeatured", metadata, "createdAt", "updatedAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::jsonb, NOW(), NOW())
        """
        for product_data in products_to_insert:
            product_id = generate_cuid()
            cursor.execute(query, (product_id, *product_data))
        conn.commit()
        print(f"✅ Successfully inserted {len(products_to_insert)} products")
    else:
        print("ℹ️  No new products to insert")
    
    cursor.close()

def main():
    """Main function to run the seed script."""
    print("🌱 Starting database seeding...")
    
    # Load products JSON
    products_json_path = Path(__file__).parent.parent / 'web' / 'public' / 'products.json'
    
    if not products_json_path.exists():
        print(f"❌ Products JSON file not found at: {products_json_path}")
        sys.exit(1)
    
    with open(products_json_path, 'r') as f:
        products_data = json.load(f)
    
    print(f"📦 Loaded {len(products_data.get('newArrivals', []))} new arrivals")
    print(f"📦 Loaded {len(products_data.get('topSelling', []))} top selling products")
    
    # Connect to database
    conn = get_db_connection()
    
    try:
        seed_products(conn, products_data)
        print("\n✅ Database seeding completed successfully!")
    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        conn.rollback()
        sys.exit(1)
    finally:
        conn.close()

if __name__ == "__main__":
    main()
