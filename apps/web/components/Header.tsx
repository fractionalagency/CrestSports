"use client";

import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { useCart } from "@/contexts/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-[74px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full border border-black/10 bg-gradient-to-br from-white via-[#f7f4ee] to-[#e8e1d8] flex items-center justify-center text-xs font-semibold tracking-[0.18em] uppercase text-black/80">
                  CS
                </div>
                <div className="leading-tight">
                  <p
                    className={`${playfair.className} text-[11px] tracking-[0.22em] uppercase text-neutral-600`}
                  >
                    Crest Atelier
                  </p>
                  <p
                    className={`${playfair.className} text-xl font-semibold text-neutral-900 tracking-tight`}
                  >
                    CrestSports
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              {["Shop", "New", "Sale"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-neutral-800 hover:text-black transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:h-[2px] after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Search + Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden md:flex w-64 lg:w-72 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-neutral-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-neutral-100/70 border border-transparent text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
                  placeholder="Search kits, clubs..."
                  style={{ fontFamily: playfair.style.fontFamily }}
                />
              </div>

              <div className="flex items-center gap-1">
                <button
                  className={`${playfair.className} hidden md:inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition hover:border-black/20`}
                >
                  Concierge
                </button>

                <Link
                  href="/cart"
                  className="relative p-2 rounded-full border border-transparent hover:border-neutral-200 transition"
                >
                  <ShoppingCart className="h-5 w-5 text-neutral-900" />
                  {cart.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                      {cart.totalItems}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-neutral-900"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
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
                {["Shop", "New", "Sale", "Concierge"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`${playfair.className} text-gray-900 hover:text-gray-600 transition-colors`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
