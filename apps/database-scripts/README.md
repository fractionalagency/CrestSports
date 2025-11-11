# Database Scripts

Python scripts for managing database operations.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Scripts

### seed_products.py

Seeds the Supabase database with products from `../web/public/products.json`.

**Usage:**
```bash
python seed_products.py
```

**What it does:**
- Creates a default "Football Jerseys" category if it doesn't exist
- Reads products from the JSON file
- Inserts products into the database (skips existing products)
- Generates unique SKUs for each product
- Stores product images and metadata

**Requirements:**
- `.env` file must be configured in `../api/.env` with `DIRECT_URL`
- Products JSON file must exist at `../web/public/products.json`
