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
      className="relative min-h-screen sm:min-h-screen sm:h-screen flex flex-col items-center justify-start sm:justify-end overflow-hidden bg-white sm:bg-[#102F3D] md:!bg-transparent"
      aria-label="Nagraj Metal Industries Hero"
    >
      {/* ================= DESKTOP BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <img
          src="/images/hero-banner.jpg"
          alt="Hero Banner"
          className="w-full h-full object-cover object-center select-none"
          loading="eager"
        />
      </div>

      {/* Overlay - Light Red on Desktop */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-red/40 via-brand-red/20 to-transparent z-5 hidden sm:block"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/30 via-transparent to-transparent z-5 hidden sm:block"></div>

      {/* Bottom gradient shadow - Light Red on Desktop */}
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-brand-red/20 via-brand-red/10 to-transparent z-5 hidden sm:block"></div>

      {/* Steel texture overlay */}
      <div className="absolute inset-0 z-0 steel-texture opacity-0 sm:opacity-40 mix-blend-overlay" />

      {/* Red bottom border line - Desktop only */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-1 bg-brand-red z-20" />

      {/* ================= MOBILE CONTENT ================= */}
      <div className="block sm:hidden w-full min-h-screen flex flex-col bg-white">
        {/* Fixed Navbar ke liye top spacing */}
        <div className="pt-20" />

        {/* Hero Image */}
        <div className="w-full flex justify-center items-center px-4 mt-5">
          <img
            src="/images/hero-banner.jpg"
            alt="Hero Banner"
            className="w-full max-h-[42vh] object-contain rounded-lg"
          />
        </div>

        {/* Mobile Content - Smaller Text */}
        <div className="flex-1 px-5 pt-4 pb-6">
          {/* ISO Certification Badge - Smaller */}
          <div className="inline-flex items-center gap-1.5 mb-3 bg-brand-red/10 border border-brand-red/30 px-3 py-1.5 rounded-full">
            <Award size={10} className="text-brand-red" />
            <span className="text-brand-charcoal font-display font-bold text-[8px] uppercase tracking-wider">
              ISO Certified Company
            </span>
          </div>

          {/* Tagline - Smaller */}
          <p className="text-brand-red font-display font-semibold text-[8px] uppercase tracking-[0.1em] mb-1">
            Dynamic Group · Young Visionaries · Excellence Driven
          </p>

          {/* Heading - Smaller */}
        <h1 className="text-3xl font-bold text-brand-red uppercase">
            NAGRAJ
          </h1>
          <h2 className="text-base font-semibold text-brand-charcoal mb-2 ml-1 text-lg">
            Metal <span className="text-brand-red">Industries</span>
          </h2>

          {/* Sub-headline - Smaller */}
          <p className="text-[11px] leading-6 text-brand-charcoal mb-2">
            Established over a decade ago to cater to growing demands of
            industrial raw materials. As{" "}
            <span className="font-bold text-brand-red">
              Manufacturers, Suppliers & Exporters
            </span>{" "}
            with huge stocks, we have become one of the most reliable sources
            for quality within a short span.
          </p>

          {/* Key Features - Smaller */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <div className="flex items-center gap-1 text-brand-charcoal text-[10px] font-medium">
              <CheckCircle size={10} className="text-brand-red flex-shrink-0" />
              <span>ISO Certified Quality</span>
            </div>
            <div className="flex items-center gap-1 text-brand-charcoal text-[10px] font-medium">
              <CheckCircle size={10} className="text-brand-red flex-shrink-0" />
              <span>Govt. & Multinational Registered</span>
            </div>
            <div className="flex items-center gap-1 text-brand-charcoal text-[10px] font-medium">
              <CheckCircle size={10} className="text-brand-red flex-shrink-0" />
              <span>Pan-India Supply Network</span>
            </div>
            <div className="flex items-center gap-1 text-brand-charcoal text-[10px] font-medium">
              <CheckCircle size={10} className="text-brand-red flex-shrink-0" />
              <span>Mumbai Operations</span>
            </div>
          </div>

          {/* Trust Indicators - Smaller */}
          <div className="flex items-center justify-start gap-4 mb-5 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-brand-red" />
              <span className="text-brand-charcoal text-[10px] font-medium">
                10+ Years Excellence
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Truck size={12} className="text-brand-red" />
              <span className="text-brand-charcoal text-[10px] font-medium">
                Pan-India Supply
              </span>
            </div>
          </div>

          {/* Mobile CTAs - Smaller */}
          <div className="flex flex-col gap-2 relative z-20">
            <Link
              to="/contact"
              id="hero-get-quote-cta-mobile"
              className="w-full bg-brand-red hover:bg-brand-red-dark text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm"
            >
              Get a Quote
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/products"
              id="hero-view-products-cta-mobile"
              className="w-full border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all duration-200 bg-white active:scale-95 text-sm"
            >
              View Products
            </Link>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP CONTENT ================= */}
      <div className="relative z-10 container-xl w-full px-5 sm:px-8 lg:px-16 xl:px-24 pb-10 sm:pb-8 hidden sm:block">
        <div className="w-full max-w-md sm:max-w-3xl mx-auto sm:mx-0 text-center sm:text-left">
          {/* ISO Certification Badge */}
          <div className="inline-flex items-center gap-2 mb-4 bg-brand-red/25 backdrop-blur-md border border-brand-red/40 px-4 py-2 rounded-full">
            <Award size={10} className="text-brand-red" />
            <span className="text-white font-display font-bold text-[8px] sm:text-xs uppercase tracking-wider">
              ISO Certified Company
            </span>
          </div>

          {/* Tagline */}
          <p className="text-brand-red font-display font-semibold text-[10px] sm:text-sm md:text-base uppercase tracking-[0.15em] mb-1 sm:mb-3 animate-fade-in-up stagger-2">
            Dynamic Group · Young Visionaries · Excellence Driven
          </p>

          {/* Sub-headline */}
          <p className="font-body text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed mb-3 sm:mb-5 animate-fade-in-up stagger-3 drop-shadow-md max-w-full sm:max-w-xl mx-auto sm:mx-0">
            Established over a decade ago to cater to growing demands of
            industrial raw materials. As{" "}
            <span className="text-red-600 font-bold">
              Manufacturers, Suppliers & Exporters
            </span>{" "}
            with huge stocks, we have become one of the most reliable sources
            for quality within a short span.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2.5 mb-3 sm:mb-5 animate-fade-in-up stagger-3 font-bold">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-white text-[10px] sm:text-sm">
              <CheckCircle
                size={12}
                className="sm:w-[14px] sm:h-[14px] text-brand-red flex-shrink-0"
              />
              <span>ISO Certified Quality</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-white text-[10px] sm:text-sm">
              <CheckCircle
                size={12}
                className="sm:w-[14px] sm:h-[14px] text-brand-red flex-shrink-0"
              />
              <span>Govt. & Multinational Registered</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-white text-[10px] sm:text-sm">
              <CheckCircle
                size={12}
                className="sm:w-[14px] sm:h-[14px] text-brand-red flex-shrink-0"
              />
              <span>Pan-India Supply Network</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-white text-[10px] sm:text-sm">
              <CheckCircle
                size={12}
                className="sm:w-[14px] sm:h-[14px] text-brand-red flex-shrink-0"
              />
              <span>Mumbai Operations</span>
            </div>
          </div>

          {/* Desktop CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 animate-fade-in-up stagger-4">
            <Link
              to="/contact"
              id="hero-get-quote-cta"
              className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-xs sm:text-sm md:text-base"
            >
              Get a Quote
              <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <Link
              to="/products"
              id="hero-view-products-cta"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:border-white hover:bg-white/50 text-white font-display font-bold px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-xs sm:text-sm md:text-base"
            >
              View Products
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-6 mt-3 sm:mt-5 pt-3 sm:pt-5 border-t border-white/10 animate-fade-in-up stagger-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Shield
                size={12}
                className="sm:w-[18px] sm:h-[18px] text-brand-red"
              />
              <span className="text-white text-[9px] sm:text-xs font-body">
                10+ Years Excellence
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Truck
                size={12}
                className="sm:w-[18px] sm:h-[18px] text-brand-red"
              />
              <span className="text-white text-[9px] sm:text-xs font-body">
                Pan-India Supply
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Desktop only */}
      <a
        href="#about"
        className="hidden sm:block absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 text-white/70 hover:text-brand-red transition-colors duration-200 animate-chevron z-20"
        aria-label="Scroll to About section"
      >
        <ChevronDown
          size={20}
          className="sm:w-[28px] sm:h-[28px]"
          strokeWidth={1.5}
        />
      </a>
    </section>
  );
}
