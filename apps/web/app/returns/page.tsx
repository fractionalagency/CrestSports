export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Returns & Exchanges
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            We want you to love your jersey. If it's not perfect, we'll make it
            right.
          </p>
        </div>
      </section>

      {/* Return Policy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Our Return Policy
          </h2>

          <div className="bg-gray-50 border-l-4 border-black p-6 mb-8">
            <p
              className="text-lg font-semibold mb-2"
              style={{ fontFamily: "Satoshi" }}
            >
              30-Day Return Window
            </p>
            <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
              You have 30 days from the date of delivery to return or exchange
              your jersey for any reason.
            </p>
          </div>

          <div className="space-y-8">
            {/* Eligible Returns */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Eligible for Return
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>Unworn items with original tags attached</li>
                <li>Items in original packaging</li>
                <li>Items without any signs of wear or washing</li>
                <li>Defective or damaged items (any condition accepted)</li>
                <li>Wrong item received</li>
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Non-Returnable Items
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>Customized or personalized jerseys</li>
                <li>Items purchased on final sale</li>
                <li>Items without proof of purchase</li>
                <li>Items returned after 30 days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            How to Return an Item
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Initiate Your Return
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Email us at support@crestsports.com with your order number
                    and reason for return. You'll receive a return authorization
                    number and instructions within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Package Your Item
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Pack your item securely in its original packaging with all
                    tags attached. Include a copy of your order confirmation or
                    packing slip.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Ship Your Return
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Use the prepaid return label we provide (emailed with your
                    return authorization). Drop off your package at any
                    authorized shipping location.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Receive Your Refund
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Once we receive and inspect your return (typically 3-5
                    business days), we'll process your refund. Refunds are
                    issued to the original payment method within 5-7 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Exchanges
          </h2>

          <div className="space-y-6">
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "Satoshi" }}
            >
              Need a different size or color? We make exchanges easy.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                How to Exchange
              </h3>
              <ol
                className="list-decimal list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>
                  Contact us at support@crestsports.com with your order number
                  and the item you'd like to exchange for
                </li>
                <li>
                  We'll send you a prepaid return label and place your exchange
                  order
                </li>
                <li>
                  Ship your original item back to us using the prepaid label
                </li>
                <li>
                  Your exchange item will ship once we receive your return
                </li>
              </ol>
            </div>

            <div className="bg-black text-white p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Free Size Exchanges
              </h3>
              <p style={{ fontFamily: "Satoshi" }}>
                Size exchanges are always free! We cover both return shipping
                and shipping for your new size. We want you to get the perfect
                fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Shipping Costs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Return Shipping Costs
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3 text-green-600"
                style={{ fontFamily: "Satoshi" }}
              >
                Free Returns
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>Defective or damaged items</li>
                <li>Wrong item received</li>
                <li>Size exchanges</li>
                <li>Orders over $100</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Standard Return Fee: $6.99
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                For all other returns, a $6.99 return shipping fee will be
                deducted from your refund. We'll provide a prepaid return label
                for your convenience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                International Returns
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                International return shipping costs vary by location. Please
                contact us for a return authorization and shipping quote.
                International customers are responsible for any customs fees or
                duties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Defective Items */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "Montserrat" }}
          >
            Defective or Damaged Items
          </h2>
          <p
            className="text-gray-600 text-lg mb-6"
            style={{ fontFamily: "Satoshi" }}
          >
            We inspect every jersey before shipping, but if you receive a
            defective or damaged item, we'll make it right immediately.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-6">
            <p
              className="text-gray-700 font-semibold mb-2"
              style={{ fontFamily: "Satoshi" }}
            >
              Priority Handling
            </p>
            <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
              Contact us within 48 hours of delivery with photos of the defect
              or damage. We'll send a replacement immediately via express
              shipping at no charge, or issue a full refund including original
              shipping costs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Need Help with a Return?
          </h2>
          <p
            className="text-gray-600 mb-8 text-lg"
            style={{ fontFamily: "Satoshi" }}
          >
            Our customer service team is here to make your return process as
            smooth as possible.
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
