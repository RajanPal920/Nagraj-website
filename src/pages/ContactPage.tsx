import { useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  User,
  Globe,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const contactDetails = [
  {
    id: "phone-primary",
    icon: Phone,
    label: "Sales & Technical Desk",
    display: "+91 7073875529",
    href: "tel:+917073875529",
  },
  {
    id: "phone-secondary",
    icon: Phone,
    label: "Mumbai Landline",
    display: "+91 22-66518595",
    href: "tel:+912266518595",
  },
  {
    id: "email",
    icon: Mail,
    label: "Official Enquiries",
    display: "sales@nagrajmetal.com",
    href: "mailto:sales@nagrajmetal.com",
  },
  {
    id: "website",
    icon: Globe,
    label: "Official Portal",
    display: "www.nagrajmetal.com",
    href: "https://www.nagrajmetal.com",
  },
];

const offices = [
  {
    id: "mumbai",
    type: "Registered Head Office",
    city: "Mumbai",
    lines: [
      "Jalaram Niwas, Plot No. 2,",
      "1st Floor, Office No. 1,",
      "1st Kumbharwada,",
      "Mumbai – 400 004, Maharashtra, India.",
    ],
    note: "Subject to Mumbai Jurisdiction",
    border: "border-[#8B1A1A]",
    badge: "bg-[#8B1A1A]",
  },
  {
    id: "pune",
    type: "Branch Office & Stockpoint",
    city: "Pune",
    lines: [
      "SA 3/3, 'S' Block,",
      "Near SB Canteen, MIDC,",
      "Bhosari,",
      "Pune - 411026, Maharashtra, India.",
    ],
    note: "MIDC Bhosari Industrial Belt",
    border: "border-gray-800",
    badge: "bg-gray-900",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Build mailto link with form data
    const subject = encodeURIComponent(
      `Metal Enquiry from ${form.name || "Website Visitor"} — Nagraj Metal Industries`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nRequirement / Message:\n${form.message}`
    );
    window.location.href = `mailto:sales@nagrajmetal.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      {/* SEO */}
      <title>Contact Us | Nagraj Metal Industries — Mumbai & Pune</title>
      <meta
        name="description"
        content="Contact Nagraj Metal Industries for metal product enquiries, mill pricing, and rapid quotes. Reach our Mumbai HQ or Pune MIDC branch."
      />

      {/* ─── Standardized Hero (Desktop: Full Width Clear Image + Floating Navy Glass Card | Mobile: Top Image Card + Clean Stacked Content) ─── */}
      <section
        id="contact-hero"
        className="relative pt-24 overflow-hidden"
        aria-label="Contact Nagraj Metal Industries"
      >
        {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
        <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
          {/* Crystal Clear Industrial Background Image */}
          <img
            src="/images/contact.jpg"
            alt="Contact Nagraj Metal Industries"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            loading="eager"
          />

          {/* Soft left-side gradient — keeps image right side clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />

          {/* Floating Glassmorphic Card on Left */}
          <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
            <div className="relative bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/15 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300 overflow-hidden">

              {/* Subtle maroon top sheen (matches logo) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/10 via-transparent to-transparent rounded-3xl pointer-events-none" />

              {/* Content wrapper */}
              <div className="relative z-10">

                {/* Tag / Breadcrumb */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-6 h-[2px] bg-[#E63946]" />
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/90 uppercase">
                    SALES & ENQUIRIES DESK • MUMBAI & PUNE
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-white tracking-tight leading-[1.14] mb-4">
                  Connect With Industrial Sales
                  <span className="block text-[#E63946] mt-1">
                    Prompt Mill Pricing & Support.
                  </span>
                </h1>

                {/* Description */}
                <p className="text-white text-sm sm:text-[15px] leading-relaxed mb-6 font-bold max-w-lg">
                  Reach out directly for custom fabrication inquiries, volume mill pricing, material test reports, or stock availability. Our sales engineers respond within one business day.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3.5 mb-6 flex-wrap">
                  <a
                    href="tel:+917073875529"
                    id="contact-hero-call-btn"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#B22222] to-[#7B1E1E] hover:from-[#8B1A1A] hover:to-[#5C1414] text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone size={15} />
                    <span>Call: +91 7073875529</span>
                  </a>
                  <a
                    href="mailto:sales@nagrajmetal.com"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Mail size={15} />
                    <span>sales@nagrajmetal.com</span>
                  </a>
                </div>

                {/* Feature Badges Row */}
                <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/95 font-medium flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      ✓
                    </span>
                    <span>1-Day RFQ Turnaround</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      ✓
                    </span>
                    <span>Mumbai & Pune Stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      ✓
                    </span>
                    <span>Direct Mill Pricing</span>
                  </div>
                </div>

              </div>{/* close content wrapper */}
            </div>{/* close card */}
          </div>
        </div>

        {/* MOBILE HERO (block on mobile, hidden on lg+) */}
        <div className="block lg:hidden w-full bg-white pb-6">
          {/* Hero Image at Top: Clean, Complete & Completely Visible */}
          <div className="px-4 pt-3 pb-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src="/images/contact.jpg"
                alt="Contact Nagraj Metal Industries"
                className="w-full h-auto object-cover select-none"
                loading="eager"
              />
            </div>
          </div>

          {/* Content Below Photo */}
          <div className="px-5 pt-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1 rounded-full mb-3 text-gray-800">
              <Clock size={13} className="text-[#B22222] shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider font-display">
                RAPID 1-DAY RFQ RESPONSE
              </span>
            </div>

            {/* Subtitle Uppercase Tracker */}
            <p className="text-[#B22222] font-display font-bold text-[10px] uppercase tracking-wider mb-1.5">
              SALES DESK · MUMBAI & PUNE
            </p>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold leading-[1.15] mb-3">
              <span className="text-[#B22222] block tracking-tight">CONNECT</span>
              <span className="text-gray-900 tracking-tight">With Industrial Sales</span>
            </h1>

            {/* Paragraph Text */}
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-body">
              Reach out directly for custom fabrication inquiries, volume mill pricing, material test reports, or stock availability. Our sales engineers respond within one business day.
            </p>

            {/* 2-Column Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-800 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Direct Mill Pricing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Mumbai Head Office</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>Pune MIDC Branch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">
                  ✓
                </span>
                <span>MTC with Every Batch</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-700 font-medium mb-5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#B22222]" />
                <span>100% Verified Stock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#B22222]" />
                <span>Quick Response</span>
              </div>
            </div>

            {/* Big Action Button */}
            <a
              href="tel:+917073875529"
              className="w-full py-3.5 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <Phone size={15} />
              <span>CALL NOW: +91 7073875529</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section id="contact-main" className="section-padding bg-gray-50/60">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* ── Left: Details + Offices (7 cols) ── */}
            <div className="lg:col-span-7 space-y-10">
              {/* Contact Channels */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-8 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-5 bg-[#8B1A1A]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
                    Direct Communication
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 mb-6 tracking-tight">
                  How to <span className="text-[#8B1A1A]">Reach Us</span>
                </h2>

                {/* Contact Person Highlight */}
                <div className="bg-gradient-to-r from-gray-950 to-[#190a0a] rounded-xl p-5 mb-6 text-white border border-gray-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/30 border border-[#8B1A1A]/50 flex items-center justify-center flex-shrink-0">
                      <User size={22} className="text-[#B22222]" />
                    </div>
                    <div>
                      <p className="font-body text-gray-400 text-xs uppercase tracking-wider mb-0.5">
                        Executive Leadership
                      </p>
                      <p className="font-display font-bold text-white text-base sm:text-lg">
                        Mr. Rajesh Padhiyar <span className="text-xs text-[#B22222] font-semibold">(CEO)</span>
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:+917073875529"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#8B1A1A] transition-colors text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                </div>

                {/* Contact List */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactDetails.map(
                    ({ id, icon: Icon, label, display, href }) => (
                      <a
                        key={id}
                        href={href}
                        id={`contact-detail-${id}`}
                        className="bg-gray-50/80 hover:bg-white border border-gray-200/80 hover:border-[#8B1A1A]/40 rounded-xl p-4 transition-all duration-300 group flex items-start gap-3.5 shadow-xs hover:shadow-md"
                        aria-label={`${label}: ${display}`}
                        target={id === "website" ? "_blank" : undefined}
                        rel={
                          id === "website" ? "noopener noreferrer" : undefined
                        }
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-all duration-300 flex-shrink-0 mt-0.5">
                          <Icon
                            size={18}
                            className="text-[#8B1A1A] group-hover:text-white transition-colors duration-300"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-body text-gray-400 text-[11px] uppercase tracking-wider mb-0.5">
                            {label}
                          </p>
                          <p className="font-display font-bold text-gray-900 text-sm group-hover:text-[#8B1A1A] transition-colors truncate">
                            {display}
                          </p>
                        </div>
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Office cards */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-[#8B1A1A]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
                    Industrial Locations
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {offices.map(
                    ({ id, type, city, lines, note, border, badge }) => (
                      <div
                        key={id}
                        id={`contact-office-${id}`}
                        className={`rounded-2xl border-t-4 ${border} bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-x border-b border-gray-200/80 flex flex-col`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`${badge} text-white text-[10px] font-display font-bold px-2.5 py-1 rounded-md uppercase tracking-wider inline-block`}
                          >
                            {type}
                          </div>
                          <Building2
                            size={16}
                            className="text-gray-400"
                            strokeWidth={1.8}
                          />
                        </div>

                        <h3 className="font-display font-extrabold text-xl text-gray-900 mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                          {city} Office
                        </h3>

                        <div className="flex gap-2.5 mb-5 flex-1">
                          <MapPin
                            size={15}
                            className="text-[#8B1A1A] flex-shrink-0 mt-1"
                            strokeWidth={2}
                          />
                          <address className="not-italic font-body text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {lines.map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < lines.length - 1 && <br />}
                              </span>
                            ))}
                          </address>
                        </div>

                        <div className="pt-3 border-t border-gray-100 mt-auto">
                          <p className="font-body text-[11px] text-gray-500 font-medium">
                            {note}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Enquiry form (5 cols) ── */}
            <div className="lg:col-span-5">
              <div
                id="contact-form-card"
                className="bg-gradient-to-b from-gray-950 via-[#140b0b] to-black rounded-2xl p-7 sm:p-9 shadow-2xl relative overflow-hidden border border-gray-800 text-white"
              >
                {/* Accent top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8B1A1A] to-transparent" />
                <div className="absolute inset-0 steel-texture opacity-10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1 h-4 bg-[#8B1A1A]" />
                    <span className="text-[10px] font-bold text-[#B22222] uppercase tracking-[0.25em]">
                      Request A Quote
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl text-white mb-1.5 tracking-tight">
                    Send Us Your Requirement
                  </h2>
                  <p className="font-body text-gray-400 text-xs sm:text-sm mb-7">
                    Specify grades, sizes, or quantities. We respond within 1 business day.
                  </p>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                        <CheckCircle2
                          size={36}
                          className="text-green-400"
                          strokeWidth={2}
                        />
                      </div>
                      <h3 className="font-display font-extrabold text-xl text-white mb-2">
                        Enquiry Received!
                      </h3>
                      <p className="font-body text-gray-300 text-xs sm:text-sm max-w-xs leading-relaxed mb-6">
                        Thank you for reaching out. Our industrial sales team will review your specifications and contact you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            phone: "",
                            email: "",
                            message: "",
                          });
                        }}
                        className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-display font-bold uppercase tracking-wider transition-colors"
                      >
                        Submit Another Requirement
                      </button>
                    </div>
                  ) : (
                    <form
                      id="contact-enquiry-form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                        >
                          Full Name <span className="text-[#B22222]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="e.g. Rajesh Padhiyar"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="w-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-[#8B1A1A] focus:bg-white/10 transition-all duration-200"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                        >
                          Phone Number <span className="text-[#B22222]">*</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          className="w-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-[#8B1A1A] focus:bg-white/10 transition-all duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                        >
                          Email Address{" "}
                          <span className="text-gray-500 font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="e.g. procurement@company.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="w-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-[#8B1A1A] focus:bg-white/10 transition-all duration-200"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                        >
                          Material & Specifications
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Describe the product, steel grade, dimension/OD/thickness, quantity, delivery location…"
                          value={form.message}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, message: e.target.value }))
                          }
                          className="w-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-[#8B1A1A] focus:bg-white/10 transition-all duration-200 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="w-full bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-xs uppercase tracking-wider"
                      >
                        <span>Send Material Enquiry</span>
                        <Send size={15} />
                      </button>

                      <p className="font-body text-gray-400 text-[11px] text-center mt-4">
                        For immediate order dispatch, you can also email{" "}
                        <a
                          href="mailto:sales@nagrajmetal.com"
                          className="text-[#B22222] hover:underline font-semibold"
                        >
                          sales@nagrajmetal.com
                        </a>
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <section id="contact-map" className="bg-white border-t border-gray-200/80">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1 h-4 bg-[#8B1A1A]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B1A1A]">
                  Head Office Location
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 tracking-tight">
                Mumbai <span className="text-[#8B1A1A]">Registered Office</span>
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Nagraj+Metal+Industries+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1A1A] hover:text-[#6F1414]"
            >
              <span>Open in Google Maps</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="w-full h-80 sm:h-96 border-t border-gray-200">
          <iframe
            title="Nagraj Metal Industries Mumbai Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.946!2d72.8278669!3d18.960116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf1df5c408e9%3A0x2abe5b7931e65a0a!2sNagraj%20Metal%20Industries!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
