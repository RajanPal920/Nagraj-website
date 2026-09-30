import { useState, type FormEvent } from "react";
import { Phone, Mail, Send } from "lucide-react";

export function ContactBand() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Build WhatsApp message
    const text = encodeURIComponent(
      `Hi Nagraj Metal Industries,\n\nName: ${form.name}\nPhone: ${form.phone}\n\nRequirement:\n${form.message}\n\n— Sent via website enquiry form`
    );
    window.open(`https://wa.me/917073875529?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-gradient-to-b from-gray-950 via-[#140b0b] to-black relative overflow-hidden text-white border-t border-gray-800"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#8B1A1A]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Contact info */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
              <Mail size={14} className="text-[#D43A3A]" />
              <span className="text-[#D43A3A] font-display font-bold text-xs uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-4">
              Send Us a <span className="text-[#D43A3A]">Direct Enquiry</span>
            </h2>
            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mb-6" />

            <p className="font-body text-gray-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Share your project requirements, material grades, or sizing specifications. Our technical sales team will respond with detailed pricing, availability, and mill certificates within one business day.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="tel:+917073875529"
                id="contact-phone-primary"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#8B1A1A]/50 hover:bg-white/[0.07] transition-all duration-300 group"
                aria-label="Call primary number"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8B1A1A]/20 border border-[#8B1A1A]/30 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-colors duration-300">
                  <Phone
                    size={18}
                    className="text-[#D43A3A] group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs uppercase tracking-wider mb-0.5">
                    Primary Phone Line
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-[#D43A3A] transition-colors">
                    +91 7073875529
                  </p>
                </div>
              </a>

              <a
                href="tel:+912266518595"
                id="contact-phone-mobile-1"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#8B1A1A]/50 hover:bg-white/[0.07] transition-all duration-300 group"
                aria-label="Call mobile number 1"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8B1A1A]/20 border border-[#8B1A1A]/30 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-colors duration-300">
                  <Phone
                    size={18}
                    className="text-[#D43A3A] group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs uppercase tracking-wider mb-0.5">
                    Landline / Office Desk
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-[#D43A3A] transition-colors">
                    +91 22-66518595
                  </p>
                </div>
              </a>

              <a
                href="mailto:sales@nagrajmetal.com"
                id="contact-email"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#8B1A1A]/50 hover:bg-white/[0.07] transition-all duration-300 group"
                aria-label="Email Nagraj Metal Industries"
              >
                <div className="w-11 h-11 rounded-xl bg-[#8B1A1A]/20 border border-[#8B1A1A]/30 flex items-center justify-center group-hover:bg-[#8B1A1A] transition-colors duration-300">
                  <Mail
                    size={18}
                    className="text-[#D43A3A] group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <p className="font-body text-gray-400 text-xs uppercase tracking-wider mb-0.5">
                    Official Quotation Email
                  </p>
                  <p className="font-display font-bold text-white text-base group-hover:text-[#D43A3A] transition-colors">
                    sales@nagrajmetal.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {(
              <form
                id="enquiry-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                  >
                    Your Name <span className="text-[#D43A3A]">*</span>
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
                    className="w-full bg-white/[0.06] border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-[#D43A3A] focus:bg-white/[0.1] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                  >
                    Phone / Mobile <span className="text-[#D43A3A]">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="w-full bg-white/[0.06] border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-[#D43A3A] focus:bg-white/[0.1] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block font-body text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5"
                  >
                    Product &amp; Material Requirements
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={4}
                    placeholder="Specify metal grade, dimensions, quantity, or delivery city..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full bg-white/[0.06] border border-white/15 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-[#D43A3A] focus:bg-white/[0.1] transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="enquiry-submit-btn"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Send on WhatsApp</span>
                  <Send size={14} />
                </button>

                <p className="font-body text-gray-400 text-[11px] text-center pt-1">
                  Opens WhatsApp · Direct to sales team · Instant response
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
