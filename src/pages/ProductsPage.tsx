import { useState, useMemo, useCallback, useEffect } from 'react';
import { Package, Tag, Layers, Image as ImageIcon, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { type ScrapedProduct } from '../data/scrapedProductsData';
import { useProducts } from '../hooks/useProducts';
import { ProductsFilter } from '../components/ProductsFilter';
import { ScrapedProductCard } from '../components/ScrapedProductCard';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';

const PAGE_SIZE = 48;

// We will compute stats dynamically inside the component

export function ProductsPage() {
  const { products, categories, types, categoryCounts, typeCounts, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  // ── Filter state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeProduct, setActiveProduct] = useState<ScrapedProduct | null>(null);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedType(searchParams.get('type') || '');
  }, [searchParams]);

  const TOTAL = products.length;
  const CATEGORY_COUNT = categories.length;
  const TYPE_COUNT = types.length;
  const IMAGE_COUNT = useMemo(() => products.filter((p) => p.images?.length > 0).length, [products]);

  // ── Filtered products ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedType && p.product_type !== selectedType) return false;
      if (q) {
        return (
          p.title.toLowerCase().includes(q) ||
          p.meta_description.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, search, selectedCategory, selectedType]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset visible count when filters change
  const handleSearch = useCallback((v: string) => { setSearch(v); setVisibleCount(PAGE_SIZE); }, []);
  const handleCategory = useCallback((v: string) => { setSelectedCategory(v); setVisibleCount(PAGE_SIZE); }, []);
  const handleType = useCallback((v: string) => { setSelectedType(v); setVisibleCount(PAGE_SIZE); }, []);

  return (
    <>
      {/* ── SEO ── */}
      <title>Our Products | Bhumi Steel & Alloys</title>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="products-hero"
        className="bg-steel-gradient steel-texture relative overflow-hidden py-24 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <p className="section-label mb-2">Full Catalogue</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
            417 Products.<br />
            <span className="text-brand-gold">All Specifications.</span>
          </h1>
          <p className="font-body text-gray-300 text-lg max-w-2xl leading-relaxed mb-10">
            Bars, plates, pipes, fittings, flanges and forgings across stainless steel,
            alloy steel, titanium, nickel alloys and more — all in stock.
          </p>

          {/* Stat tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {[
              { icon: <Package size={18} />, value: TOTAL, label: 'Products' },
              { icon: <Tag size={18} />, value: CATEGORY_COUNT, label: 'Categories' },
              { icon: <Layers size={18} />, value: TYPE_COUNT, label: 'Product Types' },
              { icon: <ImageIcon size={18} />, value: IMAGE_COUNT, label: 'With Images' },
            ].map(({ icon, value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-sm border border-white/15 px-4 py-3">
                <div className="text-brand-gold mb-1">{icon}</div>
                <div className="font-display font-extrabold text-2xl text-white">{value}</div>
                <div className="font-body text-gray-400 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter bar (sticky) ───────────────────────────────────────────── */}
      <ProductsFilter
        search={search}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onCategory={handleCategory}
        selectedType={selectedType}
        onType={handleType}
        totalCount={TOTAL}
        filteredCount={filtered.length}
        categories={categories}
        types={types}
        categoryCounts={categoryCounts}
        typeCounts={typeCounts}
      />

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <section
        id="products-grid-section"
        className="section-padding bg-gray-50 min-h-[60vh]"
      >
        <div className="container-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-4" />
              <p className="font-body text-gray-400 text-sm">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="font-body text-brand-red text-sm mb-4">Error loading products: {error}</p>
            </div>
          ) : visible.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {visible.map((product, index) => (
                  <ScrapedProductCard
                    key={product.slug}
                    product={product}
                    index={index}
                    onViewDetails={setActiveProduct}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <p className="font-body text-gray-400 text-sm mb-4">
                    Showing {visible.length} of {filtered.length} products
                  </p>
                  <button
                    id="products-load-more"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="btn-outline-green inline-flex items-center gap-2 text-sm py-3"
                  >
                    Load More Products
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}

              {!hasMore && filtered.length > PAGE_SIZE && (
                <p className="mt-10 text-center font-body text-gray-400 text-sm">
                  All {filtered.length} matching products shown.
                </p>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Package size={28} className="text-gray-300" />
              </div>
              <h3 className="font-display font-bold text-brand-charcoal text-lg mb-2">
                No products found
              </h3>
              <p className="font-body text-gray-400 text-sm max-w-xs mb-6">
                Try adjusting your search or clearing the filters.
              </p>
              <button
                onClick={() => { handleSearch(''); handleCategory(''); handleType(''); }}
                className="btn-outline-green text-sm py-2.5 px-6"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Enquire CTA strip ─────────────────────────────────────────────── */}
      <section
        id="products-cta-strip"
        className="bg-brand-green py-16 px-4 sm:px-8 lg:px-16 xl:px-24"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-white mb-1">
              Can't find what you need?
            </h2>
            <p className="font-body text-gray-300 text-sm">
              We source and supply custom grades. Tell us your requirement.
            </p>
          </div>
          <Link
            to="/contact"
            id="products-cta-strip-enquire"
            className="btn-primary shrink-0"
          >
            Request a Quote
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Detail Drawer ─────────────────────────────────────────────────── */}
      <ProductDetailDrawer
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
}
