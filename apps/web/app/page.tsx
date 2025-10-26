export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse through our diverse range of meticulously crafted garments, 
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 font-semibold">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">International Brands</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">2,000+</h3>
              <p className="text-gray-600">High-Quality Products</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">30,000+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Long content section to demonstrate sticky header */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Scroll to see the sticky header in action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Product {i + 1}</h3>
                <p className="text-gray-600 mb-4">Description for product {i + 1}</p>
                <p className="text-2xl font-bold">${(i + 1) * 50}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More content to ensure scrolling */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">More Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <h4 className="text-lg font-medium mb-1">Item {i + 1}</h4>
                <p className="text-gray-600 text-sm mb-2">Brief description</p>
                <p className="text-lg font-bold">${(i + 1) * 25}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
