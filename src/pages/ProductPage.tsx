import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { useProduct } from '../hooks/useProduct';
import { getCategoryLabel, FALLBACK_IMAGE } from '../data/scrapedProductsData';

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

/** Filter out city-dump strings that ended up in some fields from the scraper */
function looksLikeCityDump(str: string): boolean {
  // If it's mostly commas and proper nouns with no real sentences, skip it
  const commaRatio = (str.match(/,/g) ?? []).length / str.length;
  return commaRatio > 0.05 && str.length > 200;
}

function cleanText(raw: string): string {
  return raw.replace(/^Description\s*/i, '').trim();
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
      <Icon size={16} className="text-brand-gold" strokeWidth={1.75} />
      <h2 className="font-display font-bold text-brand-green text-sm uppercase tracking-[0.15em]">
        {label}
      </h2>
    </div>
  );
}

function ChipList({ items, color = 'green' }: { items: string[]; color?: 'green' | 'gold' }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`text-xs font-body px-3 py-1.5 rounded-sm border ${
            color === 'gold'
              ? 'bg-brand-gold/10 border-brand-gold/30 text-brand-charcoal'
              : 'bg-brand-green/8 border-brand-green/20 text-brand-green'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter((s) => s.trim().length > 2 && !looksLikeCityDump(s));
  if (!filtered.length) return null;
  return (
    <ul className="space-y-2">
      {filtered.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle2
            size={14}
            className="text-brand-green flex-shrink-0 mt-0.5"
            strokeWidth={2}
          />
          <span className="font-body text-gray-600 text-sm leading-relaxed">{item}</span>
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
  const [activeImage, setActiveImage] = useState(0);

  /* Loading */
  if (loading) return <Skeleton />;

  /* Error */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-300" strokeWidth={1} />
        <h1 className="font-display font-bold text-xl text-brand-charcoal">Failed to load products</h1>
        <p className="font-body text-gray-400 text-sm">{error}</p>
        <Link to="/products" className="btn-outline-green text-sm py-2.5 px-6">
          Back to Products
        </Link>
      </div>
    );
  }

  /* 404 */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-300" strokeWidth={1} />
        <h1 className="font-display font-bold text-2xl text-brand-charcoal">Product Not Found</h1>
        <p className="font-body text-gray-400 text-sm max-w-xs text-center">
          We couldn't find a product matching <strong>{slug}</strong>. It may have been moved.
        </p>
        <Link to="/products" className="btn-outline-green text-sm py-2.5 px-6">
          Browse All Products
        </Link>
      </div>
    );
  }

  /* ── Data prep ── */
  const categoryLabel = getCategoryLabel(product.category);
  const isSpecialized = product.category !== 'Products';
  const descriptionText = cleanText(product.description_text);
  const hasChem = product.chemical_composition?.length > 0;
  const hasMech = product.mechanical_properties?.length > 0;
  const images = product.images?.length ? product.images : [{ url: FALLBACK_IMAGE, alt: product.title }];
  const hasGallery = images.length > 1;

  const packingText = product.packing && !looksLikeCityDump(product.packing)
    ? product.packing
    : null;

  return (
    <>
      {/* SEO */}
      <title>{product.meta_title || `${product.title} | Bhumi Steel & Alloys`}</title>
      <meta
        name="description"
        content={product.meta_description || `Buy ${product.title} from Bhumi Steel & Alloys. Verified quality, competitive pricing, pan-India dispatch.`}
      />

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-gray-50 border-b border-gray-100 px-4 sm:px-8 lg:px-16 xl:px-24 py-3 pt-20"
      >
        <ol className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-body text-gray-400 flex-wrap">
          <li>
            <Link to="/" className="hover:text-brand-green transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li>
            <Link to="/products" className="hover:text-brand-green transition-colors">
              Products
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-brand-green font-semibold truncate max-w-[200px] sm:max-w-xs">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="bg-white">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section id="product-hero" className="relative">
          {/* Hero image */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[480px] bg-gray-100 overflow-hidden">
            <img
              src={images[activeImage]?.url ?? FALLBACK_IMAGE}
              alt={images[activeImage]?.alt ?? product.title}
              className="w-full h-full object-cover transition-opacity duration-500"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Gallery arrows */}
            {hasGallery && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
                  id="product-hero-img-prev"
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % images.length)}
                  id="product-hero-img-next"
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span
                className={`text-xs font-display font-bold px-2.5 py-1 rounded-sm ${
                  isSpecialized ? 'bg-brand-gold text-white' : 'bg-white/90 text-brand-green'
                }`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs font-display font-bold px-2.5 py-1 rounded-sm bg-brand-green text-white">
                {product.product_type}
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-8 lg:left-16 xl:left-24">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight max-w-3xl">
                {product.title}
              </h1>
            </div>
          </div>

          {/* Thumbnail strip */}
          {hasGallery && (
            <div className="flex gap-2 px-4 sm:px-8 lg:px-16 xl:px-24 py-3 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-thin">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                    i === activeImage ? 'border-brand-gold' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-16">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

            {/* ── Left: Main content (2/3 width) ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Meta description */}
              {product.meta_description && (
                <p className="font-body text-gray-600 text-base leading-relaxed border-l-4 border-brand-gold pl-5 py-1">
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
                      .filter((p) => p.trim().length > 5 && !looksLikeCityDump(p))
                      .slice(0, 6)
                      .map((para, i) => (
                        <p key={i} className="font-body text-gray-600 text-sm leading-relaxed">
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
                  <ChipList items={product.material_grades} color="green" />
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
                  <SectionHeading icon={Layers} label="Specifications & Standards" />
                  <ChipList items={product.specifications} color="green" />
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
                  <div className="overflow-x-auto rounded-sm border border-gray-100 shadow-card">
                    <table className="w-full text-sm font-body">
                      <thead className="bg-brand-green text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Element / Grade</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Min Value</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Max Value</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Unit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.chemical_composition.map((entry, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2.5 font-medium text-brand-charcoal">{entry.element}</td>
                            <td className="px-4 py-2.5 text-gray-600">{entry.min_value || '—'}</td>
                            <td className="px-4 py-2.5 text-gray-600">{entry.max_value || '—'}</td>
                            <td className="px-4 py-2.5 text-gray-500">{entry.unit}</td>
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
                  <div className="overflow-x-auto rounded-sm border border-gray-100 shadow-card">
                    <table className="w-full text-sm font-body">
                      <thead className="bg-brand-green text-white">
                        <tr>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Property</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Value</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Unit</th>
                          <th className="px-4 py-3 text-left font-display font-bold text-xs">Condition</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.mechanical_properties.map((entry, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-4 py-2.5 font-medium text-brand-charcoal">{entry.property_name}</td>
                            <td className="px-4 py-2.5 text-gray-600">{entry.value || '—'}</td>
                            <td className="px-4 py-2.5 text-gray-500">{entry.unit || '—'}</td>
                            <td className="px-4 py-2.5 text-gray-400 text-xs">{entry.condition || '—'}</td>
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
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{packingText}</p>
                </section>
              )}

              {/* Back link */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/products"
                  id="product-page-back"
                  className="inline-flex items-center gap-2 text-sm font-display font-bold text-gray-400 hover:text-brand-green transition-colors duration-200"
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
                <div className="bg-brand-green rounded-sm p-7 shadow-card-hover">
                  <p className="text-brand-gold font-display font-bold text-xs uppercase tracking-[0.2em] mb-2">
                    Interested in this product?
                  </p>
                  <h3 className="font-display font-extrabold text-xl text-white mb-1 leading-tight">
                    Get a Quote
                  </h3>
                  <p className="font-body text-white/60 text-xs mb-6 leading-relaxed">
                    Share your grade, size and quantity — we'll respond within one business day.
                  </p>
                  <Link
                    to="/contact"
                    id={`product-${product.slug}-enquire`}
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    Enquire Now
                    <ArrowRight size={15} />
                  </Link>
                </div>

                {/* Call card */}
                <div className="bg-gray-50 rounded-sm border border-gray-100 p-5 shadow-card">
                  <p className="font-body text-gray-400 text-xs mb-3">Prefer to call?</p>
                  <a
                    href="tel:+912266362548"
                    id={`product-${product.slug}-call`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-sm bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center group-hover:bg-brand-gold transition-colors duration-300">
                      <Phone size={15} className="text-brand-gold group-hover:text-white transition-colors" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-charcoal text-sm group-hover:text-brand-green transition-colors">
                        22 6636 2548
                      </p>
                      <p className="font-body text-gray-400 text-xs">Mumbai office</p>
                    </div>
                  </a>
                </div>

                {/* Product type badge */}
                <div className="bg-white rounded-sm border border-gray-100 p-5 shadow-card space-y-3">
                  <div>
                    <p className="font-body text-gray-400 text-xs mb-1">Product Type</p>
                    <p className="font-display font-bold text-brand-green text-sm">{product.product_type}</p>
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-xs mb-1">Category</p>
                    <p className="font-display font-bold text-brand-charcoal text-sm">{categoryLabel}</p>
                  </div>
                  {product.material_grades?.length > 0 && (
                    <div>
                      <p className="font-body text-gray-400 text-xs mb-2">Key Grades</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.material_grades.slice(0, 5).map((g, i) => (
                          <span key={i} className="text-xs font-body bg-brand-green/8 text-brand-green border border-brand-green/20 px-2 py-0.5 rounded-sm">
                            {g}
                          </span>
                        ))}
                        {product.material_grades.length > 5 && (
                          <span className="text-xs font-body text-gray-400">+{product.material_grades.length - 5} more</span>
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
