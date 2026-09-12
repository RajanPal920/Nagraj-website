// src/components/ProductGrid.tsx

import { Link } from "react-router-dom";
import { ArrowRight, Package, Award, Shield, Zap } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { getProductImage } from "../data/productImages";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { getTypeDisplayLabel } from "../data/categoryConfig";
import { getProducts } from "../data/products";

// ─── Type to display label mapping ──────────────────────────────────────────
const TYPE_TO_DISPLAY: Record<string, string> = {
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
  "Welding Wire": "Welding Wires",
  "Hollow Section": "Hollow Sections",
  "Structural Profile": "Structural Profiles",
  Coil: "Coils",
};

// ─── Descriptions for each product type ────────────────────────────────────
const TYPE_DESCRIPTIONS: Record<string, string> = {
  Flange: "Precision-engineered steel flanges for piping systems.",
  Fitting: "High-quality pipe fittings for industrial connections.",
  Plate: "Premium steel plates for structural and industrial use.",
  Bar: "High-strength steel bars for construction and fabrication.",
  Pipe: "Durable steel pipes for fluid and gas transmission.",
  Sheet: "Versatile steel sheets for manufacturing and fabrication.",
  Rod: "Quality steel rods for machining and engineering.",
  Forging: "Precision-forged steel components for demanding applications.",
  Fastener: "Reliable steel fasteners for secure assemblies.",
  "Structural Profile":
    "Structural steel profiles for building and construction.",
  "Hollow Section": "Hollow steel sections for lightweight structures.",
  "Welding Wire": "Premium welding wires for strong, durable welds.",
  Strip: "Steel strips for precision manufacturing applications.",
  Coil: "Steel coils for high-volume production and processing.",
};

// ─── Icons for each product type ───────────────────────────────────────────
const TYPE_ICONS: Record<string, React.ElementType> = {
  Flange: Award,
  Fitting: Shield,
  Plate: Package,
  Bar: Zap,
  Pipe: Package,
  Sheet: Package,
  Rod: Package,
  Forging: Shield,
  Fastener: Shield,
  "Structural Profile": Package,
  "Hollow Section": Package,
  "Welding Wire": Zap,
  Strip: Package,
  Coil: Package,
};

const getDisplayLabel = (type: string): string => {
  return TYPE_TO_DISPLAY[type] || type;
};

const getDescription = (type: string): string => {
  return (
    TYPE_DESCRIPTIONS[type] ||
    `Premium ${getDisplayLabel(type)} for industrial applications.`
  );
};

const getIcon = (type: string): React.ElementType => {
  return TYPE_ICONS[type] || Package;
};

export function ProductGrid() {
  const { types, typeTree, loading } = useProducts();
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  const allProducts = getProducts();

  const getActualProductTypes = () => {
    const typeSet = new Set<string>();
    allProducts.forEach((product) => {
      if (product.product_type) {
        typeSet.add(product.product_type);
      }
    });
    return Array.from(typeSet).sort();
  };

  const actualProductTypes = getActualProductTypes();
  const productTypes =
    actualProductTypes.length > 0 ? actualProductTypes : types;

  // ✅ Priority order — Round Bars pehle, Cold Work Tool Steels hataya
  const PRIORITY_ORDER = [
    "Round Bars",
    "Bar",
    "Pipes & Tubes",
    "Pipe",
    "Plates & Sheets",
    "Plate",
    "Flanges",
    "Flange",
    "Fasteners",
    "Fastener",
    "Fittings",
    "Fitting",
    "Forgings",
    "Forging",
    "Welding Electrodes",
    "Welding Wire",
    "Galvanized",
    "Pins",
    "Pin",
    "Hollow Sections",
    "Hollow Section",
    "Structural Profiles",
    "Structural Profile",
  ];

  // ✅ Cold Work Tool Steels aur duplicates hataye
  const EXCLUDED_TYPES = ["Cold Work Tool Steels", "Tool Steel"];

  // Step 1: Priority order ke hisaab se sort karo
  const prioritized = [...productTypes]
    .filter((t) => !EXCLUDED_TYPES.includes(t))
    .sort((a, b) => {
      const aIdx = PRIORITY_ORDER.findIndex(
        (p) => p.toLowerCase() === a.toLowerCase(),
      );
      const bIdx = PRIORITY_ORDER.findIndex(
        (p) => p.toLowerCase() === b.toLowerCase(),
      );
      // Jo priority list me hai, woh pehle
      if (aIdx !== -1 && bIdx === -1) return -1;
      if (aIdx === -1 && bIdx !== -1) return 1;
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      // Dono priority me nahi — alphabetical
      return a.localeCompare(b);
    });

  const limitedProductTypes = prioritized.slice(0, 8);

  const getProductCountForType = (type: string) => {
    return allProducts.filter((p) => p.product_type === type).length;
  };

  const getSampleProductForType = (type: string) => {
    return allProducts.find((p) => p.product_type === type);
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
          ) : limitedProductTypes.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-body">
              No product types available
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {limitedProductTypes.map((type, index) => {
                const displayLabel = getDisplayLabel(type);
                const description = getDescription(type);
                const Icon = getIcon(type);
                const count = getProductCountForType(type);
                const sampleProduct = getSampleProductForType(type);
                const image = sampleProduct
                  ? getProductImage(
                      sampleProduct.product_type,
                      sampleProduct.category,
                      sampleProduct.title,
                    )
                  : getProductImage(type, undefined, type);
                const navType = displayLabel;
                const groups = typeTree[type] || [];
                const topGroups = groups.map((g) => g.group).slice(0, 3);

                return (
                  <Link
                    key={type}
                    to={`/products?type=${encodeURIComponent(navType)}`}
                    id={`home-product-card-${type.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`
                      group block bg-white rounded-2xl overflow-hidden 
                      shadow-sm hover:shadow-2xl transition-all duration-500 
                      border border-gray-100 hover:border-brand-red/30 
                      hover:-translate-y-2 relative
                      ${gridVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : "opacity-0"}
                    `}
                  >
                    {/* Image Section - Increased height */}
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={image}
                        alt={displayLabel}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
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
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                        {displayLabel}
                      </h3>

                      {/* Description */}
                      <p className="font-body text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                        {description}
                      </p>

                      {/* Grades / Materials */}
                      {topGroups.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
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
                        </div>
                      )}

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
