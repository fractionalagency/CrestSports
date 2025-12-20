"use client";

import { Parisienne, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight, Star } from "lucide-react";
import { NewArrivals, TopSelling } from "@/components/ProductGrid";

// Load fonts with variable settings for better performance
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

export default function Home() {
  return (
    <main className={`bg-white text-neutral-900 ${playfair.variable} ${parisienne.variable} relative`}>
      
      {/* GLOBAL NOISE TEXTURE (The "Premium" Secret) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[92vh] w-full overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1551796880-d083b0fd9c64?q=80&w=2568&auto=format&fit=crop"
          alt="Campaign Hero"
          fill
          sizes="100vw"
          className="object-cover object-[50%_20%] opacity-90 transition-transform duration-[20s] hover:scale-105"
          priority
        />
        
        {/* Advanced Gradient Map for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl space-y-8 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-white/60"></span>
              <p className="tracking-[0.3em] text-xs md:text-sm uppercase font-medium text-white/80">
                Spring / Summer 2025
              </p>
            </div>

            <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white">
              The Art of <br />
              <span className="italic font-extralight text-white/90">Performance.</span>
            </h1>

            <div className="pt-8">
              <Link 
                href="/product" 
                className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full overflow-hidden transition-all duration-300"
              >
                {/* Glassmorphism Button Background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 transition-all group-hover:bg-white/20" />
                <span className="relative z-10 text-white text-sm font-bold tracking-widest uppercase">
                  Shop Collection
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <div className="border-y border-neutral-100 bg-white py-5 overflow-hidden">
        <div className="flex w-full overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-16 mx-8">
                {["Premium Materials", "Authentic Design", "Global Shipping", "Limited Editions"].map((text, index) => (
                  <div key={index} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                     <Star className="w-3 h-3 fill-black text-black" />
                     <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                       {text}
                     </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BENTO GRID CATEGORIES --- */}
      <section className="px-4 py-24 md:px-12 lg:px-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[700px] md:h-[850px]">
          
          {/* Main Feature (Left) */}
          <Link href="/product?category=men" className="relative group overflow-hidden rounded-sm h-full w-full cursor-pointer block">
            <Image
              src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2000&auto=format&fit=crop" 
              alt="Men's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="text-xs font-bold tracking-widest uppercase mb-2 block opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                Collection 01
              </span>
              <h3 className="font-playfair text-4xl md:text-6xl mb-4">Men's Kits</h3>
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-white pb-1 group-hover:pl-2 transition-all duration-300">
                Shop Now <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Stacked Features (Right) */}
          <div className="grid grid-rows-2 gap-6 h-full">
            {/* Top Right */}
            <Link href="/product?category=women" className="relative group overflow-hidden rounded-sm cursor-pointer block">
              <Image
                src="https://images.unsplash.com/photo-1508144753681-9986d4df99b3?q=80&w=2000&auto=format&fit=crop"
                alt="Women's Collection"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-playfair text-3xl md:text-4xl mb-2">Women's Kits</h3>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* Bottom Right */}
            <Link href="/product?category=accessories" className="relative group overflow-hidden rounded-sm cursor-pointer block">
              <Image
                src="https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=2000&auto=format&fit=crop"
                alt="Accessories"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-playfair text-3xl md:text-4xl mb-2">Accessories</h3>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  View Essentials <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

{/* --- NEW ARRIVALS (Clean Editorial Grid) --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* 1. Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-black/5 pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                 <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-400">
                   Just Landed
                 </span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl text-neutral-900 leading-none">
                New Arrivals
              </h2>
            </div>

            {/* Desktop Link (Magnetic Feel) */}
            <Link 
              href="/product" 
              className="hidden md:inline-flex group items-center gap-3 px-6 py-3 border border-transparent hover:border-black rounded-full transition-all duration-300"
            >
              <span className="text-sm font-bold uppercase tracking-widest">View Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 2. Your Dynamic Product Grid */}
          {/* We wrap it in a fade-in animation container */}
          <div className="animate-fade-in-up">
            <NewArrivals limit={4} hideHeader={true} />
          </div>

          {/* 3. Mobile Bottom Link */}
          <div className="mt-10 md:hidden flex justify-center">
            <Link href="/product" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1">
              Shop All Products <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

     {/* --- BRAND PHILOSOPHY (Clean Editorial Layout) --- */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* 1. The Image (Anchor) */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="aspect-[3/4] md:aspect-[4/5] relative overflow-hidden rounded-sm bg-neutral-100">
                <Image
                  src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2000&auto=format&fit=crop"
                  alt="Philosophy Editorial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
                />
              </div>
              {/* Decorative 'stamp' or caption */}
              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 shadow-xl z-10 hidden md:block">
                 <p className="font-playfair text-2xl italic text-neutral-900">Est. 2025</p>
                 <p className="text-[10px] tracking-widest uppercase text-neutral-500 mt-1">London, UK</p>
              </div>
            </div>

            {/* 2. The Text (Story) */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <span className="font-parisienne text-4xl text-neutral-400 block -ml-2">
                  Our Philosophy
                </span>
                <h2 className="font-playfair text-5xl md:text-7xl leading-[0.9] text-neutral-900">
                  Where Heritage <br />
                  <span className="italic text-neutral-500">Meets Modernity.</span>
                </h2>
              </div>

              <div className="space-y-6 text-neutral-600 text-lg leading-relaxed max-w-lg">
                <p>
                  CrestSports was born from a simple obsession: to bridge the gap between athletic performance and high-end tailoring.
                </p>
                <p>
                  We believe your kit should be as refined as your game. Every piece is a testament to this belief—combining technical fabrics with minimalist aesthetics.
                </p>
              </div>

              <div className="pt-4">
                <Link 
                  href="/about" 
                  className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black"
                >
                  <span className="border-b border-black pb-1 group-hover:border-neutral-400 group-hover:text-neutral-600 transition-all">
                    Read Our Story
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    {/* --- TRENDING SECTION (Editorial Layout) --- */}
      <section className="py-24 md:py-32 bg-neutral-50 relative overflow-hidden border-t border-neutral-200">
        
        {/* Background Decorative Watermark (Adds depth) */}
        <div className="absolute -top-12 -right-12 md:top-0 md:right-0 p-12 opacity-[0.03] pointer-events-none select-none">
           <span className="font-playfair text-[12rem] leading-none text-black"></span>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-400">
                Community Favorites
              </span>
              <h2 className="font-playfair text-5xl md:text-6xl text-neutral-900 leading-none">
                Trending <span className="italic text-neutral-500 font-light">Now.</span>
              </h2>
            </div>
            
            {/* Interactive Pill Button */}
            <Link 
              href="/product" 
              className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 ease-out"
            >
              <span className="text-xs font-bold uppercase tracking-widest">Shop Full List</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Grid Wrapper */}
          <div className="animate-fade-in-up delay-100">
             <TopSelling limit={4} hideHeader={true} />
          </div>
        </div>
      </section>

      {/* --- CSS ANIMATIONS (Refined for 'Luxury' smoothness) --- */}
      <style jsx global>{`
        /* Smooth Fade Up Animation - Tuned Bezier for "Heavy" feel */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Infinite Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform; /* Performance optimization */
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Font Utilities */
        .font-playfair { font-family: var(--font-playfair), serif; }
        .font-parisienne { font-family: var(--font-parisienne), cursive; }
      `}</style>
        
        
    </main>
  );
}