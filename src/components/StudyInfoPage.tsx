import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';

type Props = {
  title: string;
  intro: string;
  sections: { title: string; text: string }[];
};

export default function StudyInfoPage({ title, intro, sections }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8" ref={contentRef}>
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#B8FF3D] transition-colors mb-8">
          <ArrowLeft size={18} />Back to Home
        </Link>
        <h1 className="headline-section text-white mb-8">{title}</h1>
        <p className="text-white/60 text-lg mb-8">{intro}</p>
        {sections.map(section => (
          <section key={section.title} className="mb-10">
            <h2 className="font-display font-bold text-white text-xl mb-4">{section.title}</h2>
            <p className="text-white/70 leading-relaxed">{section.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
