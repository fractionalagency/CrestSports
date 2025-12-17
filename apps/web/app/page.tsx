"use client";

import { Parisienne, Playfair_Display } from "next/font/google";

import { NewArrivals, TopSelling } from "@/components/ProductGrid";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9f7f4] text-neutral-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f9f7f4] to-[#f1ede8]" />
        <div className="absolute top-12 right-8 h-36 w-36 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-8 h-52 w-52 rounded-full bg-[#eae2d8]/70 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="space-y-7 max-w-2xl">
            <div className="space-y-2">
              <p className="tracking-[0.22em] text-[11px] uppercase text-neutral-500">
                Crest Atelier
              </p>
              <div className="flex items-center gap-3">
                <span
                  className={`${parisienne.className} text-[18px] text-neutral-500`}
                >
                  Noir Edit
                </span>
                <span className="h-px w-12 bg-neutral-300" />
              </div>
              <h1
                className={`${playfair.className} text-[40px] md:text-[52px] leading-[1.05] text-neutral-900`}
              >
                Minimal football couture.
              </h1>
            </div>

            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              Monochrome kits with quiet luxury details and precise tailoring.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-neutral-900 text-white px-7 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 hover:bg-neutral-800">
                Shop collection
              </button>
              <button className="rounded-full border border-neutral-300 px-7 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-900 transition-colors duration-200 hover:border-neutral-900">
                Lookbook
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              {["100+ clubs", "500+ authentic drops", "Limited runs"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="relative w-full max-w-md ml-auto">
            <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-white/60 blur-2xl" />
            <div className="absolute -right-8 top-6 h-20 w-20 rounded-full bg-[#e6ddd4]/80 blur-2xl" />

            <div className="relative rounded-[22px] border border-white/70 bg-white/85 backdrop-blur-xl shadow-2xl p-6 md:p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="tracking-[0.15em] text-[11px] uppercase text-neutral-500">
                  Featured kit
                </p>
                <span className="rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-semibold uppercase text-white">
                  Limited
                </span>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 shadow-lg">
                <img
                  src="/product-main-image.png"
                  alt="Featured jersey"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                    Paris 24/25
                  </p>
                  <h3
                    className={`${playfair.className} text-xl font-semibold leading-tight text-neutral-900`}
                  >
                    Midnight Third
                  </h3>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs uppercase tracking-[0.13em] text-neutral-500">
                    From
                  </p>
                  <p
                    className={`${playfair.className} text-lg font-semibold text-neutral-900`}
                  >
                    ₹7,490
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#f9f7f4]">
        <NewArrivals />
        <TopSelling />
      </div>
    </div>
  );
}
