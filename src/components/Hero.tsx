import { useState, useEffect } from "react";
import {
  ArrowRight,
  Award,
  Shield,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CatalogueModal } from "./CatalogueModal";

const SLIDES = [
  {
    image: "/images/desktop-hero.jpg",
    mobileImage: "/images/hero-banner.jpg",
    tag: "GOVT. RECOGNISED • UDYAM MSME CERTIFIED",
    title: "Engineered Industrial Metals",
    highlight: "Prime Certified Inventory.",
    description:
      "Premier manufacturers, stockists, and exporters of prime steel plates, structural alloys, and heavy metals engineered to exceed demanding industrial requirements with 100% test certificates.",
    badges: ["100% Traceability", "MTC Certified", "Immediate Dispatch"],
    mobileBadge: "GOVT. OF INDIA MSME ACCREDITED",
    mobileTracker: "DYNAMIC GROUP • YOUNG VISIONARIES • EXCELLENCE DRIVEN",
  },
  {
    image: "/images/pipe.jpg",
    mobileImage: "/images/pipe.jpg",
    tag: "SEAMLESS & WELDED PIPING • ALLOY SPECIALISTS",
    title: "Pipes, Tubes & Capillaries",
    highlight: "High Pressure & Corrosion Resistant.",
    description:
      "Extensive ready stock of heavy-wall seamless pipes, heat exchanger tubes, and ERW pipelines in Stainless Steel, Carbon Steel, Inconel, Monel, Hastelloy, and Duplex grades.",
    badges: ["Hydro-Tested", "ASTM / ASME Spec", "Direct Mill Supply"],
    mobileBadge: "CERTIFIED PIPING & TUBING",
    mobileTracker: "HEAVY WALL · SEAMLESS & ERW · ASTM/ASME COMPLIANT",
  },
  {
    image: "/images/sheet.jpg",
    mobileImage: "/images/sheet.jpg",
    tag: "HOT & COLD ROLLED • BOILER QUALITY",
    title: "Heavy Steel Plates & Coils",
    highlight: "Cut-To-Size Profiling Available.",
    description:
      "High-strength boiler quality plates, abrasion resistant sheets, and wear plates cut to custom lengths with full mechanical and chemical lab test reports.",
    badges: ["Cut-to-Size", "Ultrasonic Tested", "Fast Dispatch"],
    mobileBadge: "HIGH INTEGRITY STEEL PLATES",
    mobileTracker: "BOILER QUALITY · ABRASION RESISTANT · PAN-INDIA",
  },
  {
    image: "/images/bar.jpg",
    mobileImage: "/images/bar.jpg",
    tag: "BRIGHT BARS • FORGED & PEELED ROUNDS",
    title: "Precision Round Bars & Tool Steels",
    highlight: "High Wear Resistance & Precision.",
    description:
      "Comprehensive inventory of AISI O1, HCHCR-D2, Toolox 33/44, and EN Series round bars engineered for tooling, aerospace, and precision machining.",
    badges: ["Ultrasonic Tested", "Chemical Traceability", "Tight Tolerances"],
    mobileBadge: "PRECISION TOOL STEELS & BARS",
    mobileTracker: "TOOLOX 33/44 · HCHCR-D2 · COLD WORK STEELS",
  },
  {
    image: "/images/flange.jpg",
    mobileImage: "/images/flange.jpg",
    tag: "FORGED FLANGES • ASME / DIN / BS STANDARDS",
    title: "Industrial Flanges & Forgings",
    highlight: "Class 150# to 2500# Rating.",
    description:
      "Weld neck, slip-on, blind, socket weld flanges and custom forged fittings engineered for petrochemical, refinery, power, and marine installations.",
    badges: ["Class 150-2500#", "Govt Lab Tested", "Pan-India Logistics"],
    mobileBadge: "HIGH PRESSURE FORGED FLANGES",
    mobileTracker: "WELD NECK · BLIND · SLIP-ON · ASME B16.5",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Continuous auto-sliding effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = SLIDES[activeSlide];

  return (
    <section
      id="home"
      className="relative pt-24 overflow-hidden"
      aria-label="Nagraj Metal Industries Hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP HERO (Full Width Clear Image + Floating Navy Glass Card)
          Hidden on mobile, block on lg+
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block relative w-full h-[620px] xl:h-[660px] 2xl:h-[700px] overflow-hidden select-none">
        {/* Dynamic Industrial Background Image according to active slide */}
        {SLIDES.map((slide, idx) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover object-center select-none transition-opacity duration-1000 ease-in-out ${activeSlide === idx ? "opacity-100 z-0 scale-100" : "opacity-0 -z-10 scale-105"
              }`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Floating Navy/Slate Glassmorphism Card on the Left */}
        <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
          <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/20 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
            {/* Top Tag - BOLD */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-[3px] bg-[#E63946]" />
              <span className="text-xs font-mono font-black tracking-[0.25em] text-[#FF4D5E] uppercase drop-shadow-xs">
                {currentSlide.tag}
              </span>
            </div>

            {/* Headline - BOLD & CRISP */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-display font-black text-white tracking-tight leading-[1.12] mb-4 drop-shadow-sm">
              {currentSlide.title}
              <span className="block text-[#FF4D5E] font-black mt-1">
                {currentSlide.highlight}
              </span>
            </h1>

            {/* Description - BOLD & READABLE */}
            <p className="text-white font-bold text-sm sm:text-base leading-relaxed mb-7 font-body drop-shadow-xs max-w-lg">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3.5 mb-7">
              <Link
                to="/products"
                id="hero-explore-products-desktop"
                className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-extrabold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
              >
                <span>Explore Products</span>
                <span>→</span>
              </Link>
              <Link
                to="/contact"
                id="hero-request-quote-desktop"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-display font-extrabold text-xs sm:text-sm px-6 sm:px-7 py-3.5 rounded-xl border border-white/40 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
              >
                <span>Request a Quote</span>
              </Link>
            </div>

            {/* Feature Badges Row - BOLD */}
            <div className="flex items-center gap-4 sm:gap-6 pt-5 border-t border-white/20 text-xs sm:text-sm text-white font-bold flex-wrap">
              {currentSlide.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    ✓
                  </span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/45 hover:bg-[#B22222] text-white flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl transition-all duration-200 z-20 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/45 hover:bg-[#B22222] text-white flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl transition-all duration-200 z-20 cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>

        {/* Bottom Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx
                ? "w-8 bg-[#E63946]"
                : "w-3 bg-white/50 hover:bg-white/90"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE HERO (Clean Top Image + Bold High-Contrast Card Below)
          Block on mobile, hidden on lg+
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="block lg:hidden w-full bg-white pb-6">
        {/* Dynamic Image at Top according to active slide */}
        <div className="px-4 pt-3 pb-3 relative">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white relative">
            <img
              src={currentSlide.mobileImage}
              alt={currentSlide.title}
              className="w-full h-56 sm:h-64 object-cover select-none transition-all duration-500"
              loading="eager"
            />
            {/* Slide Counter Badge on Image */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
              {activeSlide + 1} / {SLIDES.length}
            </div>
          </div>

          {/* Mobile Arrows */}
          <div className="flex items-center justify-between mt-2 px-1">
            <button
              onClick={prevSlide}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-[#B22222] p-1.5"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${activeSlide === idx ? "w-5 bg-[#B22222]" : "w-2 bg-gray-300"
                    }`}
                  aria-label={`Mobile slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-[#B22222] p-1.5"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content Below Photo - BOLD & CRISP */}
        <div className="px-5 pt-1">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1.5 rounded-full mb-3 text-gray-900">
            <Award size={13} className="text-[#B22222] shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider font-display text-[#B22222]">
              {currentSlide.mobileBadge}
            </span>
          </div>

          {/* Subtitle Uppercase Tracker */}
          <p className="text-[#B22222] font-display font-black text-[10px] uppercase tracking-wider mb-1.5">
            {currentSlide.mobileTracker}
          </p>

          {/* Heading - BOLD */}
          <h1 className="text-3xl sm:text-4xl font-display font-black leading-[1.12] mb-3 text-gray-950">
            <span className="text-[#B22222] block tracking-tight">
              {currentSlide.title}
            </span>
            <span className="text-gray-900 tracking-tight font-extrabold text-2xl sm:text-3xl block mt-0.5">
              {currentSlide.highlight}
            </span>
          </h1>

          {/* Paragraph Text - BOLD */}
          <p className="text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed mb-4 font-body">
            {currentSlide.description}
          </p>

          {/* 2-Column Checkmarks Grid - BOLD */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-900 font-bold">
            {currentSlide.badges.map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>{badge}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                ✓
              </span>
              <span>Mumbai Operations</span>
            </div>
          </div>

          {/* Badges Below Checkmarks */}
          <div className="flex items-center gap-4 text-xs text-gray-800 font-bold mb-5">
            <div className="flex items-center gap-1.5">
              <Shield size={14} className="text-[#B22222] shrink-0" />
              <span>10+ Years Excellence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#B22222] shrink-0" />
              <span>Pan-India Supply</span>
            </div>
          </div>

          {/* Big Red Full-Width CTA Button */}
          <Link
            to="/contact"
            id="hero-mobile-get-quote-cta"
            className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 sm:py-4 px-6 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.99]"
          >
            <span>Get a Quote</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Catalogue Modal */}
      <CatalogueModal
        isOpen={catalogueOpen}
        onClose={() => setCatalogueOpen(false)}
      />
    </section>
  );
}
