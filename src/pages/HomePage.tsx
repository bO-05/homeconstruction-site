import { useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Star, ExternalLink, Download } from 'lucide-react';
import { timelineWeeks, galleryProjects } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const sub = subRef.current;
    const cta = ctaRef.current;
    const badge = badgeRef.current;

    if (!section || !card || !headline || !sub || !cta || !badge) return;

    // If user prefers reduced motion, show everything immediately
    if (prefersReducedMotion) {
      gsap.set([card, headline, sub, cta, badge], { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(card,
        { x: '-18vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 1 }
      )
        .fromTo(headline.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
          '-=0.6'
        )
        .fromTo(sub,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(cta.children,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(badge,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
          '-=0.6'
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([card, headline, sub, cta, badge], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
          }
        }
      });

      scrollTl.fromTo(card, { y: 0 }, { y: '-1vh', ease: 'none' }, 0);
      scrollTl.fromTo(headline, { y: 0 }, { y: '-0.5vh', ease: 'none' }, 0);

      scrollTl.fromTo(card,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(headline,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(badge,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      <div ref={badgeRef} className="absolute left-[10vw] top-[22vh] z-20">
        <span className="badge-pill">New Drop</span>
      </div>

      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[18vh] w-[48vw] h-[64vh] card-editorial z-0"
      >
        <img
          src="/hero_scaffolding.jpg"
          alt="Home construction"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={headlineRef}
        className="absolute left-[56vw] top-[18vh] w-[40vw] z-20"
      >
        <h1 className="headline-hero text-white">
          <span className="block">Build</span>
          <span className="block">Your Home</span>
          <span className="block">In Public.</span>
        </h1>
      </div>

      {/* <div
        ref={subRef}
        className="absolute right-[56vw] top-[72vh] w-[38vw] z-20"
      >
        <p className="text-white/70 text-sm lg:text-base leading-relaxed">
          A productized construction service: one base package, modular add-ons,
          and a shared timeline you can follow week by week.
        </p>
      </div> */}

      <div
        ref={ctaRef}
        className="absolute left-[56vw] top-[82vh] w-[38vw] z-20 flex flex-col sm:flex-row gap-3"
      >
        <Link to="/quote" className="btn-primary">
          Start your build
          <ArrowRight size={18} className="ml-2" />
        </Link>
        <Link to="/how-it-works" className="btn-secondary">
          See how it works
        </Link>
      </div>

      <div className="absolute left-[6vw] top-[86vh] z-20">
        <p className="text-white/50 text-sm tracking-wide">
          Subscription builds · Fixed timeline · Open process
        </p>
      </div>
    </section>
  );
}

// Plan Section
function PlanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(leftCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(headlineRef.current,
        { y: '-40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(badgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.5)' },
        0.12
      );
      scrollTl.fromTo(bulletsRef.current?.children || [],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.18
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-20">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[88vw] headline-section text-white z-10"
      >
        Pick a Base.<br />Add Modules.
      </h2>

      <p className="absolute right-[6vw] top-[28vh] w-[40vw] text-white/60 text-sm lg:text-base z-10">
        Start with a core scope, then layer in kitchens, baths, finishes.
      </p>

      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[36vh] w-[44vw] h-[44vh] card-editorial z-0"
      >
        <img
          src="/plan_construction.jpg"
          alt="Construction scene"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={rightCardRef}
        className="absolute left-[54vw] top-[36vh] w-[40vw] h-[44vh] card-editorial z-0"
      >
        <img
          src="/plan_interior.jpg"
          alt="Interior detail"
          className="w-full h-full object-cover"
        />
      </div>

      <div ref={badgeRef} className="absolute left-[78vw] top-[16vh]">
        <span className="badge-pill">Base + Modules</span>
      </div>

      <div
        ref={bulletsRef}
        className="absolute left-[6vw] top-[80vh] w-[44vw] flex flex-col gap-3"
      >
        {[
          'Fixed deliverables, no scope creep',
          'Weekly updates + photo logs',
          'Change orders in one click'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={18} className="text-[#B8FF3D]" />
            <span className="text-white/80 text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/packages" className="link-underline text-white flex items-center gap-2">
          Explore the base packages
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

// Timeline Section
function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardRef.current,
        { x: '-70vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(listRef.current?.children || [],
        { x: '20vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(badgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.5)' },
        0.12
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    // Create a sample timeline PDF content
    const content = `
12-WEEK BUILD TIMELINE
======================

Week 1-2: Prep + Permits
- Site preparation and cleanup
- Permit acquisition
- Utility marking
- Material delivery scheduling
Milestone: Permits Approved

Week 3-4: Foundation & Framing
- Foundation work
- Structural framing
- Roof installation
- Window & door openings
Milestone: Structure Complete

Week 5-6: Systems Installation
- Electrical rough-in
- Plumbing installation
- HVAC ductwork
- Insulation
Milestone: Systems In Place

Week 7-8: Interior Finishes
- Drywall installation
- Flooring installation
- Interior painting
- Trim work
Milestone: Interior Complete

Week 9-10: Kitchen & Bath
- Cabinet installation
- Countertop installation
- Fixture installation
- Appliance hookup
Milestone: Kitchen & Bath Done

Week 11-12: Final Touches
- Final electrical
- Final plumbing
- Cleanup & detailing
- Final inspection
Milestone: Project Complete

Contact us: hello@homeconstruction.site
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'HomeConstruction-Timeline.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={sectionRef} className="section-pinned z-30">
      <div ref={badgeRef} className="absolute left-[10vw] top-[22vh] z-20">
        <span className="badge-pill">12-Week Build</span>
      </div>

      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[14vh] w-[62vw] h-[72vh] card-editorial"
      >
        <img
          src="/timeline_meeting.jpg"
          alt="Team meeting"
          className="w-full h-full object-cover"
        />
      </div>

      <h2
        ref={headlineRef}
        className="absolute left-[58vw] top-[22vh] w-[36vw] headline-section text-white"
      >
        12-Week<br />Build.
      </h2>

      <div
        ref={listRef}
        className="absolute left-[58vw] top-[44vh] w-[36vw] flex flex-col gap-4"
      >
        {timelineWeeks.slice(0, 4).map((item, i) => (
          <div key={i} className="flex items-baseline gap-4">
            <span className="text-[#B8FF3D] font-display font-bold text-sm w-20">
              {item.week}
            </span>
            <span className="text-white/80 text-sm lg:text-base">{item.phase}</span>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[58vw] top-[78vh]">
        <button
          onClick={handleDownload}
          className="btn-secondary text-sm"
        >
          <Download size={16} className="mr-2" />
          Download sample timeline
        </button>
      </div>

      <div className="absolute left-[6vw] top-[90vh]">
        <p className="text-white/50 text-sm">
          Milestones published every Monday.
        </p>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(priceRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.6)' },
        0.08
      );
      scrollTl.fromTo(leftCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(bulletsRef.current?.children || [],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.18
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(priceRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.85, opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-40">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[88vw] headline-section text-white text-center z-10"
      >
        Transparent<br />Pricing.
      </h2>

      <div ref={priceRef} className="absolute left-1/2 top-[50vh] -translate-x-1/2 z-10">
        <span className="price-pill">From $32,000</span>
      </div>

      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[36vh] w-[44vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/pricing_worker.jpg"
          alt="Professional worker"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={rightCardRef}
        className="absolute left-[54vw] top-[36vh] w-[40vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/pricing_interior.jpg"
          alt="Interior work"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={bulletsRef}
        className="absolute left-[6vw] top-[78vh] w-[44vw] flex flex-col gap-3"
      >
        {[
          'All labor + project management',
          'Material allowances included',
          'Monthly payment options'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={18} className="text-[#B8FF3D]" />
            <span className="text-white/80 text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/quote" className="btn-primary text-sm">
          Request a detailed quote
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </section>
  );
}

// Add-ons Section
function AddonsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(chipsRef.current?.children || [],
        { x: '20vw', opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.02, ease: 'none' },
        0.1
      );
      scrollTl.fromTo(leftCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(bulletsRef.current?.children || [],
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.18
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const chips = ['Kitchen Upgrade', 'Bath Module', 'Smart Home'];

  return (
    <section ref={sectionRef} className="section-pinned z-50">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[70vw] headline-section text-white z-10"
      >
        Customize<br />Your Build.
      </h2>

      <div
        ref={chipsRef}
        className="absolute left-[72vw] top-[14vh] flex flex-col gap-2 z-10"
      >
        {chips.map((chip, i) => (
          <span key={i} className="chip">{chip}</span>
        ))}
      </div>

      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[36vh] w-[44vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/addons_kitchen.jpg"
          alt="Kitchen installation"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={rightCardRef}
        className="absolute left-[54vw] top-[36vh] w-[40vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/addons_detail.jpg"
          alt="Detail work"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={bulletsRef}
        className="absolute left-[6vw] top-[78vh] w-[44vw] flex flex-col gap-3"
      >
        {[
          'Add modules anytime before Week 6',
          'Fixed pricing per module',
          'Upgrade without changing the timeline'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={18} className="text-[#B8FF3D]" />
            <span className="text-white/80 text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/add-ons" className="link-underline text-white flex items-center gap-2">
          Browse all add-ons
          <ExternalLink size={16} />
        </Link>
      </div>
    </section>
  );
}

// Gallery Preview Section
function GalleryPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(cardRef.current,
        { x: '-70vw', opacity: 0, scale: 0.97 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(thumbsRef.current?.children || [],
        { x: '20vw', opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.02, ease: 'none' },
        0.12
      );
      scrollTl.fromTo(badgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.5)' },
        0.1
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      scrollTl.fromTo(cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[60]">
      <div ref={badgeRef} className="absolute left-[10vw] top-[22vh] z-20">
        <span className="badge-pill">Gallery</span>
      </div>

      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[14vh] w-[62vw] h-[72vh] card-editorial"
      >
        <img
          src="/gallery_living.jpg"
          alt="Living room"
          className="w-full h-full object-cover"
        />
      </div>

      <h2
        ref={headlineRef}
        className="absolute left-[58vw] top-[22vh] w-[36vw] headline-section text-white"
      >
        See Recent<br />Homes.
      </h2>

      <div
        ref={thumbsRef}
        className="absolute left-[58vw] top-[50vh] w-[36vw] flex gap-[2%]"
      >
        {galleryProjects.slice(1, 3).map((thumb, i) => (
          <div key={i} className="w-[48%] h-[22vh] card-editorial-sm relative group cursor-pointer overflow-hidden">
            <img
              src={thumb.image}
              alt={thumb.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-3 bg-black/60 px-2 py-1 rounded">
              <span className="text-white text-xs">{thumb.category}</span>
            </div>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[58vw] top-[78vh]">
        <Link to="/gallery" className="link-underline text-white flex items-center gap-2">
          View full project gallery
          <ExternalLink size={16} />
        </Link>
      </div>
    </section>
  );
}

// Reviews Preview Section
function ReviewsPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(leftCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(rightCardRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0.05
      );
      scrollTl.fromTo(badgeRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.5)' },
        0.12
      );
      scrollTl.fromTo(quoteRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );
      scrollTl.fromTo(ctaRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[70]">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[70vw] headline-section text-white z-10"
      >
        Homeowners<br />Say…
      </h2>

      <div ref={badgeRef} className="absolute left-[78vw] top-[22vh] z-10">
        <span className="badge-pill flex items-center gap-1">
          <Star size={14} fill="currentColor" /> 5.0
        </span>
      </div>

      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[36vh] w-[44vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/reviewer_portrait.jpg"
          alt="Happy homeowner"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={rightCardRef}
        className="absolute left-[54vw] top-[36vh] w-[40vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/review_interior.jpg"
          alt="Beautiful interior"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={quoteRef}
        className="absolute left-[6vw] top-[78vh] w-[44vw]"
      >
        <p className="text-white/90 text-base lg:text-lg italic leading-relaxed">
          "They finished on time, stayed on budget, and the weekly updates kept us sane."
        </p>
        <p className="text-white/50 text-sm mt-2">— Sarah Mitchell, Austin TX</p>
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/reviews" className="link-underline text-white flex items-center gap-2">
          Read more reviews
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      scrollTl.fromTo(headlineRef.current,
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(cardRef.current,
        { y: '60vh', opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'back.out(1.6)' },
        0.12
      );

      scrollTl.fromTo(headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-30vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[100] bg-[#6B4C4C]">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[88vw] headline-section text-white text-center z-10"
      >
        Ready When<br />You Are.
      </h2>

      <div
        ref={cardRef}
        className="absolute left-1/2 top-[36vh] -translate-x-1/2 w-[72vw] h-[38vh] card-editorial z-0"
      >
        <img
          src="/final_handshake.jpg"
          alt="Team handshake"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={ctaRef}
        className="absolute left-1/2 top-[78vh] -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <Link to="/book-call" className="btn-primary text-lg px-8 py-4">
          Book a free call
          <ArrowRight size={20} className="ml-2" />
        </Link>
        <p className="text-white/60 text-sm text-center">
          No commitment. We'll map your scope and send a quote in 48 hours.
        </p>
      </div>
    </section>
  );
}

// Main Home Page
export default function HomePage() {
  useEffect(() => {
    // Setup global snap for pinned sections
    const setupSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    const timer = setTimeout(setupSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <HeroSection />
      <PlanSection />
      <TimelineSection />
      <PricingSection />
      <AddonsSection />
      <GalleryPreviewSection />
      <ReviewsPreviewSection />
      <FinalCTASection />
    </div>
  );
}
