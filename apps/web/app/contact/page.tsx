export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Contact Us
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Have a question? We're here to help. Reach out to our team and we'll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2
                className="text-3xl font-bold mb-8"
                style={{ fontFamily: "Montserrat" }}
              >
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Email
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      support@crestsports.com
                    </p>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Phone
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      +1 (555) 123-4567
                    </p>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Address
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      123 Sports Avenue
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Business Hours
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Montserrat" }}
              >
                Send us a Message
              </h2>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    style={{ fontFamily: "Satoshi" }}
                    placeholder="John Doe"
                  />
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
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    style={{ fontFamily: "Satoshi" }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    style={{ fontFamily: "Satoshi" }}
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    style={{ fontFamily: "Satoshi" }}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Quick Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/shipping"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Shipping & Delivery
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Learn about our shipping options and delivery times
              </p>
            </a>
            <a
              href="/returns"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Returns & Exchanges
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Find out about our return and exchange policy
              </p>
            </a>
            <a
              href="/size-guide"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Size Guide
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Find the perfect fit with our detailed size guide
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
