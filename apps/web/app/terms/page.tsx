"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function TermsPage() {
  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      
      {/* --- PAGE HEADER --- */}
      <section className="bg-neutral-50 py-20 border-b border-neutral-100">
        <div className="container mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Terms of Service
            </span>
          </div>
          <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl text-neutral-900`}>
            Terms & Conditions
          </h1>
          <div className="pt-6">
             <span className="inline-block bg-white border border-neutral-200 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest text-neutral-500">
               Effective: December 18, 2025
             </span>
          </div>
        </div>
      </section>

      {/* --- LEGAL CONTENT --- */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          
          {/* Introduction */}
          <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
            <p>
              Please read these terms and conditions carefully before using Our Service.
            </p>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
            </p>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section: Interpretation */}
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              1. Interpretation and Definitions
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
            </p>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section: External Links */}
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              2. Links to Other Websites
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
            </p>
            <div className="bg-neutral-50 border-l-2 border-neutral-900 p-6 italic text-neutral-700 text-sm leading-relaxed">
              "The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services."
            </div>
            <p className="text-neutral-600 leading-relaxed">
              You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content.
            </p>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section: Termination & Liability (Highlighted) */}
          <div className="space-y-8">
            <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              3. Termination & Liability
            </h2>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black">Termination</h3>
              <p className="text-neutral-600 leading-relaxed">
                We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black">Limitation of Liability</h3>
              <p className="text-neutral-600 leading-relaxed">
                To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy).
              </p>
              <p className="text-neutral-600 leading-relaxed text-sm">
                Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.
              </p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Section: Changes */}
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-2xl md:text-3xl text-neutral-900`}>
              4. Changes to These Terms
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms.
            </p>
          </div>

          <div className="h-[1px] w-full bg-neutral-100 my-12" />

          {/* Contact Section */}
          <div className="bg-neutral-900 text-white p-8 md:p-12 rounded-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className={`${playfair.className} text-2xl mb-2`}>Questions about our Terms?</h2>
              <p className="text-neutral-400 text-sm">
                Our legal team is available to clarify any clauses.
              </p>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}