// src/pages/ProductsPage.tsx

import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Grid3X3,
  List,
  ChevronDown,
  Package,
  Truck,
  ArrowRight,
  X,
  SlidersHorizontal,
  Filter,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Eye,
  Layers,
  Tag,
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
} from "../data/categoryConfig";
import { getProductImage } from "../data/productImages";

/* ─── Product Card Component ──────────────────────────────────────────────── */

function ProductCard({ product }: { product: ScrapedProduct }) {
  const categoryLabel = getCategoryDisplayLabel(product.category);
  const typeLabel = getTypeDisplayLabel(product.product_type);
  const imageUrl = getProductImage(
    product.product_type,
    product.category,
    product.title,
  );

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
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-gray-100 hover:border-brand-red/30 hover:-translate-y-1.5 flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badges - Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-display font-bold px-3 py-1 rounded-full bg-brand-red text-white shadow-lg backdrop-blur-sm border border-white/10">
            {categoryLabel}
          </span>
          {hasStock && (
            <span className="text-[10px] font-display font-bold px-3 py-1 rounded-full bg-green-500 text-white shadow-lg backdrop-blur-sm flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              In Stock
            </span>
          )}
        </div>

        {/* Type Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-display font-semibold px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-charcoal shadow-lg border border-white/20">
            {typeLabel}
          </span>
        </div>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/95 backdrop-blur-sm text-brand-charcoal font-display font-bold text-sm px-6 py-3 rounded-full shadow-xl hover:bg-brand-red hover:text-white transition-colors duration-200 flex items-center gap-2">
            <Eye size={16} />
            View Details
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-display font-bold text-brand-charcoal text-sm leading-tight group-hover:text-brand-red transition-colors duration-200 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Grades */}
        {hasGrades && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.material_grades.slice(0, 3).map((grade, i) => (
              <span
                key={i}
                className="text-[9px] font-body font-medium px-2.5 py-0.5 rounded-full bg-brand-red/5 border border-brand-red/10 text-brand-charcoal"
              >
                {grade}
              </span>
            ))}
            {product.material_grades.length > 3 && (
              <span className="text-[9px] font-body px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                +{product.material_grades.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="mt-2 font-body text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1 min-h-[2.5rem]">
          {shortDescription}
        </p>

        {/* Specifications */}
        {hasSpecs && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="text-[9px] font-body px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400"
              >
                {spec.length > 15 ? spec.slice(0, 15) + "..." : spec}
              </span>
            ))}
            {product.specifications.length > 2 && (
              <span className="text-[9px] font-body px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                +{product.specifications.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Truck size={12} className="text-gray-400" />
            <span className="text-[9px] font-body text-gray-400">
              Pan-India Supply
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-display font-bold text-brand-red group-hover:gap-2 transition-all duration-300">
            View Details
            <ArrowRight
              size={12}
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex gap-1.5">
          <div className="h-5 bg-gray-100 rounded w-14" />
          <div className="h-5 bg-gray-100 rounded w-14" />
          <div className="h-5 bg-gray-100 rounded w-10" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 bg-gray-100 rounded w-full" />
          <div className="h-2.5 bg-gray-100 rounded w-5/6" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-4 bg-gray-100 rounded w-16" />
          <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between">
          <div className="h-3 bg-gray-100 rounded w-20" />
          <div className="h-3 bg-gray-100 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Categories Section ──────────────────────────────────────────── */

function FeaturedCategories({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;

  // Random shuffle categories
  const shuffledCategories = useMemo(() => {
    const shuffled = [...categories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [categories]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Layers size={18} className="text-brand-red" strokeWidth={1.75} />
        <h2 className="font-display font-bold text-sm text-brand-charcoal uppercase tracking-wider">
          Browse by Category
        </h2>
        <span className="text-xs font-body text-gray-400 ml-2">
          ({categories.length} categories)
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {shuffledCategories.map((cat) => (
          <Link
            key={cat}
            to={`/products?category=${encodeURIComponent(cat)}`}
            className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all duration-200 border ${
              window.location.search.includes(`category=${encodeURIComponent(cat)}`)
                ? "bg-brand-red text-white border-brand-red shadow-sm"
                : "bg-gray-100 hover:bg-brand-red hover:text-white text-gray-600 border-transparent hover:border-brand-red/30"
            }`}
          >
            {getCategoryDisplayLabel(cat)}
          </Link>
        ))}
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
  const [productTypes, setProductTypes] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"title" | "date">("date");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const loadProductsData = () => {
      try {
        setLoading(true);
        const allProducts = getProducts();
        setProducts(allProducts);

        const allCategories = getAllCategories();
        const allTypes = getAllProductTypes();
        setCategories(allCategories);
        setProductTypes(allTypes);

        const categoryParam = searchParams.get("category");
        if (categoryParam && allCategories.includes(categoryParam)) {
          setSelectedCategory(categoryParam);
        }

        const typeParam = searchParams.get("type");
        if (typeParam && allTypes.includes(typeParam)) {
          setSelectedType(typeParam);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProductsData();
  }, [searchParams]);

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

    if (sortBy === "title") {
      filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "date") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.publish_date || a.scraped_at || 0);
        const dateB = new Date(b.publish_date || b.scraped_at || 0);
        return dateB.getTime() - dateA.getTime();
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, selectedType, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage, productsPerPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedType("");
    setSearchParams({});
    setCurrentPage(1);
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-xl w-64 mb-2" />
            <div className="h-6 bg-gray-100 rounded-xl w-96 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50/80 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles
                  size={18}
                  className="text-brand-red"
                  strokeWidth={2}
                />
                <span className="text-brand-red font-display font-bold text-xs uppercase tracking-[0.15em]">
                  Our Collection
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal leading-tight">
                Products
              </h1>
              <p className="font-body text-gray-500 mt-1 text-sm max-w-2xl">
                Discover our extensive range of high-quality metal products for
                industrial applications
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gray-100/80 px-4 py-2 rounded-full">
              <Shield size={14} className="text-gray-400" />
              <span className="text-xs font-body text-gray-500">
                {products.length} products available
              </span>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <FeaturedCategories categories={categories} />

        {/* Filter/Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by name, grade, or specification..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all font-body text-sm bg-gray-50/50 focus:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-brand-red/30 transition-colors bg-gray-50/50"
            >
              <SlidersHorizontal size={16} className="text-gray-500" />
              <span className="font-body text-sm text-gray-600">Filters</span>
              {(selectedCategory || selectedType) && (
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
              )}
            </button>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-brand-red"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-brand-red"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as "title" | "date");
                  setCurrentPage(1);
                }}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all font-body text-sm bg-gray-50/50 focus:bg-white cursor-pointer"
              >
                <option value="date">Latest First</option>
                <option value="title">Alphabetical</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-body text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Filter size={10} />
              Filters:
            </span>

            <button
              onClick={() => {
                if (categories.length === 0) return;
                const nextCategory = selectedCategory
                  ? ""
                  : categories[0] || "";
                setSelectedCategory(nextCategory);
                updateFilter("category", nextCategory);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-body font-medium transition-all ${
                selectedCategory
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Tag size={10} />
              {selectedCategory
                ? getCategoryDisplayLabel(selectedCategory)
                : "Category"}
              <ChevronDown
                size={10}
                className={selectedCategory ? "text-white/80" : "text-gray-400"}
              />
            </button>

            <button
              onClick={() => {
                if (productTypes.length === 0) return;
                const nextType = selectedType ? "" : productTypes[0] || "";
                setSelectedType(nextType);
                updateFilter("type", nextType);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-body font-medium transition-all ${
                selectedType
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Layers size={10} />
              {selectedType ? getTypeDisplayLabel(selectedType) : "Type"}
              <ChevronDown
                size={10}
                className={selectedType ? "text-white/80" : "text-gray-400"}
              />
            </button>

            {(selectedCategory || selectedType || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-[10px] font-body text-gray-400 hover:text-brand-red transition-colors ml-1"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-100 space-y-3 animate-slideDown">
              <div>
                <label className="text-[10px] font-body text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    updateFilter("category", e.target.value);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red outline-none text-sm bg-gray-50/50 focus:bg-white transition-all"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {getCategoryDisplayLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-body text-gray-400 uppercase tracking-wider block mb-1.5 font-semibold">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    updateFilter("type", e.target.value);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-brand-red outline-none text-sm bg-gray-50/50 focus:bg-white transition-all"
                >
                  <option value="">All Types</option>
                  {productTypes.map((type) => (
                    <option key={type} value={type}>
                      {getTypeDisplayLabel(type)}
                    </option>
                  ))}
                </select>
              </div>
              {(selectedCategory || selectedType || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-body text-brand-red font-semibold hover:text-brand-red/80 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count and View Mode Indicator */}
        <div className="flex items-center justify-between mb-5">
          <p className="font-body text-gray-400 text-sm flex items-center gap-2">
            <TrendingUp size={14} className="text-gray-300" />
            Showing{" "}
            <span className="font-semibold text-brand-charcoal">
              {filteredProducts.length}
            </span>{" "}
            products
            {filteredProducts.length > productsPerPage && (
              <span className="text-gray-400 text-xs">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </p>
          <span className="text-xs font-body text-gray-400 hidden sm:inline">
            {viewMode === "grid" ? "Grid view" : "List view"}
          </span>
        </div>

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-300" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-charcoal mb-2">
              No products found
            </h3>
            <p className="font-body text-gray-400 text-sm max-w-sm mx-auto">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-display font-bold text-brand-red hover:text-brand-red/80 transition-colors inline-flex items-center gap-1"
            >
              Clear all filters
              <ArrowRight size={14} />
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-sm font-body font-medium transition-all ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-brand-red hover:text-brand-red hover:bg-brand-red/5"
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
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-body font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-brand-red text-white shadow-md"
                      : "border border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red hover:bg-brand-red/5"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg border text-sm font-body font-medium transition-all ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-brand-red hover:text-brand-red hover:bg-brand-red/5"
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