"use client";

import { NewArrivals, TopSelling } from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:bg-black" style={{ backgroundColor: '#F4F2F3' }}>
        {/* Desktop: Hero Background Image */}
        <div className="hidden md:absolute md:inset-0 md:block">
          <img 
            src="/hero-bg.png" 
            alt="Hero background" 
            className="w-full h-full object-cover"
            style={{ opacity: 0.9 }}
          />
        </div>
        
        {/* SVG Shapes - Desktop Only */}
        <div className="hidden md:absolute md:inset-0 md:pointer-events-none md:block">
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
                fontFamily: 'Satoshi'
              }}
            >
              Browse through our diverse range of meticulously crafted garments, 
              designed to bring out your individuality and cater to your sense of style.
            </p>
            
            {/* Stats Section - Different layouts for desktop and mobile */}
            <div className="mb-8">
              {/* Desktop Layout */}
              <div className="hidden md:flex md:flex-row md:items-center md:gap-8">
                {/* 200+ International Brands */}
                <div className="flex flex-col">
                  <h3 
                    className="text-4xl font-bold mb-1"
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
                    className="text-base"
                    style={{ 
                      fontFamily: 'Satoshi',
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '16px'
                    }}
                  >
                    International Brands
                  </p>
                </div>
                
                {/* Divider Line */}
                <div 
                  className="w-px h-12"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                ></div>
                
                {/* 2,000+ High-Quality Products */}
                <div className="flex flex-col">
                  <h3 
                    className="text-4xl font-bold mb-1"
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
                    className="text-base"
                    style={{ 
                      fontFamily: 'Satoshi',
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '16px'
                    }}
                  >
                    High-Quality Products
                  </p>
                </div>
                
                {/* Divider Line */}
                <div 
                  className="w-px h-12"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                  }}
                ></div>
                
                {/* 30,000+ Happy Customers */}
                <div className="flex flex-col">
                  <h3 
                    className="text-4xl font-bold mb-1"
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
                    className="text-base"
                    style={{ 
                      fontFamily: 'Satoshi',
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: '16px'
                    }}
                  >
                    Happy Customers
                  </p>
                </div>
              </div>
              
              {/* Mobile Layout - 2-1 Grid */}
              <div className="md:hidden">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* 200+ International Brands */}
                  <div className="flex flex-col">
                    <h3 
                      className="text-2xl font-bold mb-1"
                      style={{ 
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        color: '#000000',
                        fontSize: '32px',
                        lineHeight: '1.35em'
                      }}
                    >
                      200+
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Satoshi',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '14px'
                      }}
                    >
                      International Brands
                    </p>
                  </div>
                  
                  {/* 2,000+ High-Quality Products */}
                  <div className="flex flex-col">
                    <h3 
                      className="text-2xl font-bold mb-1"
                      style={{ 
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        color: '#000000',
                        fontSize: '32px',
                        lineHeight: '1.35em'
                      }}
                    >
                      2,000+
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Satoshi',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '14px'
                      }}
                    >
                      High-Quality Products
                    </p>
                  </div>
                </div>
                
                {/* Second row with single item */}
                <div className="grid grid-cols-1 gap-4">
                  {/* 30,000+ Happy Customers */}
                  <div className="flex flex-col">
                    <h3 
                      className="text-2xl font-bold mb-1"
                      style={{ 
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        color: '#000000',
                        fontSize: '32px',
                        lineHeight: '1.35em'
                      }}
                    >
                      30,000+
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ 
                        fontFamily: 'Satoshi',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '14px'
                      }}
                    >
                      Happy Customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shop Now Button */}
            <button 
              className="inline-flex items-center justify-center px-12 py-4 font-semibold rounded-full transition-colors duration-200 text-lg hover:bg-gray-800"
              style={{ 
                backgroundColor: '#000000',
                color: '#FFFFFF',
                fontFamily: 'Satoshi',
                fontWeight: 500,
                borderRadius: '62px'
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
        
        {/* Mobile: Hero Background Image Below Content */}
        <div className="md:hidden relative w-full -mt-48 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Hero background" 
            className="w-full h-auto object-cover scale-175"
            style={{ opacity: 0.9 }}
          />
        </div>
      </section>

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Top Selling Section */}
      <TopSelling />

      {/* Footer */}
      <Footer />
    </div>
  );
}
