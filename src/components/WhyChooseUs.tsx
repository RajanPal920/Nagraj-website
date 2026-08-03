import { ShieldCheck, Clock3, IndianRupee, Globe2 } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const features = [
  {
    id: 'quality',
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Every batch is sourced from verified mills and checked against material test certificates (MTCs). No compromises on grade, tolerance, or surface quality.',
  },
  {
    id: 'dispatch',
    icon: Clock3,
    title: 'Timely Dispatch',
    description:
      'Fast turnaround from inquiry to delivery. We maintain ready stock for commonly demanded grades and can coordinate transit to any industrial hub in India.',
  },
  {
    id: 'pricing',
    icon: IndianRupee,
    title: 'Competitive Pricing',
    description:
      'Transparent, market-aligned pricing without hidden charges. Get accurate quotes quickly — single-item or multi-product project packages.',
  },
  {
    id: 'reach',
    icon: Globe2,
    title: 'Pan-India Reach',
    description:
      'Serving clients across Maharashtra and beyond. Our Mumbai and Pune offices enable responsive supply for projects in the west and across India.',
  },
];

export function WhyChooseUs() {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="why-us" className="section-padding bg-brand-green relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 steel-texture opacity-40" />

      {/* Decorative diagonal lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 80px,
            rgba(201,152,46,0.5) 80px,
            rgba(201,152,46,0.5) 81px
          )`,
        }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-14 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <p className="text-brand-gold font-display font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Why Bhumi Steel
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Built on Reliability
          </h2>
          <div className="w-16 h-1 bg-brand-gold mt-4 mb-6 mx-auto" />
          <p className="font-body text-white/70 text-base max-w-xl mx-auto">
            Industrial buyers choose Bhumi Steel for our consistent product quality,
            straightforward pricing, and dependable delivery.
          </p>
        </div>

        {/* Feature grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 gap-6">
          {features.map(({ id, icon: Icon, title, description }, index) => (
            <div
              key={id}
              id={`why-us-${id}`}
              className={`glass-panel p-8 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-brand-gold/50 ${gridVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : 'opacity-0'}`}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-brand-gold group-hover:text-white transition-colors duration-300"
                  />
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-white/65 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
