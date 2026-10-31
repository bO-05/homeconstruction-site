import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { galleryProjects } from '../data/content';
import { trapDialogFocus } from '../lib/dialog-focus';

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof galleryProjects[0] | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(galleryProjects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? galleryProjects 
    : galleryProjects.filter(p => p.category === filter);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedProject || !dialog) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [selectedProject]);

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
        gridRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="headline-section text-white mb-4">
            Project Gallery
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Illustrative images and fictional project cards demonstrate the gallery.
            They are not evidence of homes built, clients, or completed work.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-[#B8FF3D] text-[#0B0B0D]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <button
              type="button"
              key={project.id}
              onClick={() => setSelectedProject(project)}
              aria-label={`View sample project ${project.title}`}
              className="group cursor-pointer text-left rounded-[22px] overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#B8FF3D] text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50 text-xs">{project.year}</span>
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-[#B8FF3D] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-white/50 text-sm">
                  <MapPin size={14} />
                  {project.location}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <dialog
          ref={dialogRef}
          aria-labelledby="sample-project-title"
          onCancel={() => setSelectedProject(null)}
          onKeyDown={trapDialogFocus}
          className="fixed inset-0 z-50 m-0 h-full w-full max-h-none max-w-none border-0 bg-black/90 backdrop-blur-sm hidden open:flex items-center justify-center p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#1a1a1a] rounded-[28px] overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full aspect-video object-cover"
              />
              <button
                type="button"
                aria-label="Close sample project"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#B8FF3D]/10 text-[#B8FF3D] rounded-full text-xs font-medium uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <MapPin size={14} />
                  {selectedProject.location}
                </span>
                <span className="flex items-center gap-1 text-white/50 text-sm">
                  <Calendar size={14} />
                  {selectedProject.year}
                </span>
              </div>
              <h2 id="sample-project-title" className="font-display font-bold text-white text-3xl mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-white/60 text-sm"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
