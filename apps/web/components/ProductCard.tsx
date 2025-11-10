"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discountPercentage,
  rating,
  imageUrl,
  hoverImageUrl,
  className = "",
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  // Generate star rating display
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

  return (
    <div
      className={`group relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Product Image Container */}
      <div className="relative w-full">
        <div className="relative overflow-hidden">
          {/* Main Image */}
          <img
            src={imageUrl}
            alt={name}
            className={`w-full aspect-[3/4] object-cover transition-opacity duration-500 ease-in-out ${
              isHovered && hoverImageUrl ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Hover Image - Only if hoverImageUrl exists */}
          {hoverImageUrl && (
            <img
              src={hoverImageUrl}
              alt={`${name} - alternate view`}
              className={`absolute inset-0 w-full aspect-[3/4] object-cover transition-opacity duration-500 ease-in-out ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Save Button - Top Right */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 z-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isSaved ? "#000000" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className="transition-all duration-300"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info - H&M Style */}
      <div className="mt-3 px-1">
        {/* Product Name */}
        <h3 className="text-sm leading-tight text-gray-900 line-clamp-2 font-normal">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-gray-900">${price}</span>

          {originalPrice && (
            <span className="text-sm line-through text-gray-500">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
