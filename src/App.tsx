import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import AddOnsPage from './pages/AddOnsPage';
import GalleryPage from './pages/GalleryPage';
import ReviewsPage from './pages/ReviewsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import QuotePage from './pages/QuotePage';
import BookCallPage from './pages/BookCallPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ScrollToTop from './components/ScrollToTop';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Configure GSAP to respect reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(1000); // Effectively instant
  gsap.config({ nullTargetWarn: false });
}

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on route change
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B0D]">
      {/* Skip Link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#B8FF3D] focus:text-black focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      <ScrollToTop />
      <Navigation />

      <main id="main-content" className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/add-ons" element={<AddOnsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/book-call" element={<BookCallPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
