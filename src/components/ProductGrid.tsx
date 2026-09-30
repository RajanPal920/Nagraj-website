// src/components/ProductGrid.tsx

import { Link } from "react-router-dom";
import { ArrowRight, Package, Award, Shield, Zap } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { getProducts } from "../data/products";

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
    <section id="products" className="section-padding bg-gray-50">
      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <span className="inline-block text-brand-red font-bold text-xs uppercase tracking-[0.2em] bg-brand-red/10 px-4 py-1.5 rounded-full mb-4">
            Our Range
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-charcoal mb-3">
            Product <span className="text-brand-red">Categories</span>
          </h2>
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-4" />
          <p className="font-body text-gray-500 text-base max-w-2xl mx-auto">
            From structural profiles to high-pressure seamless pipes, Nagraj
            Metal Industries stocks and supplies the full spectrum of industrial
            steel products.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="min-h-[200px]">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-7 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="flex gap-1.5 mt-2">
                      <div className="h-5 bg-gray-100 rounded-full w-16" />
                      <div className="h-5 bg-gray-100 rounded-full w-16" />
                      <div className="h-5 bg-gray-100 rounded-full w-12" />
                    </div>
                    <div className="h-8 bg-gray-100 rounded w-1/3" />
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
                      shadow-sm hover:shadow-2xl transition-all duration-500 
                      border border-gray-100 hover:border-brand-red/30 
                      hover:-translate-y-2 relative
                      ${gridVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : "opacity-0"}
                    `}
                  >
                    {/* Image Section - Fixed height */}
                    <div className="relative h-52 w-full shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={cat.image}
                        alt={cat.displayLabel}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/images/bar.jpg";
                        }}
                      />

                      {/* Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Product Count Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                          <span className="text-[10px] font-bold text-brand-red">
                            {count} Products
                          </span>
                        </div>
                      </div>

                      {/* Icon Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/95 backdrop-blur-sm w-10 h-10 rounded-xl shadow-lg border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon size={18} className="text-brand-red" />
                        </div>
                      </div>

                      {/* View Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white text-brand-red font-bold text-sm px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-300">
                          <span>Explore Collection</span>
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Increased padding */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="font-display font-bold text-lg text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                          {cat.displayLabel}
                        </h3>

                        {/* Description */}
                        <p className="font-body text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {cat.description}
                        </p>

                        {/* Grades / Materials */}
                        <div className="min-h-[26px] mt-3 flex flex-wrap gap-1.5">
                          {topGroups.length > 0 ? (
                            <>
                              {topGroups.map((g) => (
                                <span
                                  key={g}
                                  className="text-[10px] font-medium text-brand-red bg-brand-red/8 px-2.5 py-0.5 rounded-full border border-brand-red/10"
                                >
                                  {g}
                                </span>
                              ))}
                              {topGroups.length < 3 && (
                                <span className="text-[10px] font-medium text-gray-400 px-2.5 py-0.5">
                                  + More
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-[10px] font-medium text-gray-400 py-0.5">
                              Premium Steel Grades
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Premium Divider */}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red/60" />
                          <span className="text-[10px] font-medium text-gray-400">
                            Premium Quality
                          </span>
                        </div>
                        <span className="text-sm font-bold text-brand-red group-hover:text-brand-red-dark transition-colors duration-300 flex items-center gap-1.5">
                          View Products
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </span>
                      </div>
                    </div>

                    {/* Premium Corner Accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-brand-red/5 rotate-45 translate-x-8 -translate-y-8 group-hover:bg-brand-red/10 transition-colors duration-500" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            id="products-view-full-catalogue-cta"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm group"
          >
            View Full Product Catalogue
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
