import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Gauge,
  CheckCircle2,
  Tag,
  Layers,
  FileText,
  Wrench,
  Package,
  Phone,
} from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import {
  getCategoryDisplayLabel,
  getTypeDisplayLabel,
} from "../data/categoryConfig";
import { getProductImage } from "../data/productImages";

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

/** Filter out city-dump strings that ended up in some fields from the scraper */
function looksLikeCityDump(str: string): boolean {
  // If it's mostly commas and proper nouns with no real sentences, skip it
  const commaRatio = (str.match(/,/g) ?? []).length / str.length;
  return commaRatio > 0.05 && str.length > 200;
}

function cleanText(raw: string): string {
  return raw.replace(/^Description\s*/i, "").trim();
}

/* ─── Sub-components ───────────────────────────────────────────────────────── */

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={16} className="text-brand-red" strokeWidth={1.75} />
      <h2 className="font-display font-bold text-brand-red text-sm uppercase tracking-[0.15em]">
        {label}
      </h2>
    </div>
  );
}

function ChipList({
  items,
  color = "red",
}: {
  items: string[];
  color?: "red" | "gold";
}) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`text-xs font-body px-3 py-1.5 rounded-sm border ${
            color === "gold"
              ? "bg-brand-gold/10 border-brand-gold/30 text-brand-charcoal"
              : "bg-brand-red/8 border-brand-red/20 text-brand-red"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter(
    (s) => s.trim().length > 2 && !looksLikeCityDump(s),
  );
  if (!filtered.length) return null;
  return (
    <ul className="space-y-2">
      {filtered.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle2
            size={14}
            className="text-brand-red flex-shrink-0 mt-0.5"
            strokeWidth={2}
          />
          <span className="font-body text-gray-600 text-sm leading-relaxed">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Loading skeleton ─────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="animate-pulse pt-20">
      <div className="h-80 bg-gray-200 w-full" />
      <div className="container-xl section-padding space-y-6">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug);

  /* Loading */
  if (loading) return <Skeleton />;

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-400" strokeWidth={1} />
        <h1 className="font-display font-bold text-xl text-brand-charcoal">
          Failed to load products
        </h1>
        <p className="font-body text-gray-400 text-sm">{error}</p>
        <Link
          to="/products"
          className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  /* 404 */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-400" strokeWidth={1} />
        <h1 className="font-display font-bold text-2xl text-brand-charcoal">
          Product Not Found
        </h1>
        <p className="font-body text-gray-400 text-sm max-w-xs text-center">
          We couldn't find a product matching <strong>{slug}</strong>. It may
          have been moved.
        </p>
        <Link
          to="/products"
          className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  /* ── Data prep ── */
  const categoryLabel = getCategoryDisplayLabel(product.category);
  const typeLabel = getTypeDisplayLabel(product.product_type);
  const isSpecialized = product.category !== "Products";
  const descriptionText = cleanText(product.description_text);
  const hasChem = product.chemical_composition?.length > 0;
  const hasMech = product.mechanical_properties?.length > 0;
  // Always use clean local image — title is passed so inferVisualType() can correct scraper mislabels
  const heroImage = getProductImage(
    product.product_type,
    product.category,
    product.title,
  );

  const packingText =
    product.packing && !looksLikeCityDump(product.packing)
      ? product.packing
      : null;

  return (
    <>
      {/* SEO */}
      <title>
        {product.meta_title || `${product.title} | Nagraj Metal Industries`}
      </title>
      <meta
        name="description"
        content={
          product.meta_description ||
          `Buy ${product.title} from Nagraj Metal Industries. Verified quality, competitive pricing, pan-India dispatch.`
        }
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gray-50 border-b border-gray-100 px-4 sm:px-8 lg:px-16 xl:px-24 py-3 pt-20"
      >
        <ol className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-body text-gray-400 flex-wrap">
          <li>
            <Link to="/" className="hover:text-brand-red transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              to="/products"
              className="hover:text-brand-red transition-colors"
            >
              Products
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-brand-red transition-colors"
            >
              {categoryLabel}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}&type=${encodeURIComponent(product.product_type)}`}
              className="hover:text-brand-red transition-colors"
            >
              {typeLabel}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-700 font-semibold truncate max-w-[160px] sm:max-w-xs">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="bg-white">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section id="product-hero" className="relative">
          {/* Hero image — clean local type-mapped image (no watermarks) */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[480px] bg-gray-100 overflow-hidden">
            <img
              src={heroImage}
              alt={`${typeLabel} — ${product.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className={`text-xs font-display font-bold px-2.5 py-1 rounded-sm ${
                  isSpecialized
                    ? "bg-brand-red text-white"
                    : "bg-white/90 text-brand-red"
                }`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs font-display font-bold px-2.5 py-1 rounded-sm bg-brand-red text-white">
                {typeLabel}
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 lg:left-16 xl:left-24">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight max-w-3xl">
                {product.title}
              </h1>
            </div>
          </div>
        </section>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
            {/* ── Left: Main content (2/3 width) ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* Meta description */}
              {product.meta_description && (
                <p className="font-body text-gray-600 text-base leading-relaxed border-l-4 border-brand-red pl-5 py-1">
                  {product.meta_description}
                </p>
              )}

              {/* Full description */}
              {descriptionText && descriptionText.length > 20 && (
                <section id="product-description">
                  <SectionHeading icon={FileText} label="Description" />
                  <div className="space-y-3">
                    {descriptionText
                      .split(/\n\n+/)
                      .filter(
                        (p) => p.trim().length > 5 && !looksLikeCityDump(p),
                      )
                      .slice(0, 6)
                      .map((para, i) => (
                        <p
                          key={i}
                          className="font-body text-gray-600 text-sm leading-relaxed"
                        >
                          {para.trim()}
                        </p>
                      ))}
                  </div>
                </section>
              )}

              {/* Material Grades */}
              {product.material_grades?.length > 0 && (
                <section id="product-material-grades">
                  <SectionHeading icon={Tag} label="Material Grades" />
                  <ChipList items={product.material_grades} color="red" />
                </section>
              )}

              {/* Equivalent Grades */}
              {product.equivalent_grades?.length > 0 && (
                <section id="product-equivalent-grades">
                  <SectionHeading icon={Tag} label="Equivalent Grades" />
                  <ChipList items={product.equivalent_grades} color="gold" />
                </section>
              )}

              {/* Specifications */}
              {product.specifications?.length > 0 && (
                <section id="product-specifications">
                  <SectionHeading
                    icon={Layers}
                    label="Specifications & Standards"
                  />
                  <ChipList items={product.specifications} color="red" />
                </section>
              )}

              {/* Applications */}
              {product.applications?.length > 0 && (
                <section id="product-applications">
                  <SectionHeading icon={Wrench} label="Applications" />
                  <BulletList items={product.applications} />
                </section>
              )}

              {/* Features */}
              {product.features?.length > 0 && (
                <section id="product-features">
                  <SectionHeading icon={CheckCircle2} label="Features" />
                  <BulletList items={product.features} />
                </section>
              )}

              {/* Chemical Composition */}
              {hasChem && (
                <section id="product-chemical-composition">
                  <SectionHeading icon={Beaker} label="Chemical Composition" />
                  <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-card">
                    <table className="w-full text-sm font-body">
                      <thead className="bg-brand-red text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Element / Grade
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Min Value
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Max Value
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Unit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.chemical_composition.map((entry, i) => (
                          <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <td className="px-4 py-2.5 font-medium text-brand-charcoal">
                              {entry.element}
                            </td>
                            <td className="px-4 py-2.5 text-gray-600">
                              {entry.min_value || "—"}
                            </td>
                            <td className="px-4 py-2.5 text-gray-600">
                              {entry.max_value || "—"}
                            </td>
                            <td className="px-4 py-2.5 text-gray-500">
                              {entry.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Mechanical Properties */}
              {hasMech && (
                <section id="product-mechanical-properties">
                  <SectionHeading icon={Gauge} label="Mechanical Properties" />
                  <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-card">
                    <table className="w-full text-sm font-body">
                      <thead className="bg-brand-red text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Property
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Value
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Unit
                          </th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">
                            Condition
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.mechanical_properties.map((entry, i) => (
                          <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          >
                            <td className="px-4 py-2.5 font-medium text-brand-charcoal">
                              {entry.property_name}
                            </td>
                            <td className="px-4 py-2.5 text-gray-600">
                              {entry.value || "—"}
                            </td>
                            <td className="px-4 py-2.5 text-gray-500">
                              {entry.unit || "—"}
                            </td>
                            <td className="px-4 py-2.5 text-gray-600 text-xs">
                              {entry.condition || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Tests */}
              {product.tests?.length > 0 && (
                <section id="product-tests">
                  <SectionHeading icon={CheckCircle2} label="Tests Performed" />
                  <BulletList items={product.tests} />
                </section>
              )}

              {/* Packing */}
              {packingText && (
                <section id="product-packing">
                  <SectionHeading icon={Package} label="Packing" />
                  <p className="font-body text-gray-600 text-sm leading-relaxed">
                    {packingText}
                  </p>
                </section>
              )}

              {/* Back link */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/products"
                  id="product-page-back"
                  className="inline-flex items-center gap-2 text-sm font-display font-bold text-gray-400 hover:text-brand-red transition-colors duration-200"
                >
                  <ArrowLeft size={15} />
                  Back to All Products
                </Link>
              </div>
            </div>

            {/* ── Right: Sticky enquiry sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Enquiry card */}
                <div className="bg-brand-red rounded-lg p-7 shadow-card-hover">
                  <p className="text-white/80 font-display font-bold text-xs uppercase tracking-[0.2em] mb-2">
                    Interested in this product?
                  </p>
                  <h3 className="font-display font-extrabold text-xl text-white mb-1 leading-tight">
                    Get a Quote
                  </h3>
                  <p className="font-body text-white/80 text-xs mb-6 leading-relaxed">
                    Share your grade, size and quantity — we'll respond within
                    one business day.
                  </p>
                  <Link
                    to="/contact"
                    id={`product-${product.slug}-enquire`}
                    className="bg-white hover:bg-white/90 text-brand-red font-display font-bold px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm w-full"
                  >
                    Enquire Now
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Call card */}
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-5 shadow-card">
                  <p className="font-body text-gray-600 text-xs mb-3">
                    Prefer to call?
                  </p>
                  <a
                    href="tel:+917073875529"
                    id={`product-${product.slug}-call`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-red/15 border border-brand-red/30 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                      <Phone
                        size={15}
                        className="text-brand-red group-hover:text-white transition-colors"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-charcoal text-sm group-hover:text-brand-red transition-colors">
                        +91 7073875529
                      </p>
                      <p className="font-body text-gray-600 text-xs">
                        Mumbai office
                      </p>
                    </div>
                  </a>
                </div>

                {/* Product type badge */}
                <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-card space-y-3">
                  <div>
                    <p className="font-body text-gray-600 text-xs mb-1">
                      Product Type
                    </p>
                    <p className="font-display font-bold text-brand-red text-sm">
                      {product.product_type}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-600 text-xs mb-1">
                      Category
                    </p>
                    <p className="font-display font-bold text-brand-charcoal text-sm">
                      {categoryLabel}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-600 text-xs mb-1">
                      Product Form
                    </p>
                    <p className="font-display font-bold text-brand-red text-sm">
                      {typeLabel}
                    </p>
                  </div>
                  {product.material_grades?.length > 0 && (
                    <div>
                      <p className="font-body text-gray-600 text-xs mb-2">
                        Key Grades
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.material_grades.slice(0, 5).map((g, i) => (
                          <span
                            key={i}
                            className="text-xs font-body bg-brand-red/8 text-brand-red border border-brand-red/20 px-2 py-0.5 rounded-lg"
                          >
                            {g}
                          </span>
                        ))}
                        {product.material_grades.length > 5 && (
                          <span className="text-xs font-body text-gray-400">
                            +{product.material_grades.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
