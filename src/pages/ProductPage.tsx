// src/pages/ProductPage.tsx

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  findProductBySlug,
  getProducts,
  canonicalCategory,
  canonicalType,
  getProductPrimaryImage,
  getProductImageAlt,
} from "../data/products";
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
  Download,
} from "lucide-react";
import { downloadProductCatalogue } from "../utils/catalogueGenerator";

// ─── Category fallback images ─────────────────────────────────────────────
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Pipes & Tubes": "/images/pipe.jpg",
  "Plates & Sheets": "/images/sheet.jpg",
  "Round Bars": "/images/bar.jpg",
  "Cold Work Tool Steels": "/images/Cold-Work-Tool-Steels.jpg",
  "AISI O1 Round Bars": "/images/products/aisi-o1-round-bars.jpg",
  "HCHCR-D2 Round Bars": "/images/products/hchcr-d2-round-bars.jpg",
  "Toolox 33 Round Bars": "/images/products/tool-steel-round-bar-500x500.jpg",
  "Toolox 44 Round Bars": "/images/products/c60-steel.jpg",
  Flanges: "/images/flange.jpg",
  Fasteners: "/images/fasteners.jpg",
  "High Tensile": "/images/fasteners.jpg",
  Bolts: "/images/fasteners.jpg",
  Nuts: "/images/fasteners.jpg",
  Screws: "/images/fasteners.jpg",
  Washers: "/images/fasteners.jpg",
  Fittings: "/images/fitting.jpg",
  "Welding Electrodes": "/images/Welding-Electrodes.jpg",
  Galvanized: "/images/Galvanized.jpg",
  Pins: "/images/Pins.jpg",
  "Perforated Sheet & Jali": "/images/perforated-sheet-jali.jpg",
  "Perforated Sheet": "/images/perforated-sheet-jali.jpg",
  Jali: "/images/perforated-sheet-jali.jpg",
  Valves: "/images/valves.jpg",
  Valve: "/images/valves.jpg",
  "Engineering Plastics & Polymers": "/images/engineering-plastics.jpg",
  "Engineering Plastics": "/images/engineering-plastics.jpg",
  "Cast Nylon": "/images/engineering-plastics.jpg",
};

const PRODUCT_HERO_FALLBACK = "/images/productHero.png";

const MATERIAL_FAMILIES = [
  {
    name: "Nickel Alloy",
    keywords: ["nickel alloy", "inconel", "hastelloy", "monel", "incoloy", "nimonic", "cupro nickel", "nickel"],
    excludeCats: ["stainless steel", "copper & brass", "copper alloy"]
  },
  {
    name: "Duplex & Super Duplex",
    keywords: ["duplex", "super duplex", "s31803", "s32205", "s32750", "s32760"]
  },
  {
    name: "Stainless Steel",
    keywords: ["stainless steel", "stainless", "ss 304", "ss 316", "ss304", "ss316", "316l", "304l", "310s", "321", "347", "904l", "317l"]
  },
  {
    name: "Alloy Steel",
    keywords: ["alloy steel", "p91", "p11", "p22", "p9", "p5", "4130", "4140", "alloy steel f series", "f11", "f22", "f91", "en series"]
  },
  {
    name: "Carbon Steel",
    keywords: ["carbon steel", "a106", "a333", "api 5l", "sa 516", "is 2062", "ltcs"]
  },
  {
    name: "Tool Steel",
    keywords: ["tool steel", "cold work tool", "o1", "d2", "d3", "h13", "hchcr", "toolox"]
  },
  {
    name: "Aluminium",
    keywords: ["aluminium", "aluminum", "6061", "6063", "6082", "7075", "5083", "2014"]
  },
  {
    name: "Titanium",
    keywords: ["titanium", "ti grade"]
  },
  {
    name: "Copper & Brass",
    keywords: ["copper & brass", "copper alloy", "brass", "bronze"]
  },
  {
    name: "High Tensile Steel",
    keywords: ["high tensile", "evonith", "sailhard", "uttamhard", "hardox", "abrex", "s690ql"]
  }
];

function getCategoryFamily(p: ScrapedProduct) {
  const cat = (p.category || "").toLowerCase();
  const title = (p.title || "").toLowerCase();

  for (const fam of MATERIAL_FAMILIES) {
    if (fam.excludeCats && fam.excludeCats.some((ex) => cat.includes(ex))) {
      continue;
    }
    const combined = `${cat} ${title}`;
    if (fam.keywords.some((k) => combined.includes(k))) {
      return fam;
    }
  }
  return null;
}

export function getFastenerCategory(p: ScrapedProduct): "Bolts" | "Nuts" | "Screws" | "Washers" | null {
  if (canonicalType(p.product_type) !== canonicalType("Fasteners")) return null;
  const s = (p.slug || "").toLowerCase();
  const t = (p.title || "").toLowerCase();
  const c = (p.category || "").toLowerCase();

  if (s.includes("washer") || t.includes("washer") || c.includes("washer")) {
    return "Washers";
  }
  if (s.includes("nut") || t.includes("nut") || c.includes("nut")) {
    return "Nuts";
  }
  if (s.includes("screw") || t.includes("screw") || c.includes("screw")) {
    return "Screws";
  }
  if (s.includes("bolt") || t.includes("bolt") || c.includes("bolt") || s.includes("threaded-rod")) {
    return "Bolts";
  }
  return null;
}

// ─── Category-First Strict Related Products ──────────────────────────────
function getRelatedProducts(
  current: ScrapedProduct,
  all: ScrapedProduct[],
  limit = 8,
): ScrapedProduct[] {
  const currentCat = canonicalCategory(current.category);
  const currentType = canonicalType(current.product_type);
  const currentFamily = getCategoryFamily(current);

  const seenSlugs = new Set<string>([current.slug]);
  const results: ScrapedProduct[] = [];

  // Special strict category grouping for Fasteners:
  // Bolts only relate to Bolts, Nuts to Nuts, Screws to Screws, Washers to Washers
  const currentFastenerCat = getFastenerCategory(current);
  if (currentFastenerCat) {
    for (const p of all) {
      if (seenSlugs.has(p.slug)) continue;
      if (getFastenerCategory(p) === currentFastenerCat) {
        seenSlugs.add(p.slug);
        results.push(p);
        if (results.length >= limit) return results;
      }
    }
    return results;
  }

  // Priority 1: Exact same category AND same product type
  for (const p of all) {
    if (seenSlugs.has(p.slug)) continue;
    if (
      canonicalCategory(p.category) === currentCat &&
      canonicalType(p.product_type) === currentType
    ) {
      seenSlugs.add(p.slug);
      results.push(p);
      if (results.length >= limit) return results;
    }
  }

  // Priority 2: Same Material Family AND same product type
  if (currentFamily) {
    for (const p of all) {
      if (seenSlugs.has(p.slug)) continue;
      if (canonicalType(p.product_type) !== currentType) continue;

      const pFamily = getCategoryFamily(p);
      if (pFamily && pFamily.name === currentFamily.name) {
        seenSlugs.add(p.slug);
        results.push(p);
        if (results.length >= limit) return results;
      }
    }
  }

  // Priority 3: Exact same category across other product types
  for (const p of all) {
    if (seenSlugs.has(p.slug)) continue;
    if (canonicalCategory(p.category) === currentCat) {
      seenSlugs.add(p.slug);
      results.push(p);
      if (results.length >= limit) return results;
    }
  }

  // Priority 4: Same Material Family across other product types
  if (currentFamily) {
    for (const p of all) {
      if (seenSlugs.has(p.slug)) continue;
      const pFamily = getCategoryFamily(p);
      if (pFamily && pFamily.name === currentFamily.name) {
        seenSlugs.add(p.slug);
        results.push(p);
        if (results.length >= limit) return results;
      }
    }
  }

  // Strict: Never fall back to unrelated categories
  return results.slice(0, limit);
}

// ═══════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

/** Section header — clean Manrope style */
function SectionHeader({
  title,
  Icon,
}: {
  title: string;
  Icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B1A1A]/10 flex-shrink-0">
        {Icon
          ? <Icon className="w-4 h-4 text-[#8B1A1A]" strokeWidth={2} />
          : <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />}
      </div>
      <div>
        <h2 className="text-sm font-display font-bold text-gray-900 uppercase tracking-widest">
          {title}
        </h2>
        <div className="h-0.5 w-8 bg-[#8B1A1A] rounded-full mt-1" />
      </div>
    </div>
  );
}

/** Technical table — premium datasheet style */
function TechnicalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: { key: string; value: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#8B1A1A] text-white">
            {headers.map((h, idx) => (
              <th
                key={h}
                className={`px-5 py-3 font-display font-semibold text-[11px] uppercase tracking-widest ${
                  idx === 0 ? "text-left w-2/5" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
              } hover:bg-[#8B1A1A]/4 transition-colors group`}
            >
              <td className="px-5 py-3.5 font-body font-semibold text-gray-800 text-[13px] border-r border-gray-100 group-hover:text-[#8B1A1A] transition-colors">
                {row.key}
              </td>
              <td className="px-5 py-3.5 font-body text-[13px] font-medium text-gray-600">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Related product card — premium industrial catalogue */
function RelatedCard({
  product,
  fallbackImage,
}: {
  product: ScrapedProduct;
  fallbackImage: string;
}) {
  const title = product.title || product.slug;
  const img = getProductPrimaryImage(product, fallbackImage);
  const altText = getProductImageAlt(product, title);
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-[#8B1A1A]/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-sm"
    >
      {/* Product Image */}
      <div className="h-44 sm:h-48 w-full relative overflow-hidden bg-gray-50 shrink-0">
        <WatermarkedImage
          src={img}
          alt={altText}
          fallbackSrc={fallbackImage}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 z-20 w-8 h-8 bg-[#8B1A1A] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        {product.category && (
          <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-[#8B1A1A] text-[9px] font-display font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-[13px] text-gray-900 group-hover:text-[#8B1A1A] transition-colors line-clamp-2 mb-2 leading-snug">
          {title}
        </h3>

        {product.material_grades && product.material_grades.length > 0 ? (
          <p className="text-[11px] font-body font-medium text-gray-400 line-clamp-1 uppercase tracking-wide mb-3">
            {product.material_grades.slice(0, 3).join(" · ")}
          </p>
        ) : (
          <p className="text-[11px] font-body text-gray-300 uppercase tracking-wide mb-3">Certified Grade</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-gray-400 truncate">
            {product.product_type}
          </span>
          <span className="text-[11px] font-display font-bold text-[#8B1A1A] flex items-center gap-1 uppercase tracking-wider shrink-0">
            View
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
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
  const [activeImage, setActiveImage] = useState<string>("");
  const [activeAlt, setActiveAlt] = useState<string>("");

  const title = product ? product.title || product.slug : "";
  const categoryImg = product
    ? CATEGORY_FALLBACK_IMAGES[product.product_type] ||
    CATEGORY_FALLBACK_IMAGES[product.category] ||
    PRODUCT_HERO_FALLBACK
    : PRODUCT_HERO_FALLBACK;
  const primaryImage = product ? getProductPrimaryImage(product, categoryImg) : "";
  const primaryAlt = product ? getProductImageAlt(product, title) : "";

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

  useEffect(() => {
    if (primaryImage) {
      setActiveImage(primaryImage);
      setActiveAlt(primaryAlt);
    }
  }, [primaryImage, primaryAlt]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-[#8B1A1A]"></div>
          <p className="text-sm font-body text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#8B1A1A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-9 h-9 text-[#8B1A1A]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-800 mb-3">
            Product Not Found
          </h1>
          <p className="font-body text-gray-500 mb-6 text-sm">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold py-3 px-7 rounded-xl transition-colors text-sm uppercase tracking-wider"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = activeImage || primaryImage;
  const currentAlt = activeAlt || primaryAlt;

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
    <div className="min-h-screen bg-[#F7F7F8] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══ BREADCRUMB ═══ */}
        <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-7 flex-wrap font-body font-medium">
          <Link to="/" className="hover:text-[#8B1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <Link to="/products" className="hover:text-[#8B1A1A] transition-colors">Products</Link>
          {product.product_type && (
            <>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <Link
                to={`/products?type=${encodeURIComponent(product.product_type)}`}
                className="hover:text-[#8B1A1A] transition-colors"
              >
                {product.product_type}
              </Link>
            </>
          )}
          {product.category && product.category !== product.product_type && (
            <>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <Link
                to={`/products?type=${encodeURIComponent(product.product_type)}&category=${encodeURIComponent(product.category)}`}
                className="hover:text-[#8B1A1A] transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-[#8B1A1A] font-semibold truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>

        {/* ═══ MAIN PRODUCT HERO ═══ */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          {/* Top accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#8B1A1A] via-[#B22222] to-[#8B1A1A]" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT: Image Panel */}
            <div className="lg:sticky lg:top-28 lg:self-start border-b lg:border-b-0 lg:border-r border-gray-100 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center gap-4">
              {/* Main image */}
              <div className="relative w-full aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex items-center justify-center group/mainimg">
                <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 bg-[#8B1A1A] text-white text-[9px] font-display font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-lg">
                  <Check className="w-3 h-3" strokeWidth={3} />
                  Premium Quality
                </span>
                <WatermarkedImage
                  src={currentImage || categoryImg}
                  alt={currentAlt}
                  fallbackSrc={categoryImg}
                  className="w-full h-full flex items-center justify-center p-6"
                  imgClassName="max-h-full max-w-full object-contain group-hover/mainimg:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Gallery Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-2 w-full justify-center overflow-x-auto py-1 flex-wrap">
                  {product.images.map((imgObj: any, i: number) => {
                    const imgUrl = typeof imgObj === "string" ? imgObj : imgObj.url;
                    const imgAlt = typeof imgObj === "string" ? title : (imgObj.alt || title);
                    const isSelected = currentImage === imgUrl;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setActiveImage(imgUrl); setActiveAlt(imgAlt); }}
                        className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white shrink-0 ${
                          isSelected
                            ? "border-[#8B1A1A] ring-2 ring-[#8B1A1A]/20 scale-105 shadow-md"
                            : "border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt={imgAlt} className="w-full h-full object-contain p-1" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Trust badges vertical */}
              <div className="w-full grid grid-cols-2 gap-2 mt-2">
                {trustBadges.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                    <Icon className="w-3.5 h-3.5 text-[#8B1A1A] flex-shrink-0" strokeWidth={2} />
                    <span className="text-[10px] font-body font-semibold text-gray-600 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Info Panel */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-6">
              {/* Badges row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock
                </span>
                <span className="text-[10px] font-body font-bold uppercase tracking-widest text-[#8B1A1A] border border-[#8B1A1A]/20 bg-[#8B1A1A]/5 px-2.5 py-1 rounded-lg">
                  {product.category}
                </span>
                <span className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 border border-gray-200 bg-gray-50 px-2.5 py-1 rounded-lg">
                  {product.product_type}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[2rem] font-display font-extrabold text-gray-900 leading-tight mb-3">
                  {title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-12 bg-[#8B1A1A] rounded-full" />
                  <div className="h-0.5 w-4 bg-[#C9A84C] rounded-full" />
                </div>
              </div>

              {/* Material Grade chips */}
              {product.material_grades && product.material_grades.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.material_grades.slice(0, 8).map((g) => (
                    <span
                      key={g}
                      className="text-[11px] bg-gray-50 hover:bg-[#8B1A1A] text-gray-700 hover:text-white px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-[#8B1A1A] font-body font-semibold transition-all duration-200 cursor-default uppercase tracking-wide"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              {/* Short description */}
              <p className="font-body text-gray-500 leading-relaxed text-sm">
                {product.description_text?.substring(0, 300)}
                {product.description_text?.length > 300 ? "..." : ""}
              </p>

              {/* Quick spec tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#8B1A1A] rounded-l-2xl" />
                  <p className="text-[9px] font-body font-bold text-gray-400 uppercase tracking-widest mb-1">Material / Grade</p>
                  <p className="font-display font-bold text-gray-900 text-sm truncate">
                    {product.material_grades?.[0] || "Industrial Alloy"}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#C9A84C] rounded-l-2xl" />
                  <p className="text-[9px] font-body font-bold text-gray-400 uppercase tracking-widest mb-1">Product Form</p>
                  <p className="font-display font-bold text-gray-900 text-sm truncate">{product.product_type}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="tel:+917073875529"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-display font-bold py-3.5 px-5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-xs uppercase tracking-widest cursor-pointer"
                >
                  <IoIosCall className="w-4 h-4 flex-shrink-0" />
                  Call: 7073875529
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-display font-bold py-3.5 px-5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-xs uppercase tracking-widest cursor-pointer"
                >
                  <IoLogoWhatsapp className="w-4 h-4 flex-shrink-0" />
                  WhatsApp RFQ
                </a>
                <button
                  onClick={() => downloadProductCatalogue()}
                  className="inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 font-display font-bold py-3.5 px-4 rounded-xl transition-all duration-200 text-xs uppercase tracking-widest cursor-pointer"
                  title="Download product catalogue PDF"
                >
                  <Download className="w-4 h-4 flex-shrink-0" />
                  PDF
                </button>
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-medium text-gray-500">
                  <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                  Mill Test Certificate
                </span>
                <span className="text-gray-200">|</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-medium text-gray-500">
                  <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                  Same Day Dispatch
                </span>
                <span className="text-gray-200">|</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-body font-medium text-gray-500">
                  <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                  Pan-India Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TECHNICAL DATA SECTIONS ═══ */}
        <div className="space-y-4 mb-6">

          {/* Product Description */}
          {product.description_text && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <SectionHeader title="Product Description" Icon={FileText} />
              <p className="font-body text-gray-500 leading-relaxed text-sm">
                {product.description_text}
              </p>
            </section>
          )}

          {/* Specifications */}
          {specRows.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <SectionHeader title="Specifications" Icon={Ruler} />
              <TechnicalTable headers={["Specification", "Details"]} rows={specRows} />
            </section>
          )}

          {/* Chemical Composition */}
          {product.chemical_composition && product.chemical_composition.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <SectionHeader title="Chemical Composition" Icon={FlaskConical} />
              <TechnicalTable
                headers={["Element", "Value"]}
                rows={product.chemical_composition.map((c) => ({
                  key: c.element,
                  value: c.value || [c.min_value, c.max_value].filter(Boolean).join(" – "),
                }))}
              />
            </section>
          )}

          {/* Mechanical Properties */}
          {product.mechanical_properties && product.mechanical_properties.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <SectionHeader title="Mechanical Properties" Icon={Settings} />
              <TechnicalTable
                headers={["Property", "Value"]}
                rows={product.mechanical_properties.map((m: any) => ({
                  key: m.property_name || m.property,
                  value: m.value || [m.min_value, m.max_value].filter(Boolean).join(" – "),
                }))}
              />
            </section>
          )}

          {/* Applications + Key Features */}
          {((product.applications && product.applications.length > 0) ||
            (product.features && product.features.length > 0)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {product.applications && product.applications.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <SectionHeader title="Applications" Icon={Factory} />
                  <ul className="space-y-2.5">
                    {product.applications.map((app, i) => (
                      <li key={i} className="font-body text-sm text-gray-500 flex items-start gap-3 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#8B1A1A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight className="w-2.5 h-2.5 text-[#8B1A1A]" strokeWidth={3} />
                        </span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {product.features && product.features.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                  <SectionHeader title="Key Features" Icon={Sparkles} />
                  <ul className="space-y-2.5">
                    {product.features.map((f, i) => (
                      <li
                        key={i}
                        className="font-body text-sm text-gray-500 flex items-start gap-3 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-green-600" strokeWidth={3} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>

        {/* ═══ RELATED PRODUCTS ═══ */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            {(() => {
              const fastenerCat = getFastenerCategory(product);
              const relatedLabel = fastenerCat || product.category || product.product_type;
              const relatedViewAllUrl = fastenerCat
                ? `/products?type=Fasteners&category=${encodeURIComponent(fastenerCat)}`
                : product.product_type && product.category
                  ? `/products?type=${encodeURIComponent(product.product_type)}&category=${encodeURIComponent(product.category)}`
                  : `/products?category=${encodeURIComponent(product.category || product.product_type)}`;
              return (
                <>
                  {/* Section header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-[#8B1A1A] rounded-full" />
                      <div>
                        <h2 className="text-lg sm:text-xl font-display font-bold text-gray-900 uppercase tracking-wide">
                          Related {relatedLabel}
                        </h2>
                        <p className="text-[11px] font-body text-gray-400 mt-0.5 uppercase tracking-widest">
                          Similar products you may need
                        </p>
                      </div>
                    </div>
                    <Link
                      to={relatedViewAllUrl}
                      className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-display font-bold text-[#8B1A1A] hover:text-[#6F1414] uppercase tracking-widest border border-[#8B1A1A]/20 hover:border-[#8B1A1A]/50 px-3 py-2 rounded-lg transition-all"
                    >
                      View All <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                    </Link>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                </>
              );
            })()}
          </div>
        )}

        {/* ═══ FINAL ENQUIRY CTA ═══ */}
        <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-[#8B1A1A] via-[#6F1414] to-[#3A0A0A] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div
            className="absolute inset-0 opacity-[0.03] rounded-3xl"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 18px)` }}
          />
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-block text-[10px] font-body font-bold uppercase tracking-[0.3em] text-white/50 mb-4">
              Get in Touch
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold mb-3 leading-tight">
              Need a Custom Quote?
            </h3>
            <p className="font-body text-white/60 mb-8 text-sm leading-relaxed">
              Contact our team for pricing, availability, and custom specifications. We respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+917073875529"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#8B1A1A] font-display font-bold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
              >
                <IoIosCall className="w-4 h-4" />
                Call: 7073875529
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-display font-bold py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
              >
                <IoLogoWhatsapp className="w-4 h-4" />
                WhatsApp Enquiry
              </a>
              <button
                onClick={() => downloadProductCatalogue()}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-bold py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm uppercase tracking-widest"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
