import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Package,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  Scale,
  Eye,
  Target,
  Award,
  Truck,
  FlaskConical,
  CheckCircle2,
  Download,
} from "lucide-react";
import { downloadCompanyCatalogue } from "../utils/catalogueGenerator";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const stats = [
  { value: "10+", label: "Years of Excellence", icon: Award },
  { value: "ISO", label: "9001:2015 Certified", icon: ShieldCheck },
  { value: "Pan-India", label: "Supply Network", icon: MapPin },
  { value: "B2B", label: "Exclusive Focus", icon: TrendingUp },
];

const milestones = [
  {
    icon: Building2,
    year: "Over a Decade Ago",
    title: "Foundation & Vision",
    description:
      "Nagraj Metal Industries was established to cater to growing demands of industrial raw materials with a dynamic team of young visionaries.",
  },
  {
    icon: ShieldCheck,
    year: "Quality Accreditation",
    title: "ISO 9001:2015 Certification",
    description:
      "Awarded ISO 9001:2015 quality management certification and officially registered with prominent semi-govt., govt., private & multinational companies.",
  },
  {
    icon: Package,
    year: "Infrastructure Expansion",
    title: "Stockholding & Export Readiness",
    description:
      "Expanded warehousing facilities in Mumbai and Pune, holding substantial ready inventory across stainless steel, alloy steel, flanges, fittings, and fasteners.",
  },
  {
    icon: Users,
    year: "Present Day",
    title: "Pan-India Industrial Partner",
    description:
      "Serving hundreds of industrial buyers, EPC contractors, process plants, and OEMs nationwide with comprehensive MTCs and third-party inspection readiness.",
  },
];

const offices = [
  {
    id: "mumbai",
    type: "Registered Headquarters",
    city: "Mumbai",
    address: [
      "Jalaram Niwas, Plot No. 2, 1st Floor, Office No. 1,",
      "1st Kumbharwada,",
      "Mumbai – 400 004.",
    ],
    note: "Subject to Mumbai Jurisdiction",
  },
  {
    id: "pune",
    type: "Branch & Logistics Depot",
    city: "Pune",
    address: [
      "SA 3/3, 'S' Block,",
      "Near SB Canteen, MIDC, Bhosari,",
      "Pune – 411 026.",
    ],
    note: "MIDC Bhosari Industrial Belt",
  },
];

const values = [
  {
    icon: Scale,
    title: "Compliance-First",
    description:
      "All transactions are fully documented, GST-compliant, and subject to Mumbai jurisdiction. We operate with complete commercial transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Traceability",
    description:
      "Every single product is matched with verified Mill Test Certificates (MTCs) and testing from govt. approved laboratories.",
  },
  {
    icon: Package,
    title: "Comprehensive Range",
    description:
      "From stainless steel pipes and round bars to nickel alloys and precision fasteners—our catalogue covers the entire spectrum under one roof.",
  },
  {
    icon: Users,
    title: "Engineering Support",
    description:
      "We assist procurement teams and engineers with grade selection, international equivalent standards, and tailored supply schedules.",
  },
];

const capabilities = [
  {
    icon: Truck,
    title: "Export Documentation",
    description: "Arranging CT3, ARE4, and H forms for direct merchant export shipments.",
  },
  {
    icon: Scale,
    title: "Modvat & GST Invoices",
    description: "GST-compliant invoicing enabling clients to claim full excise and input tax benefits.",
  },
  {
    icon: FlaskConical,
    title: "Govt. Approved Testing",
    description: "Chemical, mechanical, ultrasonic, hardness, and micro/IGC laboratory test reports.",
  },
  {
    icon: ShieldCheck,
    title: "Third-Party Inspection",
    description: "Fully ready for inspection by Bureau Veritas, DNV, TUV, Lloyd's, SGS, or client inspectors.",
  },
  {
    icon: Package,
    title: "Special Alloy Procurement",
    description: "Direct ties with prime steel mills to procure rare grades adhering to client specifications.",
  },
  {
    icon: Users,
    title: "Dedicated B2B Desk",
    description: "Prompt responses, specialized sizing, and express logistics dispatch across India.",
  },
];

export function AboutPage() {
  return (
    <>
      <title>About Us | Nagraj Metal Industries | Industrial Steel & Alloys</title>
      <meta
        name="description"
        content="Learn about Nagraj Metal Industries — ISO 9001:2015 certified steel manufacturer and supplier with facilities in Mumbai and Pune serving industrial clients across India."
      />

      {/* ─── Standardized Hero (Desktop: Full Width Clear Image + Floating Navy Glass Card | Mobile: Top Image Card + Clean Stacked Content) ─── */}
      <section
        id="about-hero"
        className="relative pt-24 overflow-hidden"
        aria-label="About Nagraj Metal Industries"
      >
        {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
        <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
          {/* Crystal Clear Background Image */}
          <img
            src="/images/about.jpg"
            alt="About Nagraj Metal Industries Facility"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Floating Navy/Slate Glassmorphic Card on Left */}
          <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
            <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/20 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
              {/* Tag / Breadcrumb */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-7 h-[3px] bg-[#E63946]" />
                <span className="text-xs font-mono font-black tracking-[0.25em] text-[#FF4D5E] uppercase drop-shadow-xs">
                  10+ YEARS EXCELLENCE • MUMBAI & PUNE
                </span>
              </div>

              {/* Headline - BOLD */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-white tracking-tight leading-[1.12] mb-4 drop-shadow-sm">
                Pioneering Excellence
                <span className="block text-[#FF4D5E] font-black mt-1">
                  In Industrial Metals & Alloys.
                </span>
              </h1>

              {/* Description - BOLD */}
              <p className="text-white font-bold text-sm sm:text-base leading-relaxed mb-6 font-body drop-shadow-xs max-w-lg">
                Established over a decade ago, Nagraj Metal Industries is an Indian manufacturing, stockholding, and export powerhouse providing precision steel, flanges, fittings, and fasteners for critical engineering sectors.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 mb-6">
                <a
                  href="#about-journey"
                  className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
                >
                  <span>Our Journey</span>
                  <span>→</span>
                </a>
                <button
                  onClick={() => downloadCompanyCatalogue()}
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-display font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/40 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wider"
                >
                  <Download size={14} />
                  <span>Company Profile</span>
                </button>
              </div>

              {/* Feature Badges Row */}
              <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/95 font-medium flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>10+ Years Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Mumbai & Pune Hubs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Pan-India Logistics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO (block on mobile, hidden on lg+) */}
        <div className="block lg:hidden w-full bg-white pb-6">
          {/* About Image at Top: Clean, Complete & Completely Visible */}
          <div className="px-4 pt-3 pb-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src="/images/about.jpg"
                alt="About Nagraj Metal Industries Facility"
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
            </div>
          </div>

          {/* Content Below Photo */}
          <div className="px-5 pt-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1 rounded-full mb-3 text-gray-800">
              <Award size={13} className="text-[#B22222] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider font-display">
                ESTABLISHED OVER A DECADE AGO
              </span>
            </div>

            {/* Subtitle Uppercase Tracker */}
            <p className="text-[#B22222] font-display font-bold text-[10px] uppercase tracking-wider mb-1.5">
              MANUFACTURERS · STOCKHOLDERS · EXPORTERS
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold leading-[1.15] mb-3">
              <span className="text-[#B22222] block tracking-tight">PIONEERING</span>
              <span className="text-gray-900 tracking-tight">Industrial Excellence</span>
            </h1>

            {/* Paragraph Text */}
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-body">
              Nagraj Metal Industries is an Indian manufacturing, stockholding, and export powerhouse providing precision steel, flanges, fittings, and fasteners for critical engineering sectors across India.
            </p>

            {/* 2-Column Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-800 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>10+ Years Industry Excellence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Mumbai & Pune Operations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>100% Traceability & MTC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Pan-India Logistics</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-700 font-medium mb-5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B22222] shrink-0" />
                <span>Govt. & OEM Registered</span>
              </div>
            </div>

            {/* Big Red Full-Width CTA */}
            <a
              href="#about-journey"
              className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 sm:py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Explore Our Journey</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats Ribbon ─── */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80">
                <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-[#8B1A1A]" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl sm:text-2xl text-gray-900">
                    {value}
                  </div>
                  <div className="font-body text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Company Story Split Section ─── */}
      <section id="about-story" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image with Overlay */}
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src="/images/warehouse.jpg"
                onError={(e) => {
                  e.currentTarget.src = "/images/about.jpg";
                }}
                alt="Nagraj Metal Industries Warehouse"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
                <Award size={16} className="text-[#8B1A1A]" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-gray-900">
                  Registered Indian Enterprise
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4">
                <div className="w-1.5 h-12 bg-[#8B1A1A] rounded-full shrink-0" />
                <div>
                  <h4 className="font-display font-bold text-gray-900 text-sm">
                    Stockholding Warehouses in Maharashtra
                  </h4>
                  <p className="font-body text-gray-500 text-xs mt-0.5">
                    Operating directly from key logistics clusters in Mumbai & Pune (MIDC Bhosari).
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Narrative */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
                <Building2 size={14} className="text-[#8B1A1A]" />
                <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                  Our Origins & Ethos
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
                Dynamic Leadership With An{" "}
                <span className="text-[#8B1A1A]">Unwavering Commitment</span>
              </h2>

              <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mb-6" />

              <div className="space-y-4 font-body text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Nagraj Metal Industries is a dynamic group established over a decade ago to cater to the exponentially expanding requirements of raw materials in heavy engineering, power, oil & gas, defense, and fabrication industries.
                </p>
                <p>
                  Guided by a team of forward-thinking visionaries, we maintain massive ready inventories across standard and non-standard grades. This inventory strength allows us to fulfill emergency shutdown requirements and long-term project orders alike with unmatched speed and consistency.
                </p>
                <p>
                  As an <span className="font-semibold text-gray-900">ISO 9001:2015 certified company</span>, we have formed long-standing relationships with premier domestic and international steel mills. Every delivery is verified against comprehensive Mill Test Certificates (MTCs), ensuring full metallurgical integrity.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#8B1A1A] hover:bg-[#A82020] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/certificates"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-200"
                >
                  <span>View Certifications</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Journey / Milestones ─── */}
      <section id="about-journey" className="py-20 lg:py-28 bg-white border-b border-gray-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <TrendingUp size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                Company Growth
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              Milestones Along Our <span className="text-[#8B1A1A]">Journey</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto mb-4" />
            <p className="font-body text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              From our early trading foundation in Mumbai to a trusted national supplier registered across public and private sector projects.
            </p>
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="bg-gray-50/80 rounded-2xl border border-gray-200/80 p-6 flex flex-col justify-between hover:border-[#8B1A1A]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                        <Icon size={20} />
                      </div>
                      <span className="font-display font-bold text-xs text-[#8B1A1A] uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-gray-200">
                        Stage 0{i + 1}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">
                      {m.year}
                    </span>
                    <h3 className="font-display font-bold text-base text-gray-900 mb-2 group-hover:text-[#8B1A1A] transition-colors">
                      {m.title}
                    </h3>
                    <p className="font-body text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section id="about-vision-mission" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <Target size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                Corporate Purpose
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              Vision & <span className="text-[#8B1A1A]">Mission</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mb-6 text-[#8B1A1A]">
                <Eye size={26} strokeWidth={2} />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Our Corporate Vision
              </h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                To stand as the most trusted and versatile enterprise in ferrous and non-ferrous raw materials globally. To be recognized internationally for absolute product integrity, transparent commercial practices, and unmatched technical service back-up.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mb-6 text-[#8B1A1A]">
                <Target size={26} strokeWidth={2} />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Our Operational Mission
              </h3>
              <ul className="space-y-3 font-body text-gray-600 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#8B1A1A] shrink-0 mt-0.5" />
                  <span>Deliver certified, prime materials at highly competitive wholesale price points.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#8B1A1A] shrink-0 mt-0.5" />
                  <span>Ensure prompt dispatch adhering strictly to customer project deadlines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#8B1A1A] shrink-0 mt-0.5" />
                  <span>Nurture enduring, transparent partnerships with industrial leaders and EPCs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Core Values ─── */}
      <section id="about-values" className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <ShieldCheck size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                Principles
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              What Defines Our <span className="text-[#8B1A1A]">Standards</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-gray-50/70 p-7 rounded-2xl border border-gray-200/80 hover:border-[#8B1A1A]/40 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="mx-auto mb-5 w-12 h-12 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center text-[#8B1A1A] group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-2 group-hover:text-[#8B1A1A] transition-colors">
                  {title}
                </h3>
                <p className="font-body text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Capabilities Grid ─── */}
      <section id="about-capabilities" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <Package size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                Full-Service Capabilities
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              Industrial Supply <span className="text-[#8B1A1A]">Capabilities</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 hover:shadow-lg hover:border-[#8B1A1A]/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center text-[#8B1A1A] mb-4">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-display font-bold text-gray-900 text-sm mb-2">
                    {cap.title}
                  </h4>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Registered Facilities & Offices ─── */}
      <section id="about-offices" className="py-20 lg:py-28 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <MapPin size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                Facilities
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
              Operating <span className="text-[#8B1A1A]">Locations</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offices.map((off) => (
              <div
                key={off.id}
                id={`about-office-${off.id}`}
                className="bg-gray-50/70 border border-gray-200/80 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-[#8B1A1A]/40 transition-all duration-300"
              >
                <div className="inline-block bg-[#8B1A1A] text-white text-[10px] font-display font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-4">
                  {off.type}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} className="text-[#8B1A1A]" />
                  <h3 className="font-display font-extrabold text-xl text-gray-900">
                    {off.city}
                  </h3>
                </div>

                <address className="not-italic font-body text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {off.address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < off.address.length - 1 && <br />}
                    </span>
                  ))}
                </address>

                <div className="pt-3 border-t border-gray-200 text-xs text-gray-500 font-medium">
                  {off.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom Call to Action ─── */}
      <section
        id="about-cta"
        className="py-16 sm:py-20 bg-gradient-to-r from-gray-950 via-[#180f0f] to-black text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#D43A3A] uppercase tracking-wider">
              Ready to Collaborate
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              Request Your Custom Industrial Quote
            </h2>
            <p className="font-body text-gray-300 text-sm mt-2 max-w-lg">
              Share your technical grade, sizing, and quantity specs for immediate pricing and certified delivery schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full md:w-auto">
            <Link
              to="/contact"
              id="about-cta-contact"
              className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#A82020] text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg transition-all duration-200"
            >
              <span>Get Immediate Quote</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/products"
              id="about-cta-products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200"
            >
              <span>Explore Catalog</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
