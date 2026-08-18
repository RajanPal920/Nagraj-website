// ─── Category Config ──────────────────────────────────────────────────────────
// Defines the two-level hierarchy: Group → Category (material) → Type (form).
// "category" and "product_type" values here must match the scraped JSON exactly.

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
// Override scraped names for display where needed. Falls back to raw value.
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
// src/data/categoryConfig.ts
export const TYPE_LABELS: Record<string, string> = {
  Bar: "Bars & Rods",
  Plate: "Plates & Sheets",
  Fitting: "Fittings",
  Pipe: "Pipes & Tubes",
  "Welding Wire": "Welding Wire",
  "Structural Profile": "Structural Profiles",
  Flange: "Flanges",
  Forging: "Forgings",
};
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
