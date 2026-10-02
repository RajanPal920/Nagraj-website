// src/data/metalWeightData.ts

export type DimensionUnit = "mm" | "cm" | "meter" | "inch" | "feet";

export interface UnitOption {
  value: DimensionUnit;
  label: string;
  symbol: string;
  toMmFactor: number;
}

export const DIMENSION_UNITS: UnitOption[] = [
  { value: "mm", label: "Millimeters (mm)", symbol: "mm", toMmFactor: 1 },
  { value: "cm", label: "Centimeters (cm)", symbol: "cm", toMmFactor: 10 },
  { value: "meter", label: "Meters (m)", symbol: "m", toMmFactor: 1000 },
  { value: "inch", label: "Inches (in)", symbol: "in", toMmFactor: 25.4 },
  { value: "feet", label: "Feet (ft)", symbol: "ft", toMmFactor: 304.8 },
];

export interface MaterialGrade {
  id: string;
  name: string;
  density: number; // in g/cm³
  category: string;
  description?: string;
}

export interface MaterialCategory {
  id: string;
  name: string;
  defaultDensity: number;
  grades: MaterialGrade[];
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: "stainless-steel",
    name: "Stainless Steel",
    defaultDensity: 7.93,
    grades: [
      { id: "ss-general", name: "Stainless Steel (General)", density: 7.93, category: "Stainless Steel", description: "Standard austenitic stainless steel density (AISI 304/304L)" },
      { id: "ss-304", name: "SS 304 / 304L", density: 7.93, category: "Stainless Steel", description: "Most widely used austenitic grade" },
      { id: "ss-316", name: "SS 316 / 316L", density: 7.98, category: "Stainless Steel", description: "Marine and chemical grade with Molybdenum" },
      { id: "ss-310", name: "SS 310 / 310S", density: 7.95, category: "Stainless Steel", description: "High temperature heat-resistant grade" },
      { id: "ss-321", name: "SS 321 / 347", density: 7.95, category: "Stainless Steel", description: "Titanium / Niobium stabilized austenitic steel" },
      { id: "ss-410", name: "SS 410 / 420 / 430", density: 7.75, category: "Stainless Steel", description: "Martensitic and ferritic magnetic stainless steel" },
      { id: "ss-904l", name: "SS 904L (Uranus B6)", density: 8.05, category: "Stainless Steel", description: "Super austenitic stainless steel for high corrosion service" },
    ],
  },
  {
    id: "carbon-mild-steel",
    name: "Mild Steel & Carbon Steel",
    defaultDensity: 7.85,
    grades: [
      { id: "ms-is2062", name: "Mild Steel (IS 2062 / E250 / E350)", density: 7.85, category: "Mild Steel & Carbon Steel", description: "Standard structural mild steel" },
      { id: "cs-a36", name: "Carbon Steel (ASTM A36 / A106 / A105)", density: 7.85, category: "Mild Steel & Carbon Steel", description: "General structural and pressure vessel carbon steel" },
      { id: "cs-1018", name: "AISI 1018 / 1020", density: 7.85, category: "Mild Steel & Carbon Steel", description: "Low carbon steel with high weldability" },
      { id: "cs-1045", name: "AISI 1045 / C45", density: 7.85, category: "Mild Steel & Carbon Steel", description: "Medium carbon steel for shafts and machinery" },
      { id: "boiler-sa516", name: "Boiler Quality Steel (SA 516 Gr 70 / 60)", density: 7.85, category: "Mild Steel & Carbon Steel", description: "High-grade pressure vessel boiler plate" },
    ],
  },
  {
    id: "alloy-steel",
    name: "Alloy Steel",
    defaultDensity: 7.85,
    grades: [
      { id: "as-en19", name: "EN19 / AISI 4140", density: 7.85, category: "Alloy Steel", description: "Chromium-Molybdenum engineering alloy steel" },
      { id: "as-en24", name: "EN24 / AISI 4340", density: 7.85, category: "Alloy Steel", description: "High tensile Nickel-Chromium-Moly steel" },
      { id: "as-en31", name: "EN31 / SAE 52100", density: 7.85, category: "Alloy Steel", description: "High carbon alloy bearing steel" },
      { id: "as-en8", name: "EN8 / AISI 1040", density: 7.85, category: "Alloy Steel", description: "Unalloyed medium carbon engineering steel" },
      { id: "as-en9", name: "EN9 / AISI 1055", density: 7.85, category: "Alloy Steel", description: "Medium-high carbon engineering steel" },
      { id: "as-8620", name: "AISI 8620", density: 7.85, category: "Alloy Steel", description: "Case hardening nickel-chromium-moly steel" },
      { id: "as-chrome-moly", name: "Chrome Moly (A387 Gr 11 / 22)", density: 7.85, category: "Alloy Steel", description: "High temperature elevated service alloy" },
    ],
  },
  {
    id: "tool-steel",
    name: "Tool Steel",
    defaultDensity: 7.80,
    grades: [
      { id: "ts-d2", name: "D2 Tool Steel (HCHCR)", density: 7.80, category: "Tool Steel", description: "High carbon, high chromium cold work tool steel" },
      { id: "ts-d3", name: "D3 Tool Steel", density: 7.80, category: "Tool Steel", description: "Deep hardening cold work die steel" },
      { id: "ts-h13", name: "H13 Tool Steel (Hot Work)", density: 7.80, category: "Tool Steel", description: "Chromium hot-work tool steel for die casting" },
      { id: "ts-o1", name: "O1 Tool Steel", density: 7.80, category: "Tool Steel", description: "Oil hardening non-shrinking tool steel" },
      { id: "ts-p20", name: "P20 / 1.2311 Mold Steel", density: 7.85, category: "Tool Steel", description: "Pre-hardened plastic mold steel" },
      { id: "ts-hss-m2", name: "High Speed Steel (HSS M2)", density: 8.16, category: "Tool Steel", description: "Molybdenum based high speed cutting steel" },
    ],
  },
  {
    id: "galvanized-steel",
    name: "Galvanized Steel",
    defaultDensity: 7.85,
    grades: [
      { id: "gi-sheet", name: "Galvanized Sheet / Coil (GI)", density: 7.85, category: "Galvanized Steel", description: "Zinc-coated corrosion resistant steel" },
      { id: "gi-pipe", name: "Galvanized Pipe / Tube", density: 7.85, category: "Galvanized Steel", description: "Hot-dip galvanized carbon steel" },
    ],
  },
  {
    id: "duplex-super-duplex",
    name: "Duplex & Super Duplex",
    defaultDensity: 7.80,
    grades: [
      { id: "duplex-2205", name: "Duplex 2205 (UNS S32205 / S31803)", density: 7.80, category: "Duplex & Super Duplex", description: "Standard duplex stainless steel (high chloride resistance)" },
      { id: "super-duplex-2507", name: "Super Duplex 2507 (UNS S32750)", density: 7.80, category: "Duplex & Super Duplex", description: "Super duplex steel for extreme offshore/marine environments" },
    ],
  },
  {
    id: "aluminium",
    name: "Aluminium & Alloys",
    defaultDensity: 2.70,
    grades: [
      { id: "al-general", name: "Aluminium (General)", density: 2.70, category: "Aluminium & Alloys", description: "Standard commercial aluminium density" },
      { id: "al-6061", name: "Aluminium 6061 / 6082", density: 2.70, category: "Aluminium & Alloys", description: "Structural aircraft & architectural grade" },
      { id: "al-5083", name: "Aluminium 5083 / 5052", density: 2.66, category: "Aluminium & Alloys", description: "Marine grade non-heat treatable aluminium" },
      { id: "al-7075", name: "Aluminium 7075", density: 2.81, category: "Aluminium & Alloys", description: "Ultra-high strength zinc alloyed aerospace aluminium" },
      { id: "al-2024", name: "Aluminium 2024", density: 2.78, category: "Aluminium & Alloys", description: "High copper alloyed aircraft aluminium" },
    ],
  },
  {
    id: "copper-brass",
    name: "Copper & Brass",
    defaultDensity: 8.96,
    grades: [
      { id: "cu-pure", name: "Pure Copper (C101 / C102 / C110)", density: 8.96, category: "Copper & Brass", description: "Electrolytic tough pitch high conductivity copper" },
      { id: "brass-commercial", name: "Brass (Commercial / C260 / C360)", density: 8.50, category: "Copper & Brass", description: "Standard copper-zinc alloy" },
      { id: "naval-brass", name: "Naval Brass (C46400)", density: 8.41, category: "Copper & Brass", description: "Tin-inhibited marine brass" },
      { id: "bronze-phosphor", name: "Phosphor Bronze (C51000 / PB1)", density: 8.86, category: "Copper & Brass", description: "High fatigue strength spring bronze" },
      { id: "bronze-aluminium", name: "Aluminium Bronze (C63000 / CA104)", density: 7.58, category: "Copper & Brass", description: "Heavy duty wear and sea-water resistant alloy" },
      { id: "gunmetal", name: "Gunmetal (LG2 / 85-5-5-5)", density: 8.80, category: "Copper & Brass", description: "Leaded bronze casting alloy for valves and bushes" },
    ],
  },
  {
    id: "cupro-nickel",
    name: "Cupro Nickel",
    defaultDensity: 8.94,
    grades: [
      { id: "cuni-90-10", name: "Cupro Nickel 90/10 (C70600)", density: 8.94, category: "Cupro Nickel", description: "90% Copper 10% Nickel for marine piping and heat exchangers" },
      { id: "cuni-70-30", name: "Cupro Nickel 70/30 (C71500)", density: 8.95, category: "Cupro Nickel", description: "70% Copper 30% Nickel for severe marine velocity" },
    ],
  },
  {
    id: "nickel-alloys",
    name: "Nickel & High Alloys",
    defaultDensity: 8.90,
    grades: [
      { id: "ni-200", name: "Pure Nickel 200 / 201", density: 8.89, category: "Nickel & High Alloys", description: "Commercially pure nickel with excellent caustic resistance" },
      { id: "inconel-600", name: "Inconel 600 (UNS N06600)", density: 8.47, category: "Nickel & High Alloys", description: "Nickel-Chromium alloy for heat treatment and chemical" },
      { id: "inconel-625", name: "Inconel 625 (UNS N06625)", density: 8.44, category: "Nickel & High Alloys", description: "Nickel-Chromium-Moly high strength superalloy" },
      { id: "inconel-718", name: "Inconel 718 (UNS N07718)", density: 8.19, category: "Nickel & High Alloys", description: "Precipitation hardened aerospace superalloy" },
      { id: "monel-400", name: "Monel 400 (UNS N04400)", density: 8.80, category: "Nickel & High Alloys", description: "Nickel-Copper alloy with superior hydrofluoric acid resistance" },
      { id: "monel-k500", name: "Monel K-500 (UNS N05500)", density: 8.44, category: "Nickel & High Alloys", description: "Age-hardenable Monel with high yield strength" },
      { id: "hastelloy-c276", name: "Hastelloy C-276 (UNS N10276)", density: 8.89, category: "Nickel & High Alloys", description: "Nickel-Moly-Chromium alloy with outstanding pitting resistance" },
      { id: "hastelloy-c22", name: "Hastelloy C-22 (UNS N06022)", density: 8.69, category: "Nickel & High Alloys", description: "Universal corrosion resistant high-performance alloy" },
    ],
  },
  {
    id: "titanium",
    name: "Titanium & Alloys",
    defaultDensity: 4.51,
    grades: [
      { id: "ti-gr2", name: "Titanium Grade 2 (CP)", density: 4.51, category: "Titanium & Alloys", description: "Commercially pure titanium with high corrosion resistance" },
      { id: "ti-gr5", name: "Titanium Grade 5 (Ti-6Al-4V)", density: 4.43, category: "Titanium & Alloys", description: "High-strength aerospace and medical titanium alloy" },
    ],
  },
  {
    id: "engineering-plastics",
    name: "Engineering Plastics & Polymers",
    defaultDensity: 1.15,
    grades: [
      { id: "ep-nylon", name: "Nylon 6 / Cast Nylon (PA)", density: 1.15, category: "Engineering Plastics & Polymers", description: "Wear resistant engineering polyamides" },
      { id: "ep-ptfe", name: "PTFE / Teflon", density: 2.20, category: "Engineering Plastics & Polymers", description: "High temperature fluoropolymer with ultra-low friction" },
      { id: "ep-delrin", name: "Delrin / POM (Acetal)", density: 1.42, category: "Engineering Plastics & Polymers", description: "High stiffness, low friction precision engineering thermoplastic" },
      { id: "ep-pp", name: "Polypropylene (PP)", density: 0.91, category: "Engineering Plastics & Polymers", description: "Chemical resistant lightweight industrial polymer" },
      { id: "ep-hdpe", name: "HDPE / UHMWPE", density: 0.95, category: "Engineering Plastics & Polymers", description: "High density impact resistant polyethylene" },
      { id: "ep-polycarbonate", name: "Polycarbonate (PC)", density: 1.20, category: "Engineering Plastics & Polymers", description: "High impact strength transparent polymer" },
      { id: "ep-peek", name: "PEEK (Polyetheretherketone)", density: 1.32, category: "Engineering Plastics & Polymers", description: "High-performance aerospace and medical grade thermoplastic" },
    ],
  },
];

export type ShapeId =
  | "round-bar"
  | "square-bar"
  | "rectangular-bar"
  | "hexagonal-bar"
  | "octagonal-bar"
  | "sheet"
  | "plate"
  | "tube"
  | "pipe"
  | "ring";

export interface DimensionFieldConfig {
  id: string;
  name: string;
  symbol: string;
  label: string;
  placeholder: string;
  tooltip?: string;
  defaultUnit: DimensionUnit;
}

export interface ShapeConfig {
  id: ShapeId;
  name: string;
  shortName: string;
  category: "Bars & Rods" | "Plates & Sheets" | "Pipes & Tubes" | "Rings";
  fields: DimensionFieldConfig[];
  formulaDescription: string;
  engineeringFormula: string;
}

export const SHAPE_CONFIGS: ShapeConfig[] = [
  {
    id: "round-bar",
    name: "Round Bar",
    shortName: "Round",
    category: "Bars & Rods",
    formulaDescription: "Volume = (π / 4) × Diameter² × Length",
    engineeringFormula: "V = (π/4) · D² · L",
    fields: [
      { id: "diameter", name: "Diameter", symbol: "D", label: "Diameter (Ø)", placeholder: "e.g. 50", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "square-bar",
    name: "Square Bar",
    shortName: "Square",
    category: "Bars & Rods",
    formulaDescription: "Volume = Side² × Length",
    engineeringFormula: "V = S² · L",
    fields: [
      { id: "side", name: "Side Width", symbol: "S", label: "Side Width (S)", placeholder: "e.g. 40", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "rectangular-bar",
    name: "Rectangular Bar (Flat Bar)",
    shortName: "Rectangular",
    category: "Bars & Rods",
    formulaDescription: "Volume = Width × Thickness × Length",
    engineeringFormula: "V = W · T · L",
    fields: [
      { id: "width", name: "Width", symbol: "W", label: "Width (W)", placeholder: "e.g. 60", defaultUnit: "mm" },
      { id: "thickness", name: "Thickness / Height", symbol: "T", label: "Thickness / Height (T)", placeholder: "e.g. 12", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "hexagonal-bar",
    name: "Hexagonal Bar",
    shortName: "Hexagonal",
    category: "Bars & Rods",
    formulaDescription: "Volume = (√3 / 2) × (Across Flats)² × Length ≈ 0.8660 × S² × L",
    engineeringFormula: "V = (√3/2) · S² · L",
    fields: [
      { id: "acrossFlats", name: "Across Flats", symbol: "A/F", label: "Width Across Flats (A/F)", placeholder: "e.g. 32", tooltip: "Distance between parallel opposite flat sides", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "octagonal-bar",
    name: "Octagonal Bar",
    shortName: "Octagonal",
    category: "Bars & Rods",
    formulaDescription: "Volume = 2(√2 − 1) × (Across Flats)² × Length ≈ 0.8284 × S² × L",
    engineeringFormula: "V = 2(√2 - 1) · S² · L",
    fields: [
      { id: "acrossFlats", name: "Across Flats", symbol: "A/F", label: "Width Across Flats (A/F)", placeholder: "e.g. 30", tooltip: "Distance between opposite parallel faces", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "sheet",
    name: "Sheet",
    shortName: "Sheet",
    category: "Plates & Sheets",
    formulaDescription: "Volume = Thickness × Width × Length",
    engineeringFormula: "V = T · W · L",
    fields: [
      { id: "thickness", name: "Thickness", symbol: "T", label: "Sheet Thickness (T)", placeholder: "e.g. 2", defaultUnit: "mm" },
      { id: "width", name: "Width", symbol: "W", label: "Width (W)", placeholder: "e.g. 1250", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length (L)", placeholder: "e.g. 2500", defaultUnit: "mm" },
    ],
  },
  {
    id: "plate",
    name: "Plate",
    shortName: "Plate",
    category: "Plates & Sheets",
    formulaDescription: "Volume = Thickness × Width × Length",
    engineeringFormula: "V = T · W · L",
    fields: [
      { id: "thickness", name: "Thickness", symbol: "T", label: "Plate Thickness (T)", placeholder: "e.g. 16", defaultUnit: "mm" },
      { id: "width", name: "Width", symbol: "W", label: "Width (W)", placeholder: "e.g. 1500", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length (L)", placeholder: "e.g. 3000", defaultUnit: "mm" },
    ],
  },
  {
    id: "tube",
    name: "Tube",
    shortName: "Tube",
    category: "Pipes & Tubes",
    formulaDescription: "Volume = (π / 4) × (OD² − ID²) × Length = π × (OD − WT) × WT × Length",
    engineeringFormula: "V = π · (OD - WT) · WT · L",
    fields: [
      { id: "outerDiameter", name: "Outer Diameter", symbol: "OD", label: "Outer Diameter (OD)", placeholder: "e.g. 50.8", defaultUnit: "mm" },
      { id: "wallThickness", name: "Wall Thickness", symbol: "WT", label: "Wall Thickness (WT)", placeholder: "e.g. 3.2", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length (L)", placeholder: "e.g. 1000", defaultUnit: "mm" },
    ],
  },
  {
    id: "pipe",
    name: "Pipe",
    shortName: "Pipe",
    category: "Pipes & Tubes",
    formulaDescription: "Volume = (π / 4) × (OD² − ID²) × Length = π × (OD − WT) × WT × Length",
    engineeringFormula: "V = π · (OD - WT) · WT · L",
    fields: [
      { id: "outerDiameter", name: "Outer Diameter", symbol: "OD", label: "Outer Diameter (OD)", placeholder: "e.g. 88.9", defaultUnit: "mm" },
      { id: "wallThickness", name: "Wall Thickness", symbol: "WT", label: "Wall Thickness (WT)", placeholder: "e.g. 5.49", defaultUnit: "mm" },
      { id: "length", name: "Length", symbol: "L", label: "Length (L)", placeholder: "e.g. 6000", defaultUnit: "mm" },
    ],
  },
  {
    id: "ring",
    name: "Ring / Flange Blank",
    shortName: "Ring",
    category: "Rings",
    formulaDescription: "Volume = (π / 4) × (OD² − ID²) × Thickness",
    engineeringFormula: "V = (π/4) · (OD² - ID²) · T",
    fields: [
      { id: "outerDiameter", name: "Outer Diameter", symbol: "OD", label: "Outer Diameter (OD)", placeholder: "e.g. 300", defaultUnit: "mm" },
      { id: "innerDiameter", name: "Inner Diameter", symbol: "ID", label: "Inner Diameter (ID)", placeholder: "e.g. 150", defaultUnit: "mm" },
      { id: "thickness", name: "Thickness / Width", symbol: "T", label: "Thickness / Face Width (T)", placeholder: "e.g. 25", defaultUnit: "mm" },
    ],
  },
];

export interface PresetOption {
  title: string;
  shapeId: ShapeId;
  gradeId: string;
  dimensions: Record<string, number>;
  units: Record<string, DimensionUnit>;
  quantity: number;
}

export const QUICK_PRESETS: PresetOption[] = [
  {
    title: "SS 304 Pipe 2\" Sch 40 (6m)",
    shapeId: "pipe",
    gradeId: "ss-304",
    dimensions: { outerDiameter: 60.3, wallThickness: 3.91, length: 6000 },
    units: { outerDiameter: "mm", wallThickness: "mm", length: "mm" },
    quantity: 1,
  },
  {
    title: "MS Plate 12mm × 1.5m × 3m",
    shapeId: "plate",
    gradeId: "ms-is2062",
    dimensions: { thickness: 12, width: 1500, length: 3000 },
    units: { thickness: "mm", width: "mm", length: "mm" },
    quantity: 1,
  },
  {
    title: "EN24 Round Bar Ø50mm × 1m",
    shapeId: "round-bar",
    gradeId: "as-en24",
    dimensions: { diameter: 50, length: 1000 },
    units: { diameter: "mm", length: "mm" },
    quantity: 1,
  },
  {
    title: "Aluminium 6061 Sheet 3mm (4×8 ft)",
    shapeId: "sheet",
    gradeId: "al-6061",
    dimensions: { thickness: 3, width: 1219.2, length: 2438.4 },
    units: { thickness: "mm", width: "mm", length: "mm" },
    quantity: 1,
  },
  {
    title: "Brass Hex Bar 25mm A/F × 1m",
    shapeId: "hexagonal-bar",
    gradeId: "brass-commercial",
    dimensions: { acrossFlats: 25, length: 1000 },
    units: { acrossFlats: "mm", length: "mm" },
    quantity: 1,
  },
];
