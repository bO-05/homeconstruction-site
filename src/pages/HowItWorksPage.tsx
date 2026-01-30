import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, ClipboardList, FileText, Palette, HardHat, Key } from 'lucide-react';
import { howItWorksSteps, timelineWeeks } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [Phone, ClipboardList, FileText, Palette, HardHat, Key];

export default function HowItWorksPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
        stepsRef.current?.children || [],
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );

      gsap.fromTo(
        timelineRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="headline-section text-white mb-6">
            How It Works
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our proven 6-step process takes you from initial consultation 
            to move-in day with complete transparency at every stage.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {howItWorksSteps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div 
                key={i}
                className="relative rounded-[22px] border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all group"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#B8FF3D] rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-[#0B0B0D] text-sm">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#B8FF3D]/10 transition-colors">
                  <Icon size={24} className="text-[#B8FF3D]" />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <span className="px-2 py-1 bg-white/5 rounded">
                    {step.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-white text-2xl mb-8 text-center">
            Your 12-Week Build Timeline
          </h2>

          <div ref={timelineRef} className="space-y-4">
            {timelineWeeks.map((week, i) => (
              <div 
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-[18px] border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
              >
                {/* Week */}
                <div className="flex-shrink-0 w-24">
                  <span className="text-[#B8FF3D] font-display font-bold">
                    {week.week}
                  </span>
                </div>

                {/* Phase */}
                <div className="flex-shrink-0 w-40">
                  <span className="text-white font-medium">
                    {week.phase}
                  </span>
                </div>

                {/* Tasks */}
                <div className="flex-1">
                  <ul className="flex flex-wrap gap-2">
                    {week.tasks.map((task, j) => (
                      <li 
                        key={j}
                        className="text-white/60 text-sm px-3 py-1 bg-white/5 rounded-full"
                      >
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Milestone */}
                <div className="flex-shrink-0">
                  <span className="px-3 py-1 bg-[#B8FF3D]/10 text-[#B8FF3D] text-xs font-medium rounded-full">
                    {week.milestone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-10 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          <h3 className="font-display font-bold text-white text-2xl mb-4">
            Ready to Start Your Build?
          </h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Schedule a free 30-minute discovery call. We'll discuss your vision, 
            answer your questions, and provide a preliminary estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-call" className="btn-primary">
              Book a free call
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/quote" className="btn-secondary">
              Get a quick quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
