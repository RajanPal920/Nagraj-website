// src/components/Header.tsx

import { useState, useEffect } from "react";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  CATEGORY_GROUPS,
  getCategoryDisplayLabel,
} from "../data/categoryConfig";
import { getProducts } from "../data/products";
import { CatalogueModal } from "./CatalogueModal";
import {
  CertificateModal,
  CERTIFICATE_DOCUMENTS,
  type CertificateDoc,
} from "./CertificateModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Specialized Products", href: "/products?specialized=true" },
  { label: "Why Us", href: "/why-us" },
  { label: "Certificates", href: "/certificates" },
  { label: "Technical Info", href: "/technical-info" },
  { label: "Weight Calculator", href: "/weight-calculator" },
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
    subItems: ["S690QL Plate", "EN10025-6 S690QL", "Welten 780E Plates"],
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

// ─── TYPES ─────────────────────────────────────────────────────────────────
export interface ProductMenuItem {
  name: string;
  subItems?: (string | { name: string; subItems: string[] })[];
}

// ─── PRODUCTS MENU DATA ─────────────────────────────────────────────────────
export const PRODUCTS_MENU_DATA: ProductMenuItem[] = [
  {
    name: "Pipes & Tubes",
    subItems: [
      "Stainless Steel",
      "Carbon Steel",
      "Alloy Steel",
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
      "Brass",
      "Aluminium",
    ],
  },
  {
    name: "Plates & Sheets",
    subItems: [
      "Stainless Steel",
      "Alloy Steel",
      "Aluminium",
      "Carbon Steel",
      "Copper Nickel",
      "Duplex & Super Duplex",
      "Brass Sheet Strip",
      "SS Coil",
      "Round Circle",
    ],
  },
  {
    name: "Round Bars",
    subItems: [
      "Alloy Steel",
      {
        name: "Alloy Steel F Series",
        subItems: ["F11 Round Bars", "F22 Round Bars", "F91 Round Bars"],
      },
      "Aluminium",
      "Carbon Steel",
      "Hot Work Steel",
      "Copper & Brass",
      "Copper Alloy",
      "EN Series",
      "Hastelloy",
      "Stainless Steel",
      "Precipitation Hardening Steel",
      "Gun Metal",
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
      "Copper Flange",
      "Brass Flange",
    ],
  },
  {
    name: "Fasteners",
    subItems: [
      "Bolts",
      "Nuts",
      "Screws",
      "Washers",
    ],
  },
  {
    name: "Fittings",
    subItems: [
      "Buttweld Fittings",
      "Forged Fittings",
      "Copper Brass Fittings",
      "IC Fitting",
      "Dairy Fittings",
      "Furniture Fitting",
      "TC Fitting TC Set",
    ],
  },
  {
    name: "Welding Electrodes",
    subItems: [
      "Stainless Steel",
      "Copper Alloy",
      {
        name: "Copper & Brass",
        subItems: ["ERcuNi Wire"],
      },
      "Cobalt base Electrode",
      "Aluminium",
    ],
  },
  {
    name: "Galvanized",
    subItems: ["Angle", "Channel", "Flat"],
  },
  {
    name: "Perforated Sheet & Jali",
    subItems: ["Perforated Sheet"],
  },
  {
    name: "Valves",
    subItems: ["Valve"],
  },
  {
    name: "Engineering Plastics & Polymers",
    subItems: [
      "Cast Nylon",
      "PEEK Rod Sheet",
      "PTFE Rod Sheet",
      "Delrin Rod Sheet",
      "Acrylic Sheet",
    ],
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [activeSpecialized, setActiveSpecialized] = useState<string | null>(
    null,
  );
  const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

  // Certificates dropdown and modal state
  const [selectedCertDoc, setSelectedCertDoc] =
    useState<CertificateDoc | null>(null);
  const [mobileCertificatesOpen, setMobileCertificatesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSpecializedOpen, setMobileSpecializedOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [mobileExpandedSpecCat, setMobileExpandedSpecCat] = useState<string | null>(null);
  const [certificatesHovered, setCertificatesHovered] = useState(false);

  const isSolid = location.pathname !== "/" || scrolled;

  // ✅ Full current URL (path + search)
  const currentFullPath = location.pathname + location.search;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const loadCategories = () => {
      try {
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

        if (!normalizedProducts || !Array.isArray(normalizedProducts)) {
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

        if (categoryList.length > 0) setActiveCategory(categoryList[0].name);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <header
      id="header"
      className={`fixed top-0 left-0 right-0 z-50 h-24 transition-all duration-300 ${isSolid
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/80"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs"
        }`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 group py-1 mr-4 xl:mr-10"
          aria-label="Nagraj Metal Industries Home"
        >
          <img
            src="/images/logo.png"
            alt="Nagraj Metal Industries Logo"
            className="h-18 sm:h-20 lg:h-24 w-auto max-w-[300px] lg:max-w-[360px] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav — truly centered */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-2.5 xl:gap-5 2xl:gap-6 px-2">
          {navLinks.map((link) => {
            const isProductsLink = link.label === "Products";
            const isSpecializedLink = link.label === "Specialized Products";
            const isCertificatesLink = link.label === "Certificates";

            // ✅ Active detection (path + search)
            const isActive =
              currentFullPath === link.href ||
              (link.href === "/products" &&
                location.pathname === "/products" &&
                location.search === "") ||
              (link.href === "/products?specialized=true" &&
                location.search === "?specialized=true") ||
              (link.href === "/certificates" &&
                location.pathname.startsWith("/certificates")) ||
              (link.href === "/weight-calculator" &&
                location.pathname.startsWith("/weight-calculator"));

            // ─── CERTIFICATES ITEM (Matches Reference Image 1) ───
            if (isCertificatesLink) {
              return (
                <div
                  key={link.href}
                  className="group relative whitespace-nowrap"
                  onMouseEnter={() => setCertificatesHovered(true)}
                  onMouseLeave={() => setCertificatesHovered(false)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCertificatesHovered((prev) => !prev);
                    }}
                    className={`relative py-2 flex items-center gap-1 font-display text-[13px] xl:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${certificatesHovered || isActive
                        ? "text-[#C8102E]"
                        : "text-gray-800 hover:text-[#C8102E]"
                      }`}
                    aria-expanded={certificatesHovered}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    {certificatesHovered ? (
                      <ChevronUp
                        size={14}
                        strokeWidth={2.5}
                        className="text-[#C8102E] transition-transform duration-200"
                      />
                    ) : (
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className="text-gray-400 group-hover:text-[#C8102E] transition-transform duration-200"
                      />
                    )}
                    {/* Active/Hover Underline Indicator matching Image 1 */}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8102E] rounded-full transition-all duration-300 ${certificatesHovered || isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                        }`}
                    />
                  </button>

                  {/* ─── CERTIFICATES DROPDOWN (Matches Reference Image 1) ─── */}
                  <div
                    className={`
                      absolute top-full left-1/2 -translate-x-1/2
                      w-[390px] pt-3
                      transition-all duration-200
                      z-50
                      ${certificatesHovered
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
                      }
                    `}
                  >
                    <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100/90 text-left">
                      {/* Top Header Row matching Image 1: • CERTIFICATION • Official MSME Registration */}
                      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#C8102E] shrink-0" />
                          <span className="font-extrabold text-[11px] tracking-wider text-[#0F2942] uppercase font-display">
                            CERTIFICATIONS
                          </span>
                          <span className="text-gray-300">•</span>
                          <span className="text-[11px] text-gray-500 font-medium font-body">
                            1 Official Document
                          </span>
                        </div>
                        <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full border border-green-200">
                          Active
                        </span>
                      </div>

                      {/* Official Udyam Certificate Item matching Image 1 */}
                      <div className="p-2 space-y-1">
                        {CERTIFICATE_DOCUMENTS.map((doc) => {
                          const IconComp = doc.icon;
                          return (
                            <a
                              key={doc.id}
                              href={doc.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                setCertificatesHovered(false);
                              }}
                              className="w-full group/doc flex items-center justify-between p-3.5 rounded-xl hover:bg-blue-50/70 transition-all text-left cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-blue-50/90 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 group-hover/doc:bg-blue-100 group-hover/doc:text-blue-700 transition-colors shadow-2xs">
                                  <IconComp size={22} strokeWidth={2} />
                                </div>
                                <div>
                                  <span className="text-[13px] font-bold text-gray-900 group-hover/doc:text-[#0F2942] transition-colors leading-snug font-display block">
                                    {doc.title}
                                  </span>
                                  <span className="text-[11px] text-[#B22222] font-mono font-semibold block mt-0.5">
                                    UDYAM-MH-19-0231528
                                  </span>
                                  <span className="text-[10px] text-gray-500 font-body block">
                                    Ministry of MSME · Govt. of India (Click to open certificate)
                                  </span>
                                </div>
                              </div>
                              <ExternalLink
                                size={16}
                                className="text-gray-400 group-hover/doc:text-blue-600 shrink-0 ml-2 transition-colors"
                              />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={link.href} className="group relative whitespace-nowrap">
                <Link
                  to={link.href}
                  onClick={(e) => {
                    const currentFull = location.pathname + location.search;
                    if (currentFull === link.href) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative py-2 flex items-center gap-1 font-display text-[13px] xl:text-[13.5px] font-bold tracking-normal transition-all duration-200 whitespace-nowrap ${isActive
                      ? "text-[#8B1A1A]"
                      : "text-gray-800 hover:text-[#8B1A1A]"
                    }`}
                >
                  <span>{link.label}</span>
                  {(isProductsLink || isSpecializedLink) && (
                    <ChevronDown
                      size={13}
                      className="text-gray-400 group-hover:text-[#8B1A1A] group-hover:rotate-180 transition-transform duration-200"
                    />
                  )}
                  {/* Subtle Active Indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B1A1A] rounded-full transition-all duration-300 ${isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                      }`}
                  />
                </Link>

                {/* ─── PRODUCTS DROPDOWN ─── */}
                {isProductsLink && (
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2
                      w-[270px] pt-3
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      pointer-events-none group-hover:pointer-events-auto
                      z-50
                    "
                  >
                    <div className="bg-white shadow-2xl rounded-xl overflow-visible relative border border-gray-200/90 py-1.5">
                      <div className="py-0.5">
                        {PRODUCTS_MENU_DATA.map((item) => (
                          <div
                            key={item.name}
                            className="relative px-1"
                            onMouseEnter={() => {
                              setActiveCategory(item.name);
                              setActiveSubItem(null);
                            }}
                          >
                            <Link
                              to={`/products?type=${encodeURIComponent(item.name)}`}
                              className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-150 ${activeCategory === item.name
                                  ? "bg-[#8B1A1A] text-white shadow-xs"
                                  : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                                }`}
                            >
                              <span>{item.name}</span>
                              <ChevronRight
                                size={13}
                                className={
                                  activeCategory === item.name
                                    ? "text-white"
                                    : "text-gray-400"
                                }
                              />
                            </Link>

                            {/* RIGHT SIDE PANEL */}
                            {activeCategory === item.name && (
                              <div
                                className="
                                  absolute left-full top-0
                                  w-[420px] ml-1
                                  bg-white shadow-2xl border border-gray-200/90 rounded-xl
                                  z-50 py-1.5
                                "
                              >
                                <div className="py-0.5 max-h-[70vh] overflow-y-auto">
                                  {item.subItems?.map((subItem) => {
                                    if (
                                      typeof subItem === "object" &&
                                      subItem !== null &&
                                      "subItems" in subItem
                                    ) {
                                      return (
                                        <div
                                          key={subItem.name}
                                          className="relative px-1"
                                          onMouseEnter={() =>
                                            setActiveSubItem(subItem.name)
                                          }
                                        >
                                          <Link
                                            to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem.name)}`}
                                            className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium rounded-lg transition-colors ${activeSubItem === subItem.name
                                                ? "bg-[#8B1A1A] text-white shadow-xs"
                                                : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                                              }`}
                                          >
                                            <span>{subItem.name}</span>
                                            <ChevronRight
                                              size={13}
                                              className={
                                                activeSubItem === subItem.name
                                                  ? "text-white"
                                                  : "text-gray-400"
                                              }
                                            />
                                          </Link>

                                          {/* NESTED SUB-ITEMS */}
                                          {activeSubItem === subItem.name && (
                                            <div
                                              className="
                                                absolute left-full top-0
                                                w-[230px] ml-1
                                                bg-white shadow-2xl border border-gray-200/90 rounded-xl
                                                z-50 py-1.5
                                              "
                                            >
                                              <div className="py-0.5 max-h-[60vh] overflow-y-auto">
                                                {subItem.subItems.map(
                                                  (nestedItem) => (
                                                    <Link
                                                      key={nestedItem}
                                                      to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(nestedItem)}`}
                                                      className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#8B1A1A]/10 hover:text-[#8B1A1A] transition-colors"
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

                                    return (
                                      <Link
                                        key={subItem as string}
                                        to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem as string)}`}
                                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#8B1A1A]/10 hover:text-[#8B1A1A] transition-colors"
                                      >
                                        {subItem as string}
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

                {/* ─── SPECIALIZED PRODUCTS DROPDOWN ─── */}
                {isSpecializedLink && (
                  <div
                    className="
                      absolute top-full left-1/2 -translate-x-1/2
                      w-[270px] pt-3
                      opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-200
                      pointer-events-none group-hover:pointer-events-auto
                      z-50
                    "
                  >
                    <div className="bg-white shadow-2xl rounded-xl overflow-visible relative border border-gray-200/90 py-1.5">
                      <div className="py-0.5">
                        {SPECIALIZED_PRODUCT_NAMES.map((item) => (
                          <div
                            key={item.name}
                            className="relative px-1"
                            onMouseEnter={() => setActiveSpecialized(item.name)}
                          >
                            <Link
                              to={`/products?specialized=true&category=${encodeURIComponent(item.name)}`}
                              className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors ${activeSpecialized === item.name
                                  ? "bg-[#8B1A1A] text-white shadow-xs"
                                  : "text-gray-700 hover:bg-[#8B1A1A]/5 hover:text-[#8B1A1A]"
                                }`}
                            >
                              <span>{item.name}</span>
                              {item.subItems && item.subItems.length > 0 && (
                                <ChevronRight
                                  size={13}
                                  className={
                                    activeSpecialized === item.name
                                      ? "text-white"
                                      : "text-gray-400"
                                  }
                                />
                              )}
                            </Link>

                            {activeSpecialized === item.name &&
                              item.subItems &&
                              item.subItems.length > 0 && (
                                <div
                                  className="
                                    absolute left-full top-0
                                    w-[420px] ml-1
                                    bg-white shadow-2xl border border-gray-200/90 rounded-xl
                                    z-50 py-1.5
                                  "
                                >
                                  <div className="py-0.5 max-h-[70vh] overflow-y-auto">
                                    {item.subItems.map((subItem) => (
                                      <Link
                                        key={subItem}
                                        to={`/products?specialized=true&category=${encodeURIComponent(subItem)}`}
                                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-[#8B1A1A]/10 hover:text-[#8B1A1A] transition-colors"
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

        {/* Header CTA */}
        <div className="hidden lg:flex items-center flex-shrink-0 ml-4">
          <a
            href="tel:+917073875529"
            className="inline-flex items-center gap-2.5 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            aria-label="Call +91 7073875529"
          >
            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white">
              <Phone size={11} strokeWidth={2.5} />
            </div>
            <span>7073875529</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-800 hover:text-[#8B1A1A] p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - 100% Solid Opaque Background, Fixed Positioning, No Overlap */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-24 bottom-0 z-50 bg-white overflow-y-auto border-t border-gray-200 shadow-2xl flex flex-col justify-between"
          style={{ height: "calc(100vh - 6rem)" }}
        >
          {/* Mobile Menu Logo */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <img
                src="/images/logo.png"
                alt="Nagraj Metal Industries"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>
          <nav className="p-4 sm:p-5 flex flex-col gap-1.5 bg-white">
            {navLinks.map((link) => {
              const isProductsLink = link.label === "Products";
              const isSpecializedLink = link.label === "Specialized Products";
              const isCertificatesLink = link.label === "Certificates";
              const isActive =
                currentFullPath === link.href ||
                (link.href === "/products" &&
                  location.pathname === "/products" &&
                  location.search === "") ||
                (link.href === "/products?specialized=true" &&
                  location.search === "?specialized=true") ||
                (link.href === "/certificates" &&
                  location.pathname.startsWith("/certificates"));

              // ── Mobile Products Accordion ──
              if (isProductsLink) {
                return (
                  <div key={link.href} className="border-b border-gray-100/90 pb-1">
                    <button
                      type="button"
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`w-full font-display font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${mobileProductsOpen || isActive
                          ? "bg-[#8B1A1A]/10 text-[#8B1A1A]"
                          : "text-gray-800 hover:bg-gray-50 hover:text-[#8B1A1A]"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{link.label}</span>
                        <span className="text-[10px] bg-[#8B1A1A]/10 text-[#8B1A1A] border border-[#8B1A1A]/20 px-2 py-0.5 rounded-full font-bold">
                          9 Categories
                        </span>
                      </span>
                      {mobileProductsOpen ? (
                        <ChevronUp size={16} className="text-[#8B1A1A]" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {/* Products Child Menu */}
                    {mobileProductsOpen && (
                      <div className="pl-3 pr-2 pt-2 pb-2 space-y-1.5 animate-fade-in bg-gray-50/70 rounded-xl my-1 border border-gray-100">
                        <Link
                          to="/products"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#8B1A1A] bg-white rounded-lg border border-[#8B1A1A]/20 shadow-2xs"
                        >
                          <span>Explore All Products Portfolio</span>
                          <span>→</span>
                        </Link>

                        {PRODUCTS_MENU_DATA.map((item) => {
                          const isCatExpanded = mobileExpandedCat === item.name;
                          return (
                            <div key={item.name} className="border-t border-gray-200/60 pt-1">
                              <div className="flex items-center justify-between">
                                <Link
                                  to={`/products?type=${encodeURIComponent(item.name)}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex-1 py-1.5 px-2 text-xs font-bold text-gray-800 hover:text-[#8B1A1A] transition-colors"
                                >
                                  {item.name}
                                </Link>
                                {item.subItems && item.subItems.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setMobileExpandedCat(
                                        isCatExpanded ? null : item.name
                                      )
                                    }
                                    className="p-1.5 text-gray-400 hover:text-[#8B1A1A] rounded-md"
                                    aria-label={`Toggle ${item.name} sub-items`}
                                  >
                                    {isCatExpanded ? (
                                      <ChevronUp size={14} className="text-[#8B1A1A]" />
                                    ) : (
                                      <ChevronDown size={14} />
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* Nested sub-items */}
                              {isCatExpanded && item.subItems && (
                                <div className="pl-4 pr-1 py-1 space-y-1 bg-white/80 rounded-lg border-l-2 border-[#8B1A1A] my-1">
                                  {item.subItems.map((subItem) => {
                                    if (
                                      typeof subItem === "object" &&
                                      subItem !== null &&
                                      "subItems" in subItem
                                    ) {
                                      return (
                                        <div key={subItem.name} className="py-1">
                                          <Link
                                            to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem.name)}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="block text-[11px] font-bold text-gray-700 hover:text-[#8B1A1A]"
                                          >
                                            {subItem.name}
                                          </Link>
                                          <div className="pl-3 pt-0.5 space-y-0.5">
                                            {subItem.subItems.map((nested) => (
                                              <Link
                                                key={nested}
                                                to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(nested)}`}
                                                onClick={() => setMobileOpen(false)}
                                                className="block text-[11px] text-gray-600 hover:text-[#8B1A1A] py-0.5"
                                              >
                                                • {nested}
                                              </Link>
                                            ))}
                                          </div>
                                        </div>
                                      );
                                    }
                                    return (
                                      <Link
                                        key={subItem as string}
                                        to={`/products?type=${encodeURIComponent(item.name)}&category=${encodeURIComponent(subItem as string)}`}
                                        onClick={() => setMobileOpen(false)}
                                        className="block text-[11px] text-gray-700 hover:text-[#8B1A1A] py-1"
                                      >
                                        • {subItem as string}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // ── Mobile Specialized Products Accordion ──
              if (isSpecializedLink) {
                return (
                  <div key={link.href} className="border-b border-gray-100/90 pb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSpecializedOpen(!mobileSpecializedOpen)
                      }
                      className={`w-full font-display font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${mobileSpecializedOpen || isActive
                          ? "bg-[#8B1A1A]/10 text-[#8B1A1A]"
                          : "text-gray-800 hover:bg-gray-50 hover:text-[#8B1A1A]"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{link.label}</span>
                        <span className="text-[10px] bg-[#8B1A1A]/10 text-[#8B1A1A] border border-[#8B1A1A]/20 px-2 py-0.5 rounded-full font-bold">
                          Specialty Alloys
                        </span>
                      </span>
                      {mobileSpecializedOpen ? (
                        <ChevronUp size={16} className="text-[#8B1A1A]" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {/* Specialized Child Menu */}
                    {mobileSpecializedOpen && (
                      <div className="pl-3 pr-2 pt-2 pb-2 space-y-1.5 animate-fade-in bg-gray-50/70 rounded-xl my-1 border border-gray-100">
                        <Link
                          to="/products?specialized=true"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#8B1A1A] bg-white rounded-lg border border-[#8B1A1A]/20 shadow-2xs"
                        >
                          <span>All Specialized Products</span>
                          <span>→</span>
                        </Link>

                        {SPECIALIZED_PRODUCT_NAMES.map((item) => {
                          const isSpecExpanded =
                            mobileExpandedSpecCat === item.name;
                          return (
                            <div key={item.name} className="border-t border-gray-200/60 pt-1">
                              <div className="flex items-center justify-between">
                                <Link
                                  to={`/products?specialized=true&category=${encodeURIComponent(item.name)}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex-1 py-1.5 px-2 text-xs font-bold text-gray-800 hover:text-[#8B1A1A] transition-colors"
                                >
                                  {item.name}
                                </Link>
                                {item.subItems && item.subItems.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setMobileExpandedSpecCat(
                                        isSpecExpanded ? null : item.name
                                      )
                                    }
                                    className="p-1.5 text-gray-400 hover:text-[#8B1A1A] rounded-md"
                                    aria-label={`Toggle ${item.name} sub-items`}
                                  >
                                    {isSpecExpanded ? (
                                      <ChevronUp size={14} className="text-[#8B1A1A]" />
                                    ) : (
                                      <ChevronDown size={14} />
                                    )}
                                  </button>
                                )}
                              </div>

                              {isSpecExpanded && item.subItems && (
                                <div className="pl-4 pr-1 py-1 space-y-1 bg-white/80 rounded-lg border-l-2 border-[#8B1A1A] my-1">
                                  {item.subItems.map((subItem) => (
                                    <Link
                                      key={subItem}
                                      to={`/products?specialized=true&category=${encodeURIComponent(subItem)}`}
                                      onClick={() => setMobileOpen(false)}
                                      className="block text-[11px] text-gray-700 hover:text-[#8B1A1A] py-1"
                                    >
                                      • {subItem}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // ── Mobile Certificates Accordion ──
              if (isCertificatesLink) {
                return (
                  <div key={link.href} className="border-b border-gray-100/80 pb-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileCertificatesOpen(!mobileCertificatesOpen)
                      }
                      className={`w-full font-display font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between cursor-pointer ${mobileCertificatesOpen || isActive
                          ? "bg-[#C8102E]/10 text-[#C8102E]"
                          : "text-gray-800 hover:bg-gray-50 hover:text-[#C8102E]"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{link.label}</span>
                        <span className="text-[10px] bg-[#C8102E]/10 text-[#C8102E] border border-[#C8102E]/20 px-2 py-0.5 rounded-full font-bold">
                          1 Document
                        </span>
                      </span>
                      {mobileCertificatesOpen ? (
                        <ChevronUp size={16} className="text-[#C8102E]" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {/* Accordion dropdown on mobile - Opens in new tab directly */}
                    {mobileCertificatesOpen && (
                      <div className="pl-2 pr-1 pt-1.5 pb-2 space-y-1.5 animate-fade-in">
                        <div className="px-3 py-1 flex items-center gap-2 text-[10px] uppercase font-bold text-[#0F2942]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                          <span>CERTIFICATION • Click to Open in New Tab</span>
                        </div>
                        {CERTIFICATE_DOCUMENTS.map((doc) => {
                          const IconComp = doc.icon;
                          return (
                            <a
                              key={doc.id}
                              href={doc.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                setMobileOpen(false);
                              }}
                              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 text-left transition-colors border border-gray-200 cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                  <IconComp size={18} />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-gray-900 leading-snug block">
                                    {doc.title}
                                  </span>
                                  <span className="text-[10px] font-mono text-[#B22222] font-semibold block">
                                    UDYAM-MH-19-0231528
                                  </span>
                                  <span className="text-[9px] text-gray-500 font-body block">
                                    Opens certificate image in new tab ↗
                                  </span>
                                </div>
                              </div>
                              <ExternalLink
                                size={14}
                                className="text-gray-400 shrink-0 ml-1.5"
                              />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between ${isActive
                      ? "bg-[#8B1A1A] text-white shadow-sm"
                      : "text-gray-800 hover:bg-gray-100 hover:text-[#8B1A1A]"
                    }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight
                    size={14}
                    className={isActive ? "text-white" : "text-gray-400"}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="p-5 border-t border-gray-100 bg-gray-50/70 flex flex-col gap-2.5">
            <a
              href="tel:+917073875529"
              className="flex items-center justify-center gap-2.5 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all duration-200"
            >
              <Phone size={14} strokeWidth={2.5} className="text-white" />
              Call Now: +91 7073875529
            </a>
          </div>
        </div>
      )}

      {/* Catalogue Download Modal */}
      <CatalogueModal
        isOpen={catalogueModalOpen}
        onClose={() => setCatalogueModalOpen(false)}
      />

      {/* Certificate Viewer Modal */}
      <CertificateModal
        isOpen={!!selectedCertDoc}
        onClose={() => setSelectedCertDoc(null)}
        certificate={selectedCertDoc}
      />
    </header>
  );
}