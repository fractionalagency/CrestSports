export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Size Guide
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Find your perfect fit with our comprehensive sizing guide.
          </p>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            How to Measure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Chest
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Measure around the fullest part of your chest, keeping the tape
                horizontal.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Length
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Measure from the highest point of the shoulder to the desired
                hem length.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Sleeve
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Measure from the center back of the neck to the end of the
                shoulder and down to the wrist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Men's Size Chart */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Men's Size Chart
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-black text-white">
                <tr>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Size
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Chest (inches)
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Length (inches)
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Sleeve (inches)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    XS
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    33-35
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    26-27
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    32-33
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    S
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    35-37
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    27-28
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    33-34
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    M
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    38-40
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    28-29
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    34-35
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    L
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    41-43
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    29-30
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    35-36
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    XL
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    44-46
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    30-31
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    36-37
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    2XL
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    47-49
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    31-32
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    37-38
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    3XL
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    50-52
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    32-33
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    38-39
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Women's Size Chart */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Women's Size Chart
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden border border-gray-200">
              <thead className="bg-black text-white">
                <tr>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Size
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Chest (inches)
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Length (inches)
                  </th>
                  <th
                    className="px-6 py-4 text-left font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Sleeve (inches)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    XS
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    30-32
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    24-25
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    30-31
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    S
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    32-34
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    25-26
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    31-32
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    M
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    35-37
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    26-27
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    32-33
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    L
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    38-40
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    27-28
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    33-34
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    XL
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    41-43
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    28-29
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    34-35
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td
                    className="px-6 py-4 font-semibold"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    2XL
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    44-46
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    29-30
                  </td>
                  <td className="px-6 py-4" style={{ fontFamily: "Satoshi" }}>
                    35-36
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fit Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Fit Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Standard Fit
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                Our classic fit - not too tight, not too loose. Perfect for
                everyday wear and casual occasions.
              </p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Satoshi" }}
              >
                Choose your normal size
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Slim Fit
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                A more tailored fit that's closer to the body. Athletic cut with
                tapered sides for a modern look.
              </p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Satoshi" }}
              >
                Size up if between sizes
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Relaxed Fit
              </h3>
              <p
                className="text-gray-600 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                A looser, more comfortable fit with extra room. Great for
                layering or a casual, laid-back style.
              </p>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "Satoshi" }}
              >
                Size down for a regular fit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Sizing Tips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Between Sizes?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                If your measurements fall between two sizes, we recommend sizing
                up for a more comfortable fit, or sizing down for a slimmer fit.
                Remember, our jerseys are designed to be worn over clothing.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Brand Variations
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Different brands may have slight variations in sizing. Check the
                specific product page for brand-specific sizing notes. When in
                doubt, measure a similar jersey you already own.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Youth Sizes
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Youth jerseys are sized by age (e.g., 6-7 years, 8-9 years).
                Refer to individual product pages for youth-specific size
                charts. Youth jerseys typically run smaller than adult sizes.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Still Unsure?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Don't worry! We offer free size exchanges. If your jersey
                doesn't fit perfectly, we'll send you a different size at no
                extra cost. See our{" "}
                <a href="/returns" className="text-black underline">
                  Returns & Exchanges
                </a>{" "}
                policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Need Sizing Help?
          </h2>
          <p className="mb-8 text-lg" style={{ fontFamily: "Satoshi" }}>
            Our team is here to help you find the perfect fit.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            style={{ fontFamily: "Satoshi" }}
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
