import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Check, Calculator, Home, Puzzle } from 'lucide-react';
import { toast } from 'sonner';
import { basePackages, addOns } from '../data/content';

export default function QuotePage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchParams] = useSearchParams();
  
  const preselectedPackage = searchParams.get('package');
  const preselectedAddons = searchParams.get('addons')?.split(',').filter(Boolean) || [];

  const [selectedPackage, setSelectedPackage] = useState<string>(preselectedPackage || '');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(preselectedAddons);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    squareFootage: '',
    message: ''
  });

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
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    const pkg = basePackages.find(p => p.id === selectedPackage);
    if (pkg) total += pkg.price;
    
    selectedAddons.forEach(id => {
      const addon = addOns.find(a => a.id === id);
      if (addon) total += addon.price;
    });
    
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      toast.error('Please select a base package');
      return;
    }

    // Simulate form submission
    toast.success('Quote request submitted!', {
      description: 'We\'ll send your detailed quote within 48 hours.',
    });
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="headline-section text-white mb-4">
            Get Your Quote
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Select your base package and add-ons, then tell us about your project. 
            We'll send a detailed quote within 48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-8"
          >
            {/* Package Selection */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <Home size={20} className="text-[#B8FF3D]" />
                <h3 className="font-display font-bold text-white text-lg">
                  1. Choose Your Base Package
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {basePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`cursor-pointer p-4 rounded-[18px] border transition-all ${
                      selectedPackage === pkg.id
                        ? 'border-[#B8FF3D] bg-[#B8FF3D]/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPackage === pkg.id ? 'border-[#B8FF3D]' : 'border-white/30'
                      }`}>
                        {selectedPackage === pkg.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#B8FF3D]" />
                        )}
                      </div>
                      <span className="text-white font-medium text-sm">{pkg.name}</span>
                    </div>
                    <p className="text-[#B8FF3D] font-display font-bold">
                      {formatPrice(pkg.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons Selection */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <Puzzle size={20} className="text-[#B8FF3D]" />
                <h3 className="font-display font-bold text-white text-lg">
                  2. Add Modules (Optional)
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`cursor-pointer p-4 rounded-[14px] border transition-all ${
                      selectedAddons.includes(addon.id)
                        ? 'border-[#B8FF3D] bg-[#B8FF3D]/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-white font-medium text-sm">{addon.name}</span>
                        <p className="text-[#B8FF3D] font-display font-bold text-sm mt-1">
                          +{formatPrice(addon.price)}
                        </p>
                      </div>
                      {selectedAddons.includes(addon.id) && (
                        <Check size={18} className="text-[#B8FF3D]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <h3 className="font-display font-bold text-white text-lg mb-6">
                3. Tell Us About Your Project
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Email *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Project Type</label>
                  <select
                    className="form-input"
                    value={formData.projectType}
                    onChange={e => setFormData({...formData, projectType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="new-build">New Build</option>
                    <option value="renovation">Renovation</option>
                    <option value="addition">Addition</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-white/60 text-sm mb-2 block">Project Details</label>
                  <textarea
                    className="form-input min-h-[100px]"
                    placeholder="Tell us about your project, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Request Detailed Quote
              <ArrowRight size={18} className="ml-2" />
            </button>
          </form>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-6">
                <Calculator size={20} className="text-[#B8FF3D]" />
                <h3 className="font-display font-bold text-white text-lg">
                  Quote Summary
                </h3>
              </div>

              {selectedPackage ? (
                <>
                  {/* Base Package */}
                  <div className="mb-4 pb-4 border-b border-white/10">
                    <p className="text-white/60 text-sm mb-1">Base Package</p>
                    {basePackages.filter(p => p.id === selectedPackage).map(pkg => (
                      <div key={pkg.id} className="flex justify-between">
                        <span className="text-white">{pkg.name}</span>
                        <span className="text-[#B8FF3D] font-medium">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Add-ons */}
                  {selectedAddons.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-white/10">
                      <p className="text-white/60 text-sm mb-2">Add-ons</p>
                      {selectedAddons.map(id => {
                        const addon = addOns.find(a => a.id === id);
                        return addon ? (
                          <div key={id} className="flex justify-between text-sm mb-1">
                            <span className="text-white/80">{addon.name}</span>
                            <span className="text-[#B8FF3D]">
                              +{formatPrice(addon.price)}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-medium">Estimated Total</span>
                    <span className="text-[#B8FF3D] font-display font-bold text-2xl">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <p className="text-white/40 text-xs mt-4">
                    * This is an estimate. Final quote may vary based on site conditions 
                    and specific requirements.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/40 text-sm">
                    Select a base package to see your estimate
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm mb-3">
                  Questions about pricing?
                </p>
                <Link 
                  to="/book-call" 
                  className="text-[#B8FF3D] text-sm hover:underline flex items-center gap-1"
                >
                  Schedule a call
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
