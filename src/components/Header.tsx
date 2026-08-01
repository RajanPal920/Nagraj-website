import { useState, useEffect, useMemo } from 'react';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import type { ScrapedProduct } from '../data/scrapedProductsData';

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

  // Mega menu state
  const { products, types } = useProducts();
  const [activeType, setActiveType] = useState<string | null>(null);

  const menuData = useMemo(() => {
    if (!products) return {};
    const data: Record<string, Record<string, ScrapedProduct[]>> = {};
    products.forEach(p => {
      if (!data[p.product_type]) data[p.product_type] = {};
      if (!data[p.product_type][p.category]) data[p.product_type][p.category] = [];
      data[p.product_type][p.category].push(p);
    });
    return data;
  }, [products]);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${isSolid
        ? 'bg-brand-green shadow-lg py-3'
        : 'bg-brand-green/95 py-4'
        }`}
    >
      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24 flex items-center justify-between">
        {/* Logo Combination */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Bhumi Steel Home">
          <img
            src="/images/symbol.jpg"
            alt="Bhumi Steel Symbol"
            className="h-10 w-12 object-contain mix-blend-screen rounded-full"
          />
          <img
            src="/images/logo.jpg"
            alt="Bhumi Steel Logo"
            className="h-8 object-contain mix-blend-screen"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            link.label === 'Products' ? (
              <div key={link.href} className="group relative">
                <Link
                  to={link.href}
                  className={`nav-link text-white hover:text-white flex items-center gap-1 ${location.pathname === link.href ? 'after:w-full' : 'text-white/90'
                    }`}
                >
                  {link.label}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </Link>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="bg-white shadow-2xl rounded-sm border border-gray-100 flex overflow-hidden h-[500px]">
                    {/* Left Sidebar: Types */}
                    <div className="w-1/3 bg-gray-50 border-r border-gray-100 py-4 overflow-y-auto scrollbar-thin">
                      {types.map(t => (
                        <button
                          key={t}
                          onMouseEnter={() => setActiveType(t)}
                          className={`w-full text-left px-6 py-3 text-sm font-display font-semibold transition-colors
                            ${(activeType === t) || (!activeType && types[0] === t)
                              ? 'bg-white text-brand-green border-l-2 border-brand-green'
                              : 'text-gray-600 hover:bg-white hover:text-brand-green border-l-2 border-transparent'
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Right Panel: Categories & Products */}
                    <div className="w-2/3 p-6 bg-white overflow-y-auto scrollbar-thin">
                      {(() => {
                        const currentType = activeType || types[0];
                        if (!currentType || !menuData[currentType]) return <p className="text-sm text-gray-400">Loading products...</p>;

                        return Object.entries(menuData[currentType]).map(([catName, prods]) => (
                          <div key={catName} className="mb-6 last:mb-0">
                            <h4 className="font-display font-bold text-brand-charcoal border-b border-gray-100 pb-2 mb-3">
                              {catName}
                            </h4>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {prods.map(p => (
                                <li key={p.slug}>
                                  {/* Link to Products page with query parameters so it auto-filters */}
                                  <Link
                                    to={`/products?type=${encodeURIComponent(currentType)}&category=${encodeURIComponent(catName)}&search=${encodeURIComponent(p.title)}`}
                                    className="text-xs font-body text-gray-500 hover:text-brand-green transition-colors line-clamp-1"
                                    title={p.title}
                                  >
                                    {p.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-white hover:text-white ${location.pathname === link.href ? 'after:w-full' : 'text-white/90'
                  }`}
              >
                {link.label}
              </Link>
            )
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <nav className="bg-brand-green-dark border-t border-white/10 px-4 py-4 flex flex-col gap-1 overflow-y-auto max-h-[70vh]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-white hover:text-white font-body font-semibold text-base py-3 px-4 rounded-sm hover:bg-white/10 transition-colors ${location.pathname === link.href ? 'bg-white/10' : 'text-white/90'
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
