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
    <section id="locations" className="section-padding bg-gray-50">
      <div className="container-xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-10 md:mb-14 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p className="section-label text-brand-red text-xs sm:text-sm">
            Connect With Us
          </p>
          <h2 className="section-title text-brand-charcoal mx-auto text-2xl sm:text-3xl md:text-4xl">
            Our <span className="text-brand-red">Presence</span>
          </h2>
          <div className="section-divider mx-auto bg-brand-red w-12 sm:w-16" />
          <p className="font-body text-gray-500 text-sm sm:text-base max-w-xl mx-auto px-4">
            Nagraj Metal Industries operates from Mumbai and Pune, serving
            industrial clients across India with quality steel products and
            reliable service.
          </p>
        </div>

        {/* Single Container with Office Details and Contact Information */}
        <div
          ref={gridRef}
          className={`max-w-4xl mx-auto bg-white rounded-lg shadow-card p-6 sm:p-8 border border-gray-100 ${gridVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* ISO Badge */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Award size={14} className="sm:w-4 sm:h-4" />
              <span className="font-display font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                ISO Certified Company
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-charcoal">
              Get in <span className="text-brand-red">Touch</span>
            </h3>
            <p className="font-body text-gray-500 text-xs sm:text-sm mt-1">
              Reach out to us for inquiries, quotes, or technical support
            </p>
          </div>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {offices.map(({ id, type, city, address, note }, index) => (
              <div
                key={id}
                id={`office-${id}`}
                className={`rounded-lg border-t-4 border-brand-red bg-gray-50 p-4 sm:p-5 hover:shadow-card-hover transition-all duration-300 ${gridVisible ? `animate-fade-in-up stagger-${(index % 2) + 1}` : "opacity-0"}`}
              >
                {/* Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="bg-brand-red text-white text-[10px] font-display font-bold px-2 py-0.5 rounded-lg uppercase tracking-wider">
                    {type}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock size={10} />
                    <span>Mon-Sat 9AM-6PM</span>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center gap-2 mb-2">
                  <Building2
                    size={14}
                    className="text-brand-red"
                    strokeWidth={1.75}
                  />
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-brand-red">
                    {city}
                  </h3>
                </div>

                {/* Address */}
                <div className="flex gap-2 mb-3">
                  <MapPin
                    size={12}
                    className="text-brand-red flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <address className="not-italic font-body text-gray-600 text-[11px] sm:text-xs leading-relaxed">
                    {address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < address.length - 1 && <br />}
                      </span>
                    ))}
                  </address>
                </div>

                {/* Note */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="font-body text-[10px] text-gray-500 italic flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-red rounded-full flex-shrink-0"></span>
                    {note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 sm:pt-6 border-t border-gray-200">
            {/* Contact Person */}
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-brand-red/5 transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <User
                  size={16}
                  className="text-brand-red sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Contact Person
                </p>
                <p className="font-display font-bold text-brand-charcoal text-xs sm:text-sm">
                  Mr. Rajesh Padhiyar
                </p>
                <p className="font-body text-[10px] sm:text-xs text-gray-500">
                  (CEO)
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-brand-red/5 transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <Phone
                  size={16}
                  className="text-brand-red sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Phone
                </p>
                <a
                  href="tel:+917073875529"
                  className="font-body text-brand-charcoal hover:text-brand-red transition-colors text-xs sm:text-sm block"
                >
                  +91 7073875529
                </a>
                <a
                  href="tel:+912266518595"
                  className="font-body text-brand-charcoal hover:text-brand-red transition-colors text-xs sm:text-sm block"
                >
                  +91 22-66518595
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-brand-red/5 transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <Mail
                  size={16}
                  className="text-brand-red sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Email
                </p>
                <a
                  href="mailto:sales@nagrajmetal.com"
                  className="font-body text-brand-charcoal hover:text-brand-red transition-colors text-xs sm:text-sm block"
                >
                  sales@nagrajmetal.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-brand-red/5 transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                <MapPin
                  size={16}
                  className="text-brand-red sm:w-[18px] sm:h-[18px]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Main Office
                </p>
                <p className="font-body text-brand-charcoal text-[10px] sm:text-xs leading-relaxed">
                  Jalaram Niwas, Plot No. 2,
                  <br />
                  1st Floor, 1st Kumbharwada,
                  <br />
                  Mumbai 400004
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-100 text-center">
            <p className="font-body text-[10px] sm:text-xs text-gray-400 leading-relaxed">
              <span className="text-brand-red font-semibold">✓</span> Registered
              with semi-govt., govt., private & multinational companies
              <span className="hidden sm:inline mx-2">|</span>
              <br className="sm:hidden" />
              <span className="text-brand-red font-semibold">✓</span> Modvat
              invoices & excise benefits available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}