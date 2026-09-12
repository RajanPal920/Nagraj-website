// src/pages/ProductPage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findProductBySlug, getProducts } from "../data/products";
import type { ScrapedProduct } from "../data/products";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { WatermarkedImage } from "../components/WatermarkedImage";
import {
  Award,
  FileCheck,
  Truck,
  Wrench,
  FileText,
  Ruler,
  FlaskConical,
  Settings,
  Factory,
  Sparkles,
  Search,
  Check,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

// ─── Category fallback images ─────────────────────────────────────────────
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Pipes & Tubes": "/images/pipe.jpg",
  "Plates & Sheets": "/images/sheet.jpg",
  "Round Bars": "/images/bar.jpg",
  "Cold Work Tool Steels": "/images/Cold-Work-Tool-Steels.jpg",
  Flanges: "/images/flange.jpg",
  Fasteners: "/images/fasteners.jpg",
  Fittings: "/images/fitting.jpg",
  "Welding Electrodes": "/images/Welding-Electrodes.jpg",
  Galvanized: "/images/Galvanized.jpg",
  Pins: "/images/Pins.jpg",
};

const PRODUCT_HERO_FALLBACK = "/images/productHero.png";

// ─── Strict Related Products ──────────────────────────────────────────────
function getRelatedProducts(
  current: ScrapedProduct,
  all: ScrapedProduct[],
  limit = 6,
): ScrapedProduct[] {
  const sameType = all.filter(
    (p) => p.slug !== current.slug && p.product_type === current.product_type,
  );

  if (sameType.length < limit) {
    const sameCategory = all.filter(
      (p) =>
        p.slug !== current.slug &&
        p.product_type !== current.product_type &&
        p.category === current.category &&
        !sameType.find((r) => r.slug === p.slug),
    );
    return [...sameType, ...sameCategory].slice(0, limit);
  }

  return sameType.slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

/** Section header — engineering datasheet style */
function SectionHeader({
  title,
  Icon,
}: {
  title: string;
  Icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
      <span className="w-1 h-6 bg-[#8B1A1A] rounded-full flex-shrink-0"></span>
      {Icon && <Icon className="w-5 h-5 text-[#8B1A1A]" strokeWidth={2} />}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}

/** Technical table — engineering datasheet style */
function TechnicalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: { key: string; value: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#8B1A1A] text-white">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-[#8B1A1A]/5 transition-colors border-b border-gray-100 last:border-b-0`}
            >
              <td className="px-5 py-3 font-semibold text-gray-800">
                {row.key}
              </td>
              <td className="px-5 py-3 text-gray-600">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Related product card — premium industrial catalogue with watermark */
function RelatedCard({
  product,
  fallbackImage,
}: {
  product: ScrapedProduct;
  fallbackImage: string;
}) {
  const title = product.title || product.slug;
  const img = product.images?.[0]?.url || fallbackImage;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white border border-gray-200 hover:border-[#8B1A1A] transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Image with watermark */}
      <div className="aspect-[4/3] bg-gray-50 relative">
        <WatermarkedImage
          src={img}
          alt={title}
          className="w-full h-full"
          imgClassName="group-hover:scale-[1.03] transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-sm text-[#8B1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-[#8B1A1A]/20">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#8B1A1A] transition-colors line-clamp-2 min-h-[2.5rem] mb-2 leading-snug">
          {title}
        </h3>

        {product.material_grades && product.material_grades.length > 0 && (
          <p className="text-[11px] text-gray-500 mb-3 line-clamp-1 uppercase tracking-wide">
            {product.material_grades.slice(0, 2).join(" • ")}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
            {product.product_type}
          </span>
          <span className="text-[#8B1A1A] text-xs font-bold flex items-center gap-1">
            View Product
            <ArrowRight
              className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
              strokeWidth={2.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<ScrapedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ScrapedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      const found = findProductBySlug(slug);
      setProduct(found || null);
      if (found) {
        const all = getProducts();
        setRelatedProducts(getRelatedProducts(found, all, 6));
      }
    }
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-[#F7F7F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-[#8B1A1A]"></div>
          <p className="text-sm text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-[#F7F7F7]">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#8B1A1A]/10 flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-[#8B1A1A]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Product Not Found
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-semibold py-3 px-6 transition-colors text-sm"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const title = product.title || product.slug;

  const productImg = product.images?.[0]?.url;
  const categoryImg =
    CATEGORY_FALLBACK_IMAGES[product.product_type] ||
    CATEGORY_FALLBACK_IMAGES[product.category] ||
    PRODUCT_HERO_FALLBACK;
  const mainImage = productImg || categoryImg;

  const whatsappLink = `https://wa.me/917073875529?text=${encodeURIComponent(
    `Enquiry for ${title}\n\nURL: ${window.location.href}`,
  )}`;

  const trustBadges = [
    { Icon: Award, label: "ISO Certified" },
    { Icon: FileCheck, label: "Test Certificate" },
    { Icon: Truck, label: "Fast Shipping" },
    { Icon: Wrench, label: "Custom Sizes" },
  ];

  // Parse specifications into key-value pairs
  const specRows =
    product.specifications && product.specifications.length > 0
      ? product.specifications.map((spec) => {
          const idx = spec.indexOf(":");
          if (idx > 0) {
            return {
              key: spec.substring(0, idx).trim(),
              value: spec.substring(idx + 1).trim(),
            };
          }
          return { key: spec, value: "—" };
        })
      : [];

  return (
    <div className="min-h-screen bg-[#F7F7F7] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ═══ BREADCRUMB ═══ */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#8B1A1A] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link
            to="/products"
            className="hover:text-[#8B1A1A] transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link
            to={`/products?type=${encodeURIComponent(product.product_type || product.category)}`}
            className="hover:text-[#8B1A1A] transition-colors"
          >
            {product.product_type || product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#8B1A1A] font-semibold truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </nav>

        {/* ═══ MAIN PRODUCT HERO ═══ */}
        <div className="bg-white border border-gray-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Image Panel with Watermark */}
            <div className="lg:sticky lg:top-28 lg:self-start border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="relative w-full aspect-[3/4] bg-white overflow-hidden">
                {/* Premium Quality Badge */}
                <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 bg-[#8B1A1A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                  <Check className="w-3 h-3" strokeWidth={3} />
                  Premium Quality
                </span>

                {/* ✅ Watermarked Image */}
                <WatermarkedImage
                  src={mainImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full"
                  imgClassName="object-cover object-center"
                />
              </div>
            </div>

            {/* RIGHT: Info Panel */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col">
              {/* Category & Type */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A] border border-[#8B1A1A]/30 bg-[#8B1A1A]/5 px-2.5 py-1">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 border border-gray-200 bg-gray-50 px-2.5 py-1">
                  {product.product_type}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 leading-tight">
                {title}
              </h1>

              {/* Material Grades — Technical Chips */}
              {product.material_grades &&
                product.material_grades.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.material_grades.slice(0, 6).map((g) => (
                      <span
                        key={g}
                        className="text-xs bg-white hover:bg-[#8B1A1A] text-gray-700 hover:text-white px-3 py-1.5 border border-gray-300 hover:border-[#8B1A1A] font-medium transition-all duration-200 cursor-default uppercase tracking-wide"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

              {/* Short Description */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {product.description_text?.substring(0, 320)}
                {product.description_text?.length > 320 ? "..." : ""}
              </p>

              {/* Technical Quick Specs — Datasheet Style */}
              <div className="grid grid-cols-2 border border-gray-200 mb-6">
                <div className="border-r border-gray-200 p-4 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8B1A1A]"></div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">
                    Material
                  </p>
                  <p className="font-bold text-gray-900 text-sm">
                    {product.material_grades?.[0] || "Multiple Grades"}
                  </p>
                </div>
                <div className="p-4 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gray-300"></div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">
                    Product Type
                  </p>
                  <p className="font-bold text-gray-900 text-sm">
                    {product.product_type}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href="tel:+917073875529"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-semibold py-3.5 px-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                >
                  <IoIosCall className="w-4 h-4 flex-shrink-0" />
                  <span>Call for Price</span>
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                >
                  <IoLogoWhatsapp className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Trust line */}
              <p className="text-xs text-gray-500 flex items-center justify-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                  Response within 24 hours
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                  Bulk discounts available
                </span>
              </p>
            </div>
          </div>

          {/* ═══ TRUST STRIP (Bottom of hero) ═══ */}
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
              {trustBadges.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2.5 py-4 px-3 hover:bg-white transition-colors group cursor-default"
                >
                  <Icon
                    className="w-4 h-4 text-[#8B1A1A] flex-shrink-0"
                    strokeWidth={1.75}
                  />
                  <span className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ PRODUCT DESCRIPTION ═══ */}
        {product.description_text && (
          <section className="bg-white border border-gray-200 p-6 sm:p-8 mb-6">
            <SectionHeader title="Product Description" Icon={FileText} />
            <p className="text-gray-700 leading-relaxed text-sm">
              {product.description_text}
            </p>
          </section>
        )}

        {/* ═══ SPECIFICATIONS ═══ */}
        {specRows.length > 0 && (
          <section className="bg-white border border-gray-200 p-6 sm:p-8 mb-6">
            <SectionHeader title="Specifications" Icon={Ruler} />
            <TechnicalTable
              headers={["Specification", "Details"]}
              rows={specRows}
            />
          </section>
        )}

        {/* ═══ CHEMICAL COMPOSITION ═══ */}
        {product.chemical_composition &&
          product.chemical_composition.length > 0 && (
            <section className="bg-white border border-gray-200 p-6 sm:p-8 mb-6">
              <SectionHeader title="Chemical Composition" Icon={FlaskConical} />
              <TechnicalTable
                headers={["Element", "Value"]}
                rows={product.chemical_composition.map((c) => ({
                  key: c.element,
                  value:
                    c.value ||
                    [c.min_value, c.max_value].filter(Boolean).join(" - "),
                }))}
              />
            </section>
          )}

        {/* ═══ MECHANICAL PROPERTIES ═══ */}
        {product.mechanical_properties &&
          product.mechanical_properties.length > 0 && (
            <section className="bg-white border border-gray-200 p-6 sm:p-8 mb-6">
              <SectionHeader title="Mechanical Properties" Icon={Settings} />
              <TechnicalTable
                headers={["Property", "Value"]}
                rows={product.mechanical_properties.map((m: any) => ({
                  key: m.property_name || m.property,
                  value:
                    m.value ||
                    [m.min_value, m.max_value].filter(Boolean).join(" - "),
                }))}
              />
            </section>
          )}

        {/* ═══ APPLICATIONS + KEY FEATURES ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {product.applications && product.applications.length > 0 && (
            <section className="bg-white border border-gray-200 p-6 sm:p-8">
              <SectionHeader title="Applications" Icon={Factory} />
              <ul className="space-y-3">
                {product.applications.map((app, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-3 leading-relaxed"
                  >
                    <ArrowRight
                      className="w-3.5 h-3.5 flex-shrink-0 text-[#8B1A1A] mt-1"
                      strokeWidth={2.5}
                    />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {product.features && product.features.length > 0 && (
            <section className="bg-white border border-gray-200 p-6 sm:p-8">
              <SectionHeader title="Key Features" Icon={Sparkles} />
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-3 leading-relaxed"
                  >
                    <Check
                      className="w-3.5 h-3.5 flex-shrink-0 text-green-600 mt-1"
                      strokeWidth={3}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* ═══ RELATED PRODUCTS ═══ */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            {/* Header */}
            <div className="flex items-end justify-between mb-5 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3 uppercase tracking-wide">
                  <span className="w-1 h-6 bg-[#8B1A1A]"></span>
                  Related {product.product_type}
                </h2>
                <p className="text-xs text-gray-500 mt-1.5 ml-4 uppercase tracking-wider">
                  Similar products you may require
                </p>
              </div>
              <Link
                to={`/products?type=${encodeURIComponent(product.product_type || product.category)}`}
                className="text-xs text-[#8B1A1A] hover:text-[#6F1414] font-semibold whitespace-nowrap inline-flex items-center gap-1 uppercase tracking-wider"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {relatedProducts.map((rp) => (
                <RelatedCard
                  key={rp.slug}
                  product={rp}
                  fallbackImage={
                    CATEGORY_FALLBACK_IMAGES[rp.product_type] ||
                    CATEGORY_FALLBACK_IMAGES[rp.category] ||
                    PRODUCT_HERO_FALLBACK
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ FINAL ENQUIRY CTA ═══ */}
        <div className="mt-16 relative overflow-hidden bg-[#8B1A1A] p-10 sm:p-14 text-center text-white">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  white,
                  white 1px,
                  transparent 1px,
                  transparent 20px
                )`,
              }}
            ></div>
          </div>
          {/* Deep corner */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#4A0D0D] to-transparent opacity-60"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mb-4">
              Get in Touch
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Need a Custom Quote?
            </h3>
            <p className="text-white/75 mb-8 text-sm sm:text-base leading-relaxed">
              Contact our team for pricing, availability, and custom
              specifications. We respond within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+917073875529"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#8B1A1A] font-semibold py-3.5 px-8 hover:bg-gray-100 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wide"
              >
                <IoIosCall className="w-4 h-4 flex-shrink-0" />
                <span>Call: 7073875529</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-8 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wide"
              >
                <IoLogoWhatsapp className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
