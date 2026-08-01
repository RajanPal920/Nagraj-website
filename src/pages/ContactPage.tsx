import { useState, type FormEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────────────────────── */

const contactDetails = [
  {
    id: 'phone-landline',
    icon: Phone,
    label: 'Landline',
    display: '22 6636 2548',
    href: 'tel:+912266362548',
  },
  {
    id: 'phone-mobile',
    icon: Phone,
    label: 'Mobile',
    display: '70215 40962 · 97304 26918',
    href: 'tel:+917021540962',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    display: 'bhumisteel11@gmail.com',
    href: 'mailto:bhumisteel11@gmail.com',
  },
];

const offices = [
  {
    id: 'mumbai',
    type: 'Registered Office',
    city: 'Mumbai',
    lines: [
      'Jalaram Niwas, Plot No. 2,',
      '1st Floor, Office No. 1,',
      '1st Kumbharwada,',
      'Mumbai – 400 004.',
    ],
    note: 'Subject to Mumbai Jurisdiction',
    border: 'border-brand-green',
    badge: 'bg-brand-green',
  },
  {
    id: 'pune',
    type: 'Branch Office',
    city: 'Pune',
    lines: [
      'Shop No. 3, Sai Nagar Complex,',
      'Plot No. J-66, Opp. J-35,',
      'Block MIDC, Bhosari,',
      'Pune, Maharashtra.',
    ],
    note: 'MIDC Bhosari Industrial Belt',
    border: 'border-brand-gold',
    badge: 'bg-brand-gold',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* SEO */}
      <title>Contact Bhumi Steel & Alloys | Mumbai & Pune</title>
      <meta
        name="description"
        content="Contact Bhumi Steel & Alloys for product enquiries, pricing, and quotes. Reach our Mumbai or Pune office by phone, email, or through our enquiry form."
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="contact-hero"
        className="bg-steel-gradient steel-texture relative overflow-hidden py-28 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

        <div className="max-w-7xl mx-auto relative z-10">
          <p className="section-label">Reach Us</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 max-w-2xl">
            Get In Touch
          </h1>
          <div className="w-16 h-1 bg-brand-gold mb-7" />
          <p className="font-body text-gray-300 text-lg max-w-xl leading-relaxed">
            Share your requirement and we'll respond with specifications and
            pricing within one business day. For urgent needs, call us directly.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section
        id="contact-main"
        className="section-padding bg-white"
      >
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

            {/* ── Left: Details + Offices ── */}
            <div className="space-y-10">

              {/* Contact details */}
              <div>
                <p className="section-label">Contact Details</p>
                <h2 className="section-title mb-2">How to Reach Us</h2>
                <div className="section-divider" />

                <div className="space-y-4 mt-6">
                  {contactDetails.map(({ id, icon: Icon, label, display, href }) => (
                    <a
                      key={id}
                      href={href}
                      id={`contact-detail-${id}`}
                      className="flex items-center gap-4 group"
                      aria-label={`${label}: ${display}`}
                    >
                      <div className="w-12 h-12 rounded-sm bg-brand-green/8 border border-brand-green/20 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300 flex-shrink-0">
                        <Icon
                          size={18}
                          className="text-brand-green group-hover:text-white transition-colors duration-300"
                          strokeWidth={1.75}
                        />
                      </div>
                      <div>
                        <p className="font-body text-gray-400 text-xs mb-0.5">{label}</p>
                        <p className="font-display font-bold text-brand-charcoal text-base group-hover:text-brand-green transition-colors duration-200">
                          {display}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office cards */}
              <div>
                <p className="font-display font-bold text-xs text-brand-gold uppercase tracking-[0.2em] mb-5">
                  Our Offices
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {offices.map(({ id, type, city, lines, note, border, badge }) => (
                    <div
                      key={id}
                      id={`contact-office-${id}`}
                      className={`rounded-sm border-t-4 ${border} bg-gray-50 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300`}
                    >
                      <div className={`${badge} text-white text-[10px] font-display font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider inline-block mb-4`}>
                        {type}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 size={15} className="text-brand-green" strokeWidth={1.75} />
                        <h3 className="font-display font-extrabold text-lg text-brand-green">
                          {city}
                        </h3>
                      </div>
                      <div className="flex gap-2.5 mb-4">
                        <MapPin
                          size={13}
                          className="text-brand-gold flex-shrink-0 mt-0.5"
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
                        <p className="font-body text-[11px] text-gray-400 italic">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Right: Enquiry form ── */}
            <div
              id="contact-form-card"
              className="bg-brand-green-dark rounded-sm p-8 sm:p-10 shadow-card-hover relative overflow-hidden"
            >
              {/* Subtle texture */}
              <div className="absolute inset-0 steel-texture opacity-30 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

              <div className="relative z-10">
                <p className="text-brand-gold font-display font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  Enquiry Form
                </p>
                <h2 className="font-display font-extrabold text-2xl text-white mb-1">
                  Send Us Your Requirement
                </h2>
                <p className="font-body text-white/50 text-sm mb-7">
                  We respond within one business day.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <CheckCircle2
                      size={56}
                      className="text-brand-gold mb-5"
                      strokeWidth={1.25}
                    />
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      Enquiry Received!
                    </h3>
                    <p className="font-body text-white/60 text-sm max-w-xs leading-relaxed">
                      We'll get back to you within one business day. You can
                      also reach us at{' '}
                      <a
                        href="mailto:bhumisteel11@gmail.com"
                        className="text-brand-gold hover:underline"
                      >
                        bhumisteel11@gmail.com
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
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
                        className="block font-body text-white/70 text-xs mb-1.5"
                      >
                        Full Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Rajesh Mehta"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-gold focus:bg-white/15 transition-all duration-200"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-body text-white/70 text-xs mb-1.5"
                      >
                        Phone Number <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-gold focus:bg-white/15 transition-all duration-200"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-body text-white/70 text-xs mb-1.5"
                      >
                        Email Address{' '}
                        <span className="text-white/30 font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. rajesh@company.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-gold focus:bg-white/15 transition-all duration-200"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block font-body text-white/70 text-xs mb-1.5"
                      >
                        Product / Requirement
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Describe the product, grade, size, quantity, or any specific requirement…"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-gold focus:bg-white/15 transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="w-full btn-primary justify-center py-3.5"
                    >
                      Send Enquiry
                      <Send size={15} />
                    </button>

                    <p className="font-body text-white/30 text-[11px] text-center leading-relaxed pt-1">
                      This form is UI-only. For a guaranteed response, also email us at{' '}
                      <a
                        href="mailto:bhumisteel11@gmail.com"
                        className="text-brand-gold/70 hover:text-brand-gold transition-colors"
                      >
                        bhumisteel11@gmail.com
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
          <p className="font-display font-bold text-xs text-brand-gold uppercase tracking-[0.2em] mb-2">
            Find Us
          </p>
          <h2 className="font-display font-bold text-xl text-brand-green mb-5">
            Mumbai Registered Office
          </h2>
        </div>
        <div className="w-full h-72 sm:h-96">
          <iframe
            title="Bhumi Steel Mumbai Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.946!2d72.8300!3d18.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5b96a8d1a3%3A0x0!2s1st+Kumbharwada%2C+Mumbai%2C+Maharashtra+400004!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
