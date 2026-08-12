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
      className="relative min-h-[100svh] h-[100svh] sm:min-h-screen sm:h-screen flex items-end justify-center overflow-hidden bg-brand-red-dark"
      aria-label="Nagraj Metal Industries Hero"
    >
      {/* Full Bleed Background Image - Full width on all devices */}
      <div
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat animate-bg-pan"
        style={{ backgroundImage: 'url("/images/hero-banner.jpg")' }}
      />

      {/* Diagonal Half Overlay - No Border */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-brand-red/40 via-brand-red/20 to-transparent z-5"></div>

      {/* Steel texture overlay */}
      <div className="absolute inset-0 z-0 steel-texture opacity-40 mix-blend-overlay" />

      {/* Red bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red z-20" />

      {/* Content Container - Positioned at bottom */}
      <div className="relative z-10 container-xl px-4 sm:px-8 lg:px-16 xl:px-24 pb-4 sm:pb-6 w-full">
        <div className="max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
          {/* ISO Certification Badge */}
          <div className="inline-flex mb-3 items-center gap-2 bg-brand-red/20 backdrop-blur-sm border border-brand-red/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full animate-fade-in-up stagger-1">
            <Award size={10} className="text-brand-red" />
            <span className="text-white font-display font-bold text-[8px] sm:text-xs uppercase tracking-wider">
              ISO Certified Company
            </span>
          </div>

          {/* Tagline */}
          <p className="text-brand-red font-display font-semibold text-[10px] sm:text-sm md:text-base uppercase tracking-[0.15em] mb-2 sm:mb-3 animate-fade-in-up stagger-2">
            Dynamic Group · Young Visionaries · Excellence Driven
          </p>

          {/* Sub-headline */}
          <p className="font-body text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-5 animate-fade-in-up stagger-3 drop-shadow-md max-w-full sm:max-w-xl mx-auto sm:mx-0">
            Established over a decade ago to cater to growing demands of
            industrial raw materials. As{" "}
            <span className="text-red-600 font-bold">
              Manufacturers, Suppliers & Exporters
            </span>{" "}
            with huge stocks, we have become one of the most reliable sources
            for quality within a short span.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:mb-5 animate-fade-in-up stagger-3 font-bold">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-[11px] sm:text-sm">
              <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
              <span>ISO Certified Quality</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-[11px] sm:text-sm">
              <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
              <span>Govt. & Multinational Registered</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-[11px] sm:text-sm">
              <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
              <span>Pan-India Supply Network</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-[11px] sm:text-sm">
              <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
              <span>Mumbai Operations</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up stagger-4 ">
            <Link
              to="/contact"
              id="hero-get-quote-cta"
              className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Get a Quote
              <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <Link
              to="/products"
              id="hero-view-products-cta"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:border-white hover:bg-white/50 text-white font-display font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              View Products
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-white/10 animate-fade-in-up stagger-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield
                size={14}
                className="sm:w-[18px] sm:h-[18px] text-brand-red"
              />
              <span className="text-white text-[10px] sm:text-xs font-body">
                10+ Years Excellence
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Truck
                size={14}
                className="sm:w-[18px] sm:h-[18px] text-brand-red"
              />
              <span className="text-white text-[10px] sm:text-xs font-body">
                Pan-India Supply
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 text-white/70 hover:text-brand-red transition-colors duration-200 animate-chevron z-20"
        aria-label="Scroll to About section"
      >
        <ChevronDown
          size={24}
          className="sm:w-[28px] sm:h-[28px]"
          strokeWidth={1.5}
        />
      </a>
    </section>
  );
}
