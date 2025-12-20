"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Playfair_Display } from "next/font/google";
import { 
  ArrowRight, 
  Heart, 
  Trash2, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard,
  Plus
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Mock data for "Complete the Look"
const CROSS_SELL_ITEMS = [
  {
    id: "cs-1",
    name: "Pro Performance Socks",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=600&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "cs-2",
    name: "Elite Wristbands",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1620189507195-683a9e60943b?q=80&w=600&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "cs-3",
    name: "Hydration Bottle",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    category: "Gear"
  }
];

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, addToCart } = useCart();

  const handleAddCrossSell = (item: typeof CROSS_SELL_ITEMS[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      size: "ONESIZE",
      rating: 5,
      discountPercentage: 0
    }, 1);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden bg-neutral-50 shadow-2xl">
             <Image
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=800&auto=format&fit=crop"
                alt="Empty Cart"
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
            className="inline-flex items-center gap-2 px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 group rounded-sm"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className={`${playfair.className} text-3xl md:text-4xl text-neutral-900`}>
            Your Bag <span className="text-neutral-400 text-2xl">({cart.totalItems})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-10">
            {/* Free Shipping Progress (Victory Banner) */}
            <div className="bg-green-50 border border-green-100 p-4 rounded-sm flex items-center gap-3 text-green-800 animate-in fade-in slide-in-from-top-4 duration-500">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">✅ You have qualified for <span className="font-bold">FREE Shipping</span>.</span>
            </div>

            <div className="space-y-8">
              {cart.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-6 py-6 border-b border-neutral-100 last:border-0"
                >
                  {/* Product Image */}
                  <div className="relative w-28 h-36 md:w-32 md:h-40 flex-shrink-0 bg-neutral-50 rounded-md overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-900 leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-500">Men's Football Kit</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-neutral-900">₹{item.price.toLocaleString()}</div>
                        {item.originalPrice && (
                          <div className="flex flex-col items-end gap-1 mt-1">
                            <span className="text-xs text-neutral-400 line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                              Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Size & Quantity Row */}
                    <div className="flex items-center gap-6 mt-4">
                      {/* Size Dropdown Trigger */}
                      <div className="relative group">
                        <button className="flex items-center gap-1 text-sm text-neutral-600 hover:text-black underline decoration-dotted underline-offset-4">
                          Size: {item.size} <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center border border-neutral-200 rounded-sm h-8">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-8 h-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6 mt-auto pt-4">
                      <button 
                        className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-black transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        Save for Later
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete the Look */}
            <div className="pt-8 border-t border-neutral-100">
              <h3 className={`${playfair.className} text-xl mb-6`}>You Might Also Need</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CROSS_SELL_ITEMS.map((item) => (
                  <div key={item.id} className="group border border-neutral-100 rounded-md p-3 flex gap-3 items-center hover:border-black transition-colors cursor-pointer" onClick={() => handleAddCrossSell(item)}>
                    <div className="relative w-12 h-12 bg-neutral-50 rounded-sm overflow-hidden flex-shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{item.name}</p>
                      <p className="text-xs text-neutral-500">₹{item.price}</p>
                    </div>
                    <button className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 p-6 rounded-lg lg:sticky lg:top-24">
              <h2 className={`${playfair.className} text-2xl mb-6`}>Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{cart.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Estimated Delivery & Handling</span>
                  <span className="text-green-700 font-medium">Free</span>
                </div>
                <div className="border-t border-neutral-200 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold uppercase tracking-wider">Total</span>
                    <span className="text-xl font-bold">₹{cart.totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1 text-right">
                    (Inclusive of all taxes)
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl hidden md:block"
              >
                Proceed to Checkout
              </button>

              {/* Trust Signals */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-center gap-4 opacity-50 grayscale">
                   <div className="flex items-center gap-1"><CreditCard className="w-4 h-4"/> <span className="text-xs font-bold">VISA</span></div>
                   <div className="flex items-center gap-1"><CreditCard className="w-4 h-4"/> <span className="text-xs font-bold">MC</span></div>
                   <div className="flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> <span className="text-xs font-bold">UPI</span></div>
                </div>
                <p className="text-[10px] text-neutral-400 text-center">
                  Secure Checkout • Free Returns • Official Gear
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-3">
           <span className="text-xs text-neutral-500 uppercase">Total</span>
           <span className="text-lg font-bold">₹{cart.totalPrice.toLocaleString()}</span>
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="w-full bg-black text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
