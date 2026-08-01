import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Package,
  TrendingUp,
  ShieldCheck,
  Users,
  ArrowRight,
  Scale,
  Layers,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const stats = [
  { value: '417+', label: 'Products in Catalogue', icon: Package },
  { value: '2', label: 'Office Locations', icon: Building2 },
  { value: 'Pan-India', label: 'Dispatch Network', icon: MapPin },
  { value: 'B2B', label: 'Exclusive Focus', icon: TrendingUp },
];

const milestones = [
  {
    icon: Building2,
    title: 'Registered in Mumbai',
    description:
      'Principal office established at Jalaram Niwas, 1st Kumbharwada, Mumbai – in the heart of the commercial district.',
  },
  {
    icon: MapPin,
    title: 'Expanded to Pune',
    description:
      'Branch office opened at MIDC Bhosari, Pune — right inside the industrial belt, closer to manufacturing clients.',
  },
  {
    icon: Package,
    title: 'Full Catalogue Build-out',
    description:
      'Portfolio grew from core pipes and flanges to 417+ products across 6 categories: bars, pipes, plates, fittings, flanges, and forgings.',
  },
  {
    icon: ShieldCheck,
    title: 'MTC-Backed Sourcing',
    description:
      'Formalised a mill-to-client traceability process with Material Test Certificates for every batch — no compromises on documentation.',
  },
  {
    icon: Users,
    title: 'Trusted by Industry',
    description:
      'Serving industrial buyers across Maharashtra and pan-India, from fabricators and EPC contractors to process industry OEMs.',
  },
];

const offices = [
  {
    id: 'mumbai',
    type: 'Registered Office',
    city: 'Mumbai',
    address: [
      'Jalaram Niwas,',
      'Plot No. 2, 1st Floor, Office No. 1,',
      '1st Kumbharwada,',
      'Mumbai – 400 004.',
    ],
    note: 'Subject to Mumbai Jurisdiction',
    accent: 'from-brand-green to-brand-green-dark',
    border: 'border-brand-green',
    badge: 'bg-brand-green',
  },
  {
    id: 'pune',
    type: 'Branch Office',
    city: 'Pune',
    address: [
      'Shop No. 3, Sai Nagar Complex,',
      'Plot No. J-66, Opp. J-35,',
      'Block MIDC, Bhosari,',
      'Pune, Maharashtra.',
    ],
    note: 'MIDC Bhosari Industrial Belt',
    accent: 'from-brand-gold to-brand-gold-light',
    border: 'border-brand-gold',
    badge: 'bg-brand-gold',
  },
];

const values = [
  {
    icon: Scale,
    title: 'Compliance-First',
    description:
      'All transactions are documented, GST-compliant, and subject to Mumbai jurisdiction. We operate with full transparency.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Traceability',
    description:
      'Every product comes with verified MTCs. We source from reputed mills and pass full documentation to every buyer.',
  },
  {
    icon: Layers,
    title: 'Breadth of Range',
    description:
      'From seamless pipes to nickel alloy forgings — our catalogue covers the full spectrum of industrial steel needs.',
  },
  {
    icon: Users,
    title: 'Buyer-Centric',
    description:
      'We don\'t just sell material. We assist with grade selection, equivalent standards, and project procurement strategy.',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function AboutPage() {
  return (
    <>
      <title>About Bhumi Steel & Alloys | Mumbai & Pune Steel Traders</title>
      <meta
        name="description"
        content="Learn about Bhumi Steel & Alloys — a registered B2B steel trading company with offices in Mumbai and Pune, supplying 417+ products across India."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="about-hero"
        className="bg-steel-gradient steel-texture relative overflow-hidden py-32 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gold top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto relative z-10">
          <p className="section-label">Who We Are</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-3xl">
            An Established Name&nbsp;in
            <br />
            <span className="text-brand-gold">Steel Trading</span>
          </h1>
          <div className="w-16 h-1 bg-brand-gold mb-8" />
          <p className="font-body text-gray-300 text-lg max-w-2xl leading-relaxed mb-12">
            Bhumi Steel &amp; Alloys is a registered B2B steel trading and supply company
            headquartered in Mumbai with a branch in Pune's MIDC Bhosari industrial corridor.
            We supply structural and process steel to industrial buyers across India.
          </p>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm rounded-sm border border-white/15 px-5 py-4 group hover:bg-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300"
              >
                <Icon
                  size={18}
                  className="text-brand-gold mb-2 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.75}
                />
                <div className="font-display font-extrabold text-2xl text-white">{value}</div>
                <div className="font-body text-gray-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section id="about-story" className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Image */}
            <div className="relative w-full h-[460px] rounded-sm overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gray-100" />
              <img
                src="/images/warehouse.jpg"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000';
                }}
                alt="Bhumi Steel warehouse facility"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 to-transparent pointer-events-none" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur shadow-lg p-5 rounded-sm flex items-center gap-4">
                <div className="h-12 w-1 bg-brand-gold rounded-full flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-brand-green text-sm">
                    Registered Office
                  </p>
                  <p className="font-body text-gray-500 text-sm">
                    Jalaram Niwas, 1st Kumbharwada, Mumbai – 400 004
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="section-title">
                Built for Industrial Steel Buyers
              </h2>
              <div className="section-divider" />

              <p className="font-body text-gray-600 text-base leading-relaxed mb-5">
                Bhumi Steel &amp; Alloys was founded with a single purpose: to serve industrial
                buyers who need accurate product specifications, honest pricing, and reliable
                dispatch — without the friction of dealing with unverified suppliers.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-5">
                Operating out of <strong className="text-brand-charcoal">Mumbai</strong> and
                the MIDC Bhosari industrial belt in{' '}
                <strong className="text-brand-charcoal">Pune</strong>, we've built a
                catalogue of 417+ products spanning stainless steel, alloy steel, carbon
                steel, titanium, nickel alloys, and more.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-8">
                Every transaction is GST-compliant, documented, and subject to Mumbai
                jurisdiction. We work exclusively in the B2B segment — serving fabricators,
                EPC contractors, OEMs, and project procurement teams.
              </p>

              <Link to="/contact" id="about-story-cta" className="btn-outline-green">
                Enquire Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Journey / Milestones ─────────────────────────────────────── */}
      <section id="about-journey" className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">Our Journey</p>
            <h2 className="section-title mx-auto">How We've Grown</h2>
            <div className="section-divider mx-auto" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              From a focused Mumbai trading desk to a multi-office, 417-product operation serving
              buyers across India.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-green via-brand-gold to-transparent hidden sm:block" />

            <div className="space-y-8">
              {milestones.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={title}
                  id={`milestone-${i}`}
                  className="relative flex items-start gap-6 sm:gap-10 group"
                >
                  {/* Circle node */}
                  <div className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-brand-green group-hover:border-brand-gold group-hover:bg-brand-gold/5 shadow-card transition-all duration-300 items-center justify-center z-10">
                    <Icon
                      size={22}
                      className="text-brand-green group-hover:text-brand-gold transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Mobile icon */}
                  <div className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-brand-green/10 border border-brand-green flex items-center justify-center">
                    <Icon size={18} className="text-brand-green" strokeWidth={1.75} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-sm border border-gray-100 shadow-card group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-brand-gold/30 transition-all duration-300 p-6">
                    <h3 className="font-display font-bold text-brand-green text-lg mb-2">
                      {title}
                    </h3>
                    <p className="font-body text-gray-500 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section id="about-values" className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">Our Values</p>
            <h2 className="section-title mx-auto">What Drives Us</h2>
            <div className="section-divider mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-base p-7 group text-center"
              >
                <div className="mx-auto mb-5 w-14 h-14 rounded-sm bg-brand-green/8 flex items-center justify-center group-hover:bg-brand-green transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-brand-green group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-display font-bold text-brand-green text-base mb-3">
                  {title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offices ──────────────────────────────────────────────────────── */}
      <section id="about-offices" className="section-padding bg-gray-50">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">Where We Are</p>
            <h2 className="section-title mx-auto">Our Offices</h2>
            <div className="section-divider mx-auto" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Two offices — one in Mumbai's commercial heart, one in Pune's industrial
              corridor — to serve you wherever your projects are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {offices.map(({ id, type, city, address, note, border, badge }) => (
              <div
                key={id}
                id={`about-office-${id}`}
                className={`rounded-sm border-t-4 ${border} bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-8`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`${badge} text-white text-xs font-display font-bold px-3 py-1 rounded-sm uppercase tracking-wider`}
                  >
                    {type}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Building2 size={18} className="text-brand-green" strokeWidth={1.75} />
                  <h3 className="font-display font-extrabold text-2xl text-brand-green">
                    {city}
                  </h3>
                </div>

                <div className="flex gap-3 mb-6">
                  <MapPin
                    size={16}
                    className="text-brand-gold flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <address className="not-italic font-body text-gray-600 text-sm leading-relaxed">
                    {address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < address.length - 1 && <br />}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="pt-5 border-t border-gray-100">
                  <p className="font-body text-xs text-gray-400 italic">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="about-cta"
        className="bg-brand-green py-20 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 steel-texture opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-brand-gold font-display font-bold text-sm uppercase tracking-[0.2em] mb-2">
              Ready to Work Together?
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Let's discuss your requirement.
            </h2>
            <p className="font-body text-gray-300 text-base mt-3 max-w-md">
              Share your grade, size, and quantity — we'll respond with pricing and
              availability within one business day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link to="/contact" id="about-cta-contact" className="btn-primary">
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <Link to="/products" id="about-cta-products" className="btn-outline">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
