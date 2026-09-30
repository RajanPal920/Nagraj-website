import {
  Building2,
  Award,
  Truck,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { downloadCompanyCatalogue } from "../utils/catalogueGenerator";

const credentials = [
  {
    icon: Award,
    value: "ISO 9001:2015",
    label: "Certified Operations",
    sub: "Quality Management System",
  },
  {
    icon: Building2,
    value: "10+ Years",
    label: "Proven Excellence",
    sub: "Established Over a Decade",
  },
  {
    icon: Truck,
    value: "Pan-India",
    label: "Nationwide Supply",
    sub: "Mumbai & Pune Operations",
  },
  {
    icon: FlaskConical,
    value: "100% Tested",
    label: "Lab Verified MTCs",
    sub: "Govt. Approved Testing",
  },
];

export function About() {
  const [textRef, textVisible] = useIntersectionObserver<HTMLDivElement>();
  const [imageRef, imageVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div
            ref={textRef}
            className={`order-2 lg:order-1 ${textVisible ? "animate-reveal-left" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
              <ShieldCheck size={14} className="text-[#8B1A1A]" />
              <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
                About Nagraj Metal Industries
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 leading-tight mb-4">
              Dynamic Industrial Group Led By{" "}
              <span className="text-[#8B1A1A]">Young Visionaries</span>
            </h2>

            <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mb-6" />

            <div className="space-y-4 font-body text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Nagraj Metal Industries was established over a decade ago to cater to the growing demands of industrial raw materials. With a dedicated team of young visionaries, we strive for uncompromising excellence in material quality, precision, and reliable fulfillment.
              </p>
              <p>
                As <strong className="text-gray-900 font-semibold">Manufacturers, Suppliers & Exporters</strong> with expansive ready inventory, Nagraj Metal Industries has earned trust across India. We are an <span className="text-[#8B1A1A] font-semibold">ISO 9001:2015 CERTIFIED COMPANY</span> and a registered supplier to prominent government, semi-government, and multinational enterprises.
              </p>
              <p>
                Our objective is to deliver comprehensive metal procurement under one single roof—backed by verified manufacturer partnerships, rigorous lab test reports, and highly competitive pricing.
              </p>
            </div>

            {/* Corporate Capabilities Pill Box */}
            <div className="mt-7 p-5 bg-gray-50/80 border border-gray-200/90 rounded-2xl">
              <h4 className="font-display font-bold text-gray-900 text-xs uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-3 bg-[#8B1A1A] rounded-xs" />
                Procurement & Compliance Capabilities
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-[#8B1A1A] shrink-0" />
                  <span>CT3 / ARE4 / H Forms for Direct Exports</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-[#8B1A1A] shrink-0" />
                  <span>Modvat Invoices for Excise Benefits</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-[#8B1A1A] shrink-0" />
                  <span>Govt. Approved Laboratory Testing</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 size={15} className="text-[#8B1A1A] shrink-0" />
                  <span>Third-Party Inspection Ready (TPI)</span>
                </li>
              </ul>
            </div>

            {/* Credential Cards */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mt-7">
              {credentials.map(({ icon: Icon, value, label, sub }) => (
                <div
                  key={label}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 hover:border-[#8B1A1A]/40 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 flex items-center justify-center mb-3 group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-[#8B1A1A] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div className="font-display font-extrabold text-base sm:text-lg text-gray-900 mb-0.5">
                    {value}
                  </div>
                  <div className="font-display font-bold text-xs text-[#8B1A1A] uppercase tracking-wide mb-0.5">
                    {label}
                  </div>
                  <div className="font-body text-[11px] text-gray-400">{sub}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#8B1A1A] hover:text-[#6F1414] group transition-colors"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <button
                onClick={() => downloadCompanyCatalogue()}
                className="inline-flex items-center gap-2 bg-[#8B1A1A]/10 hover:bg-[#8B1A1A] text-[#8B1A1A] hover:text-white border border-[#8B1A1A]/30 font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <Download size={14} />
                <span>Download Company Catalogue</span>
              </button>
            </div>
          </div>

          {/* Right: Single Image with Dark Glassmorphic Info Card */}
          <div
            ref={imageRef}
            className={`order-1 lg:order-2 flex flex-col gap-4 ${imageVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {/* Primary Image: Warehouse */}
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[620px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 group">
              <img
                src="/images/aboutWarehouse.jpg"
                alt="Nagraj Metal Industries Warehouse"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* ISO Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-2 border border-gray-100">
                <Award size={15} className="text-[#8B1A1A]" />
                <span className="font-display font-bold text-gray-900 text-[11px] uppercase tracking-wider">
                  ISO 9001:2015
                </span>
              </div>

              {/* MSME Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md shadow-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-gray-100">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span className="font-display font-bold text-gray-900 text-[11px] uppercase tracking-wider">
                  Udyam MSME Registered
                </span>
              </div>

              {/* Bottom Label — Dark Glassmorphic Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl border border-white/15 shadow-xl p-4 rounded-2xl flex items-center gap-3">
                <div className="h-10 w-1 bg-[#E63946] rounded-full shrink-0" />
                <div>
                  <p className="font-display font-bold text-[#FF4D5E] text-[10px] uppercase tracking-wider">
                    Ready-Stock Warehouse · Mumbai &amp; Pune
                  </p>
                  <p className="font-body text-white/80 text-[11px] mt-0.5">
                    Jalaram Niwas, 1st Kumbharwada, Mumbai – 400 004
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
