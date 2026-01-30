import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Plus, Filter } from 'lucide-react';
import { addOns } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function AddOnsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<string[]>([]);

  const categories = ['All', ...Array.from(new Set(addOns.map(a => a.category)))];

  const filteredAddons = selectedCategory === 'All' 
    ? addOns 
    : addOns.filter(a => a.category === selectedCategory);

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
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, [filteredAddons]);

  const toggleCart = (id: string) => {
    setCart(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const cartTotal = cart.reduce((total, id) => {
    const addon = addOns.find(a => a.id === id);
    return total + (addon?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="headline-section text-white mb-4">
            Customize Your Build
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Add modules anytime before Week 6. Each add-on has fixed pricing 
            and won't change your timeline.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Filter size={18} className="text-white/40" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#B8FF3D] text-[#0B0B0D]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add-ons Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddons.map((addon) => (
            <div 
              key={addon.id}
              className="rounded-[22px] overflow-hidden border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={addon.image} 
                  alt={addon.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white/80">
                    {addon.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-white text-lg">
                    {addon.name}
                  </h3>
                  <span className="text-[#B8FF3D] font-display font-bold">
                    {formatPrice(addon.price)}
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  {addon.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {addon.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={14} className="text-[#B8FF3D] mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Add Button */}
                <button
                  onClick={() => toggleCart(addon.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-medium transition-all ${
                    cart.includes(addon.id)
                      ? 'bg-[#B8FF3D] text-[#0B0B0D]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cart.includes(addon.id) ? (
                    <>
                      <Check size={16} />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add to Build
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
              <div>
                <span className="text-white/60 text-xs">{cart.length} add-ons</span>
                <p className="text-[#B8FF3D] font-display font-bold">
                  +{formatPrice(cartTotal)}
                </p>
              </div>
              <Link 
                to={`/quote?addons=${cart.join(',')}`}
                className="btn-primary text-sm py-2 px-4"
              >
                Continue
                <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
