"use client";

import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <span>Sign up and get 20% off to your first order. </span>
        <button className="underline font-medium">Sign Up Now</button>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-black text-black tracking-tight" style={{ fontFamily: 'Satoshi', fontWeight: 700, textTransform: 'uppercase' }}>CrestSports</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-900 hover:text-gray-600 transition-colors">
                  <span>Shop</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                On Sale
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                New Arrivals
              </a>
              <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                Brands
              </a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Search for products..."
                />
              </div>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative p-2 text-gray-900 hover:text-gray-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-xs rounded-full flex items-center justify-center">
                    {cart.totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Search for products..."
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                  Shop
                </a>
                <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                  On Sale
                </a>
                <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                  New Arrivals
                </a>
                <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                  Brands
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
