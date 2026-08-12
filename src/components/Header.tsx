import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Certificates", href: "/certificates" },
  { label: "Technical Info", href: "/technical-info" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Mega menu state
  const { types, typeTree } = useProducts();
  const [activeType, setActiveType] = useState<string | null>(null);

  // Make header solid if not on homepage, or if scrolled on homepage
  const isSolid = location.pathname !== "/" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-400 ${
        isSolid ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="container h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - 35% width */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 w-[35%] lg:w-[32%]"
          aria-label="Nagraj Metal Industries Home"
        >
          <div className="rounded-lg w-full">
            <img
              src="/images/logo.png"
              alt="Nagraj Metal Industries Logo"
              className="w-full h-auto max-h-14 sm:max-h-16 md:max-h-18 lg:max-h-20 xl:max-h-24 object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav - 40% width */}
        <nav
          className="hidden lg:flex items-center justify-around gap-6 xl:gap-8 w-[40%  ] font-extrabold"
          aria-label="Main navigation"
        >
          {navLinks.map((link) =>
            link.label === "Products" ? (
              <div key={link.href} className="group relative whitespace-nowrap">
                <Link
                  to={link.href}
                  className={`nav-link text-black hover:text-brand-red flex items-center gap-1 transition-colors duration-200 font-bold text-sm lg:text-base ${
                    location.pathname === link.href
                      ? "text-brand-red after:w-full"
                      : "text-black/90 hover:text-brand-red"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-200 text-current"
                  />
                </Link>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                  <div className="bg-white shadow-2xl rounded-lg border border-gray-100 flex overflow-hidden h-[500px]">
                    {/* Left Sidebar: Types */}
                    <div className="w-1/3 bg-gray-50 border-r border-gray-100 py-4 overflow-y-auto scrollbar-thin">
                      {types.map((t) => (
                        <Link
                          to={`/products?type=${encodeURIComponent(t)}`}
                          key={t}
                          onMouseEnter={() => setActiveType(t)}
                          className={`block w-full text-left px-6 py-3 text-sm font-display font-semibold transition-all duration-200
                    ${
                      activeType === t || (!activeType && types[0] === t)
                        ? "bg-brand-red text-white border-l-4 border-black"
                        : "text-black hover:bg-brand-red/10 hover:text-brand-red border-l-4 border-transparent hover:border-brand-red/30"
                    }`}
                        >
                          {t}
                        </Link>
                      ))}
                    </div>

                    {/* Right Panel: Material Groups & Categories */}
                    <div className="w-2/3 p-8 bg-white overflow-y-auto scrollbar-thin">
                      {(() => {
                        const currentType = activeType || types[0];
                        const groups = typeTree[currentType];
                        if (!groups || groups.length === 0)
                          return (
                            <p className="text-sm text-gray-400">
                              Loading categories...
                            </p>
                          );

                        return groups.map((group) => (
                          <div key={group.group} className="mb-8 last:mb-0">
                            <h4 className="font-display font-bold text-brand-red text-lg border-b border-brand-red/20 pb-2 mb-4">
                              {group.group}
                            </h4>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                              {group.categories.map((cat) => (
                                <li key={cat.category}>
                                  <Link
                                    to={`/products?type=${encodeURIComponent(currentType)}#${encodeURIComponent(cat.category)}`}
                                    className="flex items-center gap-2 text-sm font-body text-black/80 hover:text-brand-red transition-colors duration-200 group/link"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red/40 group-hover/link:bg-brand-red transition-colors" />
                                    <span className="group-hover/link:translate-x-1 transition-transform">
                                      {cat.label} {currentType}
                                    </span>
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
                onClick={(e) => {
                  if (location.pathname === link.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`nav-link text-black hover:text-brand-red transition-colors duration-200 font-bold text-sm lg:text-base whitespace-nowrap ${
                  location.pathname === link.href
                    ? "text-brand-red after:w-full"
                    : "text-black/90 hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Phone CTA - 25% width */}
        <div className="hidden lg:flex items-center justify-end w-[25%]">
          <a
            href="tel:+917073875529"
            id="header-phone-cta"
            className="flex items-center gap-2 bg-black hover:bg-black/80 text-white font-display font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            aria-label="Call Nagraj Metal Industries"
          >
            <Phone size={14} strokeWidth={2.5} />
            7073875529
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-black hover:text-black/70 p-2 rounded-lg hover:bg-black/10 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white border-t border-black/10 px-6 py-4 flex flex-col gap-1 overflow-y-auto max-h-[70vh]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => {
                if (location.pathname === link.href) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                setMobileOpen(false);
              }}
              className={`font-body font-bold text-base py-3 px-6 rounded-lg transition-all duration-200 ${
                location.pathname === link.href
                  ? "bg-brand-red/10 text-brand-red border-l-4 border-brand-red"
                  : "text-black/90 hover:text-brand-red hover:bg-brand-red/5 border-l-4 border-transparent hover:border-brand-red/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917073875529"
            className="mt-2 flex items-center gap-2 bg-black hover:bg-black/80 text-white font-display font-bold text-sm px-4 py-3 rounded-sm shadow-lg hover:shadow-xl transition-all"
          >
            <Phone size={14} strokeWidth={2.5} />
            Call: 7073875529
          </a>
        </nav>
      </div>
    </header>
  );
}
