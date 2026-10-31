import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { trapDialogFocus } from '../lib/dialog-focus';

function NavigationContent() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  useEffect(() => {
    const dialog = menuRef.current;
    if (!mobileOpen || !dialog) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Packages', href: '/packages' },
    { label: 'Add-ons', href: '/add-ons' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''}`}>
        <Link
          to="/"
          className="font-display font-bold text-white text-lg tracking-tight hover:text-[#B8FF3D] transition-colors"
        >
          HomeConstruction.site
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm transition-colors relative ${isActive(link.href)
                  ? 'text-[#B8FF3D]'
                  : 'text-white/80 hover:text-white'
                }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#B8FF3D]" />
              )}
            </Link>
          ))}
          <Link
            to="/book-call"
            className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2"
          >
            <Phone size={14} />
            Preview a call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <dialog
          ref={menuRef}
          aria-label="Site navigation"
          onCancel={() => setMobileOpen(false)}
          onKeyDown={trapDialogFocus}
          className="fixed inset-0 z-50 m-0 h-full w-full max-h-none max-w-none border-0 bg-[#0B0B0D]/98 backdrop-blur-lg lg:hidden overscroll-contain overflow-y-auto"
        >
          <div className="flex flex-col items-center justify-center min-h-full gap-6 py-20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-2xl font-display font-semibold transition-colors ${isActive(link.href)
                    ? 'text-[#B8FF3D]'
                    : 'text-white hover:text-[#B8FF3D]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/book-call"
              className="btn-primary mt-4 flex items-center gap-2"
            >
              <Phone size={18} />
              Preview a call
            </Link>
          </div>
          <button
            className="absolute top-6 right-6 text-white p-2"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </dialog>
      )}
    </>
  );
}

export default function Navigation() {
  const location = useLocation();
  return <NavigationContent key={location.pathname} />;
}
