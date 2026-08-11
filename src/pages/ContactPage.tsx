import { useState, type FormEvent } from "react";
import { PageHero } from "../components/PageHero";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  User,
  Globe,
} from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const contactDetails = [
  {
    id: "phone-primary",
    icon: Phone,
    label: "Phone",
    display: "+91 7073875529",
    href: "tel:+917073875529",
  },
  {
    id: "phone-secondary",
    icon: Phone,
    label: "Phone",
    display: "+91 22-66518595",
    href: "tel:+912266518595",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    display: "sales@nagrajmetal.com",
    href: "mailto:sales@nagrajmetal.com",
  },
  {
    id: "website",
    icon: Globe,
    label: "Website",
    display: "www.nagrajmetal.com",
    href: "https://www.nagrajmetal.com",
  },
];

const offices = [
  {
    id: "mumbai",
    type: "Registered Office",
    city: "Mumbai",
    lines: [
      "Jalaram Niwas, Plot No. 2,",
      "1st Floor, Office No. 1,",
      "1st Kumbharwada,",
      "Mumbai – 400 004.",
    ],
    note: "Subject to Mumbai Jurisdiction",
    border: "border-brand-red",
    badge: "bg-brand-red",
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
    setSubmitted(true);
  };

  return (
    <>
      {/* SEO */}
      <title>Contact Nagraj Metal Industries | Mumbai</title>
      <meta
        name="description"
        content="Contact Nagraj Metal Industries for product enquiries, pricing, and quotes. Reach our Mumbai office by phone, email, or through our enquiry form."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        id="contact-hero"
        label="Reach Us"
        title={
          <>
            Get In <span className="text-brand-red">Touch</span>
          </>
        }
        description="Share your requirement and we'll respond with specifications and pricing within one business day. For urgent needs, call us directly."
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section id="contact-main" className="section-padding bg-white">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
            {/* ── Left: Details + Offices ── */}
            <div className="space-y-10">
              {/* Contact details */}
              <div>
                <p className="section-label text-brand-red">Contact Details</p>
                <h2 className="section-title text-brand-charcoal mb-2">
                  How to <span className="text-brand-red">Reach Us</span>
                </h2>
                <div className="section-divider bg-brand-red" />

                <div className="space-y-4 mt-6">
                  {/* Contact Person */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-sm bg-brand-red/8 border border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red transition-all duration-300 flex-shrink-0">
                      <User
                        size={18}
                        className="text-brand-red group-hover:text-white transition-colors duration-300"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div>
                      <p className="font-body text-gray-500 text-xs mb-0.5">
                        Contact Person
                      </p>
                      <p className="font-display font-bold text-brand-charcoal text-base">
                        Mr. Rajesh (CEO)
                      </p>
                    </div>
                  </div>

                  {contactDetails.map(
                    ({ id, icon: Icon, label, display, href }) => (
                      <a
                        key={id}
                        href={href}
                        id={`contact-detail-${id}`}
                        className="flex items-center gap-4 group"
                        aria-label={`${label}: ${display}`}
                        target={id === "website" ? "_blank" : undefined}
                        rel={
                          id === "website" ? "noopener noreferrer" : undefined
                        }
                      >
                        <div className="w-12 h-12 rounded-sm bg-brand-red/8 border border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red transition-all duration-300 flex-shrink-0">
                          <Icon
                            size={18}
                            className="text-brand-red group-hover:text-white transition-colors duration-300"
                            strokeWidth={1.75}
                          />
                        </div>
                        <div>
                          <p className="font-body text-gray-500 text-xs mb-0.5">
                            {label}
                          </p>
                          <p className="font-display font-bold text-brand-charcoal text-base group-hover:text-brand-red transition-colors duration-200">
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
                <p className="font-display font-bold text-xs text-brand-red uppercase tracking-[0.2em] mb-5">
                  Our Office
                </p>
                <div className="grid sm:grid-cols-1 gap-5 max-w-md">
                  {offices.map(
                    ({ id, type, city, lines, note, border, badge }) => (
                      <div
                        key={id}
                        id={`contact-office-${id}`}
                        className={`rounded-sm border-t-4 ${border} bg-gray-50 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300`}
                      >
                        <div
                          className={`${badge} text-white text-[10px] font-display font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider inline-block mb-4`}
                        >
                          {type}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Building2
                            size={15}
                            className="text-brand-red"
                            strokeWidth={1.75}
                          />
                          <h3 className="font-display font-extrabold text-lg text-brand-red">
                            {city}
                          </h3>
                        </div>
                        <div className="flex gap-2.5 mb-4">
                          <MapPin
                            size={13}
                            className="text-brand-red flex-shrink-0 mt-0.5"
                            strokeWidth={2}
                          />
                          <address className="not-italic font-body text-gray-500 text-xs leading-relaxed">
                            {lines.map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < lines.length - 1 && <br />}
                              </span>
                            ))}
                          </address>
                        </div>
                        <div className="pt-3 border-t border-gray-200">
                          <p className="font-body text-[11px] text-gray-600 italic">
                            {note}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Enquiry form ── */}
            <div
              id="contact-form-card"
              className="bg-brand-red rounded-sm p-8 sm:p-10 shadow-card-hover relative overflow-hidden"
            >
              {/* Subtle texture */}
              <div className="absolute inset-0 steel-texture opacity-10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-dark" />

              <div className="relative z-10">
                <p className="text-white/80 font-display font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  Enquiry Form
                </p>
                <h2 className="font-display font-extrabold text-2xl text-white mb-1">
                  Send Us Your Requirement
                </h2>
                <p className="font-body text-white/80 text-sm mb-7">
                  We respond within one business day.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <CheckCircle2
                      size={56}
                      className="text-white mb-5"
                      strokeWidth={1.25}
                    />
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      Enquiry Received!
                    </h3>
                    <p className="font-body text-white/70 text-sm max-w-xs leading-relaxed">
                      We'll get back to you within one business day. You can
                      also reach us at{" "}
                      <a
                        href="mailto:sales@nagrajmetal.com"
                        className="text-white hover:underline font-semibold"
                      >
                        sales@nagrajmetal.com
                      </a>
                      .
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
                      className="mt-6 text-xs font-display font-bold text-white/40 hover:text-white transition-colors"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form
                    id="contact-enquiry-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-body text-white/80 text-xs mb-1.5"
                      >
                        Full Name <span className="text-white">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Rajesh Mehta"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-body text-white/80 text-xs mb-1.5"
                      >
                        Phone Number <span className="text-white">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-body text-white/80 text-xs mb-1.5"
                      >
                        Email Address{" "}
                        <span className="text-white/40 font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. rajesh@company.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-body text-white/80 text-xs mb-1.5"
                      >
                        Product / Requirement
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Describe the product, grade, size, quantity, or any specific requirement…"
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full bg-white hover:bg-white/90 text-brand-red font-display font-bold px-8 py-3.5 rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                    >
                      Send Enquiry
                      <Send size={15} />
                    </button>

                    <p className="font-body text-white/50 text-xs text-center mt-6">
                      *This form is UI-only. For a guaranteed response, also
                      email{" "}
                      <a
                        href="mailto:sales@nagrajmetal.com"
                        className="text-white hover:underline"
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
      </section>

      {/* ── Map ──────────────────────────────────────────────────────────── */}
      <section id="contact-map" className="bg-gray-50 border-t border-gray-100">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 py-10">
          <p className="font-display font-bold text-xs text-brand-red uppercase tracking-[0.2em] mb-2">
            Find Us
          </p>
          <h2 className="font-display font-bold text-xl text-brand-charcoal mb-5">
            Mumbai <span className="text-brand-red">Registered Office</span>
          </h2>
        </div>
        <div className="w-full h-72 sm:h-96">
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
