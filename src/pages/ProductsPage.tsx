import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getProducts,
  getFilteredProducts,
  canonicalType,
  canonicalCategory,
  getProductPrimaryImage,
  getProductImageAlt,
} from "../data/products";
import type { ScrapedProduct } from "../data/products";
import { ProductsSidebar } from "../components/ProductsSidebar";
import { WatermarkedImage } from "../components/WatermarkedImage";
import {
  ChevronRight,
  Search,
  Package,
  ArrowRight,
  Grid3x3,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE CONSTANTS — All images use public folder strings (Vite-friendly)
// ═══════════════════════════════════════════════════════════════════════════
const PRODUCT_HERO_FALLBACK = "/images/productHero.png";

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
  Fittings: "/images/fitting.jpg",
  "Welding Electrodes": "/images/Welding-Electrodes.jpg",
  Galvanized: "/images/Galvanized.jpg",
  Pins: "/images/Pins.jpg",
};

// ─── Main Category Cards (UNCHANGED) ──────────────────────────────────────
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

// ─── SPECIALIZED MENU DATA (UNCHANGED) ────────────────────────────────────
const SPECIALIZED_MENU_DATA: Record<
  string,
  { name: string; subItems?: string[]; image: string }
> = {
  "High Tensile Strength": {
    name: "High Tensile Strength",
    subItems: ["EVONITH HARD (EVSL AS07)", "UTTAMHARD", "SAILHARD"],
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
  Fittings: {
    name: "Fittings",
    subItems: ["Buttweld Fittings", "Forged Fittings"],
    image: "/images/fitting.jpg",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SPECIALIZED FILTER — UNCHANGED
// ═══════════════════════════════════════════════════════════════════════════
export function isSpecializedMatch(
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
    "evsl",
    "as07",
    "jsp hard",
    "tiscral",
    "las07",
    "jsphard",
    "jspl hard",
  ];

  const searchText = [
    product.title || "",
    product.category || "",
    product.product_type || "",
    ...(product.material_grades || []),
    ...(product.equivalent_grades || []),
    ...((product as any).availability || []),
    ...((product as any).common_trade_names || []),
  ]
    .join(" ")
    .toLowerCase();

  if (categoryQuery) {
    const cq = categoryQuery.toLowerCase().trim();
    if (searchText.includes(cq)) return true;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[()[\]{}.,/\\|]/g, " ")
        .replace(/[-_]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalizedQuery = normalize(cq);
    const normalizedSearch = normalize(searchText);

    if (normalizedSearch.includes(normalizedQuery)) return true;

    const tokens = normalizedQuery.split(" ").filter((t) => t.length > 1);

    if (tokens.length > 0) {
      const allTokensMatch = tokens.every((token) => {
        if (normalizedSearch.includes(token)) return true;
        const noSpacesSearch = normalizedSearch.replace(/\s/g, "");
        const noSpacesToken = token.replace(/\s/g, "");
        return noSpacesSearch.includes(noSpacesToken);
      });

      if (allTokensMatch) return true;
    }

    return false;
  }

  return allKeys.some((k) => searchText.includes(k));
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const categoryFilter = searchParams.get("category");
  const isSpecialized = searchParams.get("specialized") === "true";

  const querySearch =
    searchParams.get("search") || searchParams.get("q") || "";
  const [allProducts, setAllProducts] = useState<ScrapedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(querySearch);
  const [sortBy, setSortBy] = useState<"default" | "az" | "za">("default");

  useEffect(() => {
    if (querySearch) {
      setSearchQuery(querySearch);
    }
  }, [querySearch]);

  useEffect(() => {
    setLoading(true);
    const data = getProducts();
    setAllProducts(data);
    setLoading(false);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════
  // STRICT FILTERING — UNCHANGED
  // ═══════════════════════════════════════════════════════════════════════
  const filteredProducts = useMemo(() => {
    let result: ScrapedProduct[] = [];

    if (isSpecialized) {
      if (!categoryFilter) {
        result = allProducts.filter((p) => isSpecializedMatch(p));
      } else {
        const catLower = categoryFilter.toLowerCase();
        const parentKey = Object.keys(SPECIALIZED_MENU_DATA).find(
          (key) => key.toLowerCase() === catLower,
        );

        if (parentKey) {
          const subItems = SPECIALIZED_MENU_DATA[parentKey].subItems || [];
          if (subItems.length > 0) {
            result = allProducts.filter((p) =>
              subItems.some((sub) => isSpecializedMatch(p, sub)),
            );
          } else {
            result = allProducts.filter((p) =>
              isSpecializedMatch(p, parentKey),
            );
          }
        } else {
          result = allProducts.filter((p) =>
            isSpecializedMatch(p, categoryFilter),
          );
        }
      }
    } else {
      // Reusable, generic, data-driven filtering for all Product Types and Categories
      result = getFilteredProducts(allProducts, typeFilter, categoryFilter);
    }

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

  // ─── Available Category Tabs for Current Type ──────────────────────────────
  const categoryTabs = useMemo(() => {
    if (!typeFilter) return [];
    const prodsOfType = allProducts.filter(
      (p) => canonicalType(p.product_type) === canonicalType(typeFilter),
    );

    const counts: Record<string, number> = {};
    prodsOfType.forEach((p) => {
      const cat = (p.category || "General").trim();
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [allProducts, typeFilter]);

  const typeProductsCount = useMemo(() => {
    if (!typeFilter) return 0;
    return allProducts.filter(
      (p) => canonicalType(p.product_type) === canonicalType(typeFilter),
    ).length;
  }, [allProducts, typeFilter]);

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW 1: CATEGORY CARDS (Landing)
  // ═══════════════════════════════════════════════════════════════════════
  if (!typeFilter && !categoryFilter && !isSpecialized && !searchQuery.trim()) {
    return (
      <div className="min-h-screen bg-[#F7F7F7]">
        {/* ═══ HERO ═══ */}
        <section className="relative pt-32 pb-24 bg-[#0F0F0F] overflow-hidden">
          {/* ✅ HERO BACKGROUND IMAGE — FULLY VISIBLE (no opacity reduction) */}
          <img
            src={PRODUCT_HERO_FALLBACK}
            alt="Premium Industrial Metals"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes("productHero")) {
                target.src = PRODUCT_HERO_FALLBACK;
              }
            }}
          />

          {/* ✅ LIGHT dark overlay — image visible + text readable */}
          <div className="absolute inset-0 bg-[#0F0F0F]/40"></div>

          {/* Subtle diagonal pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 20px)`,
            }}
          ></div>

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8B1A1A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffb3b3] mb-6 px-3 py-1.5 border border-white/20">
                <span className="w-1.5 h-1.5 bg-[#8B1A1A]"></span>
                Premium Industrial Metals
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                Our Product
                <br />
                <span className="text-[#8B1A1A]">Range</span>
              </h1>
              <p className="text-base text-white mb-10 leading-relaxed max-w-2xl">
                Discover our comprehensive portfolio of high-quality industrial
                metals engineered for demanding applications worldwide.
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 text-white">
                {[
                  { num: "500+", label: "Products" },
                  { num: "15+", label: "Categories" },
                  { num: "ISO 9001", label: "Certified" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-white">{s.num}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORY GRID ═══ */}
        <section className="py-16 bg-[#F7F7F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="flex items-end justify-between mb-10 pb-5 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1 h-6 bg-[#8B1A1A]"></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Product Catalogue
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Browse by Category
                </h2>
              </div>
              <p className="hidden sm:block text-xs uppercase tracking-wider text-gray-400">
                {CATEGORY_CARDS.length} Categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {CATEGORY_CARDS.map((cat, idx) => (
                <Link
                  key={cat.name}
                  to={`/products?type=${encodeURIComponent(cat.slug)}`}
                  className="group bg-white rounded-xl border border-gray-200/90 hover:border-[#8B1A1A]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs relative"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shrink-0">
                    <WatermarkedImage
                      src={cat.image}
                      alt={cat.name}
                      fallbackSrc="/images/pipe.jpg"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                    {/* Category index badge */}
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#8B1A1A]/20 shadow-xs z-20">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-[#8B1A1A] transition-colors duration-200 mb-2 leading-tight uppercase tracking-wide">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2rem]">
                        {cat.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Catalogue
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1A1A] group-hover:text-[#6F1414] transition-colors uppercase tracking-wider">
                        Explore
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                          strokeWidth={2.5}
                        />
                      </span>
                    </div>
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

  // ✅ Hero image — category image or fallback to productHero
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
    !isSpecialized &&
    !!categoryFilter &&
    filteredProducts.length === 0 &&
    specializedData?.subItems &&
    specializedData.subItems.length > 0 &&
    !isSubItem;

  const shouldShowSidebar = !showSubItems && (!!typeFilter || isSpecialized);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* ═══ HERO ═══ */}
      <section className="relative h-[380px] lg:h-[550px] overflow-hidden bg-[#0F0F0F]">
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
        {/* ✅ LIGHT dark overlay — image visible + text readable */}
        <div className="absolute inset-0 bg-[#0F0F0F]/45"></div>

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 20px)`,
          }}
        ></div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/50 mb-5 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/30" />
            <Link to="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            {isSpecialized && (
              <>
                <ChevronRight className="w-3 h-3 text-white/30" />
                <Link
                  to="/products?specialized=true"
                  className="hover:text-white transition-colors"
                >
                  Specialized
                </Link>
              </>
            )}
            {typeFilter && (
              <>
                <ChevronRight className="w-3 h-3 text-white/30" />
                <Link
                  to={`/products?type=${encodeURIComponent(typeFilter)}`}
                  className="hover:text-white transition-colors"
                >
                  {typeFilter}
                </Link>
              </>
            )}
            {categoryFilter && (
              <>
                <ChevronRight className="w-3 h-3 text-white/30" />
                <span className="text-white font-semibold">
                  {categoryFilter}
                </span>
              </>
            )}
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1] max-w-3xl tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-sm lg:text-base text-white/80 max-w-2xl mb-6 uppercase tracking-wide">
            {showSubItems
              ? `Browse our ${specializedData?.subItems?.length || 0} available categories.`
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} available`}
          </p>

          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-[#8B1A1A] backdrop-blur-sm border border-white/20 hover:border-[#8B1A1A] text-white font-semibold py-2.5 px-5 transition-all duration-200 text-xs uppercase tracking-wider"
            >
              ← Back to All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FILTER BAR ═══ */}
      {!showSubItems && (
        <section className="bg-white border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, grade, material..."
                  className="w-full pl-11 pr-4 py-3 bg-[#F7F7F7] border border-gray-200 focus:outline-none focus:border-[#8B1A1A] focus:bg-white text-sm transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap hidden sm:block">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "default" | "az" | "za")
                  }
                  className="px-4 py-3 bg-[#F7F7F7] border border-gray-200 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:border-gray-300 focus:outline-none focus:border-[#8B1A1A] transition-all"
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

      {/* ═══ CONTENT WITH SIDEBAR ═══ */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {shouldShowSidebar && (
              <ProductsSidebar
                currentType={typeFilter}
                currentCategory={categoryFilter}
                isSpecialized={isSpecialized}
                productCount={filteredProducts.length}
                allProducts={allProducts}
              />
            )}

            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-[#8B1A1A]"></div>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    Loading products...
                  </p>
                </div>
              ) : showSubItems ? (
                /* ═══ SUB-ITEMS VIEW ═══ */
                <>
                  <div className="mb-8 pb-5 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-1 h-6 bg-[#8B1A1A]"></span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                        Product Grades
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                      Available Grades
                    </h2>
                    <p className="text-sm text-gray-500 ml-4">
                      Click on any grade to view details and specifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                    {specializedData?.subItems?.map((subItem, idx) => (
                      <Link
                        key={subItem}
                        to={`/products?specialized=true&category=${encodeURIComponent(subItem)}`}
                        className="group bg-white rounded-xl border border-gray-200/90 hover:border-[#8B1A1A]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs relative"
                      >
                        <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shrink-0">
                          <WatermarkedImage
                            src={specializedData.image || PRODUCT_HERO_FALLBACK}
                            alt={subItem}
                            fallbackSrc={PRODUCT_HERO_FALLBACK}
                            className="w-full h-full"
                            imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                          <div className="absolute top-3 left-3 bg-[#8B1A1A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs z-20">
                            {specializedData.name}
                          </div>
                          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-[#8B1A1A]/20 shadow-xs z-20">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                          <div>
                            <h3 className="font-display font-bold text-sm text-gray-900 group-hover:text-[#8B1A1A] transition-colors duration-200 line-clamp-2 min-h-[2.5rem] mb-2 uppercase tracking-wide leading-snug">
                              {subItem}
                            </h3>
                            <div className="min-h-[24px] mb-3">
                              <span className="inline-block text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded uppercase tracking-wider">
                                Industrial Grade
                              </span>
                            </div>
                          </div>
                          <div className="mt-auto pt-3.5 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                              View Grade
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1A1A] group-hover:text-[#6F1414] transition-colors uppercase tracking-wider">
                              View Details
                              <ArrowRight
                                className="w-3.5 h-3.5 text-[#8B1A1A] group-hover:translate-x-1 transition-transform duration-200"
                                strokeWidth={2.5}
                              />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : filteredProducts.length === 0 ? (
                /* ═══ EMPTY STATE ═══ */
                <div className="bg-white border border-gray-200 p-12 sm:p-16 text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-[#8B1A1A]/5 border border-[#8B1A1A]/20 flex items-center justify-center mx-auto mb-6">
                    <Package
                      className="w-7 h-7 text-[#8B1A1A]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-6 h-[2px] bg-[#8B1A1A]"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      No Results
                    </span>
                    <span className="w-6 h-[2px] bg-[#8B1A1A]"></span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                    No products found
                  </h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    {searchQuery
                      ? `No results matching "${searchQuery}". Try different keywords or browse all categories.`
                      : `No products in "${pageTitle}" category yet. Check back soon or contact us for availability.`}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/products"
                      className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-semibold py-3 px-6 transition-all duration-200 text-xs uppercase tracking-wider hover:shadow-lg"
                    >
                      ← Browse All Categories
                    </Link>
                    <a
                      href="tel:+917073875529"
                      className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-[#8B1A1A] hover:text-[#8B1A1A] text-gray-700 font-semibold py-3 px-6 transition-all duration-200 text-xs uppercase tracking-wider"
                    >
                      📞 Ask for Availability
                    </a>
                  </div>
                </div>
              ) : (
                /* ═══ PRODUCT GRID ═══ */
                <>
                  {/* Category Quick Filter Pills */}
                  {typeFilter && categoryTabs.length > 1 && (
                    <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                      <Link
                        to={`/products?type=${encodeURIComponent(typeFilter)}`}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                          !categoryFilter
                            ? "bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#8B1A1A]/40 hover:text-[#8B1A1A]"
                        }`}
                      >
                        All ({typeProductsCount})
                      </Link>
                      {categoryTabs.map((cat) => {
                        const isActive =
                          canonicalCategory(categoryFilter || "") ===
                          canonicalCategory(cat.name);

                        return (
                          <Link
                            key={cat.name}
                            to={`/products?type=${encodeURIComponent(typeFilter)}&category=${encodeURIComponent(cat.name)}`}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                              isActive
                                ? "bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:border-[#8B1A1A]/40 hover:text-[#8B1A1A]"
                            }`}
                          >
                            {cat.name} ({cat.count})
                          </Link>
                        );
                      })}
                    </div>
                  )}
                  {/* Result Count Bar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="w-1 h-4 bg-[#8B1A1A]"></span>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Showing{" "}
                        <span className="font-bold text-gray-900">
                          1–{filteredProducts.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-bold text-gray-900">
                          {filteredProducts.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Sort
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) =>
                          setSortBy(e.target.value as "default" | "az" | "za")
                        }
                        className="px-3 py-2 bg-white border border-gray-300 text-xs font-semibold uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[#8B1A1A]"
                      >
                        <option value="default">Default</option>
                        <option value="az">Name: A → Z</option>
                        <option value="za">Name: Z → A</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {filteredProducts.map((product, idx) => {
                      const title = product.title || product.slug;
                      const categoryImg =
                        CATEGORY_FALLBACK_IMAGES[product.product_type] ||
                        CATEGORY_FALLBACK_IMAGES[product.category] ||
                        PRODUCT_HERO_FALLBACK;
                      const img = getProductPrimaryImage(product, categoryImg);
                      const altText = getProductImageAlt(product, title);

                      return (
                        <Link
                          key={product.slug}
                          to={`/product/${product.slug}`}
                          id={`product-card-${product.slug}`}
                          className="group bg-white rounded-xl border border-gray-200/90 hover:border-[#8B1A1A]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden shadow-xs relative"
                        >
                          {/* Image Container - Exact Fixed Height across all cards */}
                          <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shrink-0">
                            <WatermarkedImage
                              src={img}
                              alt={altText}
                              fallbackSrc={categoryImg}
                              className="w-full h-full"
                              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />

                            {/* Subtle dark gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                            {/* Category Badge */}
                            {product.category && (
                              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#8B1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#8B1A1A]/20 shadow-xs z-20">
                                {product.category}
                              </span>
                            )}

                            {/* Product Index Number */}
                            <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-600 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-gray-200/80 shadow-xs z-20">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Card Content - Uniform Heights & Alignment */}
                          <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                            <div>
                              {/* Title with exact 2-line clamp and min-height for uniform alignment */}
                              <h3 className="font-display font-bold text-sm text-gray-900 group-hover:text-[#8B1A1A] transition-colors duration-200 line-clamp-2 min-h-[2.75rem] leading-snug mb-3">
                                {title}
                              </h3>

                              {/* Material Grades / Spec Pills - Fixed min-height so cards with & without grades align identically */}
                              <div className="min-h-[28px] mb-3 flex items-center flex-wrap gap-1.5">
                                {product.material_grades &&
                                product.material_grades.length > 0 ? (
                                  <>
                                    {product.material_grades
                                      .slice(0, 2)
                                      .map((g, i) => (
                                        <span
                                          key={i}
                                          className="text-[10px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-200/80 font-medium uppercase tracking-wide"
                                        >
                                          {g}
                                        </span>
                                      ))}
                                    {product.material_grades.length > 2 && (
                                      <span className="text-[10px] text-gray-400 font-medium px-1">
                                        +{product.material_grades.length - 2} more
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded font-medium uppercase tracking-wide">
                                    Certified Industrial Grade
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Footer with Divider */}
                            <div className="mt-auto pt-3.5 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] shrink-0" />
                                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider truncate">
                                  {product.product_type}
                                </span>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1A1A] group-hover:text-[#6F1414] transition-colors uppercase tracking-wider shrink-0 ml-2">
                                View Product
                                <ArrowRight
                                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                                  strokeWidth={2.5}
                                />
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer Count */}
                  <div className="text-center mt-12 pt-8 border-t border-gray-200">
                    <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500">
                      <Grid3x3
                        className="w-3.5 h-3.5 text-[#8B1A1A]"
                        strokeWidth={2}
                      />
                      Showing{" "}
                      <span className="font-bold text-[#8B1A1A]">
                        {filteredProducts.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-gray-900">
                        {allProducts.length}
                      </span>{" "}
                      products
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;
