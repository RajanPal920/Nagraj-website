import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Globe2,
  Award,
  Truck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const features = [
  {
    id: "quality",
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "ISO Certified company with rigorous quality control. Every batch is sourced from verified mills and checked against material test certificates (MTCs). No compromises on grade, tolerance, or surface quality.",
  },
  {
    id: "dispatch",
    icon: Clock3,
    title: "Timely Dispatch",
    description:
      "Fast turnaround from inquiry to delivery. We maintain ready stock for commonly demanded grades and can coordinate transit to any industrial hub in India.",
  },
  {
    id: "pricing",
    icon: IndianRupee,
    title: "Competitive Pricing",
    description:
      "Transparent, market-aligned pricing without hidden charges. We provide Modvat invoices for excise benefits and can arrange material against CT3/ARE4/H forms for exports.",
  },
  {
    id: "reach",
    icon: Globe2,
    title: "Pan-India Reach",
    description:
      "Serving clients across Maharashtra and beyond. Our Mumbai and Pune offices enable responsive supply for projects across India with reliable delivery networks.",
  },
  {
    id: "certified",
    icon: Award,
    title: "ISO Certified",
    description:
      "Proudly ISO CERTIFIED COMPANY registered with semi-govt., govt., private & multinational companies. We maintain the highest quality management standards.",
  },
  {
    id: "testing",
    icon: TrendingUp,
    title: "Advanced Testing",
    description:
      "Chemical, physical, mechanical, ultrasonic, micro, IGC and other related tests from govt. approved laboratories. Ready for third-party inspection.",
  },
];

export function WhyChooseUs() {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section
      id="why-us"
      className="section-padding bg-brand-red relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 steel-texture opacity-20" />

      {/* Decorative diagonal lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 80px,
            rgba(0,0,0,0.2) 80px,
            rgba(0,0,0,0.2) 81px
          )`,
        }}
      />

      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p className="text-white/80 font-display font-bold text-sm uppercase tracking-[0.2em] mb-3">
            Why Nagraj Metal Industries
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            Built on <span className="text-black/30">Reliability</span>
          </h2>
          <div className="w-16 h-1 bg-white/50 mt-4 mb-6 mx-auto" />
          <p className="font-body text-white/80 text-base max-w-xl mx-auto">
            Dynamic group with young visionaries, ISO certified, and trusted by
            government & multinational companies across India.
          </p>
        </div>

        {/* Feature grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ id, icon: Icon, title, description }, index) => (
            <div
              key={id}
              id={`why-us-${id}`}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/20 ${gridVisible ? `animate-fade-in-up stagger-${(index % 6) + 1}` : "opacity-0"}`}
            >
              <div className="flex flex-col items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-white group-hover:text-brand-red transition-colors duration-300"
                  />
                </div>
                {/* Text */}
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-white/70 text-sm leading-relaxed">
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
