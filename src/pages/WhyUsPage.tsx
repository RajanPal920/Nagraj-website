import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
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
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const pillars = [
  {
    id: 'quality',
    icon: ShieldCheck,
    title: 'Quality Assurance',
    headline: 'MTC-Backed, Mill-Verified',
    description:
      'Every batch is sourced from verified mills and checked against Material Test Certificates (MTCs). We trace each product from manufacturer to your doorstep — no unverified material, ever.',
    points: [
      'Material Test Certificates on every batch',
      'Grade, tolerance & surface quality verified',
      'Sourced from reputed domestic & import mills',
    ],
  },
  {
    id: 'dispatch',
    icon: Clock3,
    title: 'Timely Dispatch',
    headline: 'Fast Turnaround, Nationwide',
    description:
      'From inquiry to delivery, we move fast. We maintain ready stock for commonly demanded grades and coordinate logistics to any industrial hub across India.',
    points: [
      'Ready stock for fast-moving grades',
      'Dispatch coordination pan-India',
      'Prompt response from Mumbai & Pune offices',
    ],
  },
  {
    id: 'pricing',
    icon: IndianRupee,
    title: 'Competitive Pricing',
    headline: 'Transparent, Market-Aligned',
    description:
      'No hidden charges. No inflated margins. We offer accurate, market-aligned quotations — whether you need a single item or a multi-product project package.',
    points: [
      'No hidden charges or surprise add-ons',
      'Accurate quotes for single or multi-item orders',
      'GST-compliant invoicing every time',
    ],
  },
  {
    id: 'reach',
    icon: Globe2,
    title: 'Pan-India Reach',
    headline: 'Mumbai · Pune · Everywhere',
    description:
      `Our dual-office setup in Mumbai and Pune's MIDC Bhosari belt lets us serve fabricators, OEMs, and EPC contractors across western India and beyond.`,
    points: [
      'Offices in Mumbai & MIDC Bhosari, Pune',
      'Serving clients across Maharashtra & India',
      'B2B focus — built for industrial buyers',
    ],
  },
  {
    id: 'range',
    icon: Layers,
    title: 'Breadth of Range',
    headline: '417+ Products, 6 Categories',
    description:
      'From seamless pipes and ERW tubes to nickel alloy forgings — we cover every major structural and process steel need under one roof.',
    points: [
      'Bars, pipes, plates, fittings, flanges & forgings',
      'Stainless, alloy, carbon, titanium & nickel alloys',
      'Custom grades sourced on request',
    ],
  },
  {
    id: 'compliance',
    icon: FileCheck2,
    title: 'Full Compliance',
    headline: 'Documented, Jurisdiction-Clear',
    description:
      'All transactions are GST-registered, properly documented, and subject to Mumbai jurisdiction — giving buyers full legal clarity and confidence.',
    points: [
      'GST-registered business entity',
      'All transactions under Mumbai jurisdiction',
      'Proper documentation on every order',
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    title: 'Responsive Support',
    headline: 'We Speak Your Language',
    description:
      `Our team assists with grade selection, equivalent standards, and procurement strategy. We're not just a supplier — we're a partner who understands your project requirements.`,
    points: [
      'Grade selection & equivalent standard guidance',
      'Single-grade or multi-item procurement support',
      'Response within one business day',
    ],
  },
];

const comparisons = [
  { label: 'Material Test Certificates', us: true, others: false },
  { label: 'GST-compliant invoicing', us: true, others: false },
  { label: 'Pan-India dispatch', us: true, others: false },
  { label: '417+ product catalogue', us: true, others: false },
  { label: 'Grade selection guidance', us: true, others: false },
  { label: 'Dual-office availability', us: true, others: false },
  { label: 'Custom grade sourcing', us: true, others: false },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function WhyUsPage() {
  return (
    <>
      <title>Why Choose Bhumi Steel & Alloys | Quality, Pricing & Reliability</title>
      <meta
        name="description"
        content="Discover why industrial buyers choose Bhumi Steel — MTC-backed quality, transparent pricing, pan-India dispatch, and 417+ products in stock."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <PageHero
        id="why-us-hero"
        label="Why Bhumi Steel"
        title={<>Built on<br/><span className="text-brand-gold">Quality & Trust</span></>}
        description="From exact material matching to on-time dispatch, we remove the friction from industrial steel procurement. Here is why leading manufacturers choose us."
        bgImage="/images/forging.jpg"
      />

      {/* ── 7 Pillars ────────────────────────────────────────────────────── */}
      <section id="why-us-pillars" className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">Our Commitment</p>
            <h2 className="section-title mx-auto">7 Reasons to Choose Us</h2>
            <div className="section-divider mx-auto" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Every aspect of our operation is designed to reduce friction for industrial buyers
              and give you complete confidence in every order.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ id, icon: Icon, title, headline, description, points }, index) => (
              <div
                key={id}
                id={`why-us-pillar-${id}`}
                className={`card-base p-8 group flex flex-col ${
                  // Make the last card (index 6) span full width on lg when there's an odd one
                  index === pillars.length - 1 && pillars.length % 3 !== 0
                    ? 'lg:col-span-3 lg:max-w-md lg:mx-auto'
                    : ''
                }`}
              >
                {/* Icon */}
                <div className="mb-5 w-13 h-13 w-14 h-14 rounded-sm bg-brand-green/8 flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300 flex-shrink-0">
                  <Icon
                    size={24}
                    className="text-brand-green group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <p className="font-display font-bold text-xs text-brand-gold uppercase tracking-[0.15em] mb-1">
                  {title}
                </p>
                <h3 className="font-display font-extrabold text-xl text-brand-green mb-3">
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
                        className="text-brand-green flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="font-body text-gray-600 text-xs leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────────────────────────── */}
      <section id="why-us-comparison" className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">The Difference</p>
            <h2 className="section-title mx-auto">Bhumi Steel vs. Generic Traders</h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="max-w-2xl mx-auto overflow-hidden rounded-sm shadow-card">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-brand-green text-white">
              <div className="px-6 py-4 font-display font-bold text-sm">Feature</div>
              <div className="px-6 py-4 font-display font-bold text-sm text-center border-l border-white/10">
                <span className="text-brand-gold">Bhumi Steel</span>
              </div>
              <div className="px-6 py-4 font-display font-bold text-sm text-center border-l border-white/10 text-white/60">
                Generic Traders
              </div>
            </div>

            {/* Rows */}
            {comparisons.map(({ label, us, others }, i) => (
              <div
                key={label}
                className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'
                }`}
              >
                <div className="px-6 py-4 font-body text-sm text-brand-charcoal">{label}</div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-gray-100">
                  {us ? (
                    <CheckCircle2 size={20} className="text-brand-green" strokeWidth={2.5} />
                  ) : (
                    <span className="w-5 h-0.5 bg-gray-300 rounded-full" />
                  )}
                </div>
                <div className="px-6 py-4 flex items-center justify-center border-l border-gray-100">
                  {others ? (
                    <CheckCircle2 size={20} className="text-brand-green" strokeWidth={2.5} />
                  ) : (
                    <span className="font-body text-gray-500 text-lg leading-none">✕</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial / Trust strip ─────────────────────────────────────── */}
      <section
        id="why-us-trust"
        className="bg-brand-green relative overflow-hidden py-20 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        <div className="absolute inset-0 steel-texture opacity-40" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,152,46,0.5) 80px, rgba(201,152,46,0.5) 81px)`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={22}
                className="text-brand-gold fill-brand-gold"
                strokeWidth={1}
              />
            ))}
          </div>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white max-w-3xl mx-auto leading-snug mb-6">
            "We source all our structural steel needs through Bhumi Steel — reliable
            documentation, quick turnaround, and pricing that actually makes sense."
          </blockquote>
          <p className="font-body text-white/75 text-sm">
            — Industrial Buyer, MIDC Bhosari, Pune
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="why-us-cta"
        className="section-padding bg-white"
      >
        <div className="container-xl">
          <div className="bg-gray-50 rounded-sm border border-gray-100 shadow-card p-10 sm:p-16 text-center max-w-3xl mx-auto">
            <p className="section-label justify-center flex">Start Today</p>
            <h2 className="section-title mx-auto mb-4">
              Ready to Place an Enquiry?
            </h2>
            <div className="section-divider mx-auto" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Share your product requirement — grade, size, and quantity — and we'll
              respond with accurate pricing and availability within one business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" id="why-us-cta-enquire" className="btn-primary">
                Send an Enquiry
                <ArrowRight size={16} />
              </Link>
              <Link to="/products" id="why-us-cta-catalogue" className="btn-outline-green">
                View Full Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
