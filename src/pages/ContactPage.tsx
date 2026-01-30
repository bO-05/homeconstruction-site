import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { contactInfo } from '../data/content';

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
        infoRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent!', {
      description: 'We\'ll get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="headline-section text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message 
            and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            {/* Quick Contact */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <h3 className="font-display font-bold text-white text-lg mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-5">
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#B8FF3D]/10 transition-colors">
                    <Mail size={20} className="text-[#B8FF3D]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white group-hover:text-[#B8FF3D] transition-colors">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                <a 
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#B8FF3D]/10 transition-colors">
                    <Phone size={20} className="text-[#B8FF3D]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone</p>
                    <p className="text-white group-hover:text-[#B8FF3D] transition-colors">
                      {contactInfo.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Clock size={20} className="text-[#B8FF3D]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Hours</p>
                    <p className="text-white">{contactInfo.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#B8FF3D]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Office</p>
                    <p className="text-white">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-white/[0.02]">
              <h3 className="font-display font-bold text-white text-lg mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a 
                  href={`https://instagram.com/${contactInfo.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href={`https://facebook.com/${contactInfo.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={`https://linkedin.com/company/${contactInfo.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-[22px] border border-white/10 bg-gradient-to-b from-[#B8FF3D]/5 to-transparent">
              <h3 className="font-display font-bold text-white text-lg mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link 
                  to="/book-call"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-white">Book a discovery call</span>
                  <ArrowRight size={18} className="text-[#B8FF3D]" />
                </Link>
                <Link 
                  to="/quote"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-white">Get a quick quote</span>
                  <ArrowRight size={18} className="text-[#B8FF3D]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-8 rounded-[28px] border border-white/10 bg-white/[0.02]"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">
              Send us a Message
            </h3>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Your Name *</label>
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
                <label className="text-white/60 text-sm mb-2 block">Your Email *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="text-white/60 text-sm mb-2 block">Subject</label>
              <select
                className="form-input"
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="quote">Quote Request</option>
                <option value="support">Customer Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="text-white/60 text-sm mb-2 block">Message *</label>
              <textarea
                required
                className="form-input min-h-[180px]"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              <Send size={18} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
