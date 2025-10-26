"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Type definitions for product data
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
}

interface ProductsData {
  newArrivals: Product[];
  topSelling: Product[];
}

// Function to fetch products from JSON file
const fetchProducts = async (): Promise<ProductsData> => {
  try {
    const response = await fetch('/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    // Only return the needed properties
    return {
      newArrivals: data.newArrivals || [],
      topSelling: data.topSelling || []
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty arrays as fallback
    return {
      newArrivals: [],
      topSelling: []
    };
  }
};

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products?: Product[];
  showViewAll?: boolean;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  subtitle,
  products,
  showViewAll = true,
  className = ""
}) => {
  const [productData, setProductData] = useState<Product[]>(products || []);
  const [loading, setLoading] = useState<boolean>(!products);

  useEffect(() => {
    if (!products) {
      const loadProducts = async () => {
        setLoading(true);
        const data = await fetchProducts();
        // Determine which product set to use based on the title
        if (title.toLowerCase().includes('new')) {
          setProductData(data.newArrivals);
        } else if (title.toLowerCase().includes('top')) {
          setProductData(data.topSelling);
        } else {
          setProductData(data.newArrivals); // Default to newArrivals
        }
        setLoading(false);
      };

      loadProducts();
    }
  }, [products, title]);

  if (loading) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-4 md:mb-0">
            <h2 
              className="text-[32px] md:text-[40px] font-bold mb-2 leading-[1.2]"
              style={{ 
                fontFamily: 'Integral CF',
                fontWeight: 700,
                color: '#000000'
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className="text-[16px] leading-[1.57]"
                style={{ 
                  fontFamily: 'Satoshi',
                  color: 'rgba(0, 0, 0, 0.6)'
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewAll && (
            <button 
              className="px-[54px] py-[16px] rounded-[62px] border border-black transition-colors duration-200 hover:bg-black hover:text-white"
              style={{ 
                fontFamily: 'Satoshi',
                fontWeight: 500,
                fontSize: '16px'
              }}
            >
              View All
            </button>
          )}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productData.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

// Export pre-configured product grids for easy use
export const NewArrivals: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid 
    title="NEW ARRIVALS" 
    className={className}
  />
);

export const TopSelling: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid 
    title="top selling" 
    className={className}
  />
);
