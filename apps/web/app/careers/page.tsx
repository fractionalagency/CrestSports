export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Montserrat" }}
          >
            Join Our Team
          </h1>
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{ fontFamily: "Satoshi" }}
          >
            Help us share the passion for football with fans around the world.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Why Work at Crest Sports?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Passionate Team
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Work with people who love football as much as you do. Our team
                is diverse, collaborative, and driven by a shared passion.
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Growth Opportunities
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                We're a fast-growing company that invests in our people. Enjoy
                career development, training, and advancement opportunities.
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "Satoshi" }}
              >
                Work-Life Balance
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Flexible schedules, remote work options, and generous time off
                policies help you maintain a healthy work-life balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Benefits & Perks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Competitive Salary
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Market-competitive compensation with performance bonuses
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Health Insurance
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Comprehensive medical, dental, and vision coverage
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Paid Time Off
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Generous vacation days, sick leave, and paid holidays
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Employee Discounts
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Exclusive discounts on all our authentic jerseys and merchandise
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                401(k) Plan
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Retirement savings plan with company matching
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Learning Budget
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Annual budget for courses, conferences, and professional
                development
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Remote Work
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Flexible remote work options for eligible positions
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Team Events
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Regular team outings, game nights, and company celebrations
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "Satoshi" }}
              >
                Modern Office
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                Beautiful workspace with ergonomic furniture and latest tech
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Open Positions
          </h2>

          <div className="space-y-6">
            {/* Engineering */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="text-2xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Senior Full Stack Developer
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Engineering • Full-time • New York, NY / Remote
                  </p>
                </div>
                <span
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ fontFamily: "Satoshi" }}
                >
                  New
                </span>
              </div>
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                Help build and scale our e-commerce platform using React,
                Node.js, and modern web technologies. Join our engineering team
                to create seamless shopping experiences for football fans
                worldwide.
              </p>
              <a
                href="mailto:careers@crestsports.com?subject=Application: Senior Full Stack Developer"
                className="text-black font-medium hover:underline"
                style={{ fontFamily: "Satoshi" }}
              >
                Apply Now →
              </a>
            </div>

            {/* Marketing */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="text-2xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Social Media Manager
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Marketing • Full-time • New York, NY
                  </p>
                </div>
              </div>
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                Create engaging content and build our community across all
                social media platforms. Ideal candidate has a passion for
                football and proven experience growing social media presence.
              </p>
              <a
                href="mailto:careers@crestsports.com?subject=Application: Social Media Manager"
                className="text-black font-medium hover:underline"
                style={{ fontFamily: "Satoshi" }}
              >
                Apply Now →
              </a>
            </div>

            {/* Customer Service */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="text-2xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Customer Service Representative
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Customer Service • Full-time • Remote
                  </p>
                </div>
                <span
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  style={{ fontFamily: "Satoshi" }}
                >
                  New
                </span>
              </div>
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                Provide exceptional support to our customers via email, chat,
                and phone. Help football fans find their perfect jersey and
                resolve any issues with care and professionalism.
              </p>
              <a
                href="mailto:careers@crestsports.com?subject=Application: Customer Service Representative"
                className="text-black font-medium hover:underline"
                style={{ fontFamily: "Satoshi" }}
              >
                Apply Now →
              </a>
            </div>

            {/* Warehouse */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className="text-2xl font-semibold mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Warehouse Associate
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    Operations • Full-time • New York, NY
                  </p>
                </div>
              </div>
              <p
                className="text-gray-700 mb-4"
                style={{ fontFamily: "Satoshi" }}
              >
                Handle receiving, inventory management, and order fulfillment in
                our warehouse. Physical role with opportunities for growth into
                supervisory positions.
              </p>
              <a
                href="mailto:careers@crestsports.com?subject=Application: Warehouse Associate"
                className="text-black font-medium hover:underline"
                style={{ fontFamily: "Satoshi" }}
              >
                Apply Now →
              </a>
            </div>
          </div>

          {/* No positions message */}
          <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
            <h3
              className="text-xl font-semibold mb-3"
              style={{ fontFamily: "Satoshi" }}
            >
              Don't see the right role?
            </h3>
            <p className="text-gray-600 mb-6" style={{ fontFamily: "Satoshi" }}>
              We're always looking for talented people to join our team. Send us
              your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@crestsports.com?subject=General Application"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              style={{ fontFamily: "Satoshi" }}
            >
              Send Your Resume
            </a>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ fontFamily: "Montserrat" }}
          >
            Our Hiring Process
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Apply
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                  Submit your application by clicking "Apply Now" on any open
                  position. Include your resume and a brief cover letter telling
                  us why you're interested.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Initial Review
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                  Our team will review your application within 5-7 business
                  days. If there's a good match, we'll reach out to schedule a
                  phone screening.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Interviews
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                  Participate in 2-3 interviews with team members and managers.
                  These can be via video call or in-person, depending on the
                  role and location.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </div>
              <div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "Satoshi" }}
                >
                  Offer
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "Satoshi" }}>
                  If selected, you'll receive an offer letter with details about
                  compensation, benefits, and start date. Welcome to the team!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
