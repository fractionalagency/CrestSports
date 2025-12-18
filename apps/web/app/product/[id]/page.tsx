"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { api, type Product as ApiProduct } from "@/lib/api";
import { Playfair_Display, Parisienne } from "next/font/google";
import { Star, Minus, Plus, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
});

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
  const [selectedSize, setSelectedSize] = useState<string>("L");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) return null;

  const productImages =
    product.allImages && product.allImages.length > 0
      ? product.allImages
      : [product.imageUrl, product.hoverImageUrl || product.imageUrl];

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
    // Optional: Add a toast notification here instead of alert
    alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Images (Editorial Style) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-50">
              <Image
                src={productImages[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                  -{product.discountPercentage}%
                </div>
              )}
            </div>
            
            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[4/5] overflow-hidden transition-all duration-300 ${
                    selectedImageIndex === index ? "opacity-100 ring-1 ring-black" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-8 pt-4">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <Link href="/product" className="hover:text-black transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-black">{product.category}</span>
              </div>
              
              <h1 className={`${playfair.className} text-4xl md:text-5xl text-neutral-900 leading-tight`}>
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-medium text-neutral-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-black" : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4">
                  {product.rating} (45 Reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral">
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Selectors */}
            <div className="space-y-6 border-t border-neutral-100 pt-6">
              {/* Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest">Size</span>
                  <button className="text-xs text-neutral-500 underline hover:text-black">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white border border-neutral-200 text-neutral-900 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <span className="text-sm font-bold uppercase tracking-widest">Quantity</span>
                <div className="flex items-center w-32 border border-neutral-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Add to Cart
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="grid grid-cols-3 gap-4 text-center pt-4">
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">Authentic</p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">Fast Delivery</p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-20 border-t border-neutral-100 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className={`${parisienne.className} text-2xl text-neutral-500 block mb-2`}>
                Complete the look
              </span>
              <h2 className={`${playfair.className} text-3xl md:text-4xl text-neutral-900`}>
                You May Also Like
              </h2>
            </div>
            <Link href="/product" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:underline mb-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
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
        </div>
      </section>
    </div>
  );
}
