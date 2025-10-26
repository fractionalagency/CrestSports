"use client";

import React from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
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
  className = ""
}) => {
  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5L4.5 19.5L6 13L1 8.5L7.5 7.5L10 1.5Z" fill="#FFC633"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5V1.5Z" fill="#FFC633"/>
          <path d="M10 1.5L7.5 7.5L1 8.5L6 13L4.5 19.5L10 16.5V1.5Z" fill="#E5E5E5"/>
        </svg>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5L4.5 19.5L6 13L1 8.5L7.5 7.5L10 1.5Z" fill="#E5E5E5"/>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className={`group ${className}`}>
      {/* Product Image Container */}
      <div className="relative overflow-hidden rounded-[20px] mb-4 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-[298px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {discountPercentage && (
          <div 
            className="absolute top-4 right-4 px-[14px] py-[6px] rounded-[62px] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 51, 51, 0.1)' }}
          >
            <span 
              className="text-[12px] font-medium leading-[1.35]"
              style={{ 
                fontFamily: 'Satoshi',
                color: '#FF3333'
              }}
            >
              -{discountPercentage}%
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        {/* Product Name */}
        <h3 
          className="text-[16px] font-medium leading-[1.35] line-clamp-2"
          style={{ 
            fontFamily: 'Satoshi',
            fontWeight: 500,
            color: '#000000'
          }}
        >
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span 
            className="text-[14px] leading-[1.35]"
            style={{ 
              fontFamily: 'Satoshi',
              color: '#000000'
            }}
          >
            {rating}/5
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span 
            className="text-[20px] font-bold"
            style={{ 
              fontFamily: 'Satoshi',
              fontWeight: 700,
              color: '#000000'
            }}
          >
            ${price}
          </span>
          
          {originalPrice && (
            <span 
              className="text-[20px] line-through"
              style={{ 
                fontFamily: 'Satoshi',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.3)'
              }}
            >
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
