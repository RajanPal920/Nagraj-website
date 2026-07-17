import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Make header solid if not on homepage, or if scrolled on homepage
  const isSolid = location.pathname !== '/' || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isSolid
          ? 'bg-brand-green shadow-lg py-3'
          : 'bg-brand-green/95 py-4'
      }`}
    >
      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Bhumi Steel Home">
          <img
            src="/images/logo.jpg"
            alt="Bhumi Steel Logo"
            className="h-10 object-contain mix-blend-screen"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link text-white hover:text-white ${
                location.pathname === link.href ? 'after:w-full' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Phone CTA */}
        <a
          href="tel:+912266362548"
          id="header-phone-cta"
          className="hidden lg:flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-light text-white hover:text-brand-charcoal font-display font-bold text-sm px-4 py-2.5 rounded-sm transition-all duration-200"
          aria-label="Call Bhumi Steel"
        >
          <Phone size={14} strokeWidth={2.5} />
          22 6636 2548
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 rounded-sm hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-brand-green-dark border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-white hover:text-white font-body font-semibold text-base py-3 px-4 rounded-sm hover:bg-white/10 transition-colors ${
                location.pathname === link.href ? 'bg-white/10' : 'text-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+912266362548"
            className="mt-2 flex items-center gap-2 bg-brand-gold text-white font-display font-bold text-sm px-4 py-3 rounded-sm"
          >
            <Phone size={14} strokeWidth={2.5} />
            Call: 22 6636 2548
          </a>
        </nav>
      </div>
    </header>
  );
}
