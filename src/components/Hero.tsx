import {
  ArrowRight,
  ChevronDown,
  Award,
  Shield,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] h-[100svh] sm:min-h-screen sm:h-screen flex items-center justify-center overflow-hidden bg-brand-red-dark"
      aria-label="Nagraj Metal Industries Hero"
    >
      {/* Full Bleed Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-top sm:bg-center bg-no-repeat animate-bg-pan origin-top sm:origin-center"
        style={{ backgroundImage: 'url("/images/hero-banner.jpg")' }}
      />

    

      {/* Steel texture overlay */}
      <div className="absolute inset-0 z-0 steel-texture opacity-40 mix-blend-overlay" />

      {/* Red bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red z-20" />

      {/* Content Container */}
      <div className="relative z-10 container-xl px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-24 w-full">
        <div className="max-w-3xl text-left">
          {/* ISO Certification Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-red/20 backdrop-blur-sm border border-brand-red/30 px-4 py-2 rounded-full mb-6 animate-fade-in-up stagger-1">
            <Award size={18} className="text-brand-red" />
            <span className="text-white font-display font-bold text-xs uppercase tracking-wider">
              ISO Certified Company
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-4 animate-fade-in-up stagger-2 drop-shadow-lg">
            Nagraj Metal
            <br />
            <span className="text-brand-red">Industries</span>
          </h1>

          {/* Tagline */}
          <p className="text-brand-red font-display font-semibold text-sm sm:text-base uppercase tracking-[0.15em] mb-4 animate-fade-in-up stagger-2">
            Dynamic Group · Young Visionaries · Excellence Driven
          </p>

          {/* Sub-headline */}
          <p className="font-body text-white/90 text-lg sm:text-xl leading-relaxed mb-6 animate-fade-in-up stagger-3 drop-shadow-md">
            Established over a decade ago to cater to growing demands of
            industrial raw materials. As{" "}
            <span className="text-white font-semibold">
              Manufacturers, Suppliers & Exporters
            </span>{" "}
            with huge stocks, we have become one of the most reliable sources
            for quality within a short span.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
              <span>ISO Certified Quality</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
              <span>Govt. & Multinational Registered</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
              <span>Pan-India Supply Network</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <CheckCircle size={16} className="text-brand-red flex-shrink-0" />
              <span>Mumbai · Pune Operations</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
            <Link
              to="/contact"
              id="hero-get-quote-cta"
              className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Get a Quote
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              id="hero-view-products-cta"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:border-white hover:bg-white/20 text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-base"
            >
              View Products
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10 animate-fade-in-up stagger-4">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-brand-red" />
              <span className="text-white/70 text-xs font-body">
                10+ Years Excellence
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-brand-red" />
              <span className="text-white/70 text-xs font-body">
                Pan-India Supply
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 hover:text-brand-red transition-colors duration-200 animate-chevron z-20"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </a>
    </section>
  );
}
