"use client";

import { Parisienne, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { CheckCircle2, Globe, ShieldCheck } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AboutPage() {
  return (
    <main className="bg-white text-neutral-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center bg-black">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop"
          alt="Stadium Tunnel"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center space-y-4 px-4 animate-fade-in-up">
          <p className="text-white/80 tracking-[0.3em] uppercase text-xs font-bold">
            The Crest Standard
          </p>
          <h1 className={`${playfair.className} text-5xl md:text-7xl text-white`}>
            About The Brand
          </h1>
        </div>
      </section>

      {/* --- MISSION STATEMENT --- */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <span className={`${parisienne.className} text-4xl text-neutral-400 block mb-6`}>
          Our Mission
        </span>
        <h2 className={`${playfair.className} text-3xl md:text-5xl leading-tight text-neutral-900 mb-8`}>
          "To bridge the gap between the <br className="hidden md:block" />
          <span className="italic text-neutral-500">pitch and the streets."</span>
        </h2>
        <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto text-lg">
          Crest Sports is a premier destination for authentic football culture. 
          We are dedicated to connecting fans with the game they love through 
          curated, high-quality apparel from the world's most iconic clubs.
        </p>
      </section>

      {/* --- THE STORY (Split Layout) --- */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2000&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 bg-white p-6 shadow-lg max-w-xs hidden md:block">
                <p className={`${playfair.className} text-xl italic`}>Est. 2024</p>
                <p className="text-xs uppercase tracking-widest text-neutral-500 mt-1">London, UK</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="space-y-8">
              <h3 className={`${playfair.className} text-4xl md:text-5xl`}>
                The Origin Story
              </h3>
              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <p>
                  Crest Sports began with a simple, yet ambitious idea: to make authentic football jerseys accessible to fans everywhere, without compromising on the premium experience.
                </p>
                <p>
                  What started as a small, curated collection in a garage has grown into a comprehensive catalog of kits from leagues around the globe. We don't just sell jerseys; we sell the history, the moments, and the memories attached to them.
                </p>
              </div>
              <div className="h-[1px] w-24 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* --- COMMITMENT (Grid Layout) --- */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${playfair.className} text-4xl`}>Our Commitment</h2>
            <p className="text-neutral-500 mt-4">Three pillars that define our legacy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Pillar 1 */}
            <div className="text-center space-y-4 p-8 border border-neutral-100 hover:border-black/10 transition-colors bg-white rounded-sm hover:shadow-xl duration-300">
              <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-neutral-800" />
              </div>
              <h3 className={`${playfair.className} text-xl font-semibold`}>100% Authenticity</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We guarantee that every item we sell is sourced directly from manufacturers. No fakes, no compromises.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="text-center space-y-4 p-8 border border-neutral-100 hover:border-black/10 transition-colors bg-white rounded-sm hover:shadow-xl duration-300">
              <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-neutral-800" />
              </div>
              <h3 className={`${playfair.className} text-xl font-semibold`}>Premium Quality</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                We meticulously inspect every product. Only kits that meet our high standards for fabric and stitching make the cut.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="text-center space-y-4 p-8 border border-neutral-100 hover:border-black/10 transition-colors bg-white rounded-sm hover:shadow-xl duration-300">
              <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-neutral-800" />
              </div>
              <h3 className={`${playfair.className} text-xl font-semibold`}>Global Service</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                From packaging to delivery, we strive to provide a seamless shopping experience for fans worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT BANNER --- */}
      <section className="bg-neutral-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className={`${playfair.className} text-3xl md:text-5xl`}>
            Join the Club
          </h2>
          <p className="text-neutral-400 max-w-lg mx-auto">
            Have questions about sizing, shipping, or sourcing? Our team is ready to assist you.
          </p>
          <div className="pt-4">
            <a 
              href="mailto:support@crestsports.com" 
              className="inline-block border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              support@crestsports.com
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}