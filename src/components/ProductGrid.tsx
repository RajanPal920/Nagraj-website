// src/components/ProductGrid.tsx

import { Link } from "react-router-dom";
import { ArrowRight, Package, Award, Shield, Zap, Download } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { getProducts } from "../data/products";
import { downloadProductCatalogue } from "../utils/catalogueGenerator";

// ─── Featured 8 Categories for Homepage Grid ──────────────────────────────
interface FeaturedCategory {
  id: string;
  name: string;
  displayLabel: string;
  navType: string;
  image: string;
  description: string;
  Icon: React.ElementType;
  productTypeKeys: string[];
}

const FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    id: "round-bars",
    name: "Round Bars",
    displayLabel: "Round Bars",
    navType: "Round Bars",
    image: "/images/bar.jpg",
    description: "Premium Round Bars for industrial applications.",
    Icon: Zap,
    productTypeKeys: ["bar", "round bars", "rod"],
  },
  {
    id: "pipes-tubes",
    name: "Pipes & Tubes",
    displayLabel: "Pipes & Tubes",
    navType: "Pipes & Tubes",
    image: "/images/pipe.jpg",
    description: "Premium Pipes & Tubes for industrial applications.",
    Icon: Package,
    productTypeKeys: ["pipe", "tube", "pipes & tubes"],
  },
  {
    id: "plates-sheets",
    name: "Plates & Sheets",
    displayLabel: "Plates & Sheets",
    navType: "Plates & Sheets",
    image: "/images/sheet.jpg",
    description: "Premium Plates & Sheets for industrial applications.",
    Icon: Package,
    productTypeKeys: ["plate", "sheet", "plates & sheets"],
  },
  {
    id: "flanges",
    name: "Flanges",
    displayLabel: "Flanges",
    navType: "Flanges",
    image: "/images/flange.jpg",
    description: "Premium Flanges for industrial applications.",
    Icon: Award,
    productTypeKeys: ["flange", "flanges"],
  },
  {
    id: "fasteners",
    name: "Fasteners",
    displayLabel: "Fasteners",
    navType: "Fasteners",
    image: "/images/fasteners.jpg",
    description: "Premium Fasteners for industrial applications.",
    Icon: Shield,
    productTypeKeys: ["fastener", "fasteners"],
  },
  {
    id: "fittings",
    name: "Fittings",
    displayLabel: "Fittings",
    navType: "Fittings",
    image: "/images/fitting.jpg",
    description: "Premium Fittings for industrial applications.",
    Icon: Shield,
    productTypeKeys: ["fitting", "fittings"],
  },
  {
    id: "galvanized",
    name: "Galvanized",
    displayLabel: "Galvanized",
    navType: "Galvanized",
    image: "/images/Galvanized.jpg",
    description: "Premium Galvanized products for industrial applications.",
    Icon: Shield,
    productTypeKeys: ["galvanized", "galvanised"],
  },
  {
    id: "welding-electrodes",
    name: "Welding Electrodes",
    displayLabel: "Welding Electrodes",
    navType: "Welding Electrodes",
    image: "/images/Welding-Electrodes.jpg",
    description: "Premium Welding Electrodes for industrial applications.",
    Icon: Zap,
    productTypeKeys: ["welding wire", "welding electrodes"],
  },
];

export function ProductGrid() {
  const { typeTree, loading } = useProducts();
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  const allProducts = getProducts();

  const getProductCount = (cat: FeaturedCategory) => {
    return allProducts.filter((p) => {
      const pType = (p.product_type || "").toLowerCase().trim();
      return cat.productTypeKeys.some((k) => pType === k || pType.includes(k));
    }).length;
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 sm:mb-16 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 px-3.5 py-1.5 rounded-full">
            <Package size={14} className="text-[#8B1A1A]" />
            <span className="text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider">
              Comprehensive Portfolio
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">
            Core Industrial <span className="text-[#8B1A1A]">Categories</span>
          </h2>
          <div className="w-16 h-1 bg-[#8B1A1A] rounded-full mx-auto mb-4" />
          <p className="font-body text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From precision round bars to heavy-duty seamless pipes and certified high-tensile fasteners, explore our full spectrum of industrial steel and alloy products.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="min-h-[200px]">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden animate-pulse"
                >
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="flex gap-1.5 mt-2">
                      <div className="h-5 bg-gray-100 rounded-full w-16" />
                      <div className="h-5 bg-gray-100 rounded-full w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {FEATURED_CATEGORIES.map((cat, index) => {
                const count = getProductCount(cat);
                const Icon = cat.Icon;
                const groups =
                  typeTree[cat.displayLabel] ||
                  typeTree[cat.name] ||
                  typeTree[cat.productTypeKeys[0]] ||
                  [];
                const topGroups = groups.map((g) => g.group).slice(0, 3);

                return (
                  <Link
                    key={cat.id}
                    to={`/products?type=${encodeURIComponent(cat.navType)}`}
                    id={`home-product-card-${cat.id}`}
                    className={`
                      group flex flex-col h-full bg-white rounded-2xl overflow-hidden 
                      shadow-xs hover:shadow-xl transition-all duration-400 
                      border border-gray-200/80 hover:border-[#8B1A1A]/40 
                      hover:-translate-y-1 relative
                      ${gridVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : "opacity-0"}
                    `}
                  >
                    {/* Image Section - Fixed height */}
                    <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                      <img
                        src={cat.image}
                        alt={cat.displayLabel}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/images/bar.jpg";
                        }}
                      />

                      {/* Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Product Count Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm border border-gray-200/80">
                          <span className="text-[10px] font-bold text-[#8B1A1A] uppercase tracking-wider">
                            {count} Items
                          </span>
                        </div>
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute bottom-3.5 left-3.5 z-10">
                        <div className="bg-white/95 backdrop-blur-md w-9 h-9 rounded-xl shadow-md border border-gray-100 flex items-center justify-center group-hover:bg-[#8B1A1A] group-hover:text-white transition-colors duration-300">
                          <Icon size={16} className="text-[#8B1A1A] group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>

                      {/* View Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="bg-white/95 text-[#8B1A1A] font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-200 border border-gray-100">
                          <span>Explore Catalog</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                      <div>
                        {/* Title */}
                        <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-[#8B1A1A] transition-colors duration-200">
                          {cat.displayLabel}
                        </h3>

                        {/* Description */}
                        <p className="font-body text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 min-h-[2.2rem]">
                          {cat.description}
                        </p>

                        {/* Grades / Materials */}
                        <div className="min-h-[24px] mt-2.5 flex flex-wrap gap-1.5">
                          {topGroups.length > 0 ? (
                            <>
                              {topGroups.map((g) => (
                                <span
                                  key={g}
                                  className="text-[10px] font-medium text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-200/80 uppercase tracking-wide"
                                >
                                  {g}
                                </span>
                              ))}
                              {topGroups.length < 3 && (
                                <span className="text-[10px] font-medium text-gray-400 px-1 py-0.5">
                                  + More
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-[10px] font-medium text-gray-400 py-0.5 uppercase tracking-wide">
                              Certified Industrial Grades
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Divider & Action */}
                      <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                          <span className="text-[11px] font-medium text-gray-500">
                            Ready Stock
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#8B1A1A] group-hover:text-[#6F1414] transition-colors duration-200 flex items-center gap-1 uppercase tracking-wider">
                          View Products
                          <ArrowRight
                            size={13}
                            className="group-hover:translate-x-1 transition-transform duration-200"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            to="/products"
            id="products-view-full-catalogue-cta"
            className="inline-flex items-center gap-2 bg-[#8B1A1A] hover:bg-[#A82020] text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <span>Browse Full Product Catalogue</span>
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>

          <button
            onClick={() => downloadProductCatalogue()}
            id="products-download-pdf-catalogue-cta"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#8B1A1A] border-2 border-[#8B1A1A] font-display font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <Download size={15} />
            <span>Download Product Catalogue (PDF)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
