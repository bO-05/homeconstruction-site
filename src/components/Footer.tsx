import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/content';

export default function Footer() {
  const navLinks = [
    { label: 'Packages', href: '/packages' },
    { label: 'Add-ons', href: '/add-ons' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact Preview', href: '/contact' },
  ];
  const legalLinks = [
    { label: 'Prototype Privacy Notes', href: '/privacy' },
    { label: 'Prototype Usage Notice', href: '/terms' },
  ];

  return (
    <footer className="relative z-[110] bg-[#0B0B0D] py-16 lg:py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="font-display font-bold text-white text-xl mb-4 block hover:text-[#B8FF3D] transition-colors">
              HomeConstruction
            </Link>
            <p className="text-white/50 text-sm mb-6">
              A fictional interface study. Not an operating construction service.
            </p>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">Demo placeholders</h4>
            <div className="flex flex-col gap-3 text-white/50 text-sm">
              <p className="flex items-center gap-2"><Mail size={14} />{contactInfo.email}</p>
              <p className="flex items-center gap-2"><Phone size={14} />{contactInfo.phone}</p>
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" />{contactInfo.address}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-wider mb-4">Prototype notes</h4>
            <div className="flex flex-col gap-2">
              {legalLinks.map(link => (
                <Link key={link.href} to={link.href} className="text-white/70 text-sm hover:text-[#B8FF3D] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">HomeConstruction interface study</p>
          <p className="text-white/30 text-xs">No licensing, bonding, insurance, or asset-rights verification claimed.</p>
        </div>
      </div>
    </footer>
  );
}
