import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';
import { reviews } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

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
        statsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      gsap.fromTo(
        reviewsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: String(reviews.length), label: 'Fictional Review Cards' },
    { value: '0', label: 'Verified Endorsements' },
    { value: 'Demo', label: 'Illustrative Ratings' },
    { value: 'Sample', label: 'Project Descriptions' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="headline-section text-white mb-4">
            Sample Homeowner Reviews
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Fictional review cards demonstrate the layout. These are not real
            customers, endorsements, ratings, or completed projects.
          </p>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="text-center p-6 rounded-[22px] border border-white/10 bg-white/[0.02]"
            >
              <div className="font-display font-bold text-[#B8FF3D] text-3xl md:text-4xl mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div ref={reviewsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="rounded-[22px] overflow-hidden border border-white/10 bg-white/[0.02] p-6"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div aria-hidden="true" className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center bg-[#B8FF3D]/10 text-[#B8FF3D] font-display font-bold">
                  {review.name.slice(-1)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-white truncate">
                    {review.name}
                  </h3>
                  <p className="text-white/50 text-sm">{review.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div aria-label="Illustrative five-star rating" className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className="text-[#B8FF3D]" 
                    fill="currentColor"
                  />
                ))}
                <span className="text-white/40 text-sm ml-2">{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-white/80 leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Project */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <CheckCircle size={14} className="text-[#B8FF3D]" />
                <span className="text-white/50 text-sm">Sample project · {review.project}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">
            Explore another fictional interface flow.
          </p>
          <Link 
            to="/book-call" 
            className="btn-primary inline-flex"
          >
            Preview the consultation form
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
