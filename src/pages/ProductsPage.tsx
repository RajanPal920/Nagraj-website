// src/pages/ProductsPage.tsx

import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Grid3X3,
  List,
  Package,
  Truck,
  ArrowRight,
  X,
  Sparkles,
  TrendingUp,
  Shield,
  Eye,
  Award,
  Zap,
  Factory,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  getProducts,
  getAllCategories,
  getAllProductTypes,
  type ScrapedProduct,
} from "../data/products";
import {
  getCategoryDisplayLabel,
  getTypeDisplayLabel,
  TYPE_LABELS,
} from "../data/categoryConfig";
import { getProductImage } from "../data/productImages";
import ProductHero from "../../public/images/productHero.png";

// ─── Helper: Get raw product type from display label ──────────────────────

function getRawProductType(displayLabel: string): string | undefined {
  for (const [rawType, displayName] of Object.entries(TYPE_LABELS)) {
    if (displayName === displayLabel) {
      return rawType;
    }
  }
  return undefined;
}

/* ─── Helper: Get Product Image ───────────────────────────────────────────── */

function getProductImageUrl(product: ScrapedProduct): {
  url: string;
  alt: string;
} {
  if (product.images && product.images.length > 0) {
    return {
      url: product.images[0].url,
      alt: product.images[0].alt || product.title,
    };
  }
  return {
    url: getProductImage(product.product_type, product.category, product.title),
    alt: product.title,
  };
}

/* ─── Hero Stats Badge ────────────────────────────────────────────────────── */

function HeroStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-300 group cursor-default">
      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-white font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}

/* ─── Product Card Component ──────────────────────────────────────────────── */

function ProductCard({ product }: { product: ScrapedProduct }) {
  const categoryLabel = getCategoryDisplayLabel(product.category);
  const typeLabel = getTypeDisplayLabel(product.product_type);
  const { url: imageUrl, alt: imageAlt } = getProductImageUrl(product);

  const hasGrades = product.material_grades?.length > 0;
  const hasSpecs = product.specifications?.length > 0;

  const hasStock = (() => {
    if (!product.current_stock) return false;
    if (Array.isArray(product.current_stock))
      return product.current_stock.length > 0;
    if (typeof product.current_stock === "string")
      return product.current_stock.trim().length > 0;
    if (typeof product.current_stock === "object")
      return Object.keys(product.current_stock).length > 0;
    return false;
  })();

  const shortDescription =
    product.meta_description ||
    product.description_text?.slice(0, 110) +
      (product.description_text?.length > 110 ? "..." : "") ||
    `Premium ${typeLabel} available in various grades and specifications.`;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 border border-gray-100 hover:border-[#c41e24]/40 hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#c41e24] text-white shadow-lg backdrop-blur-sm border border-white/10">
            {categoryLabel}
          </span>
          {hasStock && (
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white shadow-lg backdrop-blur-sm flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              In Stock
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-800 shadow-lg border border-white/20">
            {typeLabel}
          </span>
        </div>

        {/* View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <div className="bg-white text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-full shadow-2xl hover:bg-[#c41e24] hover:text-white transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
            <Eye size={16} />
            View Details
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#c41e24] transition-colors duration-200 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>

        {hasGrades && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.material_grades.slice(0, 3).map((grade, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-3 py-1 rounded-full bg-[#c41e24]/10 border border-[#c41e24]/15 text-[#c41e24]"
              >
                {grade}
              </span>
            ))}
            {product.material_grades.length > 3 && (
              <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                +{product.material_grades.length - 3}
              </span>
            )}
          </div>
        )}

        <p className="mt-2.5 text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 min-h-[3rem]">
          {shortDescription}
        </p>

        {hasSpecs && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500"
              >
                {spec.length > 15 ? spec.slice(0, 15) + "..." : spec}
              </span>
            ))}
            {product.specifications.length > 2 && (
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-400">
                +{product.specifications.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#c41e24]/10 flex items-center justify-center">
              <Truck size={13} className="text-[#c41e24]" />
            </div>
            <span className="text-[10px] font-medium text-gray-500">
              Pan-India Supply
            </span>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-[#c41e24] group-hover:gap-3 transition-all duration-300 group-hover:text-[#c41e24]/80">
            View Details
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Loading Skeleton ────────────────────────────────────────────────────── */

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="p-5 space-y-3.5">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-100 rounded-full w-16" />
          <div className="h-6 bg-gray-100 rounded-full w-16" />
          <div className="h-6 bg-gray-100 rounded-full w-12" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-full" />
          <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 bg-gray-100 rounded-full w-20" />
          <div className="h-5 bg-gray-100 rounded-full w-20" />
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-between">
          <div className="h-4 bg-gray-100 rounded w-24" />
          <div className="h-4 bg-gray-100 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Products Page ──────────────────────────────────────────────────── */

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";
  const urlType = searchParams.get("type") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedType, setSelectedType] = useState(urlType);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const loadProductsData = () => {
      try {
        setLoading(true);
        const allProducts = getProducts();
        setProducts(allProducts);

        const allCategories = getAllCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductsData();
  }, []);

  useEffect(() => {
    const category = searchParams.get("category") || "";
    setSelectedCategory(category);

    const type = searchParams.get("type") || "";
    setSelectedType(type);

    const search = searchParams.get("search") || "";
    setSearchTerm(search);
  }, [searchParams]);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.delete("page");
    setSearchParams(params);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.description_text?.toLowerCase().includes(term) ||
          p.material_grades?.some((g) => g.toLowerCase().includes(term)) ||
          p.category?.toLowerCase().includes(term) ||
          p.product_type?.toLowerCase().includes(term),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.product_type === selectedType);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedType]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Get clean page title
  const getPageTitle = () => {
    if (selectedCategory) {
      return getCategoryDisplayLabel(selectedCategory);
    }
    if (selectedType) {
      return getTypeDisplayLabel(selectedType);
    }
    return "Premium Industrial Products";
  };

  // Get page description
  const getPageDescription = () => {
    if (selectedCategory) {
      return `Explore our premium collection of ${getCategoryDisplayLabel(selectedCategory)}. High-quality materials tested and certified for industrial applications.`;
    }
    if (selectedType) {
      return `Discover our premium ${getTypeDisplayLabel(selectedType)} collection. Quality tested materials available with pan-India supply.`;
    }
    return "Explore our extensive range of premium quality industrial metals, alloys, and specialized materials for demanding applications across multiple industries.";
  };

  if (loading) {
    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 mb-8" />
            <div className="h-12 bg-gray-200 rounded-2xl w-72 mb-3" />
            <div className="h-6 bg-gray-100 rounded-2xl w-96 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pageTitle = getPageTitle();
  const pageDescription = getPageDescription();

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* ─── PREMIUM HERO SECTION ─── */}
      <div className="relative overflow-hidden w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={ProductHero}
            alt="Products Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c41e24]/15 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c41e24]/10 rounded-full blur-2xl -ml-32 -mb-32" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c41e24]/8 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left Section */}
            <div className="flex-1 max-w-3xl">
              {/* Breadcrumb / Tag */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6 bg-[#c41e24] rounded-full" />
                  <span className="text-white/80 font-bold text-xs uppercase tracking-[0.15em] bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    {selectedCategory || selectedType
                      ? "Collection"
                      : "Premium Collection"}
                  </span>
                </div>
                <span className="text-white/40 text-xs font-medium">•</span>
                <span className="text-white/60 text-xs font-medium bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
                  {filteredProducts.length} Products Available
                </span>
              </div>

              {/* Title - Clean and simple */}
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] tracking-tight">
                {pageTitle}
              </h1>

              {/* Description */}
              <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed">
                {pageDescription}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Shield size={16} className="text-emerald-400" />
                  <span>Quality Tested</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Truck size={16} className="text-blue-400" />
                  <span>Pan-India Supply</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <Award size={16} className="text-amber-400" />
                  <span>Industry Certified</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle size={16} className="text-[#c41e24]" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {/* Right Section - Stats */}
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <HeroStat
                icon={Package}
                label="Products"
                value={filteredProducts.length}
              />
              <HeroStat
                icon={Factory}
                label="Categories"
                value={categories.length}
              />
              <HeroStat
                icon={Clock}
                label="Ready Stock"
                value={products.filter((p) => p.current_stock).length}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and View Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const params = new URLSearchParams(searchParams);
                  if (e.target.value) {
                    params.set("search", e.target.value);
                  } else {
                    params.delete("search");
                  }
                  params.delete("page");
                  setSearchParams(params);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-12 py-2.5 rounded-xl border border-gray-200 focus:border-[#c41e24] focus:ring-2 focus:ring-[#c41e24]/10 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    const params = new URLSearchParams(searchParams);
                    params.delete("search");
                    params.delete("page");
                    setSearchParams(params);
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-[#c41e24]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-[#c41e24]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedCategory || selectedType || searchTerm) && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#c41e24]/10 text-[#c41e24]">
                  {getCategoryDisplayLabel(selectedCategory)}
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      const params = new URLSearchParams(searchParams);
                      params.delete("category");
                      params.delete("page");
                      setSearchParams(params);
                      setCurrentPage(1);
                    }}
                    className="hover:text-[#c41e24]/80"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedType && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                  {getTypeDisplayLabel(selectedType)}
                  <button
                    onClick={() => {
                      setSelectedType("");
                      const params = new URLSearchParams(searchParams);
                      params.delete("type");
                      params.delete("page");
                      setSearchParams(params);
                      setCurrentPage(1);
                    }}
                    className="hover:text-blue-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  "{searchTerm}"
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      const params = new URLSearchParams(searchParams);
                      params.delete("search");
                      params.delete("page");
                      setSearchParams(params);
                      setCurrentPage(1);
                    }}
                    className="hover:text-gray-800"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {(selectedCategory || selectedType || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-gray-400 hover:text-[#c41e24] transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c41e24]/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-[#c41e24]" />
            </div>
            <p className="text-gray-500 text-sm">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products
              {filteredProducts.length > 0 && (
                <span className="text-gray-400 text-xs ml-2">
                  (
                  {filteredProducts.length === 1
                    ? "1 product available"
                    : `${filteredProducts.length} products available`}
                  )
                </span>
              )}
            </p>
          </div>
          {filteredProducts.length > productsPerPage && (
            <span className="text-gray-400 text-xs bg-gray-100 px-3 py-1 rounded-full">
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Package size={40} className="text-gray-300" />
            </div>
            <h3 className="font-bold text-2xl text-gray-900 mb-3">
              No products found
            </h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 text-sm font-bold text-[#c41e24] hover:text-[#c41e24]/80 transition-colors inline-flex items-center gap-2 bg-[#c41e24]/10 px-6 py-3 rounded-xl hover:bg-[#c41e24]/20"
            >
              Clear all filters
              <ArrowRight size={16} />
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => {
                const newPage = Math.max(currentPage - 1, 1);
                setCurrentPage(newPage);
                const params = new URLSearchParams(searchParams);
                if (newPage > 1) {
                  params.set("page", String(newPage));
                } else {
                  params.delete("page");
                }
                setSearchParams(params);
              }}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-[#c41e24] hover:text-[#c41e24] hover:bg-[#c41e24]/5"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    const params = new URLSearchParams(searchParams);
                    if (pageNum > 1) {
                      params.set("page", String(pageNum));
                    } else {
                      params.delete("page");
                    }
                    setSearchParams(params);
                  }}
                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-[#c41e24] text-white shadow-lg shadow-[#c41e24]/20"
                      : "border-2 border-gray-200 text-gray-600 hover:border-[#c41e24] hover:text-[#c41e24] hover:bg-[#c41e24]/5"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => {
                const newPage = Math.min(currentPage + 1, totalPages);
                setCurrentPage(newPage);
                const params = new URLSearchParams(searchParams);
                if (newPage > 1) {
                  params.set("page", String(newPage));
                } else {
                  params.delete("page");
                }
                setSearchParams(params);
              }}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-[#c41e24] hover:text-[#c41e24] hover:bg-[#c41e24]/5"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
