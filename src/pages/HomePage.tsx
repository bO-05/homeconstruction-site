import { useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Star, ExternalLink, Download } from 'lucide-react';
import { timelineWeeks, galleryProjects } from '../data/content';
import { withEditorialMotion } from '../lib/editorial-motion';
import { getSampleTimelineText } from '../lib/sample-timeline';

gsap.registerPlugin(ScrollTrigger);

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const headline = headlineRef.current;
    const cta = ctaRef.current;
    const badge = badgeRef.current;

    if (!section || !card || !headline || !cta || !badge) return;

    return withEditorialMotion(section, () => {
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
            gsap.set([card, headline, cta, badge], {
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

    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned home-hero z-10">
      <div ref={badgeRef} className="absolute home-hero__badge left-[10vw] top-[22vh] z-20">
        <span className="badge-pill">Interface Study</span>
      </div>

      <div
        ref={cardRef}
        className="absolute home-hero__photo left-[6vw] top-[18vh] w-[48vw] h-[64vh] card-editorial z-0"
      >
        <img
          src="/hero_scaffolding.jpg"
          alt="Home construction"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        ref={headlineRef}
        className="absolute home-hero__headline left-[56vw] top-[18vh] w-[40vw] z-20"
      >
        <h1 className="headline-hero text-white">
          <span className="block">Build</span>
          <span className="block">Your Home</span>
          <span className="block">In Public.</span>
        </h1>
      </div>

      <div
        ref={ctaRef}
        className="absolute home-hero__actions left-[56vw] top-[82vh] w-[38vw] z-20 flex flex-col sm:flex-row gap-3"
      >
        <Link to="/quote" className="btn-primary">
          Try the sample calculator
          <ArrowRight size={18} className="ml-2" />
        </Link>
        <Link to="/how-it-works" className="btn-secondary">
          See how it works
        </Link>
      </div>

      <div className="absolute home-hero__caption left-[6vw] top-[86vh] z-20">
        <p className="text-white/50 text-sm tracking-wide">
          Fictional packages · Example timeline · Interface study
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

    return withEditorialMotion(section, () => {
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

    });
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
          'Illustrative scope and deliverables',
          'Sample update workflow, not a live portal',
          'No connected change-order service'
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

    return withEditorialMotion(section, () => {
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

    });
  }, []);

  const handleDownload = () => {
    const content = getSampleTimelineText();

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
        <span className="badge-pill">12-Week Example</span>
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
        Example<br />Timeline.
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
          Sample milestones. No publishing service is connected.
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

    return withEditorialMotion(section, () => {
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

    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-40">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[88vw] headline-section text-white text-center z-10"
      >
        Sample<br />Pricing.
      </h2>

      <div ref={priceRef} className="absolute left-1/2 top-[50vh] -translate-x-1/2 z-10">
        <span className="price-pill">Sample: $32,000</span>
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
          'Illustrative labor + management',
          'Sample material allowances',
          'No payments or financing'
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check size={18} className="text-[#B8FF3D]" />
            <span className="text-white/80 text-sm">{item}</span>
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/quote" className="btn-primary text-sm">
          Preview sample pricing
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

    return withEditorialMotion(section, () => {
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

    });
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
          'Explore fictional add-on modules',
          'Illustrative module pricing',
          'No delivery commitment'
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

    return withEditorialMotion(section, () => {
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

    });
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
        Explore Sample<br />Homes.
      </h2>

      <div
        ref={thumbsRef}
        className="absolute left-[58vw] top-[50vh] w-[36vw] flex gap-[2%]"
      >
        {galleryProjects.slice(1, 3).map((thumb, i) => (
          <Link key={i} to="/gallery" aria-label={`Explore sample project ${thumb.title}`} className="w-[48%] h-[22vh] card-editorial-sm relative group overflow-hidden">
            <img
              src={thumb.image}
              alt={thumb.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-2 left-3 bg-black/60 px-2 py-1 rounded">
              <span className="text-white text-xs">{thumb.category}</span>
            </div>
          </Link>
        ))}
      </div>

      <div ref={ctaRef} className="absolute left-[58vw] top-[78vh]">
        <Link to="/gallery" className="link-underline text-white flex items-center gap-2">
          View the illustrative gallery
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

    return withEditorialMotion(section, () => {
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

    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[70]">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[70vw] headline-section text-white z-10"
      >
        Sample Review<br />Layout.
      </h2>

      <div ref={badgeRef} className="absolute left-[78vw] top-[22vh] z-10">
        <span className="badge-pill flex items-center gap-1">
          <Star size={14} fill="currentColor" /> Demo
        </span>
      </div>

      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[36vh] w-[44vw] h-[42vh] card-editorial z-0"
      >
        <img
          src="/plan_interior.jpg"
          alt="Illustrative interior, not a customer's home"
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
        <p className="text-white/50 text-sm mt-2">— Fictional sample homeowner, not an endorsement</p>
      </div>

      <div ref={ctaRef} className="absolute left-[54vw] top-[80vh]">
        <Link to="/reviews" className="link-underline text-white flex items-center gap-2">
          Explore sample review cards
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

    return withEditorialMotion(section, () => {
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

    });
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[100] bg-[#6B4C4C]">
      <h2
        ref={headlineRef}
        className="absolute left-[6vw] top-[12vh] w-[88vw] headline-section text-white text-center z-10"
      >
        Explore<br />The Study.
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
          Preview a call
          <ArrowRight size={20} className="ml-2" />
        </Link>
        <p className="text-white/60 text-sm text-center">
          Interface preview only. No call, appointment, or quote is created.
        </p>
      </div>

      <div className="absolute left-1/2 bottom-[3vh] -translate-x-1/2 flex items-center gap-2">
        <span className="text-white/40 text-xs">Built by</span>
        <a
          href="https://x.com/asynchronope"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 text-xs font-medium hover:text-white transition-colors"
        >
          Adam ↗
        </a>
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
