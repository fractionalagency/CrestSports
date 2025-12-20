"use client";

import { Parisienne, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { NewArrivals, TopSelling } from "@/components/ProductGrid";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2568&auto=format&fit=crop"
          alt="Hero Campaign"
          fill
          className="object-cover object-center brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl space-y-6 text-white animate-fade-in-up">
            <p className="tracking-[0.2em] text-xs md:text-sm uppercase font-medium text-white/90">
              Spring / Summer 2025
            </p>
            <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl leading-[0.9]`}>
              The Art of <br />
              <span className="italic font-light">Performance.</span>
            </h1>
            <div className="pt-6">
              <Link 
                href="/product" 
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all hover:bg-neutral-200"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Trust Bar */}
      <div className="border-b border-neutral-100 bg-white py-6 overflow-hidden">
        <div className="flex items-center justify-around gap-8 text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-500">
          <span>Premium Materials</span>
          <span className="hidden md:inline">•</span>
          <span>Authentic Design</span>
          <span className="hidden md:inline">•</span>
          <span>Global Shipping</span>
          <span className="hidden md:inline">•</span>
          <span>Limited Editions</span>
        </div>
      </div>

      {/* Category Grid */}
      <section className="px-4 py-20 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] md:h-[800px]">
          {/* Large Item */}
          <div className="relative group overflow-hidden rounded-sm h-full">
            <Image
              src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2000&auto=format&fit=crop" 
              alt="Men's Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className={`${playfair.className} text-3xl md:text-4xl mb-2`}>Men's Kits</h3>
              <Link href="/product?category=men" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider border-b border-white pb-1 hover:opacity-80">
                Explore <MoveRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4 h-full">
            {/* Top Right */}
            <div className="relative group overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1508144753681-9986d4df99b3?q=80&w=2000&auto=format&fit=crop"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className={`${playfair.className} text-2xl md:text-3xl mb-2`}>Women's Kits</h3>
                <Link href="/product?category=women" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider border-b border-white pb-1 hover:opacity-80">
                  Explore <MoveRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="relative group overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1552066344-2464c1135c32?q=80&w=2000&auto=format&fit=crop"
                alt="Accessories"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className={`${playfair.className} text-2xl md:text-3xl mb-2`}>Accessories</h3>
                <Link href="/product?category=accessories" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider border-b border-white pb-1 hover:opacity-80">
                  Explore <MoveRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection (New Arrivals) */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="flex flex-col items-start text-left space-y-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500">
                Just Dropped
              </span>
              <h2 className={`${playfair.className} text-4xl md:text-5xl text-neutral-900`}>
                New Arrivals
              </h2>
              <p className="text-neutral-600 max-w-lg">
                Discover the latest additions to our premium collection. Meticulously crafted for the modern athlete.
              </p>
            </div>
            <Link href="/product" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:underline mb-2">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <NewArrivals limit={4} hideHeader={true} />
        </div>
      </section>

      {/* Editorial / Story Section */}
      <section className="py-24 px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop"
              alt="Editorial"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <span className={`${parisienne.className} text-3xl text-neutral-500`}>
              Our Philosophy
            </span>
            <h2 className={`${playfair.className} text-4xl md:text-6xl leading-tight`}>
              Where Heritage <br /> Meets Modernity.
            </h2>
            <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
              <p>
                CrestSports was born from a desire to bridge the gap between athletic performance and high-end fashion. We believe that your kit should be as refined as your game.
              </p>
              <p>
                Every piece in our collection is a testament to this belief—combining technical fabrics with tailored silhouettes and minimalist aesthetics.
              </p>
            </div>
            <Link 
              href="/about" 
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Top Selling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className={`${playfair.className} text-3xl md:text-4xl text-neutral-900 mb-2`}>
                Trending Now
              </h2>
              <p className="text-neutral-500 text-sm">Curated favorites from our community.</p>
            </div>
            <Link href="/product" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:underline">
              Shop All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <TopSelling limit={4} hideHeader={true} />
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </main>
  );
}
