// src/pages/ProductsPage.tsx

import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../data/products";
import type { ScrapedProduct } from "../data/products";

// ─── CATEGORY FALLBACK IMAGES ─────────────────────────────────────────────
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

// ─── Main Category Cards ───────────────────────────────────────────────────
const CATEGORY_CARDS = [
  {
    name: "Pipes & Tubes",
    slug: "Pipes & Tubes",
    image: "/images/pipe.jpg",
    description: "Seamless, welded & ERW pipes in SS, CS, Alloy",
  },
  {
    name: "Plates & Sheets",
    slug: "Plates & Sheets",
    image: "/images/sheet.jpg",
    description: "HR, CR, Boiler Quality & Abrasion Resistant",
  },
  {
    name: "Round Bars",
    slug: "Round Bars",
    image: "/images/bar.jpg",
    description: "Bright, Black & Alloy Steel Round Bars",
  },
  {
    name: "Cold Work Tool Steels",
    slug: "Cold Work Tool Steels",
    image: "/images/Cold-Work-Tool-Steels.jpg",
    description: "D2, D3, HCHCr & OHNS grades",
  },
  {
    name: "Flanges",
    slug: "Flanges",
    image: "/images/flange.jpg",
    description: "Weld Neck, Slip-On, Blind & Socket Weld",
  },
  {
    name: "Fasteners",
    slug: "Fasteners",
    image: "/images/fasteners.jpg",
    description: "High Tensile Bolts, Nuts, Washers & Studs",
  },
  {
    name: "Fittings",
    slug: "Fittings",
    image: "/images/fitting.jpg",
    description: "Buttweld & Forged Pipe Fittings",
  },
  {
    name: "Welding Electrodes",
    slug: "Welding Electrodes",
    image: "/images/Welding-Electrodes.jpg",
    description: "SS, Copper & Aluminium Welding Wires",
  },
  {
    name: "Galvanized",
    slug: "Galvanized",
    image: "/images/Galvanized.jpg",
    description: "Hot Dip Galvanized Angles & Channels",
  },
  {
    name: "Pins",
    slug: "Pins",
    image: "/images/Pins.jpg",
    description: "PTO Pins & Pipe Linch Pins",
  },
];

// ─── SPECIALIZED MENU DATA ────────────────────────────────────────────────
const SPECIALIZED_MENU_DATA: Record<
  string,
  { name: string; subItems?: string[]; image: string }
> = {
  "High Tensile Strength": {
    name: "High Tensile Strength",
    subItems: ["EVONITH HARD (EVSLAS07)", "UTTAMHARD", "SAILHARD"],
    image: "/images/sheet.jpg",
  },
  "Cold Rolled": {
    name: "Cold Rolled",
    subItems: ["CRCA Coils"],
    image: "/images/sheet.jpg",
  },
  "Hot Rolled IS 2062 Plates": {
    name: "Hot Rolled IS 2062 Plates",
    subItems: [
      "IS 2062 PLates",
      "IS 2062 E250BR",
      "IS 2062 E350",
      "IS 2062 E350BR Plates",
      "IS 2062 E350C",
      "S355J2+N Plates",
      "IS 2062 E450BR",
    ],
    image: "/images/sheet.jpg",
  },
  "Abrasion Resistant Plates": {
    name: "Abrasion Resistant Plates",
    subItems: [
      "Abrex 450 Plates",
      "Abrex 500 Plates",
      "NM400 Plates",
      "NM500 Plates",
      "Rockstar 400 Plates",
      "Rockstar 450 Plates",
      "Rockstar 500 Plates",
      "Industries We Serve",
    ],
    image: "/images/sheet.jpg",
  },
  "16MO3-15MO3 & SA 204 Plates": {
    name: "16MO3-15MO3 & SA 204 Plates",
    subItems: ["16Mo3 Plate"],
    image: "/images/sheet.jpg",
  },
  "Manganese Steel Plates": {
    name: "Manganese Steel Plates",
    subItems: ["X120MN12 /SIDUR 3401", "High Manganese Plate/Steels"],
    image: "/images/sheet.jpg",
  },
  "Quenched & Tempered Plates": {
    name: "Quenched & Tempered Plates",
    subItems: [
      "S690QL Plate",
      "EN10023-6 S690QL",
      "Welten 780E Plates /Sheets",
    ],
    image: "/images/sheet.jpg",
  },
  "Boiler Quality Steel Plates": {
    name: "Boiler Quality Steel Plates",
    subItems: ["IS2041 R260 Plate", "SA 516 Grade 70 Plate"],
    image: "/images/sheet.jpg",
  },
  "Chrome Moly Plates": {
    name: "Chrome Moly Plates",
    subItems: [
      "A387 GRADE 5 CLASS 2",
      "A387 GRADE 22 CLASS 2",
      "A387/SA387 Chrome Moly Plates",
    ],
    image: "/images/sheet.jpg",
  },
  "Chequered Plate": {
    name: "Chequered Plate",
    subItems: ["IS 3502 Chequered Plates"],
    image: "/images/sheet.jpg",
  },
  "Tata Structura 355": {
    name: "Tata Structura 355",
    image: "/images/hollow.jpg",
  },
  "Corten Steel Plates": {
    name: "Corten Steel Plates",
    image: "/images/sheet.jpg",
  },
  "DSQ Plates": {
    name: "DSQ Plates",
    image: "/images/sheet.jpg",
  },
  // ✅ NAYA ENTRY — Fittings
  Fittings: {
    name: "Fittings",
    subItems: ["Buttweld Fittings", "Forged Fittings"],
    image: "/images/fitting.jpg",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SPECIALIZED FILTER
// ═══════════════════════════════════════════════════════════════════════════
function isSpecializedMatch(
  product: ScrapedProduct,
  categoryQuery?: string,
): boolean {
  const allKeys = [
    "high tensile",
    "sailhard",
    "uttamhard",
    "evonith",
    "abrex",
    "hardox",
    "nm400",
    "nm450",
    "nm500",
    "rockstar",
    "rockhard",
    "is 2062",
    "e250",
    "e350",
    "e450",
    "s355j2",
    "16mo3",
    "15mo3",
    "sa 204",
    "manganese",
    "x120mn12",
    "sidur",
    "s690ql",
    "welten",
    "en10023",
    "boiler",
    "is2041",
    "sa 516",
    "a387",
    "sa387",
    "chrome moly",
    "chequered",
    "is 3502",
    "tata structura",
    "corten",
    "weathering",
    "dsq",
    // ✅ FITTINGS & FLANGES KEYS
    "buttweld",
    "forged fitting",
    "forged fittings",
    "elbow",
    "tee",
    "reducer",
    "pipe fitting",
    "flange",
    "fastener",
    "nut",
    "bolt",
    "washer",
    "stud",
  ];

  const searchText = [
    product.title || "",
    product.category || "",
    product.product_type || "",
    ...(product.material_grades || []),
    ...(product.equivalent_grades || []),
    ...((product as any).availability || []), // ✅ availability bhi check
  ]
    .join(" ")
    .toLowerCase();

  // ✅ Agar categoryQuery diya gaya hai, to usse priority do
  if (categoryQuery) {
    const cq = categoryQuery.toLowerCase().trim();
    const tokens = cq.split(/\s+/).filter((t) => t.length > 2);

    // Token-based match: "Buttweld Fittings" → ["buttweld", "fittings"]
    if (tokens.length > 0 && tokens.every((t) => searchText.includes(t))) {
      return true;
    }

    // Direct substring match
    if (searchText.includes(cq)) return true;
  }

  return allKeys.some((k) => searchText.includes(k));
}

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const categoryFilter = searchParams.get("category");
  const isSpecialized = searchParams.get("specialized") === "true";

  const [allProducts, setAllProducts] = useState<ScrapedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "az" | "za">("default");

  useEffect(() => {
    setLoading(true);
    const data = getProducts();
    setAllProducts(data);
    setLoading(false);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // STRICT FILTERING — Guaranteed category-wise products
  // ═══════════════════════════════════════════════════════════════════════
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const pType = (p.product_type || "").trim().toLowerCase();
      const pCat = (p.category || "").trim().toLowerCase();
      const pTitle = (p.title || "").trim().toLowerCase();
      const typeLower = (typeFilter || "").trim().toLowerCase();
      const catLower = (categoryFilter || "").trim().toLowerCase();

      // ── CASE 1: Type + Category dono hain → AND condition
      if (typeFilter && categoryFilter) {
        // Step 1: Type STRICT match
        if (pType !== typeLower) return false;

        // Step 2: Category — sirf category field ya title se match
        if (pCat === catLower) return true;
        if (pCat.includes(catLower)) return true;
        if (pTitle.includes(catLower)) return true;

        return false;
      }

      // ── CASE 2: Sirf type filter → EXACT product_type match ONLY
      if (typeFilter) {
        return pType === typeLower;
      }

      // ── CASE 3: Sirf category filter → SIRF category / title match
      if (categoryFilter) {
        if (pCat === catLower) return true;
        if (pCat.includes(catLower)) return true;
        if (pTitle.includes(catLower)) return true;

        return false;
      }

      // ── CASE 4: Specialized products
      // ✅ categoryFilter pass kiya — fittings sub-items ke liye
      if (isSpecialized) {
        return isSpecializedMatch(p, categoryFilter || undefined);
      }

      return true;
    });

    if (searchQuery.trim()) {
      const sq = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(sq) ||
          p.category?.toLowerCase().includes(sq) ||
          p.product_type?.toLowerCase().includes(sq) ||
          p.material_grades?.some((g) => g.toLowerCase().includes(sq)),
      );
    }

    if (sortBy === "az") {
      result = [...result].sort((a, b) =>
        (a.title || "").localeCompare(b.title || ""),
      );
    } else if (sortBy === "za") {
      result = [...result].sort((a, b) =>
        (b.title || "").localeCompare(a.title || ""),
      );
    }

    return result;
  }, [
    allProducts,
    typeFilter,
    categoryFilter,
    isSpecialized,
    searchQuery,
    sortBy,
  ]);

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW 1: CATEGORY CARDS
  // ═══════════════════════════════════════════════════════════════════════
  if (!typeFilter && !categoryFilter && !isSpecialized) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-[#2a0a0a] to-[#8B1A1A] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#ffb3b3] mb-4 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                Premium Industrial Metals
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Our <span className="text-[#ff5757]">Product</span> Range
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Discover our comprehensive portfolio of high-quality industrial
                metals.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 -mt-12 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CATEGORY_CARDS.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/products?type=${encodeURIComponent(cat.slug)}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes("productHero")) {
                          target.src = PRODUCT_HERO_FALLBACK;
                        }
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#8B1A1A] transition-colors mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW 2: FILTERED PRODUCTS LISTING
  // ═══════════════════════════════════════════════════════════════════════
  const pageTitle =
    typeFilter && categoryFilter
      ? `${typeFilter} — ${categoryFilter}`
      : categoryFilter || typeFilter || "Specialized Products";

  const heroImage =
    CATEGORY_FALLBACK_IMAGES[typeFilter || ""] ||
    CATEGORY_FALLBACK_IMAGES[categoryFilter || ""] ||
    PRODUCT_HERO_FALLBACK;

  const parentCategoryKey = categoryFilter
    ? Object.keys(SPECIALIZED_MENU_DATA).find(
        (key) =>
          key === categoryFilter ||
          SPECIALIZED_MENU_DATA[key].subItems?.includes(categoryFilter),
      )
    : null;

  const specializedData = parentCategoryKey
    ? SPECIALIZED_MENU_DATA[parentCategoryKey]
    : null;

  const isSubItem =
    parentCategoryKey !== null && parentCategoryKey !== categoryFilter;

  const showSubItems =
    !typeFilter &&
    filteredProducts.length === 0 &&
    specializedData?.subItems &&
    specializedData.subItems.length > 0 &&
    !isSubItem;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={heroImage}
          alt={pageTitle}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes("productHero")) {
              target.src = PRODUCT_HERO_FALLBACK;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40"></div>
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-20">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-white">
              Products
            </Link>
            {typeFilter && (
              <>
                <span>/</span>
                <Link
                  to={`/products?type=${encodeURIComponent(typeFilter)}`}
                  className="hover:text-white"
                >
                  {typeFilter}
                </Link>
              </>
            )}
            {categoryFilter && (
              <>
                <span>/</span>
                <span className="text-white font-semibold">
                  {categoryFilter}
                </span>
              </>
            )}
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight max-w-3xl">
            {pageTitle}
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mb-6">
            {showSubItems
              ? `Browse our ${specializedData?.subItems?.length || 0} sub-categories.`
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} available.`}
          </p>
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              ← Back to All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      {!showSubItems && (
        <section className="bg-white shadow-sm border-b border-gray-100 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30 focus:border-[#8B1A1A] text-sm"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "default" | "az" | "za")
                  }
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium cursor-pointer"
                >
                  <option value="default">Featured</option>
                  <option value="az">Name: A → Z</option>
                  <option value="za">Name: Z → A</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B1A1A]"></div>
            </div>
          ) : showSubItems ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Available Grades
                </h2>
                <p className="text-gray-600">
                  Click on any grade to view details.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {specializedData?.subItems?.map((subItem) => (
                  <Link
                    key={subItem}
                    to={`/products?specialized=true&category=${encodeURIComponent(subItem)}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center p-6">
                      <img
                        src={specializedData.image || PRODUCT_HERO_FALLBACK}
                        alt={subItem}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes("productHero")) {
                            target.src = PRODUCT_HERO_FALLBACK;
                          }
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#8B1A1A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {specializedData.name}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#8B1A1A] transition-colors line-clamp-2 min-h-[3rem] mb-3">
                        {subItem}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500 font-medium">
                          Enquire Now
                        </span>
                        <span className="text-[#8B1A1A] text-xs font-bold group-hover:translate-x-1 transition-transform">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results matching "${searchQuery}"`
                  : `No products in "${pageTitle}" category yet.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/products"
                  className="inline-block bg-[#8B1A1A] hover:bg-[#6f1414] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Browse All Categories
                </Link>
                <a
                  href="tel:+917073875529"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  📞 Ask for Availability
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const title = product.title || product.slug;
                  const productImg = product.images?.[0]?.url;
                  const categoryImg =
                    CATEGORY_FALLBACK_IMAGES[product.product_type] ||
                    CATEGORY_FALLBACK_IMAGES[product.category] ||
                    PRODUCT_HERO_FALLBACK;
                  const img = productImg || categoryImg;

                  return (
                    <Link
                      key={product.slug}
                      to={`/product/${product.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-1 flex flex-col"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                        <img
                          src={img}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                        {product.category && (
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {product.category}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#8B1A1A] transition-colors line-clamp-2 min-h-[2.5rem] mb-2">
                          {title}
                        </h3>
                        {product.material_grades &&
                          product.material_grades.length > 0 && (
                            <p className="text-xs text-gray-500 mb-3 line-clamp-1">
                              Grade:{" "}
                              {product.material_grades.slice(0, 2).join(", ")}
                              {product.material_grades.length > 2 ? "..." : ""}
                            </p>
                          )}
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500 font-medium">
                            {product.product_type}
                          </span>
                          <span className="text-[#8B1A1A] text-xs font-bold group-hover:translate-x-1 transition-transform">
                            View →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <p className="text-center text-sm text-gray-500 mt-10">
                Showing {filteredProducts.length} of {allProducts.length}{" "}
                products
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
