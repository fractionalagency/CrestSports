export default function AuthenticityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            100% Authenticity Guarantee
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Every jersey we sell is authentic and officially licensed. No
            exceptions.
          </p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-lg mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "Montserrat" }}
            >
              Our Promise to You
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: "Satoshi" }}
            >
              At Crest Sports, we guarantee that every single jersey we sell is
              100% authentic and officially licensed by the respective clubs,
              leagues, and manufacturers. We take authenticity seriously because
              your passion for football deserves nothing less than the real
              thing.
            </p>
          </div>

          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            How We Ensure Authenticity
          </h2>

          <div className="space-y-8">
            {/* Direct Partnerships */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                1
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Direct Partnerships with Manufacturers
                </h3>
                <p
                  className="text-gray-600 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  We source our jerseys directly from official manufacturers
                  like Nike, Adidas, Puma, and New Balance. We maintain strong
                  relationships with authorized distributors and never purchase
                  from unauthorized third-party sellers.
                </p>
              </div>
            </div>

            {/* Authentication Process */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                2
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Rigorous Authentication Process
                </h3>
                <p
                  className="text-gray-600 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Every jersey undergoes a thorough inspection by our trained
                  authentication team. We verify official tags, holograms,
                  quality of materials, stitching, and all manufacturer-specific
                  security features before the product reaches our warehouse.
                </p>
              </div>
            </div>

            {/* Licensed Products */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                3
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Officially Licensed Products Only
                </h3>
                <p
                  className="text-gray-600 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  All our jerseys carry official licensing from the respective
                  clubs, leagues, and governing bodies. This means every product
                  meets the highest standards set by these organizations and
                  contributes to the clubs and leagues you love.
                </p>
              </div>
            </div>

            {/* Documentation */}
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                4
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Complete Documentation & Certification
                </h3>
                <p
                  className="text-gray-600 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  We maintain complete documentation for every product,
                  including certificates of authenticity and records of our
                  supply chain. This ensures full traceability from manufacturer
                  to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Identify Authentic Jerseys */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            How to Identify Authentic Jerseys
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Official Tags & Labels
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Authentic jerseys include official manufacturer tags with
                holographic elements, proper sizing labels, and care
                instructions in multiple languages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Quality Materials
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Genuine jerseys use premium, performance-grade fabrics with
                official moisture-wicking technology. The material feels
                substantial and high-quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Precise Stitching
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Authentic jerseys feature clean, even stitching throughout.
                Logos, crests, and sponsor details are perfectly embroidered or
                heat-pressed with exact specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Correct Badges & Logos
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                All club crests, manufacturer logos, and sponsor badges are
                placed in exact positions with correct sizing and coloring as
                specified by the official kits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Guarantee */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            What Our Guarantee Means
          </h2>

          <div className="bg-black text-white p-8 rounded-lg">
            <div className="space-y-6">
              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Full Refund if Not Authentic
                </h3>
                <p
                  className="text-gray-300 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  If you receive a jersey from us that is proven to be
                  counterfeit or not authentic, we will immediately issue a full
                  refund including all shipping costs, no questions asked.
                </p>
              </div>

              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Lifetime Authenticity Guarantee
                </h3>
                <p
                  className="text-gray-300 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Our authenticity guarantee doesn't expire. If you ever have
                  concerns about the authenticity of a jersey purchased from us,
                  contact us and we'll verify it for you.
                </p>
              </div>

              <div>
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Certificate of Authenticity
                </h3>
                <p
                  className="text-gray-300 text-lg"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Upon request, we can provide a certificate of authenticity for
                  your purchase, documenting the product details and our
                  verification process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Against Counterfeits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Beware of Counterfeit Jerseys
          </h2>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
            <p
              className="text-gray-700 text-lg mb-4"
              style={{ fontFamily: "Satoshi" }}
            >
              The market is flooded with counterfeit football jerseys.
              Counterfeit products not only lack quality but also harm the clubs
              and leagues you support.
            </p>
            <p className="text-gray-700" style={{ fontFamily: "Satoshi" }}>
              When you buy authentic jerseys from Crest Sports, you're
              supporting the teams and players you love.
            </p>
          </div>

          <h3
            className="text-2xl font-semibold mb-4"
            style={{ fontFamily: "Satoshi" }}
          >
            Red Flags for Counterfeit Jerseys:
          </h3>
          <ul
            className="list-disc list-inside space-y-3 text-gray-600 text-lg"
            style={{ fontFamily: "Satoshi" }}
          >
            <li>Prices significantly lower than retail</li>
            <li>Misspelled words or incorrect fonts</li>
            <li>Poor quality materials that feel cheap or thin</li>
            <li>Uneven or sloppy stitching</li>
            <li>Incorrect placement of logos or badges</li>
            <li>Missing or fake holographic tags</li>
            <li>Sellers without verifiable business information</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Questions About Authenticity?
          </h2>
          <p
            className="text-gray-600 mb-8 text-lg"
            style={{ fontFamily: "Satoshi" }}
          >
            We're here to answer any questions you have about our products and
            authentication process.
          </p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            style={{ fontFamily: "Satoshi" }}
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
