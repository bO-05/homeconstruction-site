import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out'
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={contentRef}>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#B8FF3D] transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <h1 className="headline-section text-white mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 text-lg mb-8">
              Last updated: January 30, 2026
            </p>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-white/70 leading-relaxed">
                By accessing or using HomeConstruction.site ("the Service"), you agree to be bound 
                by these Terms of Service. If you disagree with any part of the terms, you may not 
                access the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                2. Description of Service
              </h2>
              <p className="text-white/70 leading-relaxed">
                HomeConstruction.site provides home construction and renovation services. 
                We offer productized construction packages with modular add-ons, transparent 
                pricing, and fixed timelines. Our services include project management, 
                construction work, and related consultation services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                3. Quotes and Estimates
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                All quotes and estimates provided through our Service are based on the information 
                you provide. Final pricing may vary based on:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Site conditions discovered during assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Changes to project scope</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Material availability and price fluctuations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Permit requirements and fees</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                4. Payment Terms
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Payment terms are as follows:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>A 20% deposit is required to begin work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Progress payments are due according to the payment schedule in your contract</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Final payment is due upon project completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Late payments may incur a 1.5% monthly service charge</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                5. Change Orders
              </h2>
              <p className="text-white/70 leading-relaxed">
                Any changes to the project scope must be submitted in writing through our client 
                portal. Change orders will be priced and must be approved before work begins. 
                Changes requested after Week 6 may affect the project timeline.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                6. Warranties
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We provide warranties on our work as specified in your contract:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Essential Package: 1-year workmanship warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Premium Package: 2-year workmanship warranty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Luxury Package: 5-year workmanship warranty with annual maintenance</span>
                </li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Manufacturer warranties on materials and appliances are separate and provided 
                by the respective manufacturers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-white/70 leading-relaxed">
                To the maximum extent permitted by law, HomeConstruction.site shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                8. Cancellation Policy
              </h2>
              <p className="text-white/70 leading-relaxed">
                You may cancel your project before construction begins with written notice. 
                Deposits are refundable minus any costs incurred for design work, permits, 
                or material orders. Once construction has begun, cancellation terms will be 
                governed by your signed contract.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                9. Governing Law
              </h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed and construed in accordance with the laws of the 
                State of Texas, without regard to its conflict of law provisions. Any disputes 
                shall be resolved in the courts of Travis County, Texas.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                10. Changes to Terms
              </h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision 
                is material, we will try to provide at least 30 days' notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                11. Contact Us
              </h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:hello@homeconstruction.site" className="text-[#B8FF3D] hover:underline">
                  hello@homeconstruction.site
                </a>
                {' '}or through our{' '}
                <Link to="/contact" className="text-[#B8FF3D] hover:underline">
                  contact page
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
