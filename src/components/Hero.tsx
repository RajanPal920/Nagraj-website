import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-green-dark"
      aria-label="Bhumi Steel Hero"
    >
      {/* Full Bleed Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
        style={{ backgroundImage: 'url("/images/hero-banner.jpg")' }}
      />

      {/* Dark Green Gradient Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-green-dark/40 via-brand-green-dark/58 to-brand-green-dark/40" />
      <div className="absolute inset-0 z-0 bg-brand-green-dark/30 mix-blend-multiply" />

      {/* Steel texture overlay */}
      <div className="absolute inset-0 z-0 steel-texture opacity-40 mix-blend-overlay" />

      {/* Gold bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient z-20" />

      {/* Content Container */}
      <div className="relative z-10 container-xl px-4 sm:px-8 lg:px-16 xl:px-24 pt-24 pb-10 w-full">
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up stagger-1">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold font-display font-bold text-xs uppercase tracking-[0.3em] drop-shadow-md">
              Mumbai · Pune · Pan-India
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-6 animate-fade-in-up stagger-2 drop-shadow-lg">
            Precision Steel.
            <br />
            <span className="text-brand-gold">Proven Trust.</span>
          </h1>

          {/* Sub-headline */}
          <p className="font-body text-white/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl animate-fade-in-up stagger-3 drop-shadow-md">
            Bhumi Steel supplies quality pipes, tubes, flanges, fittings, and structural steel
            products to industrial clients across India — backed by registered offices in{' '}
            <span className="text-white font-semibold">Mumbai</span> and a branch in{' '}
            <span className="text-white font-semibold">Pune</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
            <Link
              to="/contact"
              id="hero-get-quote-cta"
              className="btn-primary text-base"
            >
              Get a Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              id="hero-view-products-cta"
              className="btn-outline text-base bg-black/20 backdrop-blur-sm border-white/50 hover:border-white hover:bg-white"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-brand-gold transition-colors duration-200 animate-chevron z-20"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </a>
    </section>
  );
}
