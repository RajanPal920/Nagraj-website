import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Bhumi Steel Hero"
    >
      {/* Dark metallic background */}
      <div className="absolute inset-0 bg-steel-gradient" />

      {/* Steel texture overlay */}
      <div className="absolute inset-0 steel-texture opacity-60" />

      {/* Diagonal accent stripe */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(201,152,46,0.3) 60px,
            rgba(201,152,46,0.3) 61px
          )`,
        }}
      />

      {/* Gold bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient" />

      {/* Content */}
      <div className="relative z-10 container-xl px-4 sm:px-8 lg:px-16 xl:px-24 text-center lg:text-left">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start animate-fade-in">
            <div className="h-px w-12 bg-brand-gold" />
            <span className="text-brand-gold font-display font-bold text-xs uppercase tracking-[0.3em]">
              Mumbai · Pune · Pan-India
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-6 animate-fade-in-up">
            Precision Steel.
            <br />
            <span className="text-brand-gold">Proven Trust.</span>
          </h1>

          {/* Sub-headline */}
          <p className="font-body text-white/75 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-in-up">
            Bhumi Steel supplies quality pipes, tubes, flanges, fittings, and structural steel
            products to industrial clients across India — backed by registered offices in{' '}
            <span className="text-white font-semibold">Mumbai</span> and a branch in{' '}
            <span className="text-white font-semibold">Pune</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up">
            <a
              href="#contact"
              id="hero-get-quote-cta"
              className="btn-primary text-base"
            >
              Get a Quote
              <ArrowRight size={18} />
            </a>
            <a
              href="#products"
              id="hero-view-products-cta"
              className="btn-outline text-base"
            >
              View Products
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-brand-gold transition-colors duration-200 animate-bounce"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </a>
    </section>
  );
}
