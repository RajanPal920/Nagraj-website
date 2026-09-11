// src/components/Header.tsx

import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cog, Diamond, Star, Package, ChevronRight } from "lucide-react";
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
  { label: "Specialized Products", href: "/products?specialized=true" },
  { label: "Why Us", href: "/why-us" },
  { label: "Certificates", href: "/certificates" },
  { label: "Technical Info", href: "/technical-info" },
  { label: "Contact", href: "/contact" },
];

// ─── SPECIALIZED PRODUCTS (with subItems) ──────────────────────────────────
const SPECIALIZED_PRODUCT_NAMES = [
  {
    name: "High Tensile Strength",
    subItems: ["EVONITH HARD (EVSL AS07)", "UTTAMHARD", "SAILHARD"],
  },
  {
    name: "Cold Rolled",
    subItems: ["CRCA Coils"],
  },
  {
    name: "Hot Rolled IS 2062 Plates",
    subItems: [
      "IS 2062 PLates",
      "IS 2062 E250BR",
      "IS 2062 E350",
      "IS 2062 E350BR Plates",
      "IS 2062 E350C",
      "S355J2+N Plates",
      "IS 2062 E450BR",
    ],
  },
  {
    name: "Abrasion Resistant Plates",
    subItems: [
      "Abrex 450 Plates",
      "Abrex 500 Plates",
      "NM400 Plates",
      "NM500 Plates",
      "Rockstar 400 Plates",
      "Rockstar 450 Plates",
      "Rockstar 500 Plates",
      "Industries We Serve",
    ],
  },
  {
    name: "16MO3-15MO3 & SA 204 Plates",
    subItems: ["16Mo3 Plate"],
  },
  {
    name: "Manganese Steel Plates",
    subItems: ["X120MN12 /SIDUR 3401", "High Manganese Plate/Steels"],
  },
  {
    name: "Quenched & Tempered Plates",
    subItems: [
      "S690QL Plate",
      "EN10025-6 S690QL",
      "Welten 780E Plates",
    ],
  },
  {
    name: "Boiler Quality Steel Plates",
    subItems: ["IS2041 R260 Plate", "SA 516 Grade 70 Plate"],
  },
  {
    name: "Chrome Moly Plates",
    subItems: [
      "A387 GRADE 5 CLASS 2",
      "A387 GRADE 22 CLASS 2",
      "A387/SA387 Chrome Moly Plates",
    ],
  },
  {
    name: "Chequered Plate",
    subItems: ["IS 3502 Chequered Plates"],
  },
  {
    name: "Tata Structura 355",
  },
  {
    name: "Corten Steel Plates",
  },
  {
    name: "DSQ Plates",
  },
];

// ─── PRODUCTS MENU DATA ─────────────────────────────────────────────────────
const PRODUCTS_MENU_DATA = [
  {
    name: "Pipes & Tubes",
    subItems: [
      "Stainless Steel Pipes & Tubes",
      "Carbon Steel",
      "Alloy Steel Pipe",
      "Nickel Alloy",
      "Inconel",
      "Monel",
      "Hastelloy",
      "Incoloy",
      "Titanium",
      "Cupro Nickel",
      "Tantalum",
      "Duplex and Super Duplex Pipes",
      "Corten Steel",
      "EFSW/SAW/HSAW/LSAW Pipes",
      "Welded Wear Resistant",
      "Pipe/AR400 Pipe",
      "Plate Welded Pipes",
      "Large OD Seamless Pipes",
    ],
  },
  {
    name: "Plates & Sheets",
    subItems: [
      "Stainless Steel Plates",
      "Alloy Steel Plates",
      "Aluminium Alloy",
      "Carbon Steel",
      "Copper Nickel",
      "Duplex and Super Duplex",
    ],
  },
  {
    name: "Round Bars",
    subItems: [
      "Alloy Steel Round",
      {
        name: "Alloy Steel F Series",
        subItems: ["F11 Round Bars", "F22 Round Bars", "F91 Round Bars"],
      },
      "Aluminium Alloy",
      "Carbon Steel",
      "Hot Work Steel",
      "Copper Nickel",
      "EN Series",
      "Hastelloy",
      "Stainless Steel Round Bars",
      "Precipitation Hardening Steel",
    ],
  },
  {
    name: "Cold Work Tool Steels",
    subItems: [
      "AISI O1 Round Bars",
      "HCHCR-D2 Round Bars",
      "Toolox 33 Round Bars",
      "Toolox 44 Round Bars",
    ],
  },
  {
    name: "Flanges",
    subItems: [
      "Stainless Steel",
      "Carbon Steel",
      "Alloy Steel",
      "Nickel Alloy",
      "Inconel",
      "Incoloy",
    ],
  },
  { name: "Fasteners", subItems: ["High Tensile"] },
  { name: "Fittings", subItems: ["Buttweld Fittings", "Forged Fittings"] },
  {
    name: "Welding Electrodes",
    subItems: [
      "Stainless Steel Electrode",
      "Copper Wires",
      {
        name: "Copper Wires",
        subItems: ["ERcuNi Wire"],
      },
      "Cobalt base Electrode",
      "Aluminium Wires",
    ],
  },
  {
    name: "Galvanized",
    subItems: ["Hot Dip Galvanized Angles", "Hot Dip Galvanized Channels"],
  },
  { name: "Pins", subItems: ["PTO Pins", "Pipe Linch Pin"] },
];

const NORMALIZE_MAP: Record<string, string> = {
  Plate: "Plate & Sheets",
  Plates: "Plate & Sheets",
  Sheet: "Plate & Sheets",
  Sheets: "Plate & Sheets",
  Bar: "Bars",
  Rod: "Bars",
  Rods: "Bars",
  Pipe: "Pipes",
  Strip: "Strips",
  Flange: "Flanges",
  Fitting: "Fittings",
  Forging: "Forgings",
  Fastener: "Fasteners",
};

const normalizeCategory = (category: string): string => {
  if (!category) return category;
  if (["Plate", "Plates", "Sheet", "Sheets"].includes(category))
    return "Plate & Sheets";
  if (["Rod", "Rods"].includes(category)) return "Bars";
  return NORMALIZE_MAP[category] || category;
};

const filterProductTypes = (types: string[]): string[] => {
  return types
    .filter(
      (type) =>
        !["Plate", "Plates", "Sheet", "Sheets", "Rod", "Rods"].includes(type),
    )
    .map((type) => NORMALIZE_MAP[type] || type)
    .filter((type, index, self) => self.indexOf(type) === index)
    .sort();
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<
    Array<{
      name: string;
      displayName: string;
      group: string;
      count: number;
      products: any[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [activeSpecialized, setActiveSpecialized] = useState<string | null>(
    null,
  );
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const isSolid = location.pathname !== "/" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const loadCategories = () => {
      try {
        setLoading(true);
        const products = getProducts();

        const normalizedProducts = products.map((product) => ({
          ...product,
          category:
            product.category === "Plate" || product.category === "Sheet"
              ? "Plate & Sheets"
              : normalizeCategory(product.category),
          product_type:
            product.product_type === "Plate" || product.product_type === "Sheet"
              ? "Plate & Sheets"
              : normalizeCategory(product.product_type),
        }));

        setAllProducts(normalizedProducts || []);

        if (!normalizedProducts || !Array.isArray(normalizedProducts)) {
          setCategories([]);
          return;
        }

        const categoryMap = new Map<
          string,
          { products: any[]; group: string; count: number }
        >();
        const categoryGroupMap = new Map<string, string>();
        for (const [group, cats] of Object.entries(CATEGORY_GROUPS)) {
          for (const cat of cats) {
            categoryGroupMap.set(cat, group);
          }
        }

        normalizedProducts.forEach((product) => {
          if (!product || !product.category) return;
          let categoryName = product.category.trim();
          if (categoryName === "Plate" || categoryName === "Sheet") {
            categoryName = "Plate & Sheets";
          }
          const group = categoryGroupMap.get(categoryName) || "Other";
          const existing = categoryMap.get(categoryName);
          if (existing) {
            existing.products.push(product);
            existing.count += 1;
          } else {
            categoryMap.set(categoryName, {
              products: [product],
              group,
              count: 1,
            });
          }
        });

        const categoryList = Array.from(categoryMap.entries()).map(
          ([name, data]) => ({
            name,
            displayName: getCategoryDisplayLabel(name) || name,
            group: data.group,
            count: data.count,
            products: data.products,
          }),
        );

        setCategories(categoryList);
        if (categoryList.length > 0) setActiveCategory(categoryList[0].name);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleProductTypeClick = (type: string | null) => {
    if (type) navigate(`/products?type=${encodeURIComponent(type)}`);
    else navigate("/products");
  };

  // ─── UPDATED: Specialized → /products?specialized=true&category=... ───
  const handleSpecializedClick = (category: string) => {
    navigate(
      `/products?specialized=true&category=${encodeURIComponent(category)}`,
    );
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
        <Link to="/" className="flex items-center flex-shrink-0 w-[20%]">
          <img
            src="/images/logo.png"
            alt="Nagraj Metal Industries Logo"
            className="w-full h-auto max-h-14 sm:max-h-16 md:max-h-18 lg:max-h-20 xl:max-h-24 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-8 font-extrabold">
          {navLinks.map((link) => {
            const isProductsLink = link.label === "Products";
            const isSpecializedLink = link.label === "Specialized Products";

            return (
              <div key={link.href} className="group relative whitespace-nowrap">
                <Link
                  to={link.href}
                  onClick={(e) => {
                    if (location.pathname === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`nav-link flex items-center gap-1 transition-colors duration-200 font-bold text-sm lg:text-base ${
                    location.pathname === link.href
                      ? "text-[#8B1A1A]"
                      : "text-black/90 hover:text-[#8B1A1A]"
                  }`}
                >
                  {link.label}
                  {(isProductsLink || isSpecializedLink) && (
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-200"
                    />
                  )}
                </Link>

                {/* ─── PRODUCTS DROPDOWN (WHITE BG + RED HIGHLIGHT) ─── */}
                {isProductsLink && (
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2
                      w-[260px] mt-1
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      pointer-events-none group-hover:pointer-events-auto
                      z-50
                    "
                  >
                    <div className="bg-white shadow-2xl rounded-md overflow-visible relative border border-gray-200">
                      <div className="py-1">
                        {PRODUCTS_MENU_DATA.map((item) => (
                          <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => {
                              setActiveCategory(item.name);
                              setActiveSubItem(null);
                            }}
                          >
                            <Link
                              to={`/products?type=${encodeURIComponent(item.name)}`}
                              className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                                activeCategory === item.name
                                  ? "bg-[#8B1A1A] text-white"
                                  : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                              }`}
                            >
                              <span className="font-medium">{item.name}</span>
                              <ChevronRight
                                size={14}
                                className={
                                  activeCategory === item.name
                                    ? "text-white"
                                    : "text-gray-400"
                                }
                              />
                            </Link>

                            {/* RIGHT SIDE PANEL - WHITE BG */}
                            {activeCategory === item.name && (
                              <div
                                className="
                                  absolute left-full top-0
                                  w-[420px] ml-0
                                  bg-white shadow-2xl border border-l-0 border-gray-200
                                  z-50
                                "
                              >
                                <div className="py-1">
                                  {item.subItems.map((subItem) => {
                                    if (
                                      typeof subItem === "object" &&
                                      subItem !== null &&
                                      "subItems" in subItem
                                    ) {
                                      return (
                                        <div
                                          key={subItem.name}
                                          className="relative"
                                          onMouseEnter={() =>
                                            setActiveSubItem(subItem.name)
                                          }
                                        >
                                          {/* ─── FIX: Parent category + subitem dono URL me ─── */}
                                          <Link
                                            to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem.name)}`}
                                            className={`flex items-center justify-between px-5 py-3 text-sm transition-colors ${
                                              activeSubItem === subItem.name
                                                ? "bg-[#8B1A1A] text-white"
                                                : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                                            }`}
                                          >
                                            <span>{subItem.name}</span>
                                            <ChevronRight
                                              size={14}
                                              className={
                                                activeSubItem === subItem.name
                                                  ? "text-white"
                                                  : "text-gray-400"
                                              }
                                            />
                                          </Link>

                                          {/* SMALL CARD FOR ALLOY STEEL F SERIES - JUST SIDE MEIN */}
                                          {activeSubItem === subItem.name && (
                                            <div
                                              className="
                                                absolute left-full top-0
                                                w-[220px] ml-0
                                                bg-white shadow-2xl border border-l-0 border-gray-200
                                                z-50
                                              "
                                            >
                                              <div className="py-1">
                                                {subItem.subItems.map(
                                                  (nestedItem) => (
                                                    /* ─── FIX: Parent category + nested subitem dono URL me ─── */
                                                    <Link
                                                      key={nestedItem}
                                                      to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(nestedItem)}`}
                                                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] transition-colors"
                                                    >
                                                      {nestedItem}
                                                    </Link>
                                                  ),
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                    /* ─── FIX: Simple subItem pe bhi parent + subitem dono URL me ─── */
                                    return (
                                      <Link
                                        key={subItem}
                                        to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem)}`}
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] transition-colors border-b border-gray-100 last:border-b-0"
                                      >
                                        {subItem}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── SPECIALIZED PRODUCTS DROPDOWN (WHITE BG + RED HIGHLIGHT) ─── */}
                {isSpecializedLink && (
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2
                      w-[260px] mt-1
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      pointer-events-none group-hover:pointer-events-auto
                      z-50
                    "
                  >
                    <div className="bg-white shadow-2xl rounded-md overflow-visible relative border border-gray-200">
                      <div className="py-1">
                        {SPECIALIZED_PRODUCT_NAMES.map((item) => (
                          <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => setActiveSpecialized(item.name)}
                          >
                            <Link
                              to={`/products?specialized=true&category=${encodeURIComponent(item.name)}`}
                              className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                                activeSpecialized === item.name
                                  ? "bg-[#8B1A1A] text-white"
                                  : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                              }`}
                            >
                              <span className="font-medium">{item.name}</span>
                              {item.subItems && item.subItems.length > 0 && (
                                <ChevronRight
                                  size={14}
                                  className={
                                    activeSpecialized === item.name
                                      ? "text-white"
                                      : "text-gray-400"
                                  }
                                />
                              )}
                            </Link>

                            {/* RIGHT SIDE PANEL - SIRF TAB JAB subItems HO */}
                            {activeSpecialized === item.name &&
                              item.subItems &&
                              item.subItems.length > 0 && (
                                <div
                                  className="
                                    absolute left-full top-0
                                    w-[420px] ml-0
                                    bg-white shadow-2xl border border-l-0 border-gray-200
                                    z-50
                                  "
                                >
                                  <div className="py-1">
                                    {item.subItems.map((subItem) => (
                                      <Link
                                        key={subItem}
                                        to={`/products?specialized=true&category=${encodeURIComponent(subItem)}`}
                                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A] transition-colors border-b border-gray-100 last:border-b-0"
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Phone CTA */}
        <div className="hidden lg:flex items-center justify-end w-[20%]">
          <a
            href="tel:+917073875529"
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-black text-white font-display font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg"
          >
            <Phone size={14} strokeWidth={2.5} />
            7073875529
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-black hover:text-black/70 p-2 rounded-lg hover:bg-black/10 transition-colors"
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
              onClick={() => setMobileOpen(false)}
              className={`font-body font-bold text-base py-3 px-6 rounded-lg transition-all duration-200 ${
                location.pathname === link.href
                  ? "bg-[#8B1A1A]/10 text-[#8B1A1A] border-l-4 border-[#8B1A1A]"
                  : "text-black/90 hover:text-[#8B1A1A]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917073875529"
            className="mt-2 flex items-center gap-2 bg-[#1a1a1a] text-white font-bold text-sm px-4 py-3 rounded-sm"
          >
            <Phone size={14} strokeWidth={2.5} />
            Call: 7073875529
          </a>
        </nav>
      </div>
    </header>
  );
}
