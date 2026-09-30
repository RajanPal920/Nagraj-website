import {
  Phone,
  Mail,
  MapPin,
  User,
  Globe,
  Award,
  ShieldCheck,
  Truck,
  FileCheck2,
  ChevronRight,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  downloadCompanyCatalogue,
  downloadProductCatalogue,
} from "../utils/catalogueGenerator";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products Catalog", href: "/products" },
  { label: "Specialized Products", href: "/products?specialized=true" },
  { label: "Why Choose Us", href: "/why-us" },
  { label: "Certificates", href: "/certificates" },
  { label: "Technical Data", href: "/technical-info" },
  { label: "Contact Us", href: "/contact" },
];

const productLinks = [
  { label: "Round Bars", href: "/products?type=Round%20Bars" },
  { label: "Pipes & Tubes", href: "/products?type=Pipes%20%26%20Tubes" },
  { label: "Plates & Sheets", href: "/products?type=Plates%20%26%20Sheets" },
  { label: "Flanges", href: "/products?type=Flanges" },
  { label: "Fasteners", href: "/products?type=Fasteners" },
  { label: "Fittings", href: "/products?type=Fittings" },
  { label: "Galvanized Products", href: "/products?type=Galvanized" },
  { label: "Welding Electrodes", href: "/products?type=Welding%20Electrodes" },
];

const footerTrustItems = [
  { icon: Award, title: "ISO 9001:2015", desc: "Certified Management" },
  { icon: FileCheck2, title: "100% Traceability", desc: "Verified Mill Test Certs" },
  { icon: Truck, title: "Pan-India Supply", desc: "Fast Dispatch Network" },
  { icon: ShieldCheck, title: "Govt. Registered", desc: "OEM & Semi-Govt. Approved" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#050505] text-white border-t-4 border-[#B22222] shadow-2xl overflow-hidden">

      {/* Subtle maroon top sheen (matches logo) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B22222]/10 via-transparent to-transparent pointer-events-none" />

      {/* ─── Top Trust Strip ─── */}
      <div className="relative border-b border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerTrustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#B22222]/25 border border-[#B22222]/50 flex items-center justify-center shrink-0 text-[#FF4D5E]">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
                      {item.title}
                    </h4>
                    <p className="font-body text-[11px] text-white/75 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Main Footer Columns ─── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Credentials */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white p-3 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <img
                src="/images/logo.png"
                alt="Nagraj Metal Industries Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>
            <p className="font-body text-white/80 text-xs sm:text-sm leading-relaxed font-medium">
              Nagraj Metal Industries is a premier manufacturer, supplier & exporter of high-grade stainless steel, alloy steel, flanges, fittings, fasteners, and specialized metals across India and global markets.
            </p>
            <div className="pt-2 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#B22222]/35 border border-[#B22222]/60 text-white text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF4D5E] animate-pulse" />
                Udyam MSME Registered
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => downloadCompanyCatalogue()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF4D5E] hover:text-white transition-colors text-left"
                >
                  <Download size={13} className="shrink-0" />
                  <span>Download Company Profile (PDF)</span>
                </button>
                <button
                  onClick={() => downloadProductCatalogue()}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#FF4D5E] hover:text-white transition-colors text-left"
                >
                  <Download size={13} className="shrink-0" />
                  <span>Download Product Catalogue (PDF)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#FF4D5E] mb-5 pb-2.5 border-b border-white/15 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#B22222] rounded-xs" />
              Quick Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-white/75 hover:text-white hover:translate-x-1.5 text-xs sm:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-[#FF4D5E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products Portfolio */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#FF4D5E] mb-5 pb-2.5 border-b border-white/15 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#B22222] rounded-xs" />
              Product Range
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-white/75 hover:text-white hover:translate-x-1.5 text-xs sm:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight size={12} className="text-[#FF4D5E] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#FF4D5E] mb-5 pb-2.5 border-b border-white/15 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#B22222] rounded-xs" />
              Contact & HQ
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-white/85">
                <User size={15} className="text-[#FF4D5E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Mr. Rajesh Padhiyar</span>
                  <span className="text-white/60 text-xs ml-1.5 font-medium">(CEO)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <a
                  href="tel:+917073875529"
                  className="flex items-center gap-3 text-white/75 hover:text-white font-medium transition-colors"
                >
                  <Phone size={14} className="text-[#FF4D5E] shrink-0" />
                  <span>+91 7073875529</span>
                </a>
                <a
                  href="tel:+912266518595"
                  className="flex items-center gap-3 text-white/75 hover:text-white font-medium transition-colors"
                >
                  <Phone size={14} className="text-[#FF4D5E] shrink-0" />
                  <span>+91 22-66518595</span>
                </a>
                <a
                  href="tel:+919079156639"
                  className="flex items-center gap-3 text-white/75 hover:text-white font-medium transition-colors"
                >
                  <Phone size={14} className="text-[#FF4D5E] shrink-0" />
                  <span>+91 9079156639</span>
                </a>
              </div>

              <a
                href="mailto:sales@nagrajmetal.com"
                className="flex items-center gap-3 text-white/75 hover:text-white font-medium transition-colors pt-1"
              >
                <Mail size={14} className="text-[#FF4D5E] shrink-0" />
                <span>sales@nagrajmetal.com</span>
              </a>

              <a
                href="https://www.nagrajmetal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/75 hover:text-white font-medium transition-colors"
              >
                <Globe size={14} className="text-[#FF4D5E] shrink-0" />
                <span>www.nagrajmetal.com</span>
              </a>

              <div className="flex items-start gap-3 pt-2.5 border-t border-white/10 text-white/75 text-xs font-medium">
                <MapPin size={15} className="text-[#FF4D5E] shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  Jalaram Niwas, Plot No. 2, 1st Floor,
                  <br />
                  1st Kumbharwada, Mumbai – 400 004
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Copyright Bar ─── */}
      <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60 font-medium">
          <p>© {year} Nagraj Metal Industries. All rights reserved.</p>
          <div className="flex items-center gap-4 text-center sm:text-right">
            <span className="text-white/85 font-bold">Subject to Mumbai Jurisdiction</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50 text-[11px]">Designed & Developed at SunMarg</span>
          </div>
        </div>
      </div>
    </footer>
  );
}