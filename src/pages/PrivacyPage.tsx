import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 text-lg mb-8">
              Last updated: January 30, 2026
            </p>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                1. Introduction
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                HomeConstruction.site ("we," "our," or "us") respects your privacy and is committed 
                to protecting your personal data. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-white/70 leading-relaxed">
                By accessing or using our services, you agree to the collection and use of information 
                in accordance with this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                2. Information We Collect
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We collect several types of information from and about users of our services:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span><strong className="text-white">Personal Information:</strong> Name, email address, phone number, postal address, and project details you provide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span><strong className="text-white">Usage Data:</strong> Information about how you access and use our website.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span><strong className="text-white">Cookies:</strong> We use cookies and similar tracking technologies to track activity on our service.</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We use the information we collect for various purposes:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>To provide and maintain our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>To process your project requests and quotes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>To communicate with you about your project</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>To send you updates, marketing, and promotional materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>To improve our website and services</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                4. Information Sharing
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information with:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Service providers who assist in operating our business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Professional advisors (lawyers, accountants, insurers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Law enforcement or regulatory authorities when required by law</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                5. Data Security
              </h2>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the Internet is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                6. Your Rights
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Access the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Request correction of inaccurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B8FF3D] mt-1">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="font-display font-bold text-white text-xl mb-4">
                7. Contact Us
              </h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
