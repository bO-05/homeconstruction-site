import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight, Star } from 'lucide-react';
import { basePackages } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function PackagesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="headline-section text-white mb-6">
            Choose Your Base
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore fictional base packages and add-ons. Prices, features,
            warranties, and the example timeline are not actual offers or commitments.
          </p>
        </div>

        {/* Package Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {basePackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`relative rounded-[28px] overflow-hidden border ${
                pkg.popular 
                  ? 'border-[#B8FF3D] bg-gradient-to-b from-[#B8FF3D]/5 to-transparent' 
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-4 right-4">
                  <span className="badge-pill flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> Sample Highlight
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[#B8FF3D] font-display font-bold text-3xl">
                    {formatPrice(pkg.price)}
                  </span>
                  <span className="text-white/40 text-sm">example</span>
                </div>
                <p className="text-white/60 text-sm mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <p className="text-white/40 text-xs uppercase tracking-wider">
                    Illustrative features
                  </p>
                  {pkg.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check size={16} className="text-[#B8FF3D] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included */}
                {pkg.notIncluded.length > 0 && (
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <p className="text-white/40 text-xs uppercase tracking-wider">
                      Not included
                    </p>
                    {pkg.notIncluded.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <X size={16} className="text-white/30 mt-0.5 flex-shrink-0" />
                        <span className="text-white/40 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <Link 
                  to={`/quote?package=${pkg.id}`}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all ${
                    pkg.popular
                      ? 'bg-[#B8FF3D] text-[#0B0B0D] hover:shadow-lg hover:shadow-[#B8FF3D]/20'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Preview Calculator
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Compare Section */}
        <div className="mt-20 text-center">
          <p className="text-white/60 mb-4">
            Not sure which package is right for you?
          </p>
          <Link 
            to="/book-call" 
            className="btn-secondary inline-flex"
          >
            Preview the consultation form
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
