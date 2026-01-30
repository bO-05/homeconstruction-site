import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/content';

export default function Footer() {
  const navLinks = [
    { label: 'Packages', href: '/packages' },
    { label: 'Add-ons', href: '/add-ons' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '#' },
  ];

  return (
    <footer className="relative z-[110] bg-[#0B0B0D] py-16 lg:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="font-display font-bold text-white text-xl mb-4 block hover:text-[#B8FF3D] transition-colors"
            >
              HomeConstruction.site
            </Link>
            <p className="text-white/50 text-sm mb-6">
              Build your home in public. Fixed timeline, transparent pricing, exceptional quality.
            </p>
            <div className="flex gap-3">
              <a 
                href={`https://instagram.com/${contactInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={`https://facebook.com/${contactInfo.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={`https://linkedin.com/company/${contactInfo.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#B8FF3D] hover:text-[#0B0B0D] transition-all text-white/70"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                {contactInfo.email}
              </a>
              <a 
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors flex items-center gap-2"
              >
                <Phone size={14} />
                {contactInfo.phone}
              </a>
              <div className="text-white/50 text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                {contactInfo.address}
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 HomeConstruction.site. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Licensed, bonded, and insured. CSLB #1234567
          </p>
        </div>
      </div>
    </footer>
  );
}
