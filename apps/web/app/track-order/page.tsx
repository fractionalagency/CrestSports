"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tracking logic here
    console.log("Tracking order:", orderNumber, email);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Track Your Order
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Enter your order details below to track your shipment.
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ fontFamily: "Satoshi" }}
                  placeholder="e.g., CS123456789"
                  required
                />
                <p
                  className="text-sm text-gray-500 mt-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  You can find your order number in your confirmation email
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  style={{ fontFamily: "Satoshi" }}
                  placeholder="john@example.com"
                  required
                />
                <p
                  className="text-sm text-gray-500 mt-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Use the email address you used to place the order
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                style={{ fontFamily: "Satoshi" }}
              >
                Track Order
              </button>
            </form>
          </div>

          {/* Alternative Tracking Methods */}
          <div className="mt-12">
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{ fontFamily: "Montserrat" }}
            >
              Other Ways to Track
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Via Tracking Number
                </h3>
                <p
                  className="text-gray-600 mb-4"
                  style={{ fontFamily: "Satoshi" }}
                >
                  If you have your carrier tracking number, you can track
                  directly on their website:
                </p>
                <ul
                  className="space-y-2 text-gray-600"
                  style={{ fontFamily: "Satoshi" }}
                >
                  <li>
                    <a
                      href="https://www.ups.com/track"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      UPS Tracking
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.fedex.com/en-us/tracking.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      FedEx Tracking
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tools.usps.com/go/TrackConfirmAction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline hover:no-underline"
                    >
                      USPS Tracking
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Need Help?
                </h3>
                <p
                  className="text-gray-600 mb-4"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Can't find your tracking information or having issues with
                  your order?
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Status Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Understanding Your Order Status
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-blue-500">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Order Received
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                We've received your order and it's being prepared for shipment.
                You'll receive a confirmation email with your order details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Processing
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Your order is being picked, packed, and prepared for shipping.
                This typically takes 1-2 business days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-purple-500">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Shipped
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Your order has left our warehouse and is on its way! You'll
                receive a tracking number to monitor your package's journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Out for Delivery
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Your package is on the delivery truck and will arrive today.
                Make sure someone is available to receive it.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Delivered
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Your order has been delivered! If you can't find your package,
                check with neighbors or your building's front desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            Tracking FAQs
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                When will I receive my tracking number?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                You'll receive your tracking number via email within 24 hours of
                your order being shipped. Processing typically takes 1-2
                business days.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                My tracking hasn't updated. What should I do?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Tracking information can take 24-48 hours to update after
                shipment. If your tracking hasn't updated after 2 days, please
                contact our support team.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                What if my package is delayed?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                While delays are rare, they can happen due to weather, carrier
                issues, or high shipping volumes. If your package is
                significantly delayed past the estimated delivery date, please
                contact us and we'll investigate with the carrier.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Can I change my delivery address?
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Address changes can only be made before your order ships. Once
                shipped, you may be able to redirect your package through the
                carrier's website, though additional fees may apply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
