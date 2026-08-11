import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import {
  ShieldCheck,
  Clock3,
  IndianRupee,
  Globe2,
  FileCheck2,
  Headphones,
  Layers,
  ArrowRight,
  CheckCircle2,
  Star,
  Award,
  Target,
  FlaskConical,
  Ruler,
  Package,
} from "lucide-react";

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
      "Prompt response from Mumbai & Pune offices",
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
    description: `Our dual-office setup in Mumbai and Pune's MIDC Bhosari belt lets us serve fabricators, OEMs, and EPC contractors across western India and beyond.`,
    points: [
      "Offices in Mumbai & MIDC Bhosari, Pune",
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
  return (
    <>
      <title>
        Why Choose Nagraj Metal Industries | Quality, Pricing & Reliability
      </title>
      <meta
        name="description"
        content="Discover why industrial buyers choose Nagraj Metal Industries — MTC-backed quality, transparent pricing, pan-India dispatch, and 417+ products in stock."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        id="why-us-hero"
        label="Why Nagraj Metal Industries"
        title={
          <>
            Built on
            <br />
            <span className="text-brand-red">Quality & Trust</span>
          </>
        }
        description="Quality is our prime concern. From exact material matching to on-time dispatch, we remove the friction from industrial steel procurement."
        bgImage="/images/forging.jpg"
      />

      {/* ── Quality Pillars ────────────────────────────────────────────────────── */}
      <section id="why-us-pillars" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Commitment</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              Quality <span className="text-brand-red">Objectives</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              We consider three elements essential for overall quality:
              Independence & Objectivity, Technical & Scientific Quality, and
              Practical Benefits to Clients.
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
                  className={`card-base p-8 group flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                    index === pillars.length - 1 && pillars.length % 3 !== 0
                      ? "lg:col-span-3 lg:max-w-md lg:mx-auto"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-5 w-14 h-14 rounded-sm bg-brand-red/8 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300 flex-shrink-0">
                    <Icon
                      size={24}
                      className="text-brand-red group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Title */}
                  <p className="font-display font-bold text-xs text-brand-red uppercase tracking-[0.15em] mb-1">
                    {title}
                  </p>
                  <h3 className="font-display font-extrabold text-xl text-brand-charcoal mb-3">
                    {headline}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 mt-auto">
                    {points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className="text-brand-red flex-shrink-0 mt-0.5"
                          strokeWidth={2}
                        />
                        <span className="font-body text-gray-600 text-xs leading-relaxed">
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
      <section id="why-us-process" className="section-padding bg-gray-50">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Process</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              Quality <span className="text-brand-red">Control</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              We exercise stringent quality control measures for ensuring
              accurate dimensions and mechanical properties of our products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-sm p-6 text-center hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
                <Package size={28} className="text-brand-red" />
              </div>
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Material Control System
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Stringent quality control measures
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6 text-center hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
                <Ruler size={28} className="text-brand-red" />
              </div>
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Machining & Dimensional Control
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Accurate dimensions & mechanical properties
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6 text-center hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
                <FileCheck2 size={28} className="text-brand-red" />
              </div>
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Certification & Testing
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Certification and supplementary tests
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-sm p-6 text-center hover:shadow-card-hover transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
                <FlaskConical size={28} className="text-brand-red" />
              </div>
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Finishing & Marketing
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Quality assurance through every stage
              </p>
            </div>
          </div>

          {/* Quality Statement */}
          <div className="mt-10 bg-brand-red/5 border border-brand-red/20 rounded-sm p-8 max-w-3xl mx-auto text-center">
            <p className="font-body text-brand-charcoal text-sm leading-relaxed italic">
              "The impeccable quality standards of our product range as well as
              services have contributed immensely to the success of our
              company."
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Trust strip ─────────────────────────────────────── */}
      <section
        id="why-us-trust"
        className="bg-brand-red relative overflow-hidden py-20 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        <div className="absolute inset-0 steel-texture opacity-20" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(255,255,255,0.2) 80px, rgba(255,255,255,0.2) 81px)`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                className="text-white fill-white"
                strokeWidth={1}
              />
            ))}
          </div>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white max-w-3xl mx-auto leading-snug mb-6">
            "Quality is our prime concern. We maintain high quality standards
            through our committed personnel and sound infrastructure."
          </blockquote>
          <p className="font-body text-white/75 text-sm">
            — Nagraj Metal Industries Quality Policy
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section id="why-us-cta" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="bg-gray-50 rounded-sm border border-gray-100 shadow-card p-10 sm:p-16 text-center max-w-3xl mx-auto">
            <p className="section-label text-brand-red flex justify-center">
              Start Today
            </p>
            <h2 className="section-title text-brand-charcoal mx-auto mb-4">
              Ready to <span className="text-brand-red">Place an Enquiry?</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Share your product requirement — grade, size, and quantity — and
              we'll respond with accurate pricing and availability within one
              business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                id="why-us-cta-enquire"
                className="bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
              >
                Send an Enquiry
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/products"
                id="why-us-cta-catalogue"
                className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-base"
              >
                View Full Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
