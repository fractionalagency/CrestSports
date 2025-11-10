"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleRemoveItem = (id: string, size: string) => {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(id, size);
    }
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {cart.totalItems === 0 
                ? 'Your cart is empty' 
                : `You have ${cart.totalItems} ${cart.totalItems === 1 ? 'item' : 'items'} in your cart`}
            </p>
          </div>

          {cart.items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cart.items.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="border rounded-lg p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-600">Size: <span className="font-medium">{item.size}</span></span>
                              <span className="text-gray-600">Qty: <span className="font-medium">{item.quantity}</span></span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-semibold">₹{item.price}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {/* Star Rating */}
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 20 20"
                                  fill={star <= Math.floor(item.rating) ? "#000000" : "#E5E5E5"}
                                  className="inline-block"
                                >
                                  <path d="M10 1.5L12.5 7.5L19 8.5L14 13L15.5 19.5L10 16.5L4.5 19.5L6 13L1 8.5L7.5 7.5L10 1.5Z" />
                                </svg>
                              ))}
                              <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-3 py-2 min-w-[50px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id, item.size)}
                              className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-lg font-semibold">₹{item.price * item.quantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="mt-6 text-right">
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                      <span className="font-medium">₹{cart.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">₹{Math.round(cart.totalPrice * 0.18)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{cart.totalPrice + 50 + Math.round(cart.totalPrice * 0.18)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/"
                    className="block w-full mt-4 text-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
