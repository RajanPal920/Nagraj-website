import { Phone, Mail, MapPin, User, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white">
      {/* Main footer content */}
      <div className="section-padding pb-10">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-white p-2 rounded-sm">
                  <img
                    src="/images/logo.png"
                    alt="Nagraj Metal Industries Logo"
                    className="h-10 sm:h-12 lg:h-14 object-contain"
                  />
                </div>
              </div>
              <p className="font-body text-white/70 text-sm leading-relaxed max-w-xs">
                Registered steel trading and supply company serving industrial
                buyers across India from our Mumbai and Pune offices.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-brand-red mb-5">
                Quick Links
              </h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="font-body text-white/70 hover:text-brand-red text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-brand-red mb-5">
                Contact Us
              </h4>
              <div className="space-y-4">
                {/* Contact Person */}
                <div className="flex gap-3">
                  <User
                    size={16}
                    className="text-brand-red flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div className="font-body text-white/70 text-sm">
                    <span className="text-white font-semibold">Mr. Rajesh</span>
                    <br />
                    <span className="text-xs">(CEO)</span>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-2">
                  <a
                    href="tel:+917073875529"
                    className="flex items-center gap-3 font-body text-white/70 hover:text-brand-red text-sm transition-colors group"
                  >
                    <Phone
                      size={14}
                      className="text-brand-red group-hover:text-brand-red-light transition-colors"
                      strokeWidth={2}
                    />
                    +91 7073875529
                  </a>
                  <a
                    href="tel:+912266518595"
                    className="flex items-center gap-3 font-body text-white/70 hover:text-brand-red text-sm transition-colors group"
                  >
                    <Phone
                      size={14}
                      className="text-brand-red group-hover:text-brand-red-light transition-colors"
                      strokeWidth={2}
                    />
                    +91 22-66518595
                  </a>
                  <a
                    href="tel:+919079156639"
                    className="flex items-center gap-3 font-body text-white/70 hover:text-brand-red text-sm transition-colors group"
                  >
                    <Phone
                      size={14}
                      className="text-brand-red group-hover:text-brand-red-light transition-colors"
                      strokeWidth={2}
                    />
                    +91 9079156639
                  </a>
                </div>

                {/* Email */}
                <a
                  href="mailto:sales@nagrajmetal.com"
                  className="flex items-center gap-3 font-body text-white/70 hover:text-brand-red text-sm transition-colors group"
                >
                  <Mail
                    size={14}
                    className="text-brand-red group-hover:text-brand-red-light transition-colors"
                    strokeWidth={2}
                  />
                  sales@nagrajmetal.com
                </a>

                {/* Website */}
                <a
                  href="https://www.nagrajmetal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-white/70 hover:text-brand-red text-sm transition-colors group"
                >
                  <Globe
                    size={14}
                    className="text-brand-red group-hover:text-brand-red-light transition-colors"
                    strokeWidth={2}
                  />
                  www.nagrajmetal.com
                </a>

                {/* Address */}
                <div className="flex gap-3 pt-2 border-t border-white/10">
                  <MapPin
                    size={14}
                    className="text-brand-red flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <address className="not-italic font-body text-white/70 text-sm leading-relaxed">
                    Jalaram Niwas, Plot No. 2, 1st Floor,
                    <br />
                    1st Kumbharwada, Mumbai 400004
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/70 text-xs">
            © {year} Nagraj Metal Industries. All rights reserved.
          </p>
          <p className="font-body text-white/70 text-xs">
            Subject to Mumbai Jurisdiction
          </p>
          <p className="font-body text-white/50 text-[10px]">
            Designed & Developed at SunMarg
          </p>
        </div>
      </div>
    </footer>
  );
}
