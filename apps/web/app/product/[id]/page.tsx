"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { api, type Product as ApiProduct } from "@/lib/api";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
  description?: string;
  category?: string;
  allImages?: string[];
}

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
const convertApiProductToDetail = (apiProduct: ApiProduct): ProductDetail => {
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
    description:
      apiProduct.description ||
      "High-quality football jersey replica. Crafted from breathable fabric for optimal comfort and style.",
    category: apiProduct.category?.name || "Football Jerseys",
    allImages:
      apiProduct.images.length > 0
        ? apiProduct.images
        : [apiProduct.imageUrl || ""],
  };
};

const convertApiProductToCard = (apiProduct: ApiProduct): Product => {
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const productId = params.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Large");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getProductById(productId);

        if (response.success && response.data) {
          setProduct(convertApiProductToDetail(response.data));
        } else {
          console.error("Product not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await api.getProducts({ isActive: true, limit: 4 });
        if (response.success && response.data) {
          const filtered = response.data
            .filter((p) => p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(filtered.map(convertApiProductToCard));
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId, router]);

  // Old mock data removed - now using API

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const productImages =
    product.allImages && product.allImages.length > 0
      ? product.allImages
      : [product.imageUrl, product.hoverImageUrl || product.imageUrl];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5L4.5 19.5L6 13L1 8.5L7.5 7.5L10 1.5Z"
            fill="#000000"
          />
        </svg>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5V1.5Z"
            fill="#000000"
          />
          <path
            d="M10 1.5L7.5 7.5L1 8.5L6 13L4.5 19.5L10 16.5V1.5Z"
            fill="#E5E5E5"
          />
        </svg>,
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5L4.5 19.5L6 13L1 8.5L7.5 7.5L10 1.5Z"
            fill="#E5E5E5"
          />
        </svg>,
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  // Loading and not-found are already handled above; skip duplicates

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      imageUrl: product.imageUrl,
      hoverImageUrl: product.hoverImageUrl,
      size: selectedSize,
    };

    addToCart(cartItem, quantity);
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-black">
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link href="/" className="text-gray-500 hover:text-black">
              Shop
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link href="/" className="text-gray-500 hover:text-black">
              Men
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-black font-medium">T-shirts</span>
          </div>
        </div>
      </section>

      {/* Main Product Detail Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={productImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.discountPercentage && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-[3/4] overflow-hidden rounded-md border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating}/5
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium mb-3">Choose Size</h3>
                <div className="flex gap-2">
                  {["Small", "Medium", "Large", "X-Large"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full border transition-all ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-3">Select Colors</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-white border-2 border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-600 border-2 border-gray-300"></button>
                  <button className="w-8 h-8 rounded-full bg-red-600 border-2 border-gray-300"></button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Quantity:</h3>
                <div className="flex items-center border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-6 border-t">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>

              {/* Product Details */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-3">Product Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-600">
                  <p>• Premium quality fabric</p>
                  <p>• Authentic replica design</p>
                  <p>• Machine washable</p>
                  <p>• 100% official licensed product</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">All Reviews</h2>
              <span className="text-gray-600 text-lg">(451)</span>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">
              Write a Review
            </button>
          </div>

          {/* Review Cards */}
          <div className="space-y-4 max-w-4xl">
            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-medium">John Doe</h4>
                    <p className="text-sm text-gray-500">
                      Posted on November 1, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">{renderStars(5)}</div>
              </div>
              <p className="text-gray-700">
                "Absolutely love this jersey! The quality is amazing and the fit
                is perfect. Exactly what I expected from an official product."
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">SM</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Miller</h4>
                    <p className="text-sm text-gray-500">
                      Posted on October 28, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">{renderStars(4)}</div>
              </div>
              <p className="text-gray-700">
                "Great looking jersey! The material is comfortable and
                breathable. Slightly smaller than expected so I'd recommend
                ordering one size up."
              </p>
            </div>
          </div>

          {/* Load More Reviews Button */}
          <div className="flex justify-center mt-8">
            <button className="px-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-all">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onClick={() => router.push(`/product/${relatedProduct.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {relatedProduct.discountPercentage && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                      -{relatedProduct.discountPercentage}%
                    </div>
                  )}
                </div>

                <div className="mt-3 px-1">
                  <h3 className="text-sm text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-semibold">
                      ₹{relatedProduct.price}
                    </span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{relatedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(relatedProduct.rating)}
                    <span className="text-xs text-gray-600">
                      {relatedProduct.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
