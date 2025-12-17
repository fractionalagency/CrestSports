"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { api, type Product as ApiProduct } from "@/lib/api";

// Type definitions for product data
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
}

// Function to convert API product to display product
const convertApiProduct = (apiProduct: ApiProduct): Product => {
  const metadata =
    (apiProduct.metadata as { rating?: number; discountPercentage?: number }) ||
    {};
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.price,
    originalPrice: apiProduct.salePrice || undefined,
    discountPercentage: metadata.discountPercentage,
    rating: metadata.rating || 0,
    imageUrl: apiProduct.imageUrl || apiProduct.images[0] || "",
    hoverImageUrl: apiProduct.images[1] || undefined,
  };
};

// Function to fetch products from API
const fetchProducts = async (isFeatured?: boolean): Promise<Product[]> => {
  try {
    const response = isFeatured
      ? await api.getFeaturedProducts()
      : await api.getProducts({ isActive: true, limit: 10 });

    if (!response.success || !response.data) {
      throw new Error("Failed to fetch products");
    }

    return response.data.map(convertApiProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
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
  className = "",
}) => {
  const [productData, setProductData] = useState<Product[]>(products || []);
  const [loading, setLoading] = useState<boolean>(!products);

  useEffect(() => {
    if (!products) {
      const loadProducts = async () => {
        setLoading(true);
        // Determine which products to fetch based on the title
        const isFeatured = title.toLowerCase().includes("new");
        const data = await fetchProducts(isFeatured);
        setProductData(data);
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
    <section
      className={`py-6 md:py-10 ${className}`}
      style={{ backgroundColor: "white" }}
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        {/* Header - True H&M Style */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div className="mb-3 md:mb-0">
            <h2
              className="text-xl md:text-2xl font-bold mb-1"
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontWeight: 700,
                color: "#000000",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-sm text-gray-600 mt-1"
                style={{
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {showViewAll && (
            <button
              className="px-4 py-2 border border-black text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white"
              style={{
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontWeight: 500,
              }}
            >
              View All
            </button>
          )}
        </div>

        {/* Products Grid - True H&M Seamless Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
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
              hoverImageUrl={product.hoverImageUrl}
            />
          ))}
        </div>

        {/* Load More Button - H&M Style */}
        <div className="flex justify-center mt-8 md:mt-10">
          <button
            className="px-6 py-2 bg-black text-white text-sm font-medium transition-all duration-300 hover:bg-gray-800"
            style={{
              fontFamily: "Helvetica Neue, Arial, sans-serif",
              fontWeight: 500,
            }}
          >
            Load more
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

// Export pre-configured product grids for easy use
export const NewArrivals: React.FC<{ className?: string }> = ({
  className,
}) => (
  <ProductGrid
    title="New arrivals"
    subtitle="Check out our latest collection"
    className={className}
  />
);

export const TopSelling: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid
    title="Top selling"
    subtitle="Our most popular items right now"
    className={className}
  />
);

// New H&M-style sections
export const Essentials: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid
    title="Essentials"
    subtitle="Basic clothing for everyday comfort"
    className={className}
  />
);

export const TrendingNow: React.FC<{ className?: string }> = ({
  className,
}) => (
  <ProductGrid
    title="Trending now"
    subtitle="The hottest items this season"
    className={className}
  />
);

export const Basics: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid
    title="Basics"
    subtitle="Simple and versatile pieces"
    className={className}
  />
);

export const Featured: React.FC<{ className?: string }> = ({ className }) => (
  <ProductGrid
    title="Featured"
    subtitle="Handpicked favorites"
    className={className}
  />
);
