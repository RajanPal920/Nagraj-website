import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Globe2,
  FileCheck2,
  Layers,
  ArrowRight,
  CheckCircle2,
  Star,
  Award,
  Target,
  FlaskConical,
  Ruler,
  Package,
  Download,
} from "lucide-react";
import { CatalogueModal } from "../components/CatalogueModal";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const pillars = [
  {
    id: "quality",
    icon: ShieldCheck,
    title: "Quality Assurance",
    headline: "Prime Concern",
    description:
      "Quality is our prime concern. We are able to maintain high quality standards through our committed personnel and sound infrastructure. We ensure that finest quality material is used for our products.",
    points: [
      "Material Test Certificates with every supply",
      "Every single piece attached with test certificates and reports",
      "Continually improving quality to serve clients better",
    ],
  },
  {
    id: "independence",
    icon: Target,
    title: "Independence & Objectivity",
    headline: "Essential Elements",
    description:
      "We consider three elements essential for overall quality: Independence & Objectivity, Technical & Scientific Quality, and Practical Benefits to Clients.",
    points: [
      "Independent quality assessment",
      "Technical & scientific quality standards",
      "Practical benefits for clients",
    ],
  },
  {
    id: "excellence",
    icon: Award,
    title: "Our Excellence",
    headline: "Prime Aim",
    description:
      "Quality is our prime aim. We maintain high quality standards through committed personnel and sound infrastructure. Every single piece is attached with test certificates and reports.",
    points: [
      "Committed personnel and sound infrastructure",
      "Finest quality material for all products",
      "Continual improvement in quality",
    ],
  },
  {
    id: "control",
    icon: Ruler,
    title: "Quality Control",
    headline: "Stringent Measures",
    description:
      "We exercise stringent quality control measures for ensuring accurate dimensions and mechanical properties. Our quality assurance system assures each product passes through rigorous processes.",
    points: [
      "Certification and Supplementary Test",
      "Finishing and Marketing",
      "Material Control System",
      "Machining and Dimensional Control",
    ],
  },
  {
    id: "dispatch",
    icon: Clock3,
    title: "Timely Dispatch",
    headline: "Fast Turnaround, Nationwide",
    description:
      "From inquiry to delivery, we move fast. We maintain ready stock for commonly demanded grades and coordinate logistics to any industrial hub across India.",
    points: [
      "Ready stock for fast-moving grades",
      "Dispatch coordination pan-India",
      "Prompt response from Mumbai office",
    ],
  },
  {
    id: "pricing",
    icon: IndianRupee,
    title: "Competitive Pricing",
    headline: "Transparent, Market-Aligned",
    description:
      "No hidden charges. No inflated margins. We offer accurate, market-aligned quotations — whether you need a single item or a multi-product project package.",
    points: [
      "No hidden charges or surprise add-ons",
      "Accurate quotes for single or multi-item orders",
      "GST-compliant invoicing every time",
    ],
  },
  {
    id: "reach",
    icon: Globe2,
    title: "Pan-India Reach",
    headline: "Mumbai · Pune · Everywhere",
    description: `Our offices in Mumbai and Pune's MIDC Bhosari industrial belt let us serve fabricators, OEMs, and EPC contractors across western India and beyond.`,
    points: [
      "Office in Mumbai: Jalaram Niwas, 1st Kumbharwada",
      "Branch in Pune: SA 3/3, 'S' Block, Near SB Canteen, MIDC, Bhosari, Pune - 411026",
      "Serving clients across Maharashtra & India",
      "B2B focus — built for industrial buyers",
    ],
  },
  {
    id: "range",
    icon: Layers,
    title: "Breadth of Range",
    headline: "417+ Products, 6 Categories",
    description:
      "From seamless pipes and ERW tubes to nickel alloy forgings — we cover every major structural and process steel need under one roof.",
    points: [
      "Bars, pipes, plates, fittings, flanges & forgings",
      "Stainless, alloy, carbon, titanium & nickel alloys",
      "Custom grades sourced on request",
    ],
  },
  {
    id: "compliance",
    icon: FileCheck2,
    title: "Full Compliance",
    headline: "Documented, Jurisdiction-Clear",
    description:
      "All transactions are GST-registered, properly documented, and subject to Mumbai jurisdiction — giving buyers full legal clarity and confidence.",
    points: [
      "GST-registered business entity",
      "All transactions under Mumbai jurisdiction",
      "Proper documentation on every order",
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function WhyUsPage() {
  const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

  return (
    <>
      <title>
        Why Choose Nagraj Metal Industries | Quality, Pricing & Reliability
      </title>
      <meta
        name="description"
        content="Discover why industrial buyers choose Nagraj Metal Industries — MTC-backed quality, transparent pricing, pan-India dispatch, and 417+ products in stock."
      />

      {/* ── Cinematic Industrial Hero ─────────────────────────────────────────── */}
      {/* ─── Standardized Hero (Desktop: Full Width Clear Image + Floating Navy Glass Card | Mobile: Top Image Card + Clean Stacked Content) ─── */}
      <section
        id="why-us-hero"
        className="relative pt-24 overflow-hidden"
        aria-label="Why Choose Nagraj Metal Industries"
      >
        {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
        <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
          {/* Crystal Clear Industrial Background Image */}
          <img
            src="/images/why.jpg"
            alt="Why Choose Nagraj Metal Industries"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Floating Navy/Slate Glassmorphic Card on Left */}
          <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
            <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/20 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
              {/* Tag / Breadcrumb */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-6 h-[2px] bg-[#E63946]" />
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/90 uppercase">
                  MTC-BACKED QUALITY • TRANSPARENT PRICING
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-white tracking-tight leading-[1.14] mb-4">
                Why Choose Nagraj
                <span className="block text-[#E63946] mt-1">
                  Industrial Reliability Guaranteed.
                </span>
              </h1>

              {/* Description */}
              <p className="text-white text-sm sm:text-[15px] leading-relaxed mb-6 font-bold max-w-lg">
                Discover why top engineering fabricators, EPC contractors, and OEMs partner with Nagraj Metal Industries — complete traceability, market-aligned pricing, and pan-India logistics.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 mb-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Enquire Now</span>
                  <span>→</span>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>View Products</span>
                </Link>
              </div>

              {/* Feature Badges Row */}
              <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/95 font-medium flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>100% Traceability</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Competitive Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Fast Turnaround</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO (block on mobile, hidden on lg+) */}
        <div className="block lg:hidden w-full bg-white pb-6">
          {/* Why Us Image at Top: Clean, Complete & Completely Visible */}
          <div className="px-4 pt-3 pb-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src="/images/why.jpg"
                alt="Why Choose Nagraj Metal Industries"
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
                TRUSTED INDUSTRIAL PARTNER
              </span>
            </div>

            {/* Subtitle Uppercase Tracker */}
            <p className="text-[#B22222] font-display font-bold text-[10px] uppercase tracking-wider mb-1.5">
              MTC-BACKED QUALITY · TRANSPARENT PRICING
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold leading-[1.15] mb-3">
              <span className="text-[#B22222] block tracking-tight">WHY CHOOSE</span>
              <span className="text-gray-900 tracking-tight">Nagraj Metal Industries</span>
            </h1>

            {/* Paragraph Text */}
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-body">
              Discover why top engineering fabricators, EPC contractors, and OEMs partner with Nagraj Metal Industries — complete traceability, market-aligned pricing, and pan-India logistics.
            </p>

            {/* 2-Column Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-800 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Independent Quality Assessment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Stringent QC Measures</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Nationwide Timely Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                <span>Zero Hidden Charges</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-700 font-medium mb-5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B22222] shrink-0" />
                <span>10+ Years Excellence</span>
              </div>
            </div>

            {/* Big Red Full-Width CTA */}
            <Link
              to="/contact"
              className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 sm:py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Enquire Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* ── Quality Pillars ────────────────────────────────────────────────────── */}
      <section id="why-us-pillars" className="section-padding bg-gray-50/60">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-2 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3 py-1 rounded-full">
              <ShieldCheck size={14} className="text-[#8B1A1A]" />
              <span className="text-[11px] font-bold text-[#8B1A1A] uppercase tracking-widest">
                Our Core Commitment
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 mb-3 tracking-tight">
              Quality <span className="text-[#8B1A1A]">Objectives & Pillars</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] mx-auto mb-4 rounded-full" />
            <p className="font-body text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We consider three elements essential for overall quality: Independence & Objectivity, Technical & Scientific Quality, and Practical Benefits to Clients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(
              (
                { id, icon: Icon, title, headline, description, points },
                index,
              ) => (
                <div
                  key={id}
                  id={`why-us-pillar-${id}`}
                  className={`bg-white rounded-xl border border-gray-200/90 p-7 sm:p-8 flex flex-col hover:border-[#8B1A1A]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shadow-xs ${index === pillars.length - 1 && pillars.length % 3 !== 0
                    ? "lg:col-span-3 lg:max-w-md lg:mx-auto w-full"
                    : ""
                    }`}
                >
                  {/* Top Bar Accent */}
                  <div className="w-10 h-1 bg-gray-200 group-hover:bg-[#8B1A1A] transition-colors rounded-full mb-6" />

                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-all duration-300 flex-shrink-0">
                      <Icon
                        size={24}
                        className="text-[#8B1A1A] group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#8B1A1A] uppercase tracking-wider font-mono">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <p className="font-display font-bold text-xs text-[#8B1A1A] uppercase tracking-[0.15em] mb-1.5">
                    {title}
                  </p>
                  <h3 className="font-display font-extrabold text-xl text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                    {headline}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                    {description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 pt-4 border-t border-gray-100 mt-auto">
                    {points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="text-[#8B1A1A] flex-shrink-0 mt-0.5"
                          strokeWidth={2.2}
                        />
                        <span className="font-body text-gray-700 text-xs leading-relaxed font-medium">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Quality Process Flow ─────────────────────────────────────────── */}
      <section id="why-us-process" className="section-padding bg-white border-y border-gray-200/80">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-2 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3 py-1 rounded-full">
              <FlaskConical size={14} className="text-[#8B1A1A]" />
              <span className="text-[11px] font-bold text-[#8B1A1A] uppercase tracking-widest">
                Stringent QA System
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-gray-950 mb-3 tracking-tight">
              Quality <span className="text-[#8B1A1A]">Control Framework</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] mx-auto mb-4 rounded-full" />
            <p className="font-body text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We exercise rigorous quality control measures across all procurement, sizing, and dispatch stages to ensure dimensionally accurate, mechanically sound metals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: Package,
                title: "Material Control System",
                desc: "Stringent raw material verification against mill test certs.",
              },
              {
                step: "02",
                icon: Ruler,
                title: "Machining & Dimensional Control",
                desc: "Accurate physical dimensions & mechanical tolerances guaranteed.",
              },
              {
                step: "03",
                icon: FileCheck2,
                title: "Certification & Testing",
                desc: "Supplementary PMI, hydrostatic, ultrasonic & chemical checks.",
              },
              {
                step: "04",
                icon: FlaskConical,
                title: "Finishing & Packaging",
                desc: "Surface protection, tagging, secure transit packing pan-India.",
              },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="bg-gray-50 border border-gray-200/80 rounded-xl p-6 text-center hover:border-[#8B1A1A]/40 hover:bg-white hover:shadow-lg transition-all duration-300 relative group"
              >
                <div className="absolute top-3 right-4 font-mono font-bold text-gray-300 text-lg group-hover:text-[#8B1A1A] transition-colors">
                  {step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8B1A1A] transition-all duration-300">
                  <Icon size={24} className="text-[#8B1A1A] group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-display font-bold text-gray-900 text-sm mb-2 group-hover:text-[#8B1A1A] transition-colors">
                  {title}
                </h4>
                <p className="font-body text-gray-500 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quality Statement Box */}
          <div className="mt-12 bg-gradient-to-r from-gray-950 via-[#1a0a0a] to-gray-950 border border-[#8B1A1A]/30 rounded-xl p-8 max-w-3xl mx-auto text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B1A1A] to-transparent" />
            <p className="font-body text-gray-200 text-sm sm:text-base leading-relaxed italic mb-3">
              "The impeccable quality standards of our product range as well as customer-centric dispatch services have contributed immensely to the trust placed in Nagraj Metal Industries by industrial buyers."
            </p>
            <p className="text-xs font-display font-bold uppercase tracking-widest text-[#B22222]">
              — Management Commitment
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Trust strip ─────────────────────────────────────── */}
      <section
        id="why-us-trust"
        className="bg-gradient-to-r from-[#5a0f0f] via-[#8B1A1A] to-[#4a0c0c] relative overflow-hidden py-16 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        <div className="absolute inset-0 steel-texture opacity-25 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.2) 80px, rgba(255,255,255,0.2) 81px)`,
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                className="text-amber-400 fill-amber-400"
                strokeWidth={1}
              />
            ))}
          </div>
          <blockquote className="font-display font-extrabold text-2xl sm:text-3xl text-white max-w-3xl mx-auto leading-snug mb-5">
            "Quality is our prime concern. We maintain high quality standards through our committed personnel and sound infrastructure."
          </blockquote>
          <p className="font-body text-white/80 text-sm tracking-wide">
            — Nagraj Metal Industries Quality Policy
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="why-us-cta" className="section-padding bg-gray-50/60">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="bg-gradient-to-b from-gray-950 via-[#140b0b] to-black rounded-2xl border border-gray-800 p-10 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B1A1A] to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B22222] mb-3">
              Partner With Us
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
              Ready to <span className="text-[#B22222]">Place an Industrial Enquiry?</span>
            </h2>
            <div className="w-14 h-1 bg-[#8B1A1A] mx-auto mb-6 rounded-full" />
            <p className="font-body text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Share your product requirement — grade, dimensions, specifications, and volume — and our sales engineers will respond with verified mill-backed pricing and availability within one business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                id="why-us-cta-enquire"
                className="bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wider"
              >
                <span>Send an Enquiry</span>
                <ArrowRight size={16} />
              </Link>

              <button
                onClick={() => setCatalogueModalOpen(true)}
                id="why-us-cta-download-catalogue"
                className="bg-[#C9A84C]/20 hover:bg-[#C9A84C] text-[#F0E6B0] hover:text-black border border-[#C9A84C]/40 hover:border-[#C9A84C] font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider hover:-translate-y-0.5 shadow-md"
              >
                <Download size={16} />
                <span>Download Catalogues</span>
              </button>

              <Link
                to="/products"
                id="why-us-cta-catalogue"
                className="border border-white/20 hover:border-white text-white hover:bg-white/10 font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Modal */}
      <CatalogueModal
        isOpen={catalogueModalOpen}
        onClose={() => setCatalogueModalOpen(false)}
      />
    </>
  );
}
