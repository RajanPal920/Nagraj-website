// src/data/categoryConfig.ts
// ─── Category Config ──────────────────────────────────────────────────────────
// Two-level hierarchy: Group → Category (material) → Type (form).
// "category" and "product_type" values MUST match the scraped JSON exactly.

// ── Top-level group buckets ───────────────────────────────────────────────────
export const CATEGORY_GROUPS: Record<string, string[]> = {
  "Steel Alloys": [
    "Stainless Steel",
    "Alloy Steel",
    "Carbon Steel",
    "Tool Steel",
    "High Tensile Steel",
    "EN Series",
    "Pressure Vessel Steel",
    "Precipitation Hardening Steel",
    "Special Steel",
    "Corten Steel",
    "Cold Rolled",
    "Hot Rolled IS 2062 Plates",
    "Abrasion Resistant",
    "Spring Steel",
  ],
  "Non-Ferrous": [
    "Aluminium",
    "Copper & Brass",
    "Cupro Nickel",
    "Nickel Alloy",
    "Titanium",
    "Cobalt Alloy",
  ],
  Specialty: [
    "Duplex & Super Duplex",
    "Galvanized",
    "Specialized Products",
    "Pins",
    "Flanges",
    "Chequered Plate",
  ],
};

/** Ordered group names for rendering */
export const GROUP_ORDER = Object.keys(
  CATEGORY_GROUPS,
) as (keyof typeof CATEGORY_GROUPS)[];

/** Map each category → its group (computed once at module load) */
export const CATEGORY_TO_GROUP: Record<string, string> = {};
for (const [group, cats] of Object.entries(CATEGORY_GROUPS)) {
  for (const cat of cats) {
    CATEGORY_TO_GROUP[cat] = group;
  }
}

// ── Category display names ────────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<string, string> = {
  "Stainless Steel": "Stainless Steel",
  "Alloy Steel": "Alloy Steel",
  "Carbon Steel": "Carbon Steel",
  "Tool Steel": "Tool Steel",
  "High Tensile Steel": "High Tensile Steel",
  "EN Series": "EN Series",
  "Pressure Vessel Steel": "Pressure Vessel Steel",
  "Precipitation Hardening Steel": "Precipitation Hardening",
  "Special Steel": "Special Steel",
  "Corten Steel": "Corten / Weathering Steel",
  "Cold Rolled": "Cold Rolled",
  "Hot Rolled IS 2062 Plates": "IS 2062 Hot Rolled",
  "Abrasion Resistant": "Abrasion Resistant",
  "Spring Steel": "Spring Steel",
  Aluminium: "Aluminium",
  "Copper & Brass": "Copper & Brass",
  "Cupro Nickel": "Cupro Nickel",
  "Nickel Alloy": "Nickel Alloy",
  Titanium: "Titanium",
  "Cobalt Alloy": "Cobalt Alloy",
  "Duplex & Super Duplex": "Duplex & Super Duplex",
  Galvanized: "Galvanized",
  "Specialized Products": "Specialized Products",
  Pins: "Pins",
  Flanges: "Flanges",
  "Chequered Plate": "Chequered Plate",
};

// ── Product type display names ────────────────────────────────────────────────
// ⚠️ IMPORTANT: Keys MUST match scraped JSON "product_type" values exactly.
// Scraped values seen: "Bar", "Plate", "Welding Wire"
export const TYPE_LABELS: Record<string, string> = {
  Bar: "Bars & Rods",
  Plate: "Plates & Sheets",
  Sheet: "Sheets",
  "Welding Wire": "Welding Wire",
  Pipe: "Pipes & Tubes",
  Tube: "Tubes",
  Fitting: "Fittings",
  Flange: "Flanges",
  Forging: "Forgings",
  "Structural Profile": "Structural Profiles",
  Fastener: "Fasteners",
  Pin: "Pins",
};

// ── Product type fallback images ──────────────────────────────────────────────
// ⚠️ Keys MUST match scraped JSON "product_type" values exactly.
export const PRODUCT_TYPE_FALLBACK_IMAGES: Record<string, string> = {
  Bar: "/images/bar.jpg",
  Plate: "/images/sheet.jpg",
  Sheet: "/images/sheet.jpg",
  "Welding Wire": "/images/Welding-Electrodes.jpg",
  Pipe: "/images/pipe.jpg",
  Tube: "/images/pipe.jpg",
  Fitting: "/images/fitting.jpg",
  Flange: "/images/flange.jpg",
  Fastener: "/images/fasteners.jpg",
  Pin: "/images/Pins.jpg",
  Forging: "/images/bar.jpg",
  "Structural Profile": "/images/hollow.jpg",
};

// ── Category fallback images ──────────────────────────────────────────────────
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
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

export const PRODUCT_HERO_FALLBACK = "/images/productHero.png";

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCategoryDisplayLabel(raw: string): string {
  return CATEGORY_LABELS[raw] ?? raw;
}

export function getTypeDisplayLabel(raw: string): string {
  return TYPE_LABELS[raw] ?? raw;
}

export function getGroupForCategory(cat: string): string {
  return CATEGORY_TO_GROUP[cat] ?? "Other";
}

/** Get fallback image for a product based on its product_type or category */
export function getFallbackImage(
  productType?: string,
  category?: string,
): string {
  return (
    PRODUCT_TYPE_FALLBACK_IMAGES[productType || ""] ||
    CATEGORY_FALLBACK_IMAGES[productType || ""] ||
    CATEGORY_FALLBACK_IMAGES[category || ""] ||
    PRODUCT_HERO_FALLBACK
  );
}
