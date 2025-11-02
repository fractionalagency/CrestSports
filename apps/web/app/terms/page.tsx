export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Terms & Conditions
          </h1>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: "Satoshi" }}
          >
            Last Updated: November 2, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none"
            style={{ fontFamily: "Satoshi" }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Montserrat" }}
            >
              1. Introduction
            </h2>
            <p className="mb-6 text-gray-700">
              Welcome to Crest Sports ("we," "our," or "us"). These Terms and
              Conditions govern your use of our website and the purchase of
              products from crestsports.com. By accessing or using our website,
              you agree to be bound by these Terms and Conditions. If you do not
              agree with any part of these terms, please do not use our website.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              2. Use of Website
            </h2>
            <p className="mb-4 text-gray-700">
              You may use our website for lawful purposes only. You agree not
              to:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>
                Use the website in any way that violates any applicable law or
                regulation
              </li>
              <li>Transmit any harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>
                Use automated systems to access the website without our
                permission
              </li>
            </ul>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              3. Product Information
            </h2>
            <p className="mb-6 text-gray-700">
              We make every effort to display our products as accurately as
              possible. However, we cannot guarantee that your device's display
              of colors or product details will be completely accurate. All
              products are subject to availability, and we reserve the right to
              discontinue any product at any time.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              4. Pricing and Payment
            </h2>
            <p className="mb-4 text-gray-700">
              All prices are listed in USD and are subject to change without
              notice. We reserve the right to:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Refuse or cancel any order</li>
              <li>Limit quantities purchased per person or per order</li>
              <li>
                Correct pricing errors, even after an order has been placed
              </li>
            </ul>
            <p className="mb-6 text-gray-700">
              Payment must be received in full before order processing. We
              accept major credit cards, debit cards, and other payment methods
              as displayed at checkout.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              5. Orders and Shipping
            </h2>
            <p className="mb-6 text-gray-700">
              Once an order is placed, you will receive a confirmation email.
              This confirmation does not constitute acceptance of your
              order—acceptance occurs when we ship your items. We make every
              effort to ship orders within our stated timeframes, but delivery
              times are estimates and not guaranteed. Risk of loss and title for
              items pass to you upon delivery to the carrier.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              6. Returns and Refunds
            </h2>
            <p className="mb-6 text-gray-700">
              Our return policy is detailed on our{" "}
              <a href="/returns" className="text-black underline">
                Returns & Exchanges
              </a>{" "}
              page. In general, we accept returns within 30 days of delivery for
              unworn, unused items with original tags attached. Customized items
              and final sale items are not eligible for return. Refunds are
              issued to the original payment method within 5-7 business days of
              receiving and inspecting the returned item.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              7. Intellectual Property
            </h2>
            <p className="mb-6 text-gray-700">
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Crest Sports or its
              content suppliers and is protected by copyright and other
              intellectual property laws. You may not reproduce, distribute,
              modify, or create derivative works from any content without our
              express written permission. Team logos and names are trademarks of
              their respective clubs and leagues.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              8. Product Authenticity
            </h2>
            <p className="mb-6 text-gray-700">
              We guarantee that all jerseys sold on our website are 100%
              authentic and officially licensed. We source our products directly
              from manufacturers and authorized distributors. Any counterfeit or
              unauthorized products are strictly prohibited. Learn more on our{" "}
              <a href="/authenticity" className="text-black underline">
                Authenticity Guarantee
              </a>{" "}
              page.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              9. Account Responsibility
            </h2>
            <p className="mb-6 text-gray-700">
              If you create an account on our website, you are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. You agree to
              notify us immediately of any unauthorized use of your account. We
              are not liable for any loss or damage arising from your failure to
              protect your account information.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              10. Limitation of Liability
            </h2>
            <p className="mb-6 text-gray-700">
              To the fullest extent permitted by law, Crest Sports shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Your use or inability to use our website or products</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>
                Any interruption or cessation of transmission to or from our
                website
              </li>
              <li>
                Any bugs, viruses, or other harmful code transmitted through our
                website
              </li>
            </ul>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              11. Indemnification
            </h2>
            <p className="mb-6 text-gray-700">
              You agree to indemnify, defend, and hold harmless Crest Sports and
              its officers, directors, employees, and agents from any claims,
              liabilities, damages, losses, and expenses, including reasonable
              attorney's fees, arising out of or in any way connected with your
              access to or use of the website, your violation of these Terms, or
              your violation of any rights of another party.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              12. Governing Law
            </h2>
            <p className="mb-6 text-gray-700">
              These Terms and Conditions are governed by and construed in
              accordance with the laws of the State of New York, United States,
              without regard to its conflict of law provisions. Any disputes
              arising from these Terms shall be resolved exclusively in the
              courts located in New York County, New York.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              13. Changes to Terms
            </h2>
            <p className="mb-6 text-gray-700">
              We reserve the right to modify these Terms and Conditions at any
              time. Changes will be effective immediately upon posting to the
              website. Your continued use of the website following the posting
              of changes constitutes your acceptance of such changes. We
              encourage you to review these Terms periodically.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              14. Severability
            </h2>
            <p className="mb-6 text-gray-700">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision will be limited or eliminated to the
              minimum extent necessary so that these Terms will otherwise remain
              in full force and effect.
            </p>

            <h2
              className="text-2xl font-bold mb-4 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              15. Contact Information
            </h2>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> legal@crestsports.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> 123 Sports Avenue, New York, NY 10001,
                United States
              </p>
            </div>

            <p className="text-gray-700">
              By using our website and purchasing our products, you acknowledge
              that you have read, understood, and agree to be bound by these
              Terms and Conditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
