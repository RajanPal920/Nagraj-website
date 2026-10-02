// src/data/productCalculatorData.ts

export type ShapeType =
  | "round"
  | "square"
  | "rectangle"
  | "hexagonal"
  | "octagonal"
  | "sheet"
  | "plate"
  | "tubular"
  | "pipe"
  | "ring"
  | "round-circle"
  | "angle"
  | "channel"
  | "flat";

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  subGroup?: string;
  density: number; // in g/cm³
  materialLabel: string;
  allowedShapes: ShapeType[];
  defaultShape: ShapeType;
}

export interface ProductCategory {
  id: string;
  name: string;
  defaultShape: ShapeType;
  allowedShapes: ShapeType[];
  items: ProductItem[];
}

export const PRODUCT_CATEGORIES_DATA: ProductCategory[] = [
  // ── 1. PIPES & TUBES ──────────────────────────────────────────
  {
    id: "pipes-tubes",
    name: "Pipes & Tubes",
    defaultShape: "pipe",
    allowedShapes: ["pipe", "tubular"],
    items: [
      { id: "pt-ss", name: "Stainless Steel", category: "Pipes & Tubes", density: 7.93, materialLabel: "Stainless Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-cs", name: "Carbon Steel", category: "Pipes & Tubes", density: 7.85, materialLabel: "Carbon Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-as", name: "Alloy Steel", category: "Pipes & Tubes", density: 7.85, materialLabel: "Alloy Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-ni", name: "Nickel Alloy", category: "Pipes & Tubes", density: 8.90, materialLabel: "Nickel Alloy", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-inconel", name: "Inconel", category: "Pipes & Tubes", density: 8.44, materialLabel: "Inconel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-monel", name: "Monel", category: "Pipes & Tubes", density: 8.80, materialLabel: "Monel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-hastelloy", name: "Hastelloy", category: "Pipes & Tubes", density: 8.89, materialLabel: "Hastelloy", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-incoloy", name: "Incoloy", category: "Pipes & Tubes", density: 8.00, materialLabel: "Incoloy", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-titanium", name: "Titanium", category: "Pipes & Tubes", density: 4.51, materialLabel: "Titanium", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-cuni", name: "Cupro Nickel", category: "Pipes & Tubes", density: 8.94, materialLabel: "Cupro Nickel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-tantalum", name: "Tantalum", category: "Pipes & Tubes", density: 16.65, materialLabel: "Tantalum", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-duplex", name: "Duplex and Super Duplex Pipes", category: "Pipes & Tubes", density: 7.80, materialLabel: "Duplex / Super Duplex", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-corten", name: "Corten Steel", category: "Pipes & Tubes", density: 7.85, materialLabel: "Corten Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-efsw", name: "EFSW/SAW/HSAW/LSAW Pipes", category: "Pipes & Tubes", density: 7.85, materialLabel: "Carbon Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-wear", name: "Welded Wear Resistant", category: "Pipes & Tubes", density: 7.85, materialLabel: "Wear Resistant Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-brass", name: "Brass", category: "Pipes & Tubes", density: 8.50, materialLabel: "Brass", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "pt-aluminium", name: "Aluminium", category: "Pipes & Tubes", density: 2.70, materialLabel: "Aluminium", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
    ],
  },

  // ── 2. PLATES & SHEETS ────────────────────────────────────────
  {
    id: "plates-sheets",
    name: "Plates & Sheets",
    defaultShape: "plate",
    allowedShapes: ["plate", "sheet", "round-circle"],
    items: [
      { id: "ps-ss", name: "Stainless Steel", category: "Plates & Sheets", density: 7.93, materialLabel: "Stainless Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "ps-as", name: "Alloy Steel", category: "Plates & Sheets", density: 7.85, materialLabel: "Alloy Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "ps-al", name: "Aluminium", category: "Plates & Sheets", density: 2.70, materialLabel: "Aluminium", allowedShapes: ["plate", "sheet"], defaultShape: "sheet" },
      { id: "ps-cs", name: "Carbon Steel", category: "Plates & Sheets", density: 7.85, materialLabel: "Carbon Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "ps-cuni", name: "Copper Nickel", category: "Plates & Sheets", density: 8.94, materialLabel: "Copper Nickel", allowedShapes: ["plate", "sheet"], defaultShape: "sheet" },
      { id: "ps-duplex", name: "Duplex & Super Duplex", category: "Plates & Sheets", density: 7.80, materialLabel: "Duplex & Super Duplex", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "ps-brass", name: "Brass Sheet Strip", category: "Plates & Sheets", density: 8.50, materialLabel: "Brass", allowedShapes: ["sheet", "plate"], defaultShape: "sheet" },
      { id: "ps-ss-coil", name: "SS Coil", category: "Plates & Sheets", density: 7.93, materialLabel: "Stainless Steel", allowedShapes: ["sheet"], defaultShape: "sheet" },
      { id: "ps-round-circle", name: "Round Circle", category: "Plates & Sheets", density: 7.93, materialLabel: "Stainless Steel / Steel", allowedShapes: ["round-circle", "plate", "sheet"], defaultShape: "round-circle" },
    ],
  },

  // ── 3. ROUND BARS ─────────────────────────────────────────────
  {
    id: "round-bars",
    name: "Round Bars",
    defaultShape: "round",
    allowedShapes: ["round", "square", "hexagonal", "octagonal", "flat"],
    items: [
      { id: "rb-as-f11", name: "F11 Round Bars", category: "Round Bars", subGroup: "Alloy Steel", density: 7.85, materialLabel: "Alloy Steel (ASTM A182 F11)", allowedShapes: ["round", "square", "hexagonal"], defaultShape: "round" },
      { id: "rb-as-f22", name: "F22 Round Bars", category: "Round Bars", subGroup: "Alloy Steel", density: 7.85, materialLabel: "Alloy Steel (ASTM A182 F22)", allowedShapes: ["round", "square", "hexagonal"], defaultShape: "round" },
      { id: "rb-as-f91", name: "F91 Round Bars", category: "Round Bars", subGroup: "Alloy Steel", density: 7.85, materialLabel: "Alloy Steel (ASTM A182 F91)", allowedShapes: ["round", "square", "hexagonal"], defaultShape: "round" },
      { id: "rb-as", name: "Alloy Steel", category: "Round Bars", density: 7.85, materialLabel: "Alloy Steel", allowedShapes: ["round", "square", "hexagonal", "flat"], defaultShape: "round" },
      { id: "rb-al", name: "Aluminium", category: "Round Bars", density: 2.70, materialLabel: "Aluminium", allowedShapes: ["round", "square", "hexagonal", "flat"], defaultShape: "round" },
      { id: "rb-cs", name: "Carbon Steel", category: "Round Bars", density: 7.85, materialLabel: "Carbon Steel", allowedShapes: ["round", "square", "hexagonal", "flat"], defaultShape: "round" },
      { id: "rb-hotwork", name: "Hot Work Steel", category: "Round Bars", density: 7.80, materialLabel: "Hot Work Tool Steel (H13)", allowedShapes: ["round", "square", "flat"], defaultShape: "round" },
      { id: "rb-cubrass", name: "Copper & Brass", category: "Round Bars", density: 8.50, materialLabel: "Copper & Brass", allowedShapes: ["round", "hexagonal", "square", "flat"], defaultShape: "round" },
      { id: "rb-cualloy", name: "Copper Alloy", category: "Round Bars", density: 8.90, materialLabel: "Copper Alloy", allowedShapes: ["round", "hexagonal", "square"], defaultShape: "round" },
      { id: "rb-en", name: "EN Series", category: "Round Bars", density: 7.85, materialLabel: "EN Series Steel (EN8/19/24/31)", allowedShapes: ["round", "square", "hexagonal", "flat"], defaultShape: "round" },
      { id: "rb-hastelloy", name: "Hastelloy", category: "Round Bars", density: 8.89, materialLabel: "Hastelloy", allowedShapes: ["round", "hexagonal"], defaultShape: "round" },
      { id: "rb-ss", name: "Stainless Steel", category: "Round Bars", density: 7.93, materialLabel: "Stainless Steel (304/316)", allowedShapes: ["round", "square", "hexagonal", "flat"], defaultShape: "round" },
      { id: "rb-ph", name: "Precipitation Hardening Steel", category: "Round Bars", density: 7.80, materialLabel: "PH Steel (17-4PH)", allowedShapes: ["round", "square", "hexagonal"], defaultShape: "round" },
      { id: "rb-gunmetal", name: "Gun Metal", category: "Round Bars", density: 8.80, materialLabel: "Gun Metal (Bronze)", allowedShapes: ["round", "square", "flat"], defaultShape: "round" },
    ],
  },

  // ── 4. COLD WORK TOOL STEELS ──────────────────────────────────
  {
    id: "cold-work",
    name: "Cold Work Tool Steels",
    defaultShape: "round",
    allowedShapes: ["round", "square", "flat", "plate"],
    items: [
      { id: "cw-o1", name: "AISI O1 Round Bars", category: "Cold Work Tool Steels", density: 7.80, materialLabel: "O1 Tool Steel", allowedShapes: ["round", "flat", "square"], defaultShape: "round" },
      { id: "cw-d2", name: "HCHCR-D2 Round Bars", category: "Cold Work Tool Steels", density: 7.80, materialLabel: "D2 / HCHCR Tool Steel", allowedShapes: ["round", "flat", "square", "plate"], defaultShape: "round" },
      { id: "cw-toolox33", name: "Toolox 33 Round Bars", category: "Cold Work Tool Steels", density: 7.85, materialLabel: "Toolox 33 Pre-hardened Steel", allowedShapes: ["round", "flat", "plate"], defaultShape: "round" },
      { id: "cw-toolox44", name: "Toolox 44 Round Bars", category: "Cold Work Tool Steels", density: 7.85, materialLabel: "Toolox 44 Engineering Steel", allowedShapes: ["round", "flat", "plate"], defaultShape: "round" },
    ],
  },

  // ── 5. FLANGES ────────────────────────────────────────────────
  {
    id: "flanges",
    name: "Flanges",
    defaultShape: "ring",
    allowedShapes: ["ring", "round"],
    items: [
      { id: "fl-ss", name: "Stainless Steel", category: "Flanges", density: 7.93, materialLabel: "Stainless Steel Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-cs", name: "Carbon Steel", category: "Flanges", density: 7.85, materialLabel: "Carbon Steel Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-as", name: "Alloy Steel", category: "Flanges", density: 7.85, materialLabel: "Alloy Steel Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-ni", name: "Nickel Alloy", category: "Flanges", density: 8.90, materialLabel: "Nickel Alloy Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-inconel", name: "Inconel", category: "Flanges", density: 8.44, materialLabel: "Inconel Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-incoloy", name: "Incoloy", category: "Flanges", density: 8.00, materialLabel: "Incoloy Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-cu", name: "Copper Flange", category: "Flanges", density: 8.96, materialLabel: "Copper Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
      { id: "fl-brass", name: "Brass Flange", category: "Flanges", density: 8.50, materialLabel: "Brass Flange", allowedShapes: ["ring", "round"], defaultShape: "ring" },
    ],
  },

  // ── 6. FASTENERS ──────────────────────────────────────────────
  {
    id: "fasteners",
    name: "Fasteners",
    defaultShape: "round",
    allowedShapes: ["round", "ring", "hexagonal"],
    items: [
      { id: "fst-bolts", name: "Bolts", category: "Fasteners", density: 7.85, materialLabel: "Steel / SS Fasteners", allowedShapes: ["round", "hexagonal"], defaultShape: "round" },
      { id: "fst-nuts", name: "Nuts", category: "Fasteners", density: 7.85, materialLabel: "Steel / SS Fasteners", allowedShapes: ["ring", "hexagonal"], defaultShape: "ring" },
      { id: "fst-screws", name: "Screws", category: "Fasteners", density: 7.85, materialLabel: "Steel / SS Fasteners", allowedShapes: ["round"], defaultShape: "round" },
      { id: "fst-washers", name: "Washers", category: "Fasteners", density: 7.85, materialLabel: "Steel / SS Fasteners", allowedShapes: ["ring"], defaultShape: "ring" },
    ],
  },

  // ── 7. FITTINGS ───────────────────────────────────────────────
  {
    id: "fittings",
    name: "Fittings",
    defaultShape: "pipe",
    allowedShapes: ["pipe", "tubular", "ring", "round"],
    items: [
      { id: "fit-bw", name: "Buttweld Fittings", category: "Fittings", density: 7.85, materialLabel: "Carbon / Alloy Steel", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "fit-forged", name: "Forged Fittings", category: "Fittings", density: 7.85, materialLabel: "Forged Steel (A105/F304)", allowedShapes: ["pipe", "tubular", "round"], defaultShape: "pipe" },
      { id: "fit-brass", name: "Copper Brass Fittings", category: "Fittings", density: 8.50, materialLabel: "Brass / Copper", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "fit-ic", name: "IC Fitting", category: "Fittings", density: 7.85, materialLabel: "Steel Fittings", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "fit-dairy", name: "Dairy Fittings", category: "Fittings", density: 7.93, materialLabel: "Sanitary Stainless Steel", allowedShapes: ["pipe", "tubular", "ring"], defaultShape: "pipe" },
      { id: "fit-furniture", name: "Furniture Fitting", category: "Fittings", density: 7.85, materialLabel: "Steel Fittings", allowedShapes: ["pipe", "tubular"], defaultShape: "pipe" },
      { id: "fit-tc", name: "TC Fitting TC Set", category: "Fittings", density: 7.93, materialLabel: "Stainless Steel Tri-Clamp", allowedShapes: ["ring", "pipe"], defaultShape: "ring" },
    ],
  },

  // ── 8. WELDING ELECTRODES ─────────────────────────────────────
  {
    id: "welding",
    name: "Welding Electrodes",
    defaultShape: "round",
    allowedShapes: ["round"],
    items: [
      { id: "we-ss", name: "Stainless Steel", category: "Welding Electrodes", density: 7.93, materialLabel: "Stainless Steel Wire / Rod", allowedShapes: ["round"], defaultShape: "round" },
      { id: "we-cualloy", name: "Copper Alloy", category: "Welding Electrodes", density: 8.90, materialLabel: "Copper Alloy Wire", allowedShapes: ["round"], defaultShape: "round" },
      { id: "we-ercuni", name: "Copper & Brass - ERcuNi Wire", category: "Welding Electrodes", density: 8.90, materialLabel: "ERcuNi Copper Nickel Wire", allowedShapes: ["round"], defaultShape: "round" },
      { id: "we-cobalt", name: "Cobalt base Electrode", category: "Welding Electrodes", density: 8.40, materialLabel: "Cobalt Base (Stellite)", allowedShapes: ["round"], defaultShape: "round" },
      { id: "we-al", name: "Aluminium", category: "Welding Electrodes", density: 2.70, materialLabel: "Aluminium Welding Wire", allowedShapes: ["round"], defaultShape: "round" },
    ],
  },

  // ── 9. GALVANIZED ─────────────────────────────────────────────
  {
    id: "galvanized",
    name: "Galvanized",
    defaultShape: "angle",
    allowedShapes: ["angle", "channel", "flat"],
    items: [
      { id: "gal-angle", name: "Angle", category: "Galvanized", density: 7.85, materialLabel: "Galvanized Steel Angle", allowedShapes: ["angle"], defaultShape: "angle" },
      { id: "gal-channel", name: "Channel", category: "Galvanized", density: 7.85, materialLabel: "Galvanized Steel Channel", allowedShapes: ["channel"], defaultShape: "channel" },
      { id: "gal-flat", name: "Flat", category: "Galvanized", density: 7.85, materialLabel: "Galvanized Steel Flat Bar", allowedShapes: ["flat"], defaultShape: "flat" },
    ],
  },

  // ── 10. PERFORATED SHEET & JALI ───────────────────────────────
  {
    id: "perforated-sheet",
    name: "Perforated Sheet & Jali",
    defaultShape: "sheet",
    allowedShapes: ["sheet", "plate"],
    items: [
      { id: "perf-sheet", name: "Perforated Sheet", category: "Perforated Sheet & Jali", density: 7.85, materialLabel: "Perforated Metal Sheet", allowedShapes: ["sheet", "plate"], defaultShape: "sheet" },
    ],
  },

  // ── 11. VALVES ────────────────────────────────────────────────
  {
    id: "valves",
    name: "Valves",
    defaultShape: "round",
    allowedShapes: ["round", "pipe", "ring"],
    items: [
      { id: "val-valve", name: "Valve", category: "Valves", density: 7.85, materialLabel: "Cast / Forged Steel Valve", allowedShapes: ["round", "pipe", "ring"], defaultShape: "round" },
    ],
  },

  // ── 12. ENGINEERING PLASTICS & POLYMERS ───────────────────────
  {
    id: "plastics-polymers",
    name: "Engineering Plastics & Polymers",
    defaultShape: "round",
    allowedShapes: ["round", "sheet", "plate"],
    items: [
      { id: "ep-nylon", name: "Cast Nylon", category: "Engineering Plastics & Polymers", density: 1.15, materialLabel: "Cast Nylon (PA)", allowedShapes: ["round", "sheet", "plate"], defaultShape: "round" },
      { id: "ep-peek", name: "PEEK Rod Sheet", category: "Engineering Plastics & Polymers", density: 1.32, materialLabel: "PEEK Thermoplastic", allowedShapes: ["round", "sheet", "plate"], defaultShape: "round" },
      { id: "ep-ptfe", name: "PTFE Rod Sheet", category: "Engineering Plastics & Polymers", density: 2.20, materialLabel: "PTFE / Teflon", allowedShapes: ["round", "sheet", "plate"], defaultShape: "round" },
      { id: "ep-delrin", name: "Delrin Rod Sheet", category: "Engineering Plastics & Polymers", density: 1.42, materialLabel: "Delrin / POM (Acetal)", allowedShapes: ["round", "sheet", "plate"], defaultShape: "round" },
      { id: "ep-acrylic", name: "Acrylic Sheet", category: "Engineering Plastics & Polymers", density: 1.18, materialLabel: "Acrylic Polymer", allowedShapes: ["sheet", "plate"], defaultShape: "sheet" },
    ],
  },

  // ── 13. PINS ──────────────────────────────────────────────────
  {
    id: "pins",
    name: "Pins",
    defaultShape: "round",
    allowedShapes: ["round"],
    items: [
      { id: "pin-pto", name: "PTO Pins", category: "Pins", density: 7.85, materialLabel: "Hardened Steel Pin", allowedShapes: ["round"], defaultShape: "round" },
      { id: "pin-linch", name: "Pipe Linch Pin", category: "Pins", density: 7.85, materialLabel: "Steel Linch Pin", allowedShapes: ["round"], defaultShape: "round" },
    ],
  },

  // ── 14. SPECIALIZED PRODUCTS ──────────────────────────────────
  {
    id: "specialized-products",
    name: "Specialized Products",
    defaultShape: "plate",
    allowedShapes: ["plate", "sheet", "round"],
    items: [
      // High Tensile
      { id: "sp-evonith", name: "EVONITH HARD (EVSL AS07)", category: "Specialized Products", subGroup: "High Tensile Strength", density: 7.85, materialLabel: "High Tensile Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-uttamhard", name: "UTTAMHARD", category: "Specialized Products", subGroup: "High Tensile Strength", density: 7.85, materialLabel: "High Tensile Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-sailhard", name: "SAILHARD", category: "Specialized Products", subGroup: "High Tensile Strength", density: 7.85, materialLabel: "High Tensile Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Cold Rolled
      { id: "sp-crca", name: "CRCA Coils", category: "Specialized Products", subGroup: "Cold Rolled", density: 7.85, materialLabel: "Cold Rolled Steel Coil", allowedShapes: ["sheet", "plate"], defaultShape: "sheet" },

      // Hot Rolled IS 2062
      { id: "sp-is2062-plates", name: "IS 2062 Plates", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 Mild Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-is2062-e250br", name: "IS 2062 E250BR", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 E250BR", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-is2062-e350", name: "IS 2062 E350", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 E350", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-is2062-e350br", name: "IS 2062 E350BR Plates", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 E350BR", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-is2062-e350c", name: "IS 2062 E350C", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 E350C", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-s355j2n", name: "S355J2+N Plates", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "S355J2+N Structural Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-is2062-e450br", name: "IS 2062 E450BR", category: "Specialized Products", subGroup: "Hot Rolled IS 2062 Plates", density: 7.85, materialLabel: "IS 2062 E450BR", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Abrasion Resistant Plates
      { id: "sp-abrex450", name: "Abrex 450 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "Abrex 450 Wear Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-abrex500", name: "Abrex 500 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "Abrex 500 Wear Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-nm400", name: "NM400 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "NM400 Wear Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-nm500", name: "NM500 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "NM500 Wear Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-rockstar400", name: "Rockstar 400 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "Rockstar 400 Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-rockstar450", name: "Rockstar 450 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "Rockstar 450 Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-rockstar500", name: "Rockstar 500 Plates", category: "Specialized Products", subGroup: "Abrasion Resistant Plates", density: 7.85, materialLabel: "Rockstar 500 Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // 16MO3-15MO3 & SA 204
      { id: "sp-16mo3", name: "16Mo3 Plate", category: "Specialized Products", subGroup: "16MO3-15MO3 & SA 204 Plates", density: 7.85, materialLabel: "16Mo3 Pressure Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Manganese Steel Plates
      { id: "sp-x120mn12", name: "X120MN12 / SIDUR 3401", category: "Specialized Products", subGroup: "Manganese Steel Plates", density: 7.90, materialLabel: "High Manganese Hadfield Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-high-mn", name: "High Manganese Plate/Steels", category: "Specialized Products", subGroup: "Manganese Steel Plates", density: 7.90, materialLabel: "High Manganese Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Quenched & Tempered Plates
      { id: "sp-s690ql", name: "S690QL Plate", category: "Specialized Products", subGroup: "Quenched & Tempered Plates", density: 7.85, materialLabel: "S690QL High Yield Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-en10025-6", name: "EN10025-6 S690QL", category: "Specialized Products", subGroup: "Quenched & Tempered Plates", density: 7.85, materialLabel: "EN10025-6 S690QL Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-welten", name: "Welten 780E Plates", category: "Specialized Products", subGroup: "Quenched & Tempered Plates", density: 7.85, materialLabel: "Welten 780E High Tensile", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Boiler Quality Steel Plates
      { id: "sp-is2041", name: "IS2041 R260 Plate", category: "Specialized Products", subGroup: "Boiler Quality Steel Plates", density: 7.85, materialLabel: "IS 2041 Boiler Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-sa516-70", name: "SA 516 Grade 70 Plate", category: "Specialized Products", subGroup: "Boiler Quality Steel Plates", density: 7.85, materialLabel: "ASTM A516 Gr 70 Boiler Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Chrome Moly Plates
      { id: "sp-a387-gr5", name: "A387 GRADE 5 CLASS 2", category: "Specialized Products", subGroup: "Chrome Moly Plates", density: 7.85, materialLabel: "A387 Grade 5 Chrome Moly", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-a387-gr22", name: "A387 GRADE 22 CLASS 2", category: "Specialized Products", subGroup: "Chrome Moly Plates", density: 7.85, materialLabel: "A387 Grade 22 Chrome Moly", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-a387-gen", name: "A387/SA387 Chrome Moly Plates", category: "Specialized Products", subGroup: "Chrome Moly Plates", density: 7.85, materialLabel: "A387 Chrome Moly Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Chequered Plate
      { id: "sp-chequered", name: "IS 3502 Chequered Plates", category: "Specialized Products", subGroup: "Chequered Plate", density: 7.85, materialLabel: "IS 3502 Chequered Plate", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },

      // Other Specialized
      { id: "sp-tata355", name: "Tata Structura 355", category: "Specialized Products", density: 7.85, materialLabel: "Tata Structura Hollow Section", allowedShapes: ["pipe", "tubular", "plate"], defaultShape: "pipe" },
      { id: "sp-corten-plates", name: "Corten Steel Plates", category: "Specialized Products", density: 7.85, materialLabel: "Corten Weathering Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
      { id: "sp-dsq", name: "DSQ Plates", category: "Specialized Products", density: 7.85, materialLabel: "Dead Soft Quality (DSQ) Steel", allowedShapes: ["plate", "sheet"], defaultShape: "plate" },
    ],
  },
];

// Flat list of all items for fast universal search (e.g. typing "NM500" or "F91")
export const ALL_PRODUCT_ITEMS: ProductItem[] = PRODUCT_CATEGORIES_DATA.flatMap(
  (cat) => cat.items
);
