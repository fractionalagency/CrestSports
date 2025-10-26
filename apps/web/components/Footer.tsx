"use client";

export default function Footer() {
  return (
    <div className="w-full">
      {/* Newsletter CTA Section - Full width but content centered */}
      <div className="w-full flex justify-center px-4">
        <div className="w-[80%] max-w-[1240px]">
          <div className="bg-black text-white rounded-[20px] p-[36px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-[153px]">
            {/* Left - Heading */}
            <div className="w-[551px] h-[94px]">
              <h2 
                className="text-[40px] font-bold leading-[1.125em]"
                style={{ 
                  fontFamily: 'Integral CF', 
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textAlign: 'left',
                  verticalAlign: 'top'
                }}
              >
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h2>
            </div>

            {/* Right - Email Form */}
            <div className="flex flex-col gap-[14px]">
              {/* Email Input */}
              <div className="flex items-center gap-[12px] bg-white rounded-[62px] p-[12px_16px] w-[349px]">
                <img 
                  src="/search-icon.svg" 
                  alt="Search" 
                  className="w-[24px] h-[24px]"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 outline-none bg-transparent text-[rgba(0,0,0,0.4)] placeholder-[rgba(0,0,0,0.4)]"
                  style={{ 
                    fontFamily: 'Satoshi', 
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.35em'
                  }}
                />
              </div>
              
              {/* Subscribe Button */}
              <button 
                className="flex items-center justify-center gap-[12px] bg-white text-black rounded-[62px] p-[12px_16px] w-[349px] hover:bg-gray-100 transition-colors"
                style={{ 
                  fontFamily: 'Satoshi',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '1.35em'
                }}
              >
                Subscribe to Newsletter
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Full width but content centered */}
      <div className="w-full bg-[#F0F0F0] flex justify-center px-4 mt-8">
        <div className="w-[80%] max-w-[1240px]">
          <div className="rounded-[20px] p-[64px_101px]">
          {/* Top Section - Links */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-12">
            {/* Left Column - Brand Info */}
            <div className="flex flex-col gap-[35px]">
              <div className="flex flex-col gap-[25px]">
                <h3 
                  className="text-[33.45px] font-bold leading-[1.2em]"
                  style={{ 
                    fontFamily: 'Integral CF', 
                    fontWeight: 700,
                    color: '#000000',
                    textAlign: 'left',
                    verticalAlign: 'center'
                  }}
                >
                  SHOP.CO
                </h3>
                <p 
                  className="w-[248px] leading-[1.571em]"
                  style={{ 
                    fontFamily: 'Satoshi', 
                    fontWeight: 400,
                    fontSize: '14px',
                    color: 'rgba(0, 0, 0, 0.6)',
                    textAlign: 'left',
                    verticalAlign: 'top'
                  }}
                >
                  We have clothes that suits your style and which you're proud to wear. From women to men.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <img 
                src="/social-icons.svg" 
                alt="Social media icons" 
                className="w-[148px] h-[28px]"
              />
            </div>

            {/* Right Columns - Links */}
            <div className="flex gap-8 lg:gap-12">
              {/* Company Column */}
              <div className="flex flex-col gap-[26px]">
                <h4 
                  className="font-medium tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'Satoshi',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '1.125em',
                    letterSpacing: '18.75%',
                    textTransform: 'uppercase',
                    color: '#000000',
                    textAlign: 'left',
                    verticalAlign: 'top'
                  }}
                >
                  Company
                </h4>
                <ul className="flex flex-col gap-0">
                  {['About', 'Features', 'Works', 'Career'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="block py-1"
                        style={{ 
                          fontFamily: 'Satoshi',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '1.1875em',
                          color: 'rgba(0, 0, 0, 0.6)',
                          textAlign: 'left',
                          verticalAlign: 'top'
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help Column */}
              <div className="flex flex-col gap-[26px]">
                <h4 
                  className="font-medium tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'Satoshi',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '1.125em',
                    letterSpacing: '18.75%',
                    textTransform: 'uppercase',
                    color: '#000000',
                    textAlign: 'left',
                    verticalAlign: 'top'
                  }}
                >
                  Help
                </h4>
                <ul className="flex flex-col gap-0">
                  {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="block py-1"
                        style={{ 
                          fontFamily: 'Satoshi',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '1.1875em',
                          color: 'rgba(0, 0, 0, 0.6)',
                          textAlign: 'left',
                          verticalAlign: 'top'
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ Column */}
              <div className="flex flex-col gap-[26px]">
                <h4 
                  className="font-medium tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'Satoshi',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '1.125em',
                    letterSpacing: '18.75%',
                    textTransform: 'uppercase',
                    color: '#000000',
                    textAlign: 'left',
                    verticalAlign: 'top'
                  }}
                >
                  FAQ
                </h4>
                <ul className="flex flex-col gap-0 w-[149px]">
                  {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="block py-1"
                        style={{ 
                          fontFamily: 'Satoshi',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '1.1875em',
                          color: 'rgba(0, 0, 0, 0.6)',
                          textAlign: 'left',
                          verticalAlign: 'top'
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="flex flex-col gap-[26px]">
                <h4 
                  className="font-medium tracking-wider uppercase"
                  style={{ 
                    fontFamily: 'Satoshi',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '1.125em',
                    letterSpacing: '18.75%',
                    textTransform: 'uppercase',
                    color: '#000000',
                    textAlign: 'left',
                    verticalAlign: 'top'
                  }}
                >
                  Resources
                </h4>
                <ul className="flex flex-col gap-0">
                  {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map((item) => (
                    <li key={item}>
                      <a 
                        href="#" 
                        className="block py-1"
                        style={{ 
                          fontFamily: 'Satoshi',
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '1.1875em',
                          color: 'rgba(0, 0, 0, 0.6)',
                          textAlign: 'left',
                          verticalAlign: 'top'
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-[rgba(0,0,0,0.1)] mb-6"></div>

          {/* Bottom Section - Payment and Copyright */}
          <div className="flex justify-between items-center">
            {/* Payment Methods */}
            <div className="flex items-end gap-[12px]">
              <img 
                src="/payment-methods.svg" 
                alt="Payment methods" 
                className="w-[46.61px] h-[30.03px]"
              />
            </div>

            {/* Copyright */}
            <p 
              className="w-[269px] h-[19px]"
              style={{ 
                fontFamily: 'Satoshi',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.35em',
                color: 'rgba(0, 0, 0, 0.6)',
                textAlign: 'right',
                verticalAlign: 'top'
              }}
            >
              Shop.co © 2000-2023, All Rights Reserved
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
