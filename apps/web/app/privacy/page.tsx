"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function PrivacyPage() {
  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      
      {/* --- PAGE HEADER --- */}
      <section className="bg-neutral-50 py-20 border-b border-neutral-100">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400">
            Legal Documentation
          </p>
          <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-neutral-900`}>
            Privacy Policy
          </h1>
          <div className="pt-4">
             <span className="inline-block bg-white border border-neutral-200 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest text-neutral-500">
               Last Updated: December 18, 2025
             </span>
          </div>
        </div>
      </section>

      {/* --- LEGAL CONTENT --- */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          
          {/* Introduction */}
          <div className="prose prose-neutral prose-lg leading-loose text-neutral-600">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
              This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>
            <p>
              We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section 1 */}
          <div className="space-y-8">
            <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              Collecting and Using Your Personal Data
            </h2>
            
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                Types of Data Collected
              </h3>
              
              <div className="bg-neutral-50 p-8 rounded-sm border border-neutral-100 space-y-4">
                <p className="font-semibold text-neutral-900">Personal Data</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {["Email address", "First name and last name", "Phone number", "Address, State, ZIP/Postal code"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span className="text-neutral-300">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <h3 className="text-sm font-bold uppercase tracking-widest text-black flex items-center gap-2 mt-8">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  Usage Data
                </h3>
                <p>
                  Usage Data is collected automatically when using the Service. It may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, and other diagnostic data.
                </p>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section 2: Use of Data */}
          <div className="space-y-6">
             <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              Use of Your Personal Data
            </h2>
            <p className="text-neutral-600">The Company may use Personal Data for the following purposes:</p>
            <ul className="space-y-4 pl-4 border-l-2 border-neutral-100">
              {[
                "To provide and maintain our Service, including to monitor usage.",
                "To manage Your Account and registration.",
                "For the performance of a contract: purchasing products or services.",
                "To contact You via email, calls, or SMS for updates.",
              ].map((item, i) => (
                <li key={i} className="text-neutral-600 leading-relaxed pl-4">
                  <span className="font-semibold text-neutral-900 mr-2">{i + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Other Standard Sections (Retention, Transfer, Security) */}
          <div className="mt-12 space-y-12 text-neutral-600 leading-relaxed">
            <article>
              <h3 className="font-bold text-neutral-900 mb-3">Retention of Your Personal Data</h3>
              <p>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations.
              </p>
            </article>

            <article>
              <h3 className="font-bold text-neutral-900 mb-3">Security of Your Personal Data</h3>
              <p>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </article>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Contact Section */}
          <div className="bg-neutral-900 text-white p-8 md:p-10 rounded-sm">
            <h2 className={`${playfair.className} text-2xl mb-4`}>Still have questions?</h2>
            <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
              If you have any questions regarding this Privacy Policy or how we handle your data, please contact our privacy team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                Contact Support <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="mailto:support@crestsports.com" className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}