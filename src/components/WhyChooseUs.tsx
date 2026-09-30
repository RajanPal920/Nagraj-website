import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Globe2,
  Award,
  TrendingUp,
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
      className="py-20 lg:py-28 bg-gradient-to-b from-[#0f0f0f] via-[#080808] to-[#000000] relative overflow-hidden text-white border-b border-gray-800"
    >
      {/* Subtle background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#8B1A1A]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 sm:mb-16 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
            <Award size={14} className="text-[#D43A3A]" />
            <span className="text-[#D43A3A] font-display font-bold text-xs uppercase tracking-wider">
              Why Nagraj Metal Industries
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-3">
            Built On <span className="text-[#D43A3A]">Uncompromising Reliability</span>
          </h2>
          <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto mb-4" />
          <p className="font-body text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            ISO 9001:2015 certified operations backed by over a decade of domain expertise, nationwide logistics, and complete chemical &amp; mechanical traceability.
          </p>
        </div>

        {/* Feature grid — equal height cards */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map(({ id, icon: Icon, title, description }, index) => (
            <div
              key={id}
              id={`why-us-${id}`}
              className={`relative flex flex-col bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-[#8B1A1A]/60 rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/[0.07] ${gridVisible ? `animate-fade-in-up stagger-${(index % 6) + 1}` : "opacity-0"}`}
            >
              {/* Top accent bar — visible on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B1A1A] via-[#D43A3A] to-[#8B1A1A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex flex-col flex-1 p-6 sm:p-7">
                {/* Icon + Title Row */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8B1A1A]/20 border border-[#8B1A1A]/30 flex items-center justify-center shrink-0 group-hover:bg-[#8B1A1A] group-hover:border-[#8B1A1A] transition-colors duration-300">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="text-[#D43A3A] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#D43A3A] transition-colors leading-snug">
                    {title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/8 mb-4" />

                {/* Description — fills remaining height */}
                <p className="font-body text-gray-300 text-xs sm:text-sm leading-relaxed flex-1">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}