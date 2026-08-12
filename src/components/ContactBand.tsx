import { useState, type FormEvent } from "react";
import { Phone, Mail, Send, CheckCircle2 } from "lucide-react";

export function ContactBand() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI-only: no backend wired up in this pass
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-brand-red relative overflow-hidden"
    >
      {/* Texture */}
      <div className="absolute inset-0 steel-texture opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red-dark" />

      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: Contact info */}
          <div>
            <p className="text-white/80 font-display font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Get In Touch
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight mb-6">
              Send Us an Enquiry
            </h2>
            <div className="w-16 h-1 bg-white/50 mb-8" />

            <p className="font-body text-white/80 text-base leading-relaxed mb-10">
              Share your requirements and we'll respond with specifications and
              pricing within one business day. For urgent needs, call us
              directly.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              <a
                href="tel:+917073875529"
                id="contact-phone-primary"
                className="flex items-center gap-4 group"
                aria-label="Call primary number"
              >
                <div className="w-11 h-11 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Phone
                    size={18}
                    className="text-white group-hover:text-brand-red transition-colors"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-body text-white/50 text-xs mb-0.5">
                    Phone
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-white/80 transition-colors">
                    +91 7073875529
                  </p>
                </div>
              </a>

              <a
                href="tel:+912266518595"
                id="contact-phone-mobile-1"
                className="flex items-center gap-4 group"
                aria-label="Call mobile number 1"
              >
                <div className="w-11 h-11 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Phone
                    size={18}
                    className="text-white group-hover:text-brand-red transition-colors"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-body text-white/50 text-xs mb-0.5">
                    Mobile
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-white/80 transition-colors">
                    +91 22-66518595
                  </p>
                </div>
              </a>

              <a
                href="mailto:sales@nagrajmetal.com"
                id="contact-email"
                className="flex items-center gap-4 group"
                aria-label="Email Nagraj Metal Industries"
              >
                <div className="w-11 h-11 rounded-lg bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <Mail
                    size={18}
                    className="text-white group-hover:text-brand-red transition-colors"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <p className="font-body text-white/50 text-xs mb-0.5">
                    Email
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-white/80 transition-colors">
                    sales@nagrajmetal.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2
                  size={52}
                  className="text-white mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Enquiry Received!
                </h3>
                <p className="font-body text-white/60 text-sm">
                  We'll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                id="enquiry-form"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block font-body text-white/70 text-sm mb-2"
                  >
                    Your Name <span className="text-white">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Mehta"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block font-body text-white/70 text-sm mb-2"
                  >
                    Phone Number <span className="text-white">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block font-body text-white/70 text-sm mb-2"
                  >
                    Your Requirement
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    placeholder="Describe your product requirement, grade, quantity, etc."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/70 rounded-lg px-4 py-3 text-sm font-body focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="enquiry-submit-btn"
                  className="w-full bg-white hover:bg-white/90 text-brand-red font-display font-bold px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                >
                  Send Enquiry
                  <Send size={16} />
                </button>

                <p className="font-body text-white/40 text-xs text-center">
                  Form is UI-only. Please also email sales@nagrajmetal.com for
                  guaranteed response.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
