import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
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
  Eye,
  Target,
  Award,
  Truck,
  FlaskConical,
} from "lucide-react";

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
    title: "Established Over a Decade Ago",
    description:
      "Nagraj Metal Industries was established to cater to growing demands of industrial raw materials with a team of young visionaries.",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015 Certified",
    description:
      "Proudly ISO CERTIFIED COMPANY registered with semi-govt., govt., private & multinational companies.",
  },
  {
    icon: Package,
    title: "Manufacturers, Suppliers & Exporters",
    description:
      "Became one of the most reliable sources for quality with huge stocks and comprehensive product range.",
  },
  {
    icon: Users,
    title: "Trusted by Industry Leaders",
    description:
      "Serving industrial buyers across India, from fabricators and EPC contractors to process industry OEMs.",
  },
];

const offices = [
  {
    id: "mumbai",
    type: "Registered Office",
    city: "Mumbai",
    address: [
      "Jalaram Niwas,",
      "Plot No. 2, 1st Floor, Office No. 1,",
      "1st Kumbharwada,",
      "Mumbai – 400 004.",
    ],
    note: "Subject to Mumbai Jurisdiction",
    accent: "from-brand-red to-brand-red-dark",
    border: "border-brand-red",
    badge: "bg-brand-red",
  },
  {
    id: "pune",
    type: "Branch Office",
    city: "Pune",
    address: [
      "SA 3/3, 'S' Block,",
      "Near SB Canteen, MIDC,",
      "Bhosari,",
      "Pune - 411026.",
    ],
    note: "MIDC Bhosari Industrial Belt",
    accent: "from-brand-red to-brand-red-dark",
    border: "border-brand-red",
    badge: "bg-brand-red",
  },
];

const values = [
  {
    icon: Scale,
    title: "Compliance-First",
    description:
      "All transactions are documented, GST-compliant, and subject to Mumbai jurisdiction. We operate with full transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Traceability",
    description:
      "Every product comes with verified MTCs and testing from govt. approved laboratories. Ready for third-party inspection.",
  },
  {
    icon: Layers,
    title: "Breadth of Range",
    description:
      "From stainless steel to nickel alloys — our catalogue covers the full spectrum of industrial steel needs.",
  },
  {
    icon: Users,
    title: "Buyer-Centric",
    description:
      "We assist with grade selection, equivalent standards, and project procurement strategy for every client.",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function AboutPage() {
  return (
    <>
      <title>About Nagraj Metal Industries | Mumbai & Pune Steel Traders</title>
      <meta
        name="description"
        content="Learn about Nagraj Metal Industries — a registered B2B steel trading company with offices in Mumbai and Pune, supplying quality steel products across India."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero id="about-hero" bgImage="/images/about.jpg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl ">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="bg-white/15 backdrop-blur-md rounded-lg border border-white/20 px-5 py-4 group hover:bg-white/25 hover:border-white/50 transition-all duration-300"
            >
              <Icon
                size={18}
                className="text-white mb-2 group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.75}
              />
              <div className="font-display font-extrabold text-2xl text-white">
                {value}
              </div>
              <div className="font-body text-white/80 text-xs mt-0.5 font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section id="about-story" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative w-full h-[460px] rounded-lg overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gray-100" />
              <img
                src="/images/warehouse.jpg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000";
                }}
                alt="Nagraj Metal Industries warehouse facility"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur shadow-lg p-5 rounded-lg flex items-center gap-4">
                <div className="h-12 w-1 bg-brand-red rounded-full flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-brand-red text-sm">
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
              <p className="section-label text-brand-red">About Us</p>
              <h2 className="section-title text-brand-charcoal">
                Dynamic Group with{" "}
                <span className="text-brand-red">Young Visionaries</span>
              </h2>
              <div className="section-divider bg-brand-red" />

              <p className="font-body text-gray-600 text-base leading-relaxed mb-4">
                Nagraj Metal Industries is a dynamic group, established over a
                decade ago to cater to growing demands of industrial raw
                materials. We have a team of{" "}
                <strong className="text-brand-charcoal">
                  young visionaries
                </strong>{" "}
                who endeavor for excellence in every aspect related to our
                products.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-4">
                As{" "}
                <strong className="text-brand-charcoal">
                  Manufacturers, Suppliers & Exporters
                </strong>{" "}
                with huge stocks, Nagraj Metal Industries has become one of the
                most reliable sources for quality within a short span. We are an
                <span className="text-brand-red font-semibold">
                  {" "}
                  ISO 9001:2015 CERTIFIED COMPANY
                </span>{" "}
                and are registered with the best of semi-govt., govt., private &
                multinational companies.
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                Our aim is to provide our buyers with everything in stainless
                steel under one roof. We have tied up with one of the best
                manufacturers of steel to supply high-quality & tested
                material/products to our customers at competitive rates.
              </p>

              <Link
                to="/contact"
                id="about-story-cta"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
              >
                Enquire Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Journey / Milestones ─────────────────────────────────────── */}
      <section id="about-journey" className="section-padding bg-gray-50">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Journey</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              How We've <span className="text-brand-red">Grown</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              From a focused Mumbai trading desk to an ISO-certified,
              multi-product operation serving buyers across India.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-red via-brand-red/50 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {milestones.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={title}
                  id={`milestone-${i}`}
                  className="relative flex items-start gap-6 sm:gap-10 group"
                >
                  {/* Circle node */}
                  <div className="hidden sm:flex flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-brand-red group-hover:border-brand-red-dark group-hover:bg-brand-red/5 shadow-card transition-all duration-300 items-center justify-center z-10">
                    <Icon
                      size={22}
                      className="text-brand-red group-hover:text-brand-red-dark transition-colors duration-300"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Mobile icon */}
                  <div className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-brand-red"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white rounded-lg border border-gray-100 shadow-card group-hover:shadow-card-hover group-hover:-translate-y-0.5 group-hover:border-brand-red/30 transition-all duration-300 p-6">
                    <h3 className="font-display font-bold text-brand-red text-lg mb-2">
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

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section id="about-vision-mission" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Direction</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              Vision & <span className="text-brand-red">Mission</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vision */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-brand-red/10 flex items-center justify-center mb-5">
                <Eye size={28} className="text-brand-red" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">
                Our Vision
              </h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                To become an enterprising organization in the field of Ferrous &
                Non-ferrous products. To be known more for our quality of
                products and excellent service. Maintaining an uncompromising
                attitude towards quality of our products and service back-up.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-lg bg-brand-red/10 flex items-center justify-center mb-5">
                <Target
                  size={28}
                  className="text-brand-red"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-charcoal mb-3">
                Our Mission
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-brand-red font-bold">•</span>
                  <span>To provide quality products at reasonable price</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-brand-red font-bold">•</span>
                  <span>As per schedule and maintain good relationship</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-brand-red font-bold">•</span>
                  <span>With the best people in steel business</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section id="about-values" className="section-padding bg-gray-50">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Values</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              What <span className="text-brand-red">Drives Us</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-base p-7 group text-center bg-white"
              >
                <div className="mx-auto mb-5 w-14 h-14 rounded-lg bg-brand-red/8 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-brand-red group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-display font-bold text-brand-red text-base mb-3">
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

      {/* ── Capabilities ──────────────────────────────────────────────────── */}
      <section id="about-capabilities" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Our Capabilities</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              What We <span className="text-brand-red">Offer</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <Truck size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Export Documentation
              </h4>
              <p className="font-body text-gray-500 text-xs">
                CT3/ARE4/H forms for exports arranged
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <Scale size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                GST Invoices
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Modvat/GST invoices for excise benefits
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <FlaskConical size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Laboratory Testing
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Chemical, physical, mechanical, ultrasonic, micro, IGC tests
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <ShieldCheck size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Third-Party Inspection
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Ready for any third-party inspection
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <Package size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Import Assistance
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Help import material/products adhering to your preference
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-card-hover transition-all duration-300">
              <Users size={24} className="text-brand-red mb-3" />
              <h4 className="font-display font-bold text-brand-charcoal text-sm mb-2">
                Govt. Approved Labs
              </h4>
              <p className="font-body text-gray-500 text-xs">
                Testing from govt. approved Laboratories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Offices ──────────────────────────────────────────────────────── */}
      <section id="about-offices" className="section-padding bg-gray-50">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-14">
            <p className="section-label text-brand-red">Where We Are</p>
            <h2 className="section-title text-brand-charcoal mx-auto">
              Our <span className="text-brand-red">Offices</span>
            </h2>
            <div className="section-divider mx-auto bg-brand-red" />
            <p className="font-body text-gray-500 text-base max-w-xl mx-auto">
              Based in Mumbai and Pune, serving industrial clients across India
              with quality steel products and reliable service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {offices.map(({ id, type, city, address, note, border, badge }) => (
              <div
                key={id}
                id={`about-office-${id}`}
                className={`rounded-lg border-t-4 ${border} bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-6 sm:p-8`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`${badge} text-white text-[10px] sm:text-xs font-display font-bold px-2.5 sm:px-3 py-1 rounded-lg uppercase tracking-wider`}
                  >
                    {type}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Building2
                    size={16}
                    className="text-brand-red"
                    strokeWidth={1.75}
                  />
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-red">
                    {city}
                  </h3>
                </div>

                <div className="flex gap-3 mb-4">
                  <MapPin
                    size={14}
                    className="text-brand-red flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <address className="not-italic font-body text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < address.length - 1 && <br />}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="font-body text-[10px] sm:text-xs text-gray-600 italic">
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        id="about-cta"
        className="bg-brand-red py-20 px-4 sm:px-8 lg:px-16 xl:px-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 steel-texture opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-dark" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/80 font-display font-bold text-sm uppercase tracking-[0.2em] mb-2">
              Ready to Work Together?
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              Let's discuss your requirement.
            </h2>
            <p className="font-body text-white/70 text-base mt-3 max-w-md">
              Share your grade, size, and quantity — we'll respond with pricing
              and availability within one business day.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              to="/contact"
              id="about-cta-contact"
              className="bg-white hover:bg-white/90 text-brand-red font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              id="about-cta-products"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:border-white hover:bg-white/20 text-white font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-base"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
