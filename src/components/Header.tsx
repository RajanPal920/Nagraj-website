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

// ─── Specialized Product Names ──────────────────────────────────────────────
const SPECIALIZED_PRODUCT_NAMES = [
  "High Tensile Strength",
  "Cold Rolled",
  "Hot Rolled IS 2062 Plates",
  "Abrasion Resistant Plates",
  "16MO3-15MO3 & SA 204 Plates",
  "Manganese Steel Plates",
  "Quenched & Tempered Plates",
  "Boiler Quality Steel Plates",
  "Chrome Moly Plates",
  "Chequered Plate",
  "Tata Structura 355",
  "Corten Steel Plates",
  "DSQ Plates",
];

// ─── Categories to normalize ──────────────────────────────────────────────
const NORMALIZE_MAP: Record<string, string> = {
  Plate: "Plates",
  Bar: "Bars",
  Sheet: "Sheets",
  Pipe: "Pipes",
  Rod: "Rods",
  Strip: "Strips",
  Flange: "Flanges",
  Fitting: "Fittings",
  Forging: "Forgings",
  Fastener: "Fasteners",
};

const normalizeCategory = (category: string): string => {
  if (!category) return category;
  return NORMALIZE_MAP[category] || category;
};

const filterProductTypes = (types: string[]): string[] => {
  return types
    .filter((type) => type !== "Plate")
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
            product.category === "Plate"
              ? "Plates"
              : normalizeCategory(product.category),
          product_type:
            product.product_type === "Plate"
              ? "Plates"
              : normalizeCategory(product.product_type),
        }));

        setAllProducts(normalizedProducts || []);

        if (!normalizedProducts || !Array.isArray(normalizedProducts)) {
          setCategories([]);
          return;
        }

        const categoryMap = new Map<
          string,
          {
            products: any[];
            group: string;
            count: number;
          }
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
          if (categoryName === "Plate") {
            categoryName = "Plates";
          }

          const group = categoryGroupMap.get(categoryName) || "Other";

          const existing = categoryMap.get(categoryName);

          if (existing) {
            existing.products.push(product);
            existing.count += 1;
          } else {
            categoryMap.set(categoryName, {
              products: [product],
              group: group,
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

        if (categoryList.length > 0) {
          setActiveCategory(categoryList[0].name);
        }
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const getCategoriesByGroup = (group: string) => {
    return categories.filter((cat) => cat.group === group);
  };

  const getSpecializedProducts = () => {
    if (!allProducts.length) return [];

    return allProducts.filter((product) => {
      const productName = (product.name || product.title || "").toLowerCase();
      return SPECIALIZED_PRODUCT_NAMES.some((specialName) => {
        const searchTerm = specialName.toLowerCase();
        return (
          productName.includes(searchTerm) || searchTerm.includes(productName)
        );
      });
    });
  };

  // Get unique product types - DO NOT include "Specialized Products" here
  const getUniqueProductTypes = () => {
    const products = getProducts();
    const types = new Set<string>();
    products.forEach((product) => {
      if (product.product_type) {
        let type = product.product_type;
        if (type === "Plate") {
          type = "Plates";
        }
        type = normalizeCategory(type);
        types.add(type);
      }
    });

    types.delete("Plate");
    return filterProductTypes(Array.from(types));
  };

  // Get products for a specific type
  const getProductsByType = (type: string) => {
    const products = getProducts();
    return products.filter((product) => {
      let productType = product.product_type;
      if (productType === "Plate") {
        productType = "Plates";
      }
      productType = normalizeCategory(productType);
      return productType === type;
    });
  };

  const productTypes = getUniqueProductTypes();
  const [selectedType, setSelectedType] = useState<string | null>(
    productTypes.length > 0 ? productTypes[0] : null,
  );
  const [selectedSpecialized, setSelectedSpecialized] = useState(false);

  const isSpecializedProduct = (product: any) => {
    const productName = (product.name || product.title || "").toLowerCase();
    return SPECIALIZED_PRODUCT_NAMES.some((specialName) => {
      const searchTerm = specialName.toLowerCase();
      return (
        productName.includes(searchTerm) || searchTerm.includes(productName)
      );
    });
  };

  const getSpecializedCategories = () => {
    const specialized = getSpecializedProducts();
    const cats = new Set<string>();
    specialized.forEach((p) => {
      if (p.category) {
        let cat = p.category;
        if (cat === "Plate") {
          cat = "Plates";
        }
        cats.add(cat);
      }
    });
    return Array.from(cats).sort();
  };

  const getSpecializedProductsByCategory = (category: string) => {
    const specialized = getSpecializedProducts();
    return specialized.filter((p) => {
      let cat = p.category;
      if (cat === "Plate") {
        cat = "Plates";
      }
      return cat === category;
    });
  };

  // ─── Handle clicks ────────────────────────────────────────────────────────
  const handleProductTypeClick = (type: string | null) => {
    setSelectedType(type);
    setSelectedSpecialized(false);
    if (type) {
      navigate(`/products?type=${encodeURIComponent(type)}`);
    } else {
      navigate("/products");
    }
  };

  const handleSpecializedClick = () => {
    setSelectedSpecialized(true);
    setSelectedType(null);
    navigate("/products?specialized=true");
  };

  // Get products to show in the right column
  const getProductsToShow = () => {
    if (selectedSpecialized) {
      return getSpecializedProducts();
    }
    if (selectedType === null) {
      return getProducts();
    }
    return getProductsByType(selectedType);
  };

  const getTitle = () => {
    if (selectedSpecialized) return "Specialized Products";
    if (selectedType === null) return "All Products";
    return selectedType;
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
                <button
                  className={`nav-link text-black hover:text-brand-red flex items-center gap-1 transition-colors duration-200 font-bold text-sm lg:text-base cursor-default ${
                    location.pathname === link.href
                      ? "text-brand-red after:w-full"
                      : "text-black/90 hover:text-brand-red"
                  }`}
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform duration-200"
                  />
                </button>

                {/* PROFESSIONAL MEGA MENU */}
                <div
                  className="
                    absolute top-full
                    left-1/2 -translate-x-1/2
                    w-[900px]
                    mt-1
                    opacity-0 invisible
                    group-hover:opacity-100
                    group-hover:visible
                    transition-all duration-300
                    pointer-events-none
                    group-hover:pointer-events-auto
                    z-50
                  "
                >
                  <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
                    <div className="flex max-h-[480px]">
                      {/* LEFT COLUMN - Product Types */}
                      <div className="w-[35%] bg-gray-50 border-r border-gray-200 py-2 max-h-[480px] overflow-y-auto">
                        <div className="px-5 py-3 border-b border-gray-200">
                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            Products
                          </span>
                        </div>
                        {loading ? (
                          <div className="px-5 py-4 text-sm text-gray-400">
                            Loading...
                          </div>
                        ) : productTypes.length === 0 ? (
                          <div className="px-5 py-4 text-sm text-gray-400">
                            No products found
                          </div>
                        ) : (
                          <>
                            <button
                              onMouseEnter={() => {
                                setSelectedType(null);
                                setSelectedSpecialized(false);
                              }}
                              onClick={() => handleProductTypeClick(null)}
                              className={`w-full text-left px-5 py-2.5 flex items-center justify-between transition-all duration-200 ${
                                selectedType === null && !selectedSpecialized
                                  ? "bg-[#c41e24] text-white"
                                  : "text-gray-700 hover:bg-gray-200/50"
                              }`}
                            >
                              <span className="text-sm font-medium">
                                All Products
                              </span>
                              {selectedType === null &&
                                !selectedSpecialized && (
                                  <ChevronRight
                                    size={14}
                                    className="text-white"
                                  />
                                )}
                            </button>
                            {productTypes.map((type) => (
                              <button
                                key={type}
                                onMouseEnter={() => {
                                  setSelectedType(type);
                                  setSelectedSpecialized(false);
                                }}
                                onClick={() => handleProductTypeClick(type)}
                                className={`w-full text-left px-5 py-2.5 flex items-center justify-between transition-all duration-200 ${
                                  selectedType === type
                                    ? "bg-[#c41e24] text-white"
                                    : "text-gray-700 hover:bg-gray-200/50"
                                }`}
                              >
                                <span className="text-sm font-medium">
                                  {type}
                                </span>
                                {selectedType === type && (
                                  <ChevronRight
                                    size={14}
                                    className="text-white"
                                  />
                                )}
                              </button>
                            ))}
                            {/* Specialized Products - Separate button */}
                            <button
                              onMouseEnter={() => {
                                setSelectedSpecialized(true);
                                setSelectedType(null);
                              }}
                              onClick={handleSpecializedClick}
                              className={`w-full text-left px-5 py-2.5 flex items-center justify-between transition-all duration-200 mt-2 border-t border-gray-200 pt-2 ${
                                selectedSpecialized
                                  ? "bg-[#c41e24] text-white"
                                  : "text-gray-700 hover:bg-gray-200/50"
                              }`}
                            >
                              <span className="text-sm font-medium flex items-center gap-2">
                                <Star
                                  size={14}
                                  className={
                                    selectedSpecialized
                                      ? "text-white"
                                      : "text-[#c41e24]"
                                  }
                                />
                                Specialized Products
                              </span>
                              {selectedSpecialized && (
                                <ChevronRight
                                  size={14}
                                  className="text-white"
                                />
                              )}
                            </button>
                          </>
                        )}
                      </div>

                      {/* RIGHT COLUMN - Products preview */}
                      <div className="w-[65%] bg-white py-2 max-h-[480px] overflow-y-auto">
                        {(() => {
                          const productsToShow = getProductsToShow();
                          const title = getTitle();
                          const isSpecializedView = selectedSpecialized;

                          if (productsToShow.length === 0) {
                            return (
                              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                <div className="text-center">
                                  <Package
                                    size={32}
                                    className="mx-auto mb-2 text-gray-300"
                                    strokeWidth={1}
                                  />
                                  No products found
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div className="p-3">
                              <div className="flex items-center justify-between px-3 py-2.5 mb-2 border-b border-gray-100">
                                <span className="text-sm font-semibold text-gray-800">
                                  {title}
                                </span>
                                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                                  {productsToShow.length} products
                                </span>
                              </div>
                              <div className="space-y-1">
                                {productsToShow.slice(0, 10).map((product) => {
                                  const isSpecial =
                                    isSpecializedProduct(product);
                                  return (
                                    <Link
                                      key={product.slug || product.id}
                                      to={`/product/${product.slug}`}
                                      className="
                                        block
                                        px-3 py-2
                                        text-sm
                                        text-gray-700
                                        hover:text-[#c41e24]
                                        hover:bg-[#c41e24]/5
                                        transition-all
                                        duration-200
                                        rounded-lg
                                        border-l-2 border-transparent
                                        hover:border-[#c41e24]
                                      "
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>
                                          {product.name || product.title}
                                        </span>
                                        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                          {product.category}
                                        </span>
                                      </div>
                                      {isSpecializedView && isSpecial && (
                                        <span className="text-[10px] text-[#c41e24] bg-[#c41e24]/10 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                                          Special
                                        </span>
                                      )}
                                    </Link>
                                  );
                                })}
                                {productsToShow.length > 10 && (
                                  <div className="text-center text-xs text-gray-400 py-2">
                                    + {productsToShow.length - 10} more
                                    products. Click to view all.
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
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

          {/* Mobile Product Types */}
          <div className="mt-2 pt-2 border-t border-gray-100">
            <p className="text-xs font-body text-gray-400 uppercase tracking-wider px-6 py-2">
              Product Types
            </p>
            <button
              onClick={() => {
                handleProductTypeClick(null);
                setMobileOpen(false);
              }}
              className="block w-full text-left py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-body text-sm text-gray-700">
                All Products
              </span>
            </button>
            {productTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  handleProductTypeClick(type);
                  setMobileOpen(false);
                }}
                className="block w-full text-left py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-body text-sm text-gray-700">{type}</span>
              </button>
            ))}
            {/* Specialized Products in mobile */}
            <button
              onClick={() => {
                handleSpecializedClick();
                setMobileOpen(false);
              }}
              className="block w-full text-left py-2.5 px-6 rounded-lg hover:bg-gray-50 transition-colors mt-2 border-t border-gray-200 pt-2"
            >
              <span className="font-body text-sm text-gray-700 flex items-center gap-2">
                <Star size={14} className="text-[#c41e24]" />
                Specialized Products
              </span>
            </button>
          </div>

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
