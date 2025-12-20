"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { api, type Product as ApiProduct } from "@/lib/api";
import {
  fetchProductReviews,
  createProductReview,
  type ProductReview,
} from "@/lib/reviews";
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

const renderStars = (rating: number) => (
  <div className="flex text-black">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-black" : "text-neutral-300"
        }`}
      />
    ))}
  </div>
);

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
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewerName, setReviewerName] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>("");

  // Fetch product data and reviews
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

    const fetchReviewsForProduct = async () => {
      try {
        setReviewsLoading(true);
        const items = await fetchProductReviews(productId);
        setReviews(items);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviewError("Unable to load reviews right now.");
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
    fetchReviewsForProduct();
  }, [productId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) return null;

  const fallbackImage = product.imageUrl || "/next.svg";
  let images = (product.allImages ?? []).filter((img): img is string =>
    Boolean(img),
  );
  if (images.length === 0) {
    images = [fallbackImage];
  }
  const productImages: string[] = images;

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

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setReviewError(null);

    if (!reviewerName.trim() || !reviewComment.trim()) {
      setReviewError("Please provide your name and a comment.");
      return;
    }

    try {
      setReviewSubmitting(true);
      const newReview = await createProductReview({
        productId: product.id,
        name: reviewerName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
      });

      if (newReview) {
        setReviews((prev) => [newReview, ...prev]);
        setReviewerName("");
        setReviewRating(5);
        setReviewComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setReviewError("Could not submit review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Images (Editorial Style) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Thumbnails - vertical on desktop, grid on mobile */}
              <div className="lg:col-span-1 grid grid-cols-4 lg:grid-cols-1 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[4/5] overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "opacity-100 ring-1 ring-black"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image || fallbackImage}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="lg:col-span-4 relative aspect-[4/5] w-full overflow-hidden bg-neutral-50">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
                {product.discountPercentage && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    -{product.discountPercentage}%
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit space-y-8 pt-4">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500 uppercase tracking-widest">
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/product"
                  className="hover:text-black transition-colors"
                >
                  Shop
                </Link>
                <span>/</span>
                <span className="text-black">{product.category}</span>
              </div>

              <h1
                className={`${playfair.className} text-4xl md:text-5xl text-neutral-900 leading-tight`}
              >
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
                {renderStars(product.rating)}
                <span className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4">
                  {product.rating.toFixed(1)} ({reviews.length} Reviews)
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
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Size
                  </span>
                  <button className="text-xs text-neutral-500 underline hover:text-black">
                    Size Guide
                  </button>
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
                <span className="text-sm font-bold uppercase tracking-widest">
                  Quantity
                </span>
                <div className="flex items-center w-32 border border-neutral-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">
                    {quantity}
                  </span>
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    Authentic
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    Fast Delivery
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center mb-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider font-medium">
                    Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-16 border-t border-neutral-100 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Customer Voices
                </span>
                <h2
                  className={`${playfair.className} text-3xl md:text-4xl text-neutral-900`}
                >
                  Reviews
                </h2>
                <p className="text-neutral-600 text-sm mt-2">
                  See what others think about this product.
                </p>
              </div>

              {reviewsLoading ? (
                <p className="text-neutral-500 text-sm">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p className="text-neutral-500 text-sm">
                  No reviews yet. Be the first to share.
                </p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-neutral-100 p-4 rounded-sm bg-white shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-neutral-900">
                          {review.name}
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        {review.comment}
                      </p>
                      <p className="text-xs text-neutral-400 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#f9f9f9] p-6 rounded-sm border border-neutral-100">
              <h3
                className={`${playfair.className} text-2xl text-neutral-900 mb-2`}
              >
                Leave a Review
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Share your experience with this product.
              </p>
              {reviewError && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 p-3 rounded-sm">
                  {reviewError}
                </div>
              )}
              <form className="space-y-4" onSubmit={handleSubmitReview}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setReviewRating(value)}
                        className={`w-10 h-10 flex items-center justify-center border transition ${
                          reviewRating === value
                            ? "bg-black text-white border-black"
                            : "border-neutral-200 text-neutral-700"
                        }`}
                        aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full border border-neutral-200 px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="What did you like or dislike?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full bg-black text-white py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Related Products */}
      <section className="py-20 border-t border-neutral-100 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span
                className={`${parisienne.className} text-2xl text-neutral-500 block mb-2`}
              >
                Complete the look
              </span>
              <h2
                className={`${playfair.className} text-3xl md:text-4xl text-neutral-900`}
              >
                You May Also Like
              </h2>
            </div>
            <Link
              href="/product"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:underline mb-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                id={related.id}
                name={related.name}
                price={related.price}
                originalPrice={related.originalPrice}
                discountPercentage={related.discountPercentage}
                rating={related.rating}
                imageUrl={related.imageUrl}
                hoverImageUrl={related.hoverImageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
