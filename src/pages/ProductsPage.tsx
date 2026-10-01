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
  Search,
  Package,
  ArrowRight,
  Grid3x3,
  Download,
  Award,
  ShieldCheck,
} from "lucide-react";
import { downloadProductCatalogue } from "../utils/catalogueGenerator";

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
    name: "Perforated Sheet & Jali",
    slug: "Perforated Sheet & Jali",
    image: "/images/perforated-sheet-jali.jpg",
    description: "Perforated Sheets, Wire Mesh & Decorative Jali",
  },
  {
    name: "Valves",
    slug: "Valves",
    image: "/images/valves.jpg",
    description: "Industrial Gate, Globe, Check, Ball & Butterfly Valves",
  },
  {
    name: "Engineering Plastics & Polymers",
    slug: "Engineering Plastics & Polymers",
    image: "/images/engineering-plastics.jpg",
    description: "Cast Nylon, PEEK, PTFE, Delrin & Acrylic Rods and Sheets",
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
    if (canonicalType(typeFilter) === canonicalType("Fasteners")) {
      return [
        { name: "Bolts", count: getFilteredProducts(allProducts, "Fasteners", "Bolts").length },
        { name: "Nuts", count: getFilteredProducts(allProducts, "Fasteners", "Nuts").length },
        { name: "Screws", count: getFilteredProducts(allProducts, "Fasteners", "Screws").length },
        { name: "Washers", count: getFilteredProducts(allProducts, "Fasteners", "Washers").length },
      ].filter((tab) => tab.count > 0);
    }
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
        {/* ─── Standardized Hero (Desktop: Full Width Clear Image + Floating Navy Glass Card | Mobile: Top Image Card + Clean Stacked Content) ─── */}
        <section
          id="products-hero"
          className="relative pt-24 overflow-hidden"
          aria-label="Products - Nagraj Metal Industries"
        >
          {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
          <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
            {/* Crystal Clear Industrial Background Image */}
            <img
              src="/images/productHero.png"
              alt="Nagraj Metal Industries Products Portfolio"
              className="absolute inset-0 w-full h-full object-cover object-center select-none"
              loading="eager"
            />

            {/* Floating Navy/Slate Glassmorphic Card on Left */}
            <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
              <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-11 border border-white/15 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
                {/* Tag / Breadcrumb */}
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-6 h-[2px] bg-[#E63946]" />
                  <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/90 uppercase">
                    500+ PRODUCTS • 15+ CATEGORIES
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-extrabold text-white tracking-tight leading-[1.14] mb-4">
                  Engineered Metal Solutions
                  <span className="block text-[#E63946] mt-1">
                    Complete Industrial Portfolio.
                  </span>
                </h1>

                {/* Description */}
                <p className="text-white text-sm sm:text-[15px] leading-relaxed mb-6 font-bold max-w-lg">
                  Discover our comprehensive inventory of prime stainless steel, carbon steel, nickel alloys, pipes, plates, round bars, flanges, fittings, and precision fasteners.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3.5 mb-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Request a Quote</span>
                    <span>→</span>
                  </Link>
                  <button
                    onClick={() => downloadProductCatalogue()}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Download size={14} />
                    <span>Download Catalogue</span>
                  </button>
                </div>

                {/* Feature Badges Row */}
                <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs sm:text-sm text-white/95 font-medium flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                    <span>500+ Specifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                    <span>100% Traceability & MTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                    <span>Immediate Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE HERO (block on mobile, hidden on lg+) */}
          <div className="block lg:hidden w-full bg-white pb-6">
            {/* Product Image at Top: Clean, Complete & Completely Visible */}
            <div className="px-4 pt-3 pb-3">
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <img
                  src="/images/productHero.png"
                  alt="Nagraj Metal Industries Products Portfolio"
                  className="w-full h-auto object-cover select-none"
                  loading="eager"
                />
              </div>
            </div>

            {/* Content Below Photo */}
            <div className="px-5 pt-1">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1 rounded-full mb-3 text-gray-800">
                <Award size={13} className="text-[#B22222] shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider font-display">
                  CERTIFIED INDUSTRIAL INVENTORY
                </span>
              </div>

              {/* Subtitle Uppercase Tracker */}
              <p className="text-[#B22222] font-display font-bold text-[10px] uppercase tracking-wider mb-1.5">
                500+ PRODUCTS · 15+ CATEGORIES · PAN-INDIA
              </p>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold leading-[1.15] mb-3">
                <span className="text-[#B22222] block tracking-tight">OUR PRODUCT</span>
                <span className="text-gray-900 tracking-tight">Range & Solutions</span>
              </h1>

              {/* Paragraph Text */}
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 font-body">
                Discover our comprehensive portfolio of high-quality industrial metals engineered for demanding applications with complete chemical and mechanical test certifications.
              </p>

              {/* 2-Column Checkmarks Grid */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-800 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>500+ Metal Grades</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>100% Mill Test Certs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Custom Sizing & Cuts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                  <span>Immediate Dispatch</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-4 text-xs text-gray-700 font-medium mb-5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#B22222] shrink-0" />
                  <span>ISO 9001 Quality Assured</span>
                </div>
              </div>

              {/* Big Red Full-Width CTA */}
              <Link
                to="/contact"
                className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 sm:py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
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
      {/* ═══ STANDARDIZED CATEGORY / SPECIALIZED HERO ═══ */}
      <section className="relative overflow-hidden pt-24" aria-label={pageTitle}>
        {/* DESKTOP HERO (hidden on mobile, block on lg+) */}
        <div className="hidden lg:block relative w-full h-[540px] xl:h-[580px] overflow-hidden select-none">
          {/* Crystal Clear Background Image */}
          <img
            src={heroImage}
            alt={pageTitle}
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes("productHero")) {
                target.src = PRODUCT_HERO_FALLBACK;
              }
            }}
            loading="eager"
          />

          {/* Floating Navy/Slate Glassmorphic Card on Left */}
          <div className="relative max-w-7xl mx-auto h-full px-8 xl:px-12 flex items-center z-10">
            <div className="bg-gradient-to-br from-[#2a2a2a]/55 via-[#1f1f1f]/47 to-[#0f0f0f] backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl max-w-xl xl:max-w-2xl text-white transition-all duration-300">
              {/* Breadcrumb Tag */}
              <div className="flex items-center gap-2 mb-3.5 flex-wrap text-xs font-mono font-bold tracking-wider text-white/90">
                <span className="w-6 h-[2px] bg-[#E63946]" />
                <Link to="/" className="hover:text-[#FF4D5E] transition-colors">
                  HOME
                </Link>
                <span>/</span>
                <Link to="/products" className="hover:text-[#FF4D5E] transition-colors">
                  PRODUCTS
                </Link>
                {isSpecialized && (
                  <>
                    <span>/</span>
                    <span className="text-[#FF4D5E]">SPECIALIZED</span>
                  </>
                )}
                {typeFilter && !isSpecialized && (
                  <>
                    <span>/</span>
                    <span className="text-[#FF4D5E] uppercase">{typeFilter}</span>
                  </>
                )}
                {categoryFilter && (
                  <>
                    <span>/</span>
                    <span className="text-white uppercase">{categoryFilter}</span>
                  </>
                )}
              </div>

              {/* Headline - BOLD */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-black text-white tracking-tight leading-[1.14] mb-3">
                {pageTitle}
                <span className="block text-[#FF4D5E] font-black text-2xl sm:text-3xl mt-1">
                  {showSubItems
                    ? `${specializedData?.subItems?.length || 0} Special Categories`
                    : `${filteredProducts.length} Products Available In Stock`}
                </span>
              </h1>

              {/* Description - BOLD */}
              <p className="text-white font-bold text-xs sm:text-sm leading-relaxed mb-6 font-body drop-shadow-xs max-w-lg">
                Certified industrial metal supplies backed with 100% mill test certificates, chemical traceability, and rapid custom cutting & dispatch across India.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3.5 mb-6">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>← All Products</span>
                </Link>
                <button
                  onClick={() => downloadProductCatalogue()}
                  className="inline-flex items-center justify-center gap-2 bg-[#B22222] hover:bg-[#8B1A1A] text-white font-display font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Download size={14} />
                  <span>Download Product Catalogue (PDF)</span>
                </button>
              </div>

              {/* Feature Badges Row */}
              <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-white/15 text-xs text-white font-bold flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    ✓
                  </span>
                  <span>100% MTC Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    ✓
                  </span>
                  <span>Custom Cut Sizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[9px] font-black shrink-0">
                    ✓
                  </span>
                  <span>Fast Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HERO (block on mobile, hidden on lg+) */}
        <div className="block lg:hidden w-full bg-white pb-6">
          {/* Top Image: Clean & Visible */}
          <div className="px-4 pt-3 pb-3">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <img
                src={heroImage}
                alt={pageTitle}
                className="w-full h-52 sm:h-60 object-cover select-none"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes("productHero")) {
                    target.src = PRODUCT_HERO_FALLBACK;
                  }
                }}
                loading="eager"
              />
            </div>
          </div>

          {/* Content Below Photo - BOLD & CRISP */}
          <div className="px-5 pt-1">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fdf0f0] border border-[#f5c6cb] px-3.5 py-1 rounded-full mb-3 text-gray-800">
              <Package size={13} className="text-[#B22222] shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-wider font-display text-[#B22222]">
                {isSpecialized ? "SPECIALIZED PRODUCTS" : "CERTIFIED INVENTORY"}
              </span>
            </div>

            {/* Subtitle Uppercase Tracker */}
            <p className="text-[#B22222] font-display font-black text-[10px] uppercase tracking-wider mb-1.5">
              {showSubItems
                ? `${specializedData?.subItems?.length || 0} CATEGORIES AVAILABLE`
                : `${filteredProducts.length} PRODUCTS READY IN STOCK`}
            </p>

            {/* Heading */}
            <h1 className="text-3xl font-display font-black leading-[1.15] mb-2 text-gray-900">
              {pageTitle}
            </h1>

            {/* Paragraph Text - BOLD */}
            <p className="text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed mb-4 font-body">
              Certified industrial metal grades with verified mill test certificates and express dispatch across India.
            </p>

            {/* 2-Column Checkmarks Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4 text-[11px] sm:text-xs text-gray-900 font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>100% Mill Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Custom Sizing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Govt Lab Tested</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-[#B22222] text-[#B22222] flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Direct Mill Rates</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => downloadProductCatalogue()}
                className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3 px-4 rounded-xl font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all duration-300"
              >
                <Download size={14} />
                <span>Download Product Catalogue (PDF)</span>
              </button>
              <Link
                to="/products"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border border-gray-200"
              >
                <span>← Back to All Products</span>
              </Link>
            </div>
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
                <button
                  onClick={() => downloadProductCatalogue()}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-[#8B1A1A] text-gray-700 hover:text-white border border-gray-200 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                  title="Download full product catalogue PDF"
                >
                  <Download size={13} />
                  <span>Catalogue PDF</span>
                </button>
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
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-12 text-center">
                  <div className="w-16 h-16 bg-[#8B1A1A]/5 border border-[#8B1A1A]/20 flex items-center justify-center mx-auto mb-6 rounded-2xl">
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
                      className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] hover:bg-[#6F1414] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider hover:shadow-lg"
                    >
                      ← Browse All Categories
                    </Link>
                    <a
                      href="tel:+917073875529"
                      className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 hover:border-[#8B1A1A] hover:text-[#8B1A1A] text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider"
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
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${!categoryFilter
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
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${isActive
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
