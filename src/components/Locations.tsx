import {
  MapPin,
  Building2,
  Phone,
  Mail,
  User,
  Clock,
  Award,
} from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
  },
  {
    id: "pune",
    type: "Branch Office",
    city: "Pune",
    address: [
      "SA 3/3, 'S' Block,",
      "Near SB Canteen, MIDC,",
      "Bhosari,",
      "Pune - 411 026.",
    ],
    note: "MIDC Bhosari Industrial Belt",
  },
];

export function Locations() {
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
            <Building2 size={14} className="text-[#8B1A1A]" />
            <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
              Strategic Presence
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Corporate & Industrial <span className="text-[#8B1A1A]">Offices</span>
          </h2>
          <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto mb-4" />
          <p className="font-body text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Operating from registered facilities in Mumbai and Pune to guarantee rapid response, stock dispatch, and technical support across India.
          </p>
        </div>

        {/* Single Container with Office Details and Contact Information */}
        <div
          ref={gridRef}
          className={`max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200/80 p-6 sm:p-10 ${gridVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* ISO Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#8B1A1A]/10 text-[#8B1A1A] px-4 py-1.5 rounded-full mb-3 border border-[#8B1A1A]/20">
              <Award size={15} />
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                ISO 9001:2015 Certified Metal Supplier
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-gray-900">
              Direct Contact & <span className="text-[#8B1A1A]">Operations</span>
            </h3>
            <p className="font-body text-gray-500 text-xs sm:text-sm mt-1">
              Reach our central sales desk for instantaneous quotes, MTC requests, or technical consultation
            </p>
          </div>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {offices.map(({ id, type, city, address, note }, index) => (
              <div
                key={id}
                id={`office-${id}`}
                className={`rounded-2xl border border-gray-200/80 bg-gray-50/60 p-6 hover:border-[#8B1A1A]/40 hover:shadow-md transition-all duration-300 ${gridVisible ? `animate-fade-in-up stagger-${(index % 2) + 1}` : "opacity-0"}`}
              >
                {/* Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="bg-[#8B1A1A] text-white text-[11px] font-display font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
                    {type}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Clock size={12} className="text-[#8B1A1A]" />
                    <span>Mon–Sat 9AM–6PM</span>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center gap-2.5 mb-3">
                  <Building2
                    size={18}
                    className="text-[#8B1A1A]"
                    strokeWidth={2}
                  />
                  <h3 className="font-display font-extrabold text-xl text-gray-900">
                    {city}
                  </h3>
                </div>

                {/* Address */}
                <div className="flex gap-2.5 mb-4">
                  <MapPin
                    size={16}
                    className="text-[#8B1A1A] shrink-0 mt-0.5"
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

                {/* Note */}
                <div className="pt-3 border-t border-gray-200/80">
                  <p className="font-body text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#8B1A1A] rounded-full shrink-0" />
                    <span>{note}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            {/* Contact Person */}
            <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                <User size={18} className="text-[#8B1A1A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Executive Desk
                </p>
                <p className="font-display font-bold text-gray-900 text-xs sm:text-sm truncate">
                  Mr. Rajesh Padhiyar
                </p>
                <p className="font-body text-[11px] text-gray-500">Chief Executive Officer</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-[#8B1A1A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Direct Line
                </p>
                <a
                  href="tel:+917073875529"
                  className="font-body font-bold text-gray-900 hover:text-[#8B1A1A] transition-colors text-xs sm:text-sm block"
                >
                  +91 7073875529
                </a>
                <a
                  href="tel:+912266518595"
                  className="font-body text-gray-500 hover:text-[#8B1A1A] transition-colors text-xs block"
                >
                  +91 22-66518595
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#8B1A1A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Official Email
                </p>
                <a
                  href="mailto:sales@nagrajmetal.com"
                  className="font-body font-semibold text-gray-900 hover:text-[#8B1A1A] transition-colors text-xs sm:text-sm block truncate"
                >
                  sales@nagrajmetal.com
                </a>
                <p className="font-body text-[11px] text-gray-500">24-Hour SLA</p>
              </div>
            </div>

            {/* Jurisdiction */}
            <div className="flex items-start gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-[#8B1A1A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Jurisdiction
                </p>
                <p className="font-body font-bold text-gray-900 text-xs sm:text-sm">
                  Mumbai Jurisdiction
                </p>
                <p className="font-body text-[11px] text-gray-500">GST Documented</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="font-body text-xs text-gray-500 flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                <span className="text-[#8B1A1A] font-bold">✓</span> Registered with Semi-Govt., Govt. & MNCs
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                <span className="text-[#8B1A1A] font-bold">✓</span> Modvat Invoices & Excise Benefits
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}