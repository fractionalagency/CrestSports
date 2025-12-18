"use client";

import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { useCart } from "@/contexts/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      {/* Announcement Bar - Sleek & Minimal */}
      <div className="bg-black text-white text-center py-2.5 text-[11px] tracking-widest uppercase font-medium">
        <span>Free shipping on orders over $100</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -ml-2 text-neutral-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo - Centered on mobile, Left on desktop */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="group">
                <h1 className={`${playfair.className} text-2xl md:text-3xl font-bold tracking-tight text-black group-hover:opacity-80 transition-opacity`}>
                  CREST SPORTS
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 transform -translate-x-1/2">
              {[
                { name: "New Arrivals", href: "/product" },
                { name: "Men", href: "/product?category=men" },
                { name: "Women", href: "/product?category=women" },
                { name: "Accessories", href: "/product?category=accessories" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-neutral-600 hover:text-black uppercase tracking-wider transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </nav>

            {/* Icons - Right */}
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-neutral-900 hover:opacity-70 transition-opacity">
                <Search className="h-5 w-5" />
              </button>
              
              <Link href="/login" className="hidden md:block text-neutral-900 hover:opacity-70 transition-opacity">
                <User className="h-5 w-5" />
              </Link>

              <Link
                href="/cart"
                className="relative text-neutral-900 hover:opacity-70 transition-opacity"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-left-full duration-300">
          <nav className="flex flex-col gap-6">
            {[
              { name: "New Arrivals", href: "/product" },
              { name: "Men", href: "/product?category=men" },
              { name: "Women", href: "/product?category=women" },
              { name: "Accessories", href: "/product?category=accessories" },
              { name: "My Account", href: "/login" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${playfair.className} text-2xl text-neutral-900 border-b border-neutral-100 pb-4`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
