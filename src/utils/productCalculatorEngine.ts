// src/utils/productCalculatorEngine.ts

import { type ShapeType } from "../data/productCalculatorData";

export interface ShapeDefinition {
  id: ShapeType;
  name: string;
  fields: {
    key: string;
    label: string;
    placeholder: string;
    defaultUnit?: string;
  }[];
}

export const SHAPE_DEFINITIONS: Record<ShapeType, ShapeDefinition> = {
  round: {
    id: "round",
    name: "Round",
    fields: [
      { key: "diameter", label: "Diameter", placeholder: "e.g. 50" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  square: {
    id: "square",
    name: "Square",
    fields: [
      { key: "width", label: "Width / Side", placeholder: "e.g. 40" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  rectangle: {
    id: "rectangle",
    name: "Rectangle",
    fields: [
      { key: "width", label: "Width", placeholder: "e.g. 60" },
      { key: "height", label: "Height", placeholder: "e.g. 20" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  hexagonal: {
    id: "hexagonal",
    name: "Hexagonal",
    fields: [
      { key: "acrossFlats", label: "Across Flats", placeholder: "e.g. 32" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  octagonal: {
    id: "octagonal",
    name: "Octagonal",
    fields: [
      { key: "acrossFlats", label: "Across Flats", placeholder: "e.g. 30" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  sheet: {
    id: "sheet",
    name: "Sheet",
    fields: [
      { key: "thickness", label: "Thickness", placeholder: "e.g. 2" },
      { key: "width", label: "Width", placeholder: "e.g. 1250" },
      { key: "length", label: "Length", placeholder: "e.g. 2500" },
    ],
  },
  plate: {
    id: "plate",
    name: "Plate",
    fields: [
      { key: "thickness", label: "Thickness", placeholder: "e.g. 10" },
      { key: "width", label: "Width", placeholder: "e.g. 1500" },
      { key: "length", label: "Length", placeholder: "e.g. 3000" },
    ],
  },
  pipe: {
    id: "pipe",
    name: "Pipe",
    fields: [
      { key: "outerDiameter", label: "Outer Diameter", placeholder: "e.g. 50" },
      { key: "wallThickness", label: "Wall Thickness", placeholder: "e.g. 3" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  tubular: {
    id: "tubular",
    name: "Tubular",
    fields: [
      { key: "outerDiameter", label: "Outer Diameter", placeholder: "e.g. 50" },
      { key: "wallThickness", label: "Wall Thickness", placeholder: "e.g. 3" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  ring: {
    id: "ring",
    name: "Ring",
    fields: [
      { key: "outerDiameter", label: "Outer Diameter", placeholder: "e.g. 200" },
      { key: "innerDiameter", label: "Inner Diameter", placeholder: "e.g. 100" },
      { key: "thickness", label: "Thickness / Height", placeholder: "e.g. 25" },
    ],
  },
  "round-circle": {
    id: "round-circle",
    name: "Round Circle",
    fields: [
      { key: "diameter", label: "Diameter", placeholder: "e.g. 300" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 12" },
    ],
  },
  angle: {
    id: "angle",
    name: "Angle",
    fields: [
      { key: "width", label: "Width (Leg 1)", placeholder: "e.g. 50" },
      { key: "height", label: "Height (Leg 2)", placeholder: "e.g. 50" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 5" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  channel: {
    id: "channel",
    name: "Channel",
    fields: [
      { key: "width", label: "Width (Web)", placeholder: "e.g. 100" },
      { key: "height", label: "Height (Flange)", placeholder: "e.g. 50" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 5" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
  flat: {
    id: "flat",
    name: "Flat",
    fields: [
      { key: "width", label: "Width", placeholder: "e.g. 50" },
      { key: "thickness", label: "Thickness", placeholder: "e.g. 10" },
      { key: "length", label: "Length", placeholder: "e.g. 1000" },
    ],
  },
};

// Unit factor to convert dimension to millimeters (mm)
export const UNIT_FACTORS: Record<string, number> = {
  mm: 1,
  cm: 10,
  m: 1000,
  meter: 1000,
  in: 25.4,
  inch: 25.4,
  ft: 304.8,
  feet: 304.8,
};

function toMm(val: number | undefined, unit: string = "mm"): number {
  if (val === undefined || isNaN(val) || val <= 0) return 0;
  const factor = UNIT_FACTORS[unit] || 1;
  return val * factor;
}

export function formatWeightSimple(val: number): string {
  if (isNaN(val) || !isFinite(val) || val <= 0) return "0.00";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export function formatMetricTonnesSimple(val: number): string {
  if (isNaN(val) || !isFinite(val) || val <= 0) return "0.000";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 4,
  }).format(val);
}

export interface ProductCalcResult {
  isValid: boolean;
  errorMessage: string | null;
  weightPerPieceKg: number;
  totalWeightKg: number;
  weightPerPieceMT: number;
  totalWeightMT: number;
  formattedPieceKg: string;
  formattedTotalKg: string;
  formattedTotalMT: string;
  dimensionsSummary: string;
}

export function calculateProductWeight(
  shape: ShapeType,
  density: number,
  rawDimensions: Record<string, number | undefined>,
  units: Record<string, string>,
  quantity: number = 1
): ProductCalcResult {
  const shapeDef = SHAPE_DEFINITIONS[shape];
  if (!shapeDef) {
    return {
      isValid: false,
      errorMessage: "Please select a valid shape.",
      weightPerPieceKg: 0,
      totalWeightKg: 0,
      weightPerPieceMT: 0,
      totalWeightMT: 0,
      formattedPieceKg: "0.00",
      formattedTotalKg: "0.00",
      formattedTotalMT: "0.000",
      dimensionsSummary: "",
    };
  }

  // Validate required fields
  for (const field of shapeDef.fields) {
    const val = rawDimensions[field.key];
    if (val === undefined || isNaN(val) || val <= 0) {
      return {
        isValid: false,
        errorMessage: `Please enter the required ${field.label.toLowerCase()}.`,
        weightPerPieceKg: 0,
        totalWeightKg: 0,
        weightPerPieceMT: 0,
        totalWeightMT: 0,
        formattedPieceKg: "0.00",
        formattedTotalKg: "0.00",
        formattedTotalMT: "0.000",
        dimensionsSummary: "",
      };
    }
  }

  // Convert all dimensions to millimeters
  const dimMm: Record<string, number> = {};
  for (const field of shapeDef.fields) {
    const u = units[field.key] || "mm";
    dimMm[field.key] = toMm(rawDimensions[field.key], u);
  }

  let volumeMm3 = 0;
  let summary = "";

  switch (shape) {
    case "round": {
      const d = dimMm.diameter;
      const l = dimMm.length;
      volumeMm3 = (Math.PI / 4) * Math.pow(d, 2) * l;
      summary = `Ø${rawDimensions.diameter} ${units.diameter || "mm"} × ${rawDimensions.length} ${units.length || "mm"}`;
      break;
    }

    case "square": {
      const w = dimMm.width;
      const l = dimMm.length;
      volumeMm3 = Math.pow(w, 2) * l;
      summary = `${rawDimensions.width} × ${rawDimensions.width} × ${rawDimensions.length} ${units.length || "mm"}`;
      break;
    }

    case "rectangle": {
      const w = dimMm.width;
      const h = dimMm.height;
      const l = dimMm.length;
      volumeMm3 = w * h * l;
      summary = `${rawDimensions.width} × ${rawDimensions.height} × ${rawDimensions.length} ${units.length || "mm"}`;
      break;
    }

    case "hexagonal": {
      const af = dimMm.acrossFlats;
      const l = dimMm.length;
      volumeMm3 = (Math.sqrt(3) / 2) * Math.pow(af, 2) * l;
      summary = `Hex A/F ${rawDimensions.acrossFlats} × ${rawDimensions.length} ${units.length || "mm"}`;
      break;
    }

    case "octagonal": {
      const af = dimMm.acrossFlats;
      const l = dimMm.length;
      volumeMm3 = 2 * (Math.SQRT2 - 1) * Math.pow(af, 2) * l;
      summary = `Oct A/F ${rawDimensions.acrossFlats} × ${rawDimensions.length} ${units.length || "mm"}`;
      break;
    }

    case "sheet":
    case "plate": {
      const t = dimMm.thickness;
      const w = dimMm.width;
      const l = dimMm.length;
      volumeMm3 = t * w * l;
      summary = `${rawDimensions.thickness} mm × ${rawDimensions.width} mm × ${rawDimensions.length} mm`;
      break;
    }

    case "pipe":
    case "tubular": {
      const od = dimMm.outerDiameter;
      const wt = dimMm.wallThickness;
      const l = dimMm.length;
      if (wt >= od / 2) {
        return {
          isValid: false,
          errorMessage: "Wall thickness must be less than half of outer diameter.",
          weightPerPieceKg: 0,
          totalWeightKg: 0,
          weightPerPieceMT: 0,
          totalWeightMT: 0,
          formattedPieceKg: "0.00",
          formattedTotalKg: "0.00",
          formattedTotalMT: "0.000",
          dimensionsSummary: "",
        };
      }
      volumeMm3 = Math.PI * (od - wt) * wt * l;
      summary = `OD ${rawDimensions.outerDiameter} × WT ${rawDimensions.wallThickness} × L ${rawDimensions.length} mm`;
      break;
    }

    case "ring": {
      const od = dimMm.outerDiameter;
      const id = dimMm.innerDiameter;
      const t = dimMm.thickness;
      if (id >= od) {
        return {
          isValid: false,
          errorMessage: "Inner diameter must be less than outer diameter.",
          weightPerPieceKg: 0,
          totalWeightKg: 0,
          weightPerPieceMT: 0,
          totalWeightMT: 0,
          formattedPieceKg: "0.00",
          formattedTotalKg: "0.00",
          formattedTotalMT: "0.000",
          dimensionsSummary: "",
        };
      }
      volumeMm3 = (Math.PI / 4) * (Math.pow(od, 2) - Math.pow(id, 2)) * t;
      summary = `OD ${rawDimensions.outerDiameter} × ID ${rawDimensions.innerDiameter} × T ${rawDimensions.thickness} mm`;
      break;
    }

    case "round-circle": {
      const d = dimMm.diameter;
      const t = dimMm.thickness;
      volumeMm3 = (Math.PI / 4) * Math.pow(d, 2) * t;
      summary = `Circle Ø${rawDimensions.diameter} × ${rawDimensions.thickness} mm`;
      break;
    }

    case "angle": {
      const w = dimMm.width;
      const h = dimMm.height;
      const t = dimMm.thickness;
      const l = dimMm.length;
      volumeMm3 = (w + h - t) * t * l;
      summary = `${rawDimensions.width} × ${rawDimensions.height} × ${rawDimensions.thickness} × ${rawDimensions.length} mm`;
      break;
    }

    case "channel": {
      const w = dimMm.width;
      const h = dimMm.height;
      const t = dimMm.thickness;
      const l = dimMm.length;
      volumeMm3 = (w + 2 * (h - t)) * t * l;
      summary = `${rawDimensions.width} × ${rawDimensions.height} × ${rawDimensions.thickness} × ${rawDimensions.length} mm`;
      break;
    }

    case "flat": {
      const w = dimMm.width;
      const t = dimMm.thickness;
      const l = dimMm.length;
      volumeMm3 = w * t * l;
      summary = `${rawDimensions.width} mm × ${rawDimensions.thickness} mm × ${rawDimensions.length} mm`;
      break;
    }
  }

  const safeQty = Math.max(1, Math.floor(quantity || 1));
  const safeDensity = density > 0 ? density : 7.85;

  // Weight (kg) = Volume(mm³) * density(g/cm³) / 1,000,000
  const weightPerPieceKg = (volumeMm3 * safeDensity) / 1000000;
  const totalWeightKg = weightPerPieceKg * safeQty;
  const weightPerPieceMT = weightPerPieceKg / 1000;
  const totalWeightMT = totalWeightKg / 1000;

  return {
    isValid: true,
    errorMessage: null,
    weightPerPieceKg,
    totalWeightKg,
    weightPerPieceMT,
    totalWeightMT,
    formattedPieceKg: formatWeightSimple(weightPerPieceKg),
    formattedTotalKg: formatWeightSimple(totalWeightKg),
    formattedTotalMT: formatMetricTonnesSimple(totalWeightMT),
    dimensionsSummary: summary,
  };
}
