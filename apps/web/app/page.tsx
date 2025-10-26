"use client";
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative" style={{ backgroundColor: '#000000' }}>
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero-bg.png" 
            alt="Hero background" 
            className="w-full h-full object-cover"
            style={{ opacity: 0.9 }}
          />
        </div>
        
        {/* SVG Shapes - Positioned according to Figma design */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Vector - Top Right */}
          <img 
            src="/vector-1.svg" 
            alt="Decorative vector" 
            className="absolute"
            style={{ 
              right: '85px', 
              top: '220px',
              width: '104px',
              height: '104px'
            }}
          />
          
          {/* Small Vector - Corrected positioning (more left and up) */}
          <img 
            src="/vector-2.svg" 
            alt="Decorative vector" 
            className="absolute"
            style={{ 
              right: '750px',  // Moved more to the left (was 634px)
              top: '231px',    // Moved up significantly (was 431px)
              width: '56px',
              height: '56px'
            }}
          />
          
          {/* Hero Shapes Group - Bottom Left */}
          <img 
            src="/hero-shapes-group.svg" 
            alt="Decorative shapes" 
            className="absolute"
            style={{ 
              left: '100px', 
              top: '841px',
              width: '166px',
              height: '33px'
            }}
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ 
                fontFamily: 'Montserrat', 
                fontWeight: 900, 
                textTransform: 'uppercase',
                color: '#000000'
              }}
            >
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg"
              style={{ 
                color: 'rgba(0, 0, 0, 0.6)',
                fontFamily: 'Inter'
              }}
            >
              Browse through our diverse range of meticulously crafted garments, 
              designed to bring out your individuality and cater to your sense of style.
            </p>
            
            {/* Shop Now Button */}
            <button 
              className="inline-flex items-center justify-center px-12 py-4 font-semibold rounded-full transition-colors duration-200 text-lg"
              style={{ 
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontFamily: 'Montserrat',
                fontWeight: 600,
                borderRadius: '62px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#333333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#000000'}
            >
              Shop Now
            </button>
          </div>
          
          {/* Stats Section - Within Hero Section */}
          <div 
            className="absolute flex items-center gap-8 md:gap-16"
            style={{ 
              left: '104px', // Align with container padding (100px + 4px)
              top: '650px'
            }}
          >
            {/* 200+ International Brands */}
            <div className="flex flex-col items-center text-center">
              <h3 
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ 
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  color: '#000000',
                  fontSize: '40px',
                  lineHeight: '1.35em'
                }}
              >
                200+
              </h3>
              <p 
                className="text-sm md:text-base whitespace-nowrap"
                style={{ 
                  fontFamily: 'Inter',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '16px'
                }}
              >
                International Brands
              </p>
            </div>
            
            {/* Divider Line */}
            <div 
              className="hidden md:block w-px h-12"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}
            ></div>
            
            {/* 2,000+ High-Quality Products */}
            <div className="flex flex-col items-center text-center">
              <h3 
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ 
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  color: '#000000',
                  fontSize: '40px',
                  lineHeight: '1.35em'
                }}
              >
                2,000+
              </h3>
              <p 
                className="text-sm md:text-base whitespace-nowrap"
                style={{ 
                  fontFamily: 'Inter',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '16px'
                }}
              >
                High-Quality Products
              </p>
            </div>
            
            {/* Divider Line */}
            <div 
              className="hidden md:block w-px h-12"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
              }}
            ></div>
            
            {/* 30,000+ Happy Customers */}
            <div className="flex flex-col items-center text-center">
              <h3 
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ 
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  color: '#000000',
                  fontSize: '40px',
                  lineHeight: '1.35em'
                }}
              >
                30,000+
              </h3>
              <p 
                className="text-sm md:text-base whitespace-nowrap"
                style={{ 
                  fontFamily: 'Inter',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '16px'
                }}
              >
                Happy Customers
              </p>
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
