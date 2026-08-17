// src/components/Header.tsx

import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Cog, Diamond, Star, Package } from "lucide-react";
import {
  CATEGORY_GROUPS,
  GROUP_ORDER,
  getCategoryDisplayLabel,
} from "../data/categoryConfig";
import { getProducts } from "../data/products";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Certificates", href: "/certificates" },
  { label: "Technical Info", href: "/technical-info" },
  { label: "Contact", href: "/contact" },
];

// ─── Group icons ──────────────────────────────────────────────────────────────
const groupIcons: Record<string, React.ElementType> = {
  "Steel Alloys": Cog,
  "Non-Ferrous": Diamond,
  Specialty: Star,
  Other: Package,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Mega menu state
  const [categories, setCategories] = useState<
    Array<{
      name: string;
      displayName: string;
      group: string;
      count: number;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Make header solid if not on homepage, or if scrolled on homepage
  const isSolid = location.pathname !== "/" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load categories
  useEffect(() => {
    const loadCategories = () => {
      try {
        setLoading(true);
        const products = getProducts();

        // Count products per category
        const categoryCount = new Map<string, number>();
        if (products && Array.isArray(products)) {
          products.forEach((product) => {
            if (product && product.category) {
              const count = categoryCount.get(product.category) || 0;
              categoryCount.set(product.category, count + 1);
            }
          });
        }

        // Build category list from config
        const categoryList: Array<{
          name: string;
          displayName: string;
          group: string;
          count: number;
        }> = [];

        for (const [group, cats] of Object.entries(CATEGORY_GROUPS)) {
          for (const cat of cats) {
            const count = categoryCount.get(cat) || 0;
            // Only include categories that have products
            if (count > 0) {
              categoryList.push({
                name: cat,
                displayName: getCategoryDisplayLabel(cat),
                group: group,
                count: count,
              });
            }
          }
        }

        setCategories(categoryList);

        // Set default active group
        if (categoryList.length > 0) {
          setActiveGroup(categoryList[0].group);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Get categories for a specific group
  const getCategoriesByGroup = (group: string) => {
    return categories.filter((cat) => cat.group === group);
  };

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-400 ${
        isSolid ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="container h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center justify-around gap-6 xl:gap-8 w-[40%] font-extrabold"
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
                    {/* Left Sidebar: Groups */}
                    <div className="w-1/3 bg-gray-50 border-r border-gray-100 py-4 overflow-y-auto scrollbar-thin">
                      {loading ? (
                        <div className="px-6 py-3 text-sm text-gray-400">
                          Loading...
                        </div>
                      ) : categories.length === 0 ? (
                        <div className="px-6 py-3 text-sm text-gray-400">
                          No categories available
                        </div>
                      ) : (
                        GROUP_ORDER.map((group) => {
                          const groupCats = getCategoriesByGroup(group);
                          if (groupCats.length === 0) return null;
                          const isActive = activeGroup === group;
                          const IconComp = groupIcons[group] || Package;

                          return (
                            <button
                              key={group}
                              onMouseEnter={() => setActiveGroup(group)}
                              className={`block w-full text-left px-6 py-3 text-sm font-display font-semibold transition-all duration-200 flex items-center gap-3 ${
                                isActive
                                  ? "bg-brand-red text-white border-l-4 border-black"
                                  : "text-black hover:bg-brand-red/10 hover:text-brand-red border-l-4 border-transparent hover:border-brand-red/30"
                              }`}
                            >
                              <span className="flex-shrink-0">
                                <IconComp
                                  size={18}
                                  className={
                                    isActive ? "text-white" : "text-brand-red"
                                  }
                                  strokeWidth={2}
                                />
                              </span>
                              <span className="flex-1 text-left">{group}</span>
                              <span className="text-xs opacity-60">
                                {groupCats.length}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Right Panel: Categories */}
                    <div className="w-2/3 p-8 bg-white overflow-y-auto scrollbar-thin">
                      {loading ? (
                        <p className="text-sm text-gray-400">
                          Loading categories...
                        </p>
                      ) : categories.length === 0 ? (
                        <p className="text-sm text-gray-400">
                          No categories available
                        </p>
                      ) : (
                        (() => {
                          const currentGroup = activeGroup || GROUP_ORDER[0];
                          const groupCats = getCategoriesByGroup(currentGroup);

                          if (groupCats.length === 0) {
                            return (
                              <p className="text-sm text-gray-400">
                                No categories in this group
                              </p>
                            );
                          }

                          return (
                            <div>
                              <h4 className="font-display font-bold text-brand-red text-lg border-b border-brand-red/20 pb-2 mb-4">
                                {currentGroup}
                              </h4>
                              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {groupCats.map((cat) => (
                                  <li key={cat.name}>
                                    <Link
                                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                                      className="flex items-center gap-2 text-sm font-body text-black/80 hover:text-brand-red transition-colors duration-200 group/link"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red/40 group-hover/link:bg-brand-red transition-colors" />
                                      <span className="group-hover/link:translate-x-1 transition-transform">
                                        {cat.displayName}
                                      </span>
                                      <span className="text-xs text-gray-400 ml-auto">
                                        {cat.count}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link
                                  to="/products"
                                  className="text-sm font-display font-bold text-brand-red hover:text-brand-red/80 transition-colors flex items-center gap-2"
                                >
                                  View All Products →
                                </Link>
                              </div>
                            </div>
                          );
                        })()
                      )}
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

        {/* Phone CTA */}
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

          {/* Mobile Categories */}
          {!loading && categories.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs font-body text-gray-400 uppercase tracking-wider px-6 py-2">
                Categories
              </p>
              {GROUP_ORDER.map((group) => {
                const groupCats = getCategoriesByGroup(group);
                if (groupCats.length === 0) return null;
                const IconComp = groupIcons[group] || Package;

                return (
                  <div key={group} className="mt-1">
                    <p className="text-xs font-body text-gray-400 px-6 py-1 flex items-center gap-2">
                      <IconComp
                        size={14}
                        className="text-brand-red"
                        strokeWidth={2}
                      />
                      {group}
                    </p>
                    {groupCats.map((cat) => (
                      <Link
                        key={cat.name}
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-2.5 px-6 ml-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-body text-sm text-gray-700">
                          {cat.displayName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

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
