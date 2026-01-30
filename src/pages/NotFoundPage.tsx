import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
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
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center pt-20 pb-20">
      <div ref={contentRef} className="text-center px-6">
        {/* 404 */}
        <div className="relative mb-8">
          <span className="font-display font-bold text-[150px] md:text-[200px] text-white/5 leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-6xl md:text-8xl text-[#B8FF3D]">
              404
            </span>
          </div>
        </div>

        <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
          Page Not Found
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary inline-flex justify-center">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex justify-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/packages" 
              className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              Packages
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/quote" 
              className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              Get a Quote
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
