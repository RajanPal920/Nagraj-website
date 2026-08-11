import { useEffect } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import {
  useProducts,
  type TypeCategoryNode,
  type TypeGroupNode,
} from "../hooks/useProducts";
import { PageHero } from "../components/PageHero";
import { getProductImage } from "../data/productImages";

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get("type") || "";

  const { products, types, typeTree, loading } = useProducts();
  const TOTAL = products.length;

  const location = useLocation();

  // Scroll to hash or top when type/hash changes
  useEffect(() => {
    if (loading) return;
    if (location.hash) {
      setTimeout(() => {
        const id = decodeURIComponent(location.hash.replace("#", ""));
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedType, location.hash, loading]);

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <PageHero
        id="products-hero"
        label={selectedType ? selectedType.toUpperCase() : "FULL CATALOGUE"}
        title={
          <>
            {TOTAL > 0 ? TOTAL : "417"}+ Products.
            <br />
            <span className="text-brand-red">All Specifications.</span>
          </>
        }
        description={
          selectedType
            ? `Browse our complete range of ${selectedType.toLowerCase()} across all material grades.`
            : "Bars, plates, pipes, fittings, flanges and forgings across stainless steel, alloy steel, titanium, nickel alloys and more — all in stock."
        }
        bgImage="/images/welding-wire.jpg"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mt-4">
          {[
            { value: TOTAL || 417, label: "Products" },
            { value: 25, label: "Material Families" },
            { value: types.length || 8, label: "Product Forms" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/10 backdrop-blur-sm rounded-sm border border-white/15 px-4 py-3"
            >
              <div className="font-display font-extrabold text-2xl text-white">
                {value}
              </div>
              <div className="font-body text-gray-400 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1300px] mx-auto px-4 xl:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !selectedType ? (
            <Level1TypeGrid types={types} typeTree={typeTree} />
          ) : (
            <Level2CategoryList type={selectedType} typeTree={typeTree} />
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Level 1: Product Types Grid
// ──────────────────────────────────────────────────────────────────────────────

function Level1TypeGrid({
  types,
  typeTree,
}: {
  types: string[];
  typeTree: Record<string, TypeGroupNode[]>;
}) {
  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mb-4">
          Select Product Form
        </h2>
        <div className="w-16 h-1 bg-brand-red mx-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {types.map((type) => {
          const groups = typeTree[type] || [];
          const count = groups.reduce(
            (acc, g) =>
              acc + g.categories.reduce((c, cat) => c + cat.products.length, 0),
            0,
          );
          const image = getProductImage(type, undefined, type);

          return (
            <Link
              to={`/products?type=${encodeURIComponent(type)}`}
              key={type}
              className="group block rounded-sm border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-56 bg-gray-100 overflow-hidden relative">
                <img
                  src={image}
                  alt={type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-red-dark/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-brand-charcoal group-hover:text-brand-red transition-colors">
                  {type}
                </h3>
                <p className="font-body text-gray-500 text-sm mt-2">
                  {count} Specifications Available
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Level 2: Mixed Layout Category List
// ──────────────────────────────────────────────────────────────────────────────

function Level2CategoryList({
  type,
  typeTree,
}: {
  type: string;
  typeTree: Record<string, TypeGroupNode[]>;
}) {
  const groups = typeTree[type];

  if (!groups || groups.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-4">
          No categories found for {type}
        </h3>
        <Link to="/products" className="text-brand-red hover:underline">
          ← Back to all types
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-display font-bold text-gray-500 hover:text-brand-red transition-colors"
        >
          <span className="text-lg leading-none">←</span> Back to Forms
        </Link>
      </div>

      <div className="space-y-20">
        {groups.map((group) => (
          <div key={group.group}>
            {/* Group Header */}
            <div className="mb-10">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-red mb-4 capitalize">
                {group.group.toLowerCase()}
              </h2>
              <div className="w-20 h-1 bg-brand-red" />
            </div>

            {/* Categories */}
            <div className="space-y-10">
              {group.categories.map((cat) => (
                <CategoryCard
                  key={cat.category}
                  type={type}
                  categoryNode={cat}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Category Card (Mix Layout)
// ──────────────────────────────────────────────────────────────────────────────

function CategoryCard({
  type,
  categoryNode,
}: {
  type: string;
  categoryNode: TypeCategoryNode;
}) {
  const { label, products, category } = categoryNode;
  const titleDisplay = `${label} ${type}`;
  const image = getProductImage(type, category, `${label} ${type}`);

  return (
    <div
      id={category}
      className="flex flex-col lg:flex-row bg-white border-y border-r border-gray-100 border-l-[12px] border-l-brand-red shadow-sm hover:shadow-card transition-shadow duration-300 p-6 lg:p-8 gap-8 scroll-mt-32"
    >
      <div className="flex-shrink-0 w-full lg:w-[200px] flex items-center justify-center bg-gray-50 rounded-sm p-4 border border-gray-100">
        <img
          src={image}
          alt={titleDisplay}
          className="w-full h-full max-w-[200px] max-h-[200px] aspect-square object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-display font-bold text-2xl text-brand-charcoal mb-6 capitalize">
          {titleDisplay.toLowerCase()}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/products/${p.slug}`}
                className="group flex items-start gap-2 font-body text-sm font-semibold text-brand-charcoal hover:text-brand-red transition-colors"
              >
                <span className="text-brand-red flex-shrink-0 font-bold">
                  ➔
                </span>
                <span className="line-clamp-2">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
