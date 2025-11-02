export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Shipping & Delivery
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Fast, reliable shipping to get your jersey to you as quickly as
            possible.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Shipping Options
          </h2>

          <div className="space-y-6">
            {/* Standard Shipping */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Standard Shipping
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    5-7 business days
                  </p>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Satoshi" }}
                >
                  $5.99
                </span>
              </div>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Our most economical shipping option. Perfect for orders that
                aren't time-sensitive.
              </p>
            </div>

            {/* Express Shipping */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Express Shipping
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    2-3 business days
                  </p>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Satoshi" }}
                >
                  $12.99
                </span>
              </div>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Faster delivery for when you need your jersey sooner.
              </p>
            </div>

            {/* Overnight Shipping */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Overnight Shipping
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    1 business day
                  </p>
                </div>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Satoshi" }}
                >
                  $24.99
                </span>
              </div>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Next-day delivery for urgent orders. Orders must be placed
                before 2 PM EST for next-day delivery.
              </p>
            </div>

            {/* Free Shipping */}
            <div className="border-2 border-black rounded-lg p-6 bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Free Standard Shipping
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    5-7 business days
                  </p>
                </div>
                <span
                  className="text-2xl font-bold text-green-600"
                  style={{ fontFamily: "Satoshi" }}
                >
                  FREE
                </span>
              </div>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                On orders over $100. Automatically applied at checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Delivery Information
          </h2>

          <div className="space-y-8">
            {/* Processing Time */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Processing Time
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Orders are processed within 1-2 business days. Orders placed on
                weekends or holidays will be processed the next business day.
                You will receive a confirmation email with tracking information
                once your order ships.
              </p>
            </div>

            {/* Tracking */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Order Tracking
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Once your order ships, you'll receive a tracking number via
                email. You can track your package using this number on our{" "}
                <a href="/track-order" className="text-black underline">
                  Track Order
                </a>{" "}
                page or directly on the carrier's website.
              </p>
            </div>

            {/* International Shipping */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                International Shipping
              </h3>
              <p
                className="text-gray-600 mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                We ship to over 50 countries worldwide. International shipping
                rates and delivery times vary by destination.
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>Standard International: 10-15 business days ($19.99)</li>
                <li>Express International: 5-7 business days ($34.99)</li>
                <li>
                  Customs duties and taxes are the responsibility of the
                  customer
                </li>
                <li>Free international shipping on orders over $200</li>
              </ul>
            </div>

            {/* Delivery Issues */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Delivery Issues
              </h3>
              <p
                className="text-gray-600 mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                If your package hasn't arrived within the estimated delivery
                time, please:
              </p>
              <ol
                className="list-decimal list-inside space-y-2 text-gray-600"
                style={{ fontFamily: "Satoshi" }}
              >
                <li>Check your tracking information for updates</li>
                <li>Verify the shipping address on your order confirmation</li>
                <li>Check with neighbors or building management</li>
                <li>
                  Contact us at support@crestsports.com if the issue persists
                </li>
              </ol>
            </div>

            {/* Address Changes */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Address Changes
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                If you need to change your shipping address, please contact us
                immediately at support@crestsports.com. Address changes can only
                be made before the order ships. Once shipped, address changes
                cannot be guaranteed.
              </p>
            </div>

            {/* PO Boxes */}
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                PO Boxes & APO/FPO Addresses
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                We ship to PO Boxes and APO/FPO addresses via USPS. Please note
                that Express and Overnight shipping options are not available
                for these addresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Have Questions?
          </h2>
          <p
            className="text-gray-600 mb-8 text-lg"
            style={{ fontFamily: "Satoshi" }}
          >
            Our customer service team is here to help with any shipping
            questions.
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
