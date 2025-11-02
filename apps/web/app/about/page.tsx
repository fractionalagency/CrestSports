"use client";

import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              About Crest Sports
            </h1>
            <p
              className="text-lg md:text-xl text-gray-300 leading-relaxed"
              style={{ fontFamily: "Satoshi" }}
            >
              Your trusted destination for authentic football jerseys from the
              world's most iconic clubs and national teams.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                Our Story
              </h2>
              <div
                className="space-y-4 text-gray-700 leading-relaxed"
                style={{ fontFamily: "Satoshi" }}
              >
                <p>
                  Founded with a passion for football and a commitment to
                  authenticity, Crest Sports has become a premier destination
                  for football enthusiasts seeking genuine jerseys from their
                  favorite teams.
                </p>
                <p>
                  We understand that wearing your team's colors is more than
                  just fashion—it's about identity, loyalty, and being part of
                  something bigger. That's why we only stock 100% authentic
                  jerseys, officially licensed by clubs and federations.
                </p>
                <p>
                  From the Premier League to La Liga, Serie A to the Bundesliga,
                  we bring you the latest and classic jerseys from over 100
                  football clubs worldwide.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p style={{ fontFamily: "Satoshi" }}>Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "Montserrat", fontWeight: 700 }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                100% Authentic
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Every jersey we sell is officially licensed and guaranteed
                authentic. No replicas, no fakes—just the real deal.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                Fast Delivery
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Get your jerseys quickly with our reliable shipping partners.
                Express options available for urgent orders.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                Fan First
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                We're football fans serving football fans. Our customer service
                team is here to help with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                100+
              </div>
              <div
                className="text-gray-400 text-sm md:text-base"
                style={{ fontFamily: "Satoshi" }}
              >
                Football Clubs
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                500+
              </div>
              <div
                className="text-gray-400 text-sm md:text-base"
                style={{ fontFamily: "Satoshi" }}
              >
                Authentic Jerseys
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                10,000+
              </div>
              <div
                className="text-gray-400 text-sm md:text-base"
                style={{ fontFamily: "Satoshi" }}
              >
                Happy Fans
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ fontFamily: "Montserrat", fontWeight: 700 }}
              >
                24/7
              </div>
              <div
                className="text-gray-400 text-sm md:text-base"
                style={{ fontFamily: "Satoshi" }}
              >
                Customer Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "Montserrat", fontWeight: 700 }}
          >
            Ready to Wear Your Colors?
          </h2>
          <p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Satoshi" }}
          >
            Browse our collection of authentic football jerseys and find your
            team's latest kit.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-12 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            style={{ fontFamily: "Satoshi" }}
          >
            Shop Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
