import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-green-dark text-white">
      {/* Main footer content */}
      <div className="section-padding pb-10">
        <div className="container-xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/images/logo.png"
                  alt="Bhumi Steel Logo"
                  className="h-10 sm:h-12 lg:h-14 object-contain mix-blend-screen"
                />
              </div>
              <p className="font-body text-white/70 text-sm leading-relaxed max-w-xs">
                Registered steel trading and supply company serving industrial buyers across
                India from our Mumbai and Pune offices.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-brand-gold mb-5">
                Quick Links
              </h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="font-body text-white/70 hover:text-white text-sm transition-colors duration-200"
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
              <h4 className="font-display font-bold text-sm uppercase tracking-[0.15em] text-brand-gold mb-5">
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <MapPin size={14} className="text-brand-gold flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <address className="not-italic font-body text-white/70 text-sm leading-relaxed">
                    Jalaram Niwas, Plot No. 2, 1st Floor,<br />
                    1st Kumbharwada, Mumbai – 400 004
                  </address>
                </div>
                <a
                  href="tel:+912266362548"
                  className="flex items-center gap-3 font-body text-white/70 hover:text-white text-sm transition-colors group"
                >
                  <Phone size={14} className="text-brand-gold group-hover:text-white transition-colors" strokeWidth={2} />
                  022 6636 2548
                </a>
                <a
                  href="tel:+917021540962"
                  className="flex items-center gap-3 font-body text-white/70 hover:text-white text-sm transition-colors group"
                >
                  <Phone size={14} className="text-brand-gold group-hover:text-white transition-colors" strokeWidth={2} />
                  70215 40962 · 97304 26918
                </a>
                <a
                  href="mailto:bhumisteel11@gmail.com"
                  className="flex items-center gap-3 font-body text-white/70 hover:text-white text-sm transition-colors group"
                >
                  <Mail size={14} className="text-brand-gold group-hover:text-white transition-colors" strokeWidth={2} />
                  bhumisteel11@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/70 text-xs">
            © {year} Bhumi Steel. All rights reserved.
          </p>
          <p className="font-body text-white/70 text-xs">
            Subject to Mumbai Jurisdiction
          </p>
          <p className="font-body text-white/50 text-[10px] mt-2">
            Designed & Developed at SunMarg
          </p>
        </div>
      </div>
    </footer>
  );
}
