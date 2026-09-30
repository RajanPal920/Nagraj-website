// src/data/products.ts

import allProductsData from "../data/products.json";

export interface ProductInfo {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  fallbackImageUrl: string;
  highlights: string[];
}

export const products: ProductInfo[] = [
  {
    id: "pipes-tubes",
    name: "Pipes & Tubes",
    shortDescription:
      "Seamless and welded pipes in carbon steel, stainless steel, and alloy grades for high-pressure industrial applications.",
    imageUrl: "/images/pipe.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1584824388147-38d5db229649?auto=format&fit=crop&q=80&w=800",
    highlights: ["Seamless & ERW", "Carbon / SS / Alloy", "Oil & Gas grade"],
  },
  {
    id: "flanges",
    name: "Flanges",
    shortDescription:
      "Slip-on, weld neck, blind, and socket-weld flanges machined to ANSI, ASME, DIN, and IS standards.",
    imageUrl: "/images/flange.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    highlights: ["ANSI / ASME / DIN", "Weld Neck, Blind, SO", "Custom ratings"],
  },
  {
    id: "fittings",
    name: "Fittings",
    shortDescription:
      "Buttweld and forged fittings — elbows, tees, reducers, and caps — to match every piping system requirement.",
    imageUrl: "/images/fitting.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1590481231649-7c8bd3cb27e5?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Buttweld & Forged",
      "Elbows, Tees, Reducers",
      "Pressure-rated",
    ],
  },
  {
    id: "round-bars",
    name: "Round Bars & Rods",
    shortDescription:
      "Bright and black round bars in mild steel, stainless, and tool steel — cut to length or in full mill lengths.",
    imageUrl: "/images/bar.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1506509939527-0dbf62fb438f?auto=format&fit=crop&q=80&w=800",
    highlights: ["Mild Steel / SS", "Bright & Black finish", "Cut-to-length"],
  },
  {
    id: "sheets-plates",
    name: "Sheets & Plates",
    shortDescription:
      "HR, CR, and stainless steel sheets and plates in a wide range of thicknesses and widths for structural and process use.",
    imageUrl: "/images/sheet.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1580983538118-2e86b4020c64?auto=format&fit=crop&q=80&w=800",
    highlights: ["HR / CR / SS", "Structural & Process", "Shearing available"],
  },
  {
    id: "hollow-sections",
    name: "Hollow Sections",
    shortDescription:
      "Square hollow sections (SHS) and rectangular hollow sections (RHS) in mild steel for construction and fabrication.",
    imageUrl: "/images/hollow.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    highlights: ["SHS & RHS", "Mild Steel", "Construction grade"],
  },
];

export type ProductImageItem =
  | string
  | {
      url?: string;
      alt?: string;
      [key: string]: any;
    };

export interface ScrapedProduct {
  url: string;
  title: string;
  slug: string;
  description_text: string;
  product_type: string;
  category: string;
  breadcrumbs: string;
  meta_title: string;
  meta_description: string;
  publish_date: string;
  modified_date: string;
  material_grades: string[];
  equivalent_grades: string[];
  specifications: string[];
  applications: string[];
  features: string[];
  tests: string[];
  packing: string;
  chemical_composition: Array<{
    element: string;
    min_value?: string;
    max_value?: string;
    value?: string;
  }>;
  mechanical_properties: Array<{
    property_name: string;
    value?: string;
    min_value?: string;
    max_value?: string;
    condition?: string;
  }>;
  stock_sizes?: Array<{
    category: string;
    items: string[];
  }>;
  current_stock?: any;
  images?: Array<ProductImageItem>;
  attachments: string[];
  scraped_at: string;
  status: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA-DRIVEN PRODUCT IMAGE HELPERS (SINGLE SOURCE OF TRUTH: product.images)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Safely extracts an image URL from an item in product.images.
 * Supports string URLs, object formats ({ url, alt } or { src }),
 * and handles any unexpected formats gracefully.
 */
export function extractProductImageUrl(item: unknown): string {
  if (!item) return "";
  if (typeof item === "string") return item.trim();
  if (typeof item === "object") {
    const obj = item as Record<string, unknown>;
    if (typeof obj.url === "string" && obj.url.trim()) {
      return obj.url.trim();
    }
    if (typeof obj.src === "string" && obj.src.trim()) {
      return obj.src.trim();
    }
    if (typeof obj.imageUrl === "string" && obj.imageUrl.trim()) {
      return obj.imageUrl.trim();
    }
  }
  return "";
}

/**
 * Returns all valid image URLs from a product's `images` field as a clean string array.
 */
export function getProductImages(product?: ScrapedProduct | null): string[] {
  if (!product || !product.images) return [];
  if (Array.isArray(product.images)) {
    return product.images
      .map(extractProductImageUrl)
      .filter((url): url is string => Boolean(url && url.length > 0));
  }
  const single = extractProductImageUrl(product.images);
  return single ? [single] : [];
}

/**
 * Gets the primary (first) image URL for a product from its `images` field.
 * Falls back safely to fallback if empty/missing/invalid.
 */
export function getProductPrimaryImage(
  product?: ScrapedProduct | null,
  fallback: string = "/images/productHero.png"
): string {
  const images = getProductImages(product);
  return images.length > 0 ? images[0] : fallback;
}

/**
 * Gets the alt text for the primary image of a product from its `images` field.
 * Falls back safely to product title or fallback string.
 */
export function getProductImageAlt(
  product?: ScrapedProduct | null,
  fallbackTitle: string = ""
): string {
  if (!product) return fallbackTitle;
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (
      first &&
      typeof first === "object" &&
      typeof (first as any).alt === "string" &&
      (first as any).alt.trim()
    ) {
      return (first as any).alt.trim();
    }
  }
  return product.title || fallbackTitle;
}

/**
 * Returns complete gallery array [{ url, alt }] from product.images
 */
export function getProductGallery(
  product?: ScrapedProduct | null
): Array<{ url: string; alt: string }> {
  if (!product || !product.images) return [];
  const list = Array.isArray(product.images) ? product.images : [product.images];
  return list
    .map((item) => {
      const url = extractProductImageUrl(item);
      let alt = product.title || "";
      if (item && typeof item === "object" && typeof (item as any).alt === "string" && (item as any).alt.trim()) {
        alt = (item as any).alt.trim();
      }
      return { url, alt };
    })
    .filter((img) => Boolean(img.url));
}

// ═══════════════════════════════════════════════════════════════════════════
// NORMALIZE PRODUCT TYPE
// Sirf product shape normalize karo — material/category nahi
// ═══════════════════════════════════════════════════════════════════════════
// NORMALIZE PRODUCT TYPE
// Maps all aliases and forms of a product type to its canonical display name
// ═══════════════════════════════════════════════════════════════════════════
export const normalizeProductType = (type: string): string => {
  if (!type) return type;
  const trimmed = type.trim();
  const lower = trimmed.toLowerCase();

  // ─── STRICT MAPPING (exact match only) ───────────────────────
  const TYPE_MAP: Record<string, string> = {
    // Bars
    bar: "Round Bars",
    bars: "Round Bars",
    rod: "Round Bars",
    rods: "Round Bars",
    roundbar: "Round Bars",
    roundbars: "Round Bars",
    "round bar": "Round Bars",
    "round bars": "Round Bars",

    // Pipes
    pipe: "Pipes & Tubes",
    pipes: "Pipes & Tubes",
    tube: "Pipes & Tubes",
    tubes: "Pipes & Tubes",
    "pipe & tube": "Pipes & Tubes",
    "pipe & tubes": "Pipes & Tubes",
    "pipes & tube": "Pipes & Tubes",
    "pipes & tubes": "Pipes & Tubes",
    "pipe and tube": "Pipes & Tubes",
    "pipe and tubes": "Pipes & Tubes",
    "pipes and tube": "Pipes & Tubes",
    "pipes and tubes": "Pipes & Tubes",

    // Plates
    plate: "Plates & Sheets",
    plates: "Plates & Sheets",
    sheet: "Plates & Sheets",
    sheets: "Plates & Sheets",
    coil: "Plates & Sheets",
    coils: "Plates & Sheets",
    "plate & sheet": "Plates & Sheets",
    "plate & sheets": "Plates & Sheets",
    "plates & sheet": "Plates & Sheets",
    "plates & sheets": "Plates & Sheets",
    "plate and sheet": "Plates & Sheets",
    "plate and sheets": "Plates & Sheets",
    "plates and sheet": "Plates & Sheets",
    "plates and sheets": "Plates & Sheets",

    // Flanges
    flange: "Flanges",
    flanges: "Flanges",

    // Fittings
    fitting: "Fittings",
    fittings: "Fittings",

    // Forgings
    forging: "Forgings",
    forgings: "Forgings",

    // Fasteners
    fastener: "Fasteners",
    fasteners: "Fasteners",

    // Pins
    pin: "Pins",
    pins: "Pins",

    // Welding
    "welding wire": "Welding Electrodes",
    "welding wires": "Welding Electrodes",
    "welding electrode": "Welding Electrodes",
    "welding electrodes": "Welding Electrodes",

    // Galvanized
    galvanized: "Galvanized",
    galvanised: "Galvanized",
    "galvanized steel": "Galvanized",

    // Hollow
    "hollow section": "Hollow Sections",
    "hollow sections": "Hollow Sections",

    // Structural
    "structural profile": "Structural Profiles",
    "structural profiles": "Structural Profiles",

    // Strips
    strip: "Strips",
    strips: "Strips",

    // Cold Work Tool Steels
    "cold work tool steel": "Cold Work Tool Steels",
    "cold work tool steels": "Cold Work Tool Steels",
    "tool steel": "Cold Work Tool Steels",
    "tool steels": "Cold Work Tool Steels",
  };

  if (TYPE_MAP[lower]) return TYPE_MAP[lower];
  return trimmed;
};

// ═══════════════════════════════════════════════════════════════════════════
// STRING NORMALIZATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
export const normalize = (value: string): string =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

export const canonicalType = (type: string): string => {
  if (!type) return "";
  const normalizedDisplay = normalizeProductType(type);
  return normalize(normalizedDisplay);
};

export const canonicalCategory = (category: string): string => {
  if (!category) return "";
  const norm = normalize(category);
  return norm.replace(/\s+pipes?$/i, "");
};

// ═══════════════════════════════════════════════════════════════════════════
// NORMALIZE CATEGORY — RAW PRESERVE
// ═══════════════════════════════════════════════════════════════════════════
const normalizeCategory = (category: string): string => {
  if (!category) return category;
  return category.trim();
};

/**
 * Reusable, JSON-data-driven filtering mechanism.
 * Filters products by selectedType and/or selectedCategory.
 * Product Type NEVER leaks across different categories.
 */
export function getFilteredProducts(
  productsList: ScrapedProduct[],
  selectedType?: string | null,
  selectedCategory?: string | null,
): ScrapedProduct[] {
  if (!productsList || !Array.isArray(productsList)) return [];

  const targetType = selectedType ? canonicalType(selectedType) : null;
  const targetCategory = selectedCategory ? canonicalCategory(selectedCategory) : null;

  return productsList.filter((product) => {
    // 1. Strict Product Type filter
    if (targetType) {
      const pType = canonicalType(product.product_type);
      const isColdWorkCategory = [
        canonicalCategory("Cold Work Tool Steels"),
        canonicalCategory("All Cold Work Tool Steels"),
        canonicalCategory("AISI O1 Round Bars"),
        canonicalCategory("HCHCR-D2 Round Bars"),
        canonicalCategory("Toolox 33 Round Bars"),
        canonicalCategory("Toolox 44 Round Bars"),
      ].includes(targetCategory || "");

      const isColdWorkProduct = [
        canonicalType("Cold Work Tool Steels"),
        canonicalType("Tool Steel"),
      ].includes(pType);

      if (
        isColdWorkCategory &&
        targetType === canonicalType("Round Bars") &&
        isColdWorkProduct
      ) {
        // Allow Cold Work Tool Steel round bars if accessed under Round Bars
      } else if (pType !== targetType) {
        return false;
      }
    }

    // 2. Strict Category filter
    if (targetCategory) {
      // Special handling ONLY for "Alloy Steel F Series" parent category:
      // When user clicks "Alloy Steel F Series", show all child F series products (F11, F22, F91)
      if (targetCategory === canonicalCategory("Alloy Steel F Series")) {
        const pCat = canonicalCategory(product.category);
        const fSeriesCategories = [
          canonicalCategory("F11 Round Bars"),
          canonicalCategory("F22 Round Bars"),
          canonicalCategory("F91 Round Bars"),
          canonicalCategory("Alloy Steel F Series"),
        ];
        if (!fSeriesCategories.includes(pCat)) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Cold Work Tool Steels") ||
        targetCategory === canonicalCategory("All Cold Work Tool Steels")
      ) {
        // Special handling for "Cold Work Tool Steels" parent category:
        // When user clicks "All Cold Work Tool Steels" / "Cold Work Tool Steels", show all child cold work products
        const pCat = canonicalCategory(product.category);
        const pType = canonicalType(product.product_type);
        const coldWorkCategories = [
          canonicalCategory("AISI O1 Round Bars"),
          canonicalCategory("HCHCR-D2 Round Bars"),
          canonicalCategory("Toolox 33 Round Bars"),
          canonicalCategory("Toolox 44 Round Bars"),
          canonicalCategory("Cold Work Tool Steels"),
        ];
        if (
          !coldWorkCategories.includes(pCat) &&
          pType !== canonicalType("Cold Work Tool Steels")
        ) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("All Fittings") ||
        targetCategory === canonicalCategory("All Fitting") ||
        targetCategory === canonicalCategory("all-fittings") ||
        targetCategory === canonicalCategory("all-fitting") ||
        targetCategory === canonicalCategory("Fittings") ||
        targetCategory === canonicalCategory("Fitting")
      ) {
        // Special handling for "All Fittings": show all buttweld and forged fittings
        if (canonicalType(product.product_type) !== canonicalType("Fittings")) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Buttweld Fittings") ||
        targetCategory === canonicalCategory("Buttweld Fitting") ||
        targetCategory === canonicalCategory("Hastelloy Buttweld Fittings") ||
        targetCategory === canonicalCategory("buttweld-fittings") ||
        targetCategory === canonicalCategory("buttweld-fitting") ||
        targetCategory === "buttweld"
      ) {
        // Special handling for "Buttweld Fittings" / "buttweld-fitting"
        if (canonicalType(product.product_type) !== canonicalType("Fittings")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isButtweld =
          pCat === canonicalCategory("Buttweld Fittings") ||
          pCat === canonicalCategory("Buttweld Fitting") ||
          pCat === canonicalCategory("Hastelloy Buttweld Fittings") ||
          (product.category && product.category.toLowerCase().includes("buttweld")) ||
          product.slug === "hastelloy-c276-pipe-fittings-flanges-fasteners-forged-elbow" ||
          (product.title && product.title.toLowerCase().includes("buttweld"));
        if (!isButtweld) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Forged Fittings") ||
        targetCategory === canonicalCategory("Forged Fitting") ||
        targetCategory === canonicalCategory("forged-fittings") ||
        targetCategory === canonicalCategory("forged-fitting") ||
        targetCategory === "forged"
      ) {
        // Special handling for "Forged Fittings" / "forged-fitting"
        if (canonicalType(product.product_type) !== canonicalType("Fittings")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isForged =
          product.slug !== "hastelloy-c276-pipe-fittings-flanges-fasteners-forged-elbow" &&
          (pCat === canonicalCategory("Forged Fittings") ||
            pCat === canonicalCategory("Forged Fitting") ||
            (product.category &&
              product.category.toLowerCase().includes("forged") &&
              !product.category.toLowerCase().includes("buttweld")) ||
            (product.slug && product.slug.includes("forged-fitting")));
        if (!isForged) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("All Galvanized") ||
        targetCategory === canonicalCategory("all-galvanized") ||
        (targetType === canonicalType("Galvanized") &&
          (targetCategory === canonicalCategory("Galvanized") ||
            targetCategory === canonicalCategory("Galvanised") ||
            targetCategory === "all"))
      ) {
        // Special handling for "All Galvanized": show all galvanized angles and channels
        if (canonicalType(product.product_type) !== canonicalType("Galvanized")) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Hot Dip Galvanized Angles") ||
        targetCategory === canonicalCategory("Hot Dip Galvanized Angle") ||
        targetCategory === canonicalCategory("hot-dip-galvanized-angles") ||
        targetCategory === canonicalCategory("hot-dip-galvanized-angle") ||
        targetCategory === canonicalCategory("Galvanized Angles") ||
        targetCategory === canonicalCategory("Galvanized Angle") ||
        targetCategory === "angles" ||
        targetCategory === "angle"
      ) {
        // Special handling for "Hot Dip Galvanized Angles"
        if (canonicalType(product.product_type) !== canonicalType("Galvanized")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isAngle =
          pCat === canonicalCategory("Hot Dip Galvanized Angles") ||
          pCat === canonicalCategory("Hot Dip Galvanized Angle") ||
          pCat === canonicalCategory("Galvanized Angles") ||
          pCat === canonicalCategory("Galvanized Angle") ||
          (product.category && product.category.toLowerCase().includes("angle")) ||
          (product.title && product.title.toLowerCase().includes("angle")) ||
          (product.slug && product.slug.includes("angle"));
        if (!isAngle) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Hot Dip Galvanized Channels") ||
        targetCategory === canonicalCategory("Hot Dip Galvanized Channel") ||
        targetCategory === canonicalCategory("hot-dip-galvanized-channels") ||
        targetCategory === canonicalCategory("hot-dip-galvanized-channel") ||
        targetCategory === canonicalCategory("Galvanized Channels") ||
        targetCategory === canonicalCategory("Galvanized Channel") ||
        targetCategory === "channels" ||
        targetCategory === "channel"
      ) {
        // Special handling for "Hot Dip Galvanized Channels"
        if (canonicalType(product.product_type) !== canonicalType("Galvanized")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isChannel =
          pCat === canonicalCategory("Hot Dip Galvanized Channels") ||
          pCat === canonicalCategory("Hot Dip Galvanized Channel") ||
          pCat === canonicalCategory("Galvanized Channels") ||
          pCat === canonicalCategory("Galvanized Channel") ||
          (product.category && product.category.toLowerCase().includes("channel")) ||
          (product.title && product.title.toLowerCase().includes("channel")) ||
          (product.slug && product.slug.includes("channel"));
        if (!isChannel) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("All Pins") ||
        targetCategory === canonicalCategory("All Pin") ||
        targetCategory === canonicalCategory("all-pins") ||
        targetCategory === canonicalCategory("all-pin") ||
        (targetType === canonicalType("Pins") &&
          (targetCategory === canonicalCategory("Pins") ||
            targetCategory === canonicalCategory("Pin") ||
            targetCategory === "all"))
      ) {
        // Special handling for "All Pins": show all pins (PTO pins & pipe linch pins)
        if (canonicalType(product.product_type) !== canonicalType("Pins")) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("PTO Pins") ||
        targetCategory === canonicalCategory("PTO Pin") ||
        targetCategory === canonicalCategory("pto-pins") ||
        targetCategory === canonicalCategory("pto-pin") ||
        targetCategory === "pto"
      ) {
        // Special handling for "PTO Pins"
        if (canonicalType(product.product_type) !== canonicalType("Pins")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isPto =
          pCat === canonicalCategory("PTO Pins") ||
          pCat === canonicalCategory("PTO Pin") ||
          (product.category && product.category.toLowerCase().includes("pto")) ||
          (product.title && product.title.toLowerCase().includes("pto")) ||
          (product.slug && product.slug.includes("pto"));
        if (!isPto) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Pipe Linch Pin") ||
        targetCategory === canonicalCategory("Pipe Linch Pins") ||
        targetCategory === canonicalCategory("pipe-linch-pin") ||
        targetCategory === canonicalCategory("pipe-linch-pins") ||
        targetCategory === canonicalCategory("Linch Pin") ||
        targetCategory === canonicalCategory("Linch Pins") ||
        targetCategory === "linch"
      ) {
        // Special handling for "Pipe Linch Pin"
        if (canonicalType(product.product_type) !== canonicalType("Pins")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isLinch =
          pCat === canonicalCategory("Pipe Linch Pin") ||
          pCat === canonicalCategory("Pipe Linch Pins") ||
          pCat === canonicalCategory("Linch Pin") ||
          pCat === canonicalCategory("Linch Pins") ||
          (product.category && (product.category.toLowerCase().includes("linch") || product.category.toLowerCase().includes("pipe linch"))) ||
          (product.title && (product.title.toLowerCase().includes("linch") || product.title.toLowerCase().includes("pipe linch"))) ||
          (product.slug && product.slug.includes("pipe-linch"));
        if (!isLinch) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("All Fasteners") ||
        targetCategory === canonicalCategory("All Fastener") ||
        targetCategory === canonicalCategory("all-fasteners") ||
        targetCategory === canonicalCategory("all-fastener") ||
        (targetType === canonicalType("Fasteners") &&
          (targetCategory === canonicalCategory("Fasteners") ||
            targetCategory === canonicalCategory("Fastener") ||
            targetCategory === "all"))
      ) {
        // Special handling for "All Fasteners": show all fastener products
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("High Tensile") ||
        targetCategory === canonicalCategory("High Tensile Steel") ||
        targetCategory === canonicalCategory("High Tensile Fasteners") ||
        targetCategory === canonicalCategory("high-tensile") ||
        targetCategory === "high tensile"
      ) {
        // Special handling for "High Tensile" Fasteners
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isHighTensile =
          pCat === canonicalCategory("High Tensile") ||
          pCat === canonicalCategory("High Tensile Steel") ||
          pCat === canonicalCategory("High Tensile Fasteners") ||
          (product.category && product.category.toLowerCase().includes("high tensile")) ||
          (product.title && product.title.toLowerCase().includes("high tensile")) ||
          (product.title && product.title.toLowerCase().startsWith("ht ")) ||
          (product.slug && product.slug.toLowerCase().startsWith("ht-")) ||
          (product.slug && product.slug.toLowerCase().includes("high-tensile"));
        if (!isHighTensile) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Bolts") ||
        targetCategory === canonicalCategory("Bolt") ||
        targetCategory === canonicalCategory("bolts") ||
        targetCategory === canonicalCategory("bolt")
      ) {
        // Special handling for "Bolts" Fasteners
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isBolt =
          pCat === canonicalCategory("Bolts") ||
          pCat === canonicalCategory("Bolt") ||
          pCat === canonicalCategory("Stud Bolts") ||
          (product.category && product.category.toLowerCase().includes("bolt")) ||
          (product.title && product.title.toLowerCase().includes("bolt")) ||
          (product.slug && product.slug.toLowerCase().includes("bolt")) ||
          (product.slug && product.slug.toLowerCase().includes("threaded-rod"));
        if (!isBolt) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Nuts") ||
        targetCategory === canonicalCategory("Nut") ||
        targetCategory === canonicalCategory("nuts") ||
        targetCategory === canonicalCategory("nut")
      ) {
        // Special handling for "Nuts" Fasteners
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isNut =
          pCat === canonicalCategory("Nuts") ||
          pCat === canonicalCategory("Nut") ||
          (product.category && product.category.toLowerCase().includes("nut")) ||
          (product.title && product.title.toLowerCase().includes("nut")) ||
          (product.slug && product.slug.toLowerCase().includes("nut"));
        if (!isNut) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Screws") ||
        targetCategory === canonicalCategory("Screw") ||
        targetCategory === canonicalCategory("screws") ||
        targetCategory === canonicalCategory("screw")
      ) {
        // Special handling for "Screws" Fasteners
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isScrew =
          pCat === canonicalCategory("Screws") ||
          pCat === canonicalCategory("Screw") ||
          (product.category && product.category.toLowerCase().includes("screw")) ||
          (product.title && product.title.toLowerCase().includes("screw")) ||
          (product.slug && product.slug.toLowerCase().includes("screw"));
        if (!isScrew) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Washers") ||
        targetCategory === canonicalCategory("Washer") ||
        targetCategory === canonicalCategory("washers") ||
        targetCategory === canonicalCategory("washer")
      ) {
        // Special handling for "Washers" Fasteners
        if (canonicalType(product.product_type) !== canonicalType("Fasteners")) {
          return false;
        }
        const pCat = canonicalCategory(product.category);
        const isWasher =
          pCat === canonicalCategory("Washers") ||
          pCat === canonicalCategory("Washer") ||
          (product.category && product.category.toLowerCase().includes("washer")) ||
          (product.title && product.title.toLowerCase().includes("washer")) ||
          (product.slug && product.slug.toLowerCase().includes("washer"));
        if (!isWasher) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Toolox 33 Round Bars")
      ) {
        const pCat = canonicalCategory(product.category);
        const isToolox33 =
          pCat === targetCategory ||
          product.slug === "toolox-33-round-bars-pre-hardened-tool-steel" ||
          (product.title && product.title.toLowerCase().includes("toolox 33"));
        if (!isToolox33) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("Toolox 44 Round Bars")
      ) {
        const pCat = canonicalCategory(product.category);
        const isToolox44 =
          pCat === targetCategory ||
          product.slug === "toolox-44-round-bars-pre-hardened-tool-steel" ||
          (product.title && product.title.toLowerCase().includes("toolox 44"));
        if (!isToolox44) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("HCHCR-D2 Round Bars")
      ) {
        const pCat = canonicalCategory(product.category);
        const isHchcr =
          pCat === targetCategory ||
          product.slug === "hchcr-d2-round-bars-stockists-suppliers" ||
          (product.title &&
            (product.title.toLowerCase().includes("hchcr-d2") ||
              product.title.toLowerCase().includes("hchcr d2") ||
              product.title.toLowerCase().includes("d2 round")));
        if (!isHchcr) {
          return false;
        }
      } else if (
        targetCategory === canonicalCategory("AISI O1 Round Bars")
      ) {
        const pCat = canonicalCategory(product.category);
        const isAisiO1 =
          pCat === targetCategory ||
          product.slug === "aisi-o1-round-bars" ||
          (product.title &&
            (product.title.toLowerCase().includes("aisi o1") ||
              product.title.toLowerCase().includes("ohns")));
        if (!isAisiO1) {
          return false;
        }
      } else {
        const pCat = canonicalCategory(product.category);
        if (pCat !== targetCategory) {
          return false;
        }
      }
    }

    return true;
  });
}

// ── Module-level product data ──────────────────────────────────────────────

let productsCache: ScrapedProduct[] | null = null;
let loadPromise: Promise<ScrapedProduct[]> | null = null;

/**
 * Normalize a product's category and product_type
 */
const normalizeProduct = (product: ScrapedProduct): ScrapedProduct => {
  return {
    ...product,
    // ✅ Category ko RAW rakho — "Carbon Steel" waisa hi rahe
    category: normalizeCategory(product.category),
    // ✅ Product type ko normalize karo — "Bar" → "Round Bars"
    product_type: normalizeProductType(product.product_type),
  };
};

/**
 * Load products from the JSON file.
 * Uses a module-level cache to avoid re-loading on every call.
 */
export function loadProducts(): Promise<ScrapedProduct[]> {
  if (productsCache) {
    return Promise.resolve(productsCache);
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    try {
      if (!allProductsData || !Array.isArray(allProductsData)) {
        console.error("Products data is missing or invalid:", allProductsData);
        reject(new Error("Products data is missing or invalid"));
        return;
      }

      // Normalize all products
      const data = (allProductsData as unknown as ScrapedProduct[]).map(
        normalizeProduct,
      );
      productsCache = data;
      loadPromise = null;
      resolve(data);
    } catch (error) {
      console.error("Error loading products:", error);
      loadPromise = null;
      reject(error);
    }
  });

  return loadPromise;
}

/**
 * Synchronous version for use in contexts where async is not needed.
 * Returns the cached products if available, otherwise loads from the JSON.
 */
export function getProducts(): ScrapedProduct[] {
  if (!productsCache) {
    try {
      if (!allProductsData || !Array.isArray(allProductsData)) {
        console.error("Products data is missing or invalid:", allProductsData);
        return [];
      }
      // Normalize all products
      productsCache = (allProductsData as unknown as ScrapedProduct[]).map(
        normalizeProduct,
      );
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  }
  return productsCache || [];
}

/**
 * Find a product by slug.
 */
export function findProductBySlug(slug: string): ScrapedProduct | undefined {
  const products = getProducts();
  return products.find((p) => p.slug === slug);
}

/**
 * Get all unique categories from products.
 */
export function getAllCategories(): string[] {
  const products = getProducts();
  const seen = new Set<string>();
  products.forEach((p) => {
    if (p.category) {
      seen.add(p.category);
    }
  });
  return Array.from(seen).sort();
}

/**
 * Get all unique product types from products.
 */
export function getAllProductTypes(): string[] {
  const products = getProducts();
  const seen = new Set<string>();
  products.forEach((p) => {
    if (p.product_type) {
      seen.add(p.product_type);
    }
  });
  return Array.from(seen).sort();
}

/**
 * Get products by category.
 */
/**
 * Get products by category.
 */
export function getProductsByCategory(category: string): ScrapedProduct[] {
  const products = getProducts();
  return getFilteredProducts(products, null, category);
}

/**
 * Get products by type.
 */
export function getProductsByType(type: string): ScrapedProduct[] {
  const products = getProducts();
  return getFilteredProducts(products, type, null);
}

/**
 * Get products by BOTH type AND category (AND condition).
 * Data-driven, strict normalized matching.
 */
export function getProductsByTypeAndCategory(
  type: string,
  category: string,
): ScrapedProduct[] {
  const products = getProducts();
  return getFilteredProducts(products, type, category);
}

/**
 * Search products by title, description, or material grades.
 */
export function searchProducts(query: string): ScrapedProduct[] {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => {
    const titleMatch = p.title?.toLowerCase().includes(lowerQuery) || false;
    const descMatch =
      p.description_text?.toLowerCase().includes(lowerQuery) || false;
    const gradeMatch =
      p.material_grades?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      false;
    const specMatch =
      p.specifications?.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      false;
    const categoryMatch =
      p.category?.toLowerCase().includes(lowerQuery) || false;
    const typeMatch =
      p.product_type?.toLowerCase().includes(lowerQuery) || false;
    return (
      titleMatch ||
      descMatch ||
      gradeMatch ||
      specMatch ||
      categoryMatch ||
      typeMatch
    );
  });
}

// Export the static products as well
export const staticProducts = products;
