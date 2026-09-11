// src/pages/ProductPage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findProductBySlug, getProducts } from "../data/products";
import type { ScrapedProduct } from "../data/products";

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

// ─── Strict Related Products (ONLY same product_type) ─────────────────────
function getRelatedProducts(
  current: ScrapedProduct,
  all: ScrapedProduct[],
  limit = 6,
): ScrapedProduct[] {
  // 1. Same product_type wale products (STRICT)
  const sameType = all.filter(
    (p) => p.slug !== current.slug && p.product_type === current.product_type,
  );

  // 2. Agar 6 se kam hain, toh same category se fill karo
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
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B1A1A]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <Link
            to="/products"
            className="text-[#8B1A1A] hover:underline font-semibold"
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

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#8B1A1A]">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#8B1A1A]">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?type=${encodeURIComponent(product.product_type || product.category)}`}
            className="hover:text-[#8B1A1A]"
          >
            {product.product_type || product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-xs">
            {title}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0 mb-10">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center relative">
            <div className="absolute top-4 left-4 bg-[#8B1A1A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              Premium Quality
            </div>
            <div className="aspect-square w-full max-w-md flex items-center justify-center">
              <img
                src={mainImage}
                alt={title}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const currentFile = target.src.split("/").pop();
                  const catFile = categoryImg.split("/").pop();
                  if (currentFile !== catFile) {
                    target.src = categoryImg;
                  } else if (!target.src.includes("productHero")) {
                    target.src = PRODUCT_HERO_FALLBACK;
                  }
                }}
              />
            </div>
          </div>

          <div className="p-8 lg:p-10 flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1A1A] mb-3">
              {product.category} • {product.product_type}
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>

            {product.material_grades && product.material_grades.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.material_grades.map((g) => (
                  <span
                    key={g}
                    className="text-xs bg-[#8B1A1A]/10 text-[#8B1A1A] px-3 py-1 rounded-full font-semibold"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description_text?.substring(0, 350)}
              {product.description_text?.length > 350 ? "..." : ""}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Material
                </p>
                <p className="font-bold text-gray-900 text-sm">
                  {product.material_grades?.[0] || "Multiple Grades"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Type
                </p>
                <p className="font-bold text-gray-900 text-sm">
                  {product.product_type}
                </p>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+917073875529"
                className="flex-1 text-center bg-[#8B1A1A] hover:bg-[#6f1414] text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                📞 Call for Enquiry
              </a>
              <a
                href={`https://wa.me/917073875529?text=${encodeURIComponent(`Enquiry for ${title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description_text && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description_text}
            </p>
          </div>
        )}

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.specifications.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
                >
                  <span className="text-[#8B1A1A] font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chemical Composition */}
        {product.chemical_composition &&
          product.chemical_composition.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
                Chemical Composition
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#8B1A1A] text-white">
                      <th className="text-left px-5 py-3 font-bold">Element</th>
                      <th className="text-left px-5 py-3 font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.chemical_composition.map((c, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-5 py-3 font-semibold text-gray-800">
                          {c.element}
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          {c.value ||
                            [c.min_value, c.max_value]
                              .filter(Boolean)
                              .join(" - ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Mechanical Properties */}
        {product.mechanical_properties &&
          product.mechanical_properties.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
                Mechanical Properties
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-[#8B1A1A] text-white">
                      <th className="text-left px-5 py-3 font-bold">
                        Property
                      </th>
                      <th className="text-left px-5 py-3 font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.mechanical_properties.map((m: any, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-5 py-3 font-semibold text-gray-800">
                          {m.property_name || m.property}
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          {m.value ||
                            [m.min_value, m.max_value]
                              .filter(Boolean)
                              .join(" - ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Applications + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {product.applications && product.applications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
                Applications
              </h2>
              <ul className="space-y-3">
                {product.applications.map((app, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-3"
                  >
                    <span className="text-[#8B1A1A] font-bold mt-0.5">▸</span>
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
                Key Features
              </h2>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-start gap-3"
                  >
                    <span className="text-[#8B1A1A] font-bold mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ─── Related Products (ONLY same product_type) ───────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#8B1A1A] rounded-full"></span>
                Related {product.product_type}
              </h2>
              <Link
                to={`/products?type=${encodeURIComponent(product.product_type || product.category)}`}
                className="text-sm text-[#8B1A1A] hover:underline font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp) => {
                const rpTitle = rp.title || rp.slug;
                const rpImg =
                  rp.images?.[0]?.url ||
                  CATEGORY_FALLBACK_IMAGES[rp.product_type] ||
                  CATEGORY_FALLBACK_IMAGES[rp.category] ||
                  PRODUCT_HERO_FALLBACK;

                return (
                  <Link
                    key={rp.slug}
                    to={`/product/${rp.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                      <img
                        src={rpImg}
                        alt={rpTitle}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes("productHero")) {
                            target.src = PRODUCT_HERO_FALLBACK;
                          }
                        }}
                      />
                      {rp.category && (
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          {rp.category}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#8B1A1A] transition-colors line-clamp-2 min-h-[2.5rem] mb-2">
                        {rpTitle}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {rp.product_type}
                      </p>
                      <div className="mt-auto flex items-center justify-end pt-3 border-t border-gray-100">
                        <span className="text-[#8B1A1A] text-xs font-bold group-hover:translate-x-1 transition-transform">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#8B1A1A] to-[#6f1414] rounded-2xl p-10 text-center text-white shadow-xl">
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-3">
            Need a Custom Quote?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Contact our team for pricing, availability, and custom
            specifications. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+917073875529"
              className="bg-white text-[#8B1A1A] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              📞 Call: 7073875529
            </a>
            <a
              href={`https://wa.me/917073875529?text=${encodeURIComponent(`Enquiry for ${title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              💬 WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
