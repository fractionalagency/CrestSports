"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Playfair_Display } from "next/font/google";
import { ArrowRight } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden bg-neutral-50 shadow-2xl">
             <Image
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop"
                alt="Cool Cat"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
          <h1 className={`${playfair.className} text-4xl font-bold mb-4 text-neutral-900`}>
            Your Cart is Empty
          </h1>
          <p className="text-neutral-500 mb-10 text-lg leading-relaxed">
            Looks like you haven't made your choice yet. Even the cat is waiting for you to pick something stylish.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 group"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-6 p-4 border rounded-lg"
              >
                {/* Product Image */}
                <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg text-gray-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{cart.totalPrice}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>Secure Checkout</p>
                <p className="mt-1">Free Returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
