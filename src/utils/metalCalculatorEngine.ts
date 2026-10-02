// src/utils/metalCalculatorEngine.ts

import {
  DIMENSION_UNITS,
  type DimensionUnit,
  type ShapeId,
} from "../data/metalWeightData";

export interface CalculationInput {
  shapeId: ShapeId;
  density: number; // in g/cm³
  dimensions: Record<string, number | undefined>;
  units: Record<string, DimensionUnit>;
  quantity: number;
}

export interface CalculationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
  pieceWeightKg: number;
  totalWeightKg: number;
  pieceWeightMT: number;
  totalWeightMT: number;
  pieceWeightLbs: number;
  totalWeightLbs: number;
  volumeMm3: number;
  volumeCm3: number;
  dimensionSummary: string;
}

/**
 * Converts a dimension from given unit to standard millimeters (mm)
 */
export function convertToMm(value: number | undefined, unit: DimensionUnit = "mm"): number {
  if (value === undefined || isNaN(value) || value <= 0) return 0;
  const unitConfig = DIMENSION_UNITS.find((u) => u.value === unit);
  const factor = unitConfig ? unitConfig.toMmFactor : 1;
  return value * factor;
}

/**
 * Formats a number cleanly with standard precision, avoiding unnecessary trailing zeros
 */
export function formatNumber(val: number, maxDecimals: number = 3): string {
  if (isNaN(val) || !isFinite(val)) return "0";
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(val);
}

/**
 * Formats weights specifically:
 * - for kg: 2-3 decimal places
 * - for MT: 4-5 decimal places
 */
export function formatWeight(val: number, isMT: boolean = false): string {
  if (isNaN(val) || !isFinite(val) || val <= 0) return isMT ? "0.0000" : "0.00";
  const decimals = isMT ? 4 : val >= 1000 ? 2 : val >= 10 ? 2 : 3;
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: isMT ? 4 : 2,
    maximumFractionDigits: decimals,
  }).format(val);
}

/**
 * Validates inputs and calculates volume and weight for the given shape
 */
export function calculateMetalWeight(input: CalculationInput): CalculationResult {
  const { shapeId, density, dimensions, units, quantity } = input;
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  // Density validation
  if (!density || isNaN(density) || density <= 0) {
    errors.density = "Please enter or select a valid material density (> 0 g/cm³).";
  }

  // Quantity validation
  const safeQty = Math.max(1, Math.floor(quantity || 1));
  if (quantity !== undefined && (isNaN(quantity) || quantity < 1)) {
    errors.quantity = "Quantity must be at least 1.";
  }

  // Convert all dimensions to millimeters
  const dimMm: Record<string, number> = {};
  for (const [key, val] of Object.entries(dimensions)) {
    const unit = units[key] || "mm";
    const mm = convertToMm(val, unit);
    dimMm[key] = mm;

    if (val !== undefined && (isNaN(val) || val < 0)) {
      errors[key] = "Value cannot be negative.";
    }
  }

  let volumeMm3 = 0;
  let summary = "";

  switch (shapeId) {
    case "round-bar": {
      const d = dimMm.diameter;
      const l = dimMm.length;
      const rawD = dimensions.diameter;
      const rawL = dimensions.length;

      if (!rawD || rawD <= 0) errors.diameter = "Please enter diameter";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (d > 0 && l > 0) {
        // Volume = π/4 * D² * L
        volumeMm3 = (Math.PI / 4) * Math.pow(d, 2) * l;
        summary = `Ø${formatNumber(rawD!)} ${units.diameter || "mm"} × ${formatNumber(rawL!)} ${units.length || "mm"}`;
      }
      break;
    }

    case "square-bar": {
      const s = dimMm.side;
      const l = dimMm.length;
      const rawS = dimensions.side;
      const rawL = dimensions.length;

      if (!rawS || rawS <= 0) errors.side = "Please enter side width";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (s > 0 && l > 0) {
        // Volume = S² * L
        volumeMm3 = Math.pow(s, 2) * l;
        summary = `■ ${formatNumber(rawS!)} ${units.side || "mm"} × ${formatNumber(rawL!)} ${units.length || "mm"}`;
      }
      break;
    }

    case "rectangular-bar": {
      const w = dimMm.width;
      const t = dimMm.thickness;
      const l = dimMm.length;
      const rawW = dimensions.width;
      const rawT = dimensions.thickness;
      const rawL = dimensions.length;

      if (!rawW || rawW <= 0) errors.width = "Please enter width";
      if (!rawT || rawT <= 0) errors.thickness = "Please enter thickness";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (w > 0 && t > 0 && l > 0) {
        // Volume = W * T * L
        volumeMm3 = w * t * l;
        summary = `${formatNumber(rawW!)} ${units.width || "mm"} × ${formatNumber(rawT!)} ${units.thickness || "mm"} × ${formatNumber(rawL!)} ${units.length || "mm"}`;
      }
      break;
    }

    case "hexagonal-bar": {
      const af = dimMm.acrossFlats;
      const l = dimMm.length;
      const rawAF = dimensions.acrossFlats;
      const rawL = dimensions.length;

      if (!rawAF || rawAF <= 0) errors.acrossFlats = "Please enter width across flats";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (af > 0 && l > 0) {
        // Hexagon area = (√3 / 2) * (Across Flats)² ≈ 0.8660254 * af²
        const area = (Math.sqrt(3) / 2) * Math.pow(af, 2);
        volumeMm3 = area * l;
        summary = `Hex A/F ${formatNumber(rawAF!)} ${units.acrossFlats || "mm"} × ${formatNumber(rawL!)} ${units.length || "mm"}`;
      }
      break;
    }

    case "octagonal-bar": {
      const af = dimMm.acrossFlats;
      const l = dimMm.length;
      const rawAF = dimensions.acrossFlats;
      const rawL = dimensions.length;

      if (!rawAF || rawAF <= 0) errors.acrossFlats = "Please enter width across flats";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (af > 0 && l > 0) {
        // Regular octagon area across flats S: Area = 2 * (√2 - 1) * S² ≈ 0.8284271 * af²
        const area = 2 * (Math.SQRT2 - 1) * Math.pow(af, 2);
        volumeMm3 = area * l;
        summary = `Oct A/F ${formatNumber(rawAF!)} ${units.acrossFlats || "mm"} × ${formatNumber(rawL!)} ${units.length || "mm"}`;
      }
      break;
    }

    case "sheet":
    case "plate": {
      const t = dimMm.thickness;
      const w = dimMm.width;
      const l = dimMm.length;
      const rawT = dimensions.thickness;
      const rawW = dimensions.width;
      const rawL = dimensions.length;

      if (!rawT || rawT <= 0) errors.thickness = "Please enter thickness";
      if (!rawW || rawW <= 0) errors.width = "Please enter width";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (t > 0 && w > 0 && l > 0) {
        // Volume = T * W * L
        volumeMm3 = t * w * l;
        summary = `${formatNumber(rawT!)} ${units.thickness || "mm"} (T) × ${formatNumber(rawW!)} ${units.width || "mm"} (W) × ${formatNumber(rawL!)} ${units.length || "mm"} (L)`;
      }
      break;
    }

    case "tube":
    case "pipe": {
      const od = dimMm.outerDiameter;
      const wt = dimMm.wallThickness;
      const l = dimMm.length;
      const rawOD = dimensions.outerDiameter;
      const rawWT = dimensions.wallThickness;
      const rawL = dimensions.length;

      if (!rawOD || rawOD <= 0) errors.outerDiameter = "Please enter outer diameter";
      if (!rawWT || rawWT <= 0) errors.wallThickness = "Please enter wall thickness";
      if (!rawL || rawL <= 0) errors.length = "Please enter length";

      if (od > 0 && wt > 0) {
        if (wt >= od / 2) {
          const maxAllowed = (rawOD! / 2).toFixed(2);
          errors.wallThickness = `Wall thickness must be less than half of outer diameter (< ${maxAllowed} ${units.outerDiameter || "mm"}).`;
        } else {
          const id = od - 2 * wt;
          if (id <= 0) {
            errors.innerDiameter = "Inner diameter must be greater than zero.";
          } else if (l > 0) {
            // Volume = (π / 4) * (OD² - ID²) * L = π * (OD - WT) * WT * L
            volumeMm3 = Math.PI * (od - wt) * wt * l;
            summary = `OD ${formatNumber(rawOD!)} ${units.outerDiameter || "mm"} × WT ${formatNumber(rawWT!)} ${units.wallThickness || "mm"} × L ${formatNumber(rawL!)} ${units.length || "mm"}`;
          }
        }
      }
      break;
    }

    case "ring": {
      const od = dimMm.outerDiameter;
      const id = dimMm.innerDiameter;
      const t = dimMm.thickness;
      const rawOD = dimensions.outerDiameter;
      const rawID = dimensions.innerDiameter;
      const rawT = dimensions.thickness;

      if (!rawOD || rawOD <= 0) errors.outerDiameter = "Please enter outer diameter";
      if (rawID === undefined || rawID < 0) {
        errors.innerDiameter = "Please enter inner diameter (≥ 0)";
      }
      if (!rawT || rawT <= 0) errors.thickness = "Please enter thickness / width";

      if (od > 0 && id !== undefined && id >= 0) {
        if (id >= od) {
          errors.innerDiameter = `Inner diameter must be strictly less than outer diameter (< ${formatNumber(rawOD!)} ${units.outerDiameter || "mm"}).`;
        } else if (t > 0) {
          // Annular cylinder: Volume = (π / 4) * (OD² - ID²) * T
          volumeMm3 = (Math.PI / 4) * (Math.pow(od, 2) - Math.pow(id, 2)) * t;
          summary = `OD ${formatNumber(rawOD!)} × ID ${formatNumber(rawID!)} × T ${formatNumber(rawT!)} ${units.thickness || "mm"}`;
        }
      }
      break;
    }
  }

  const isValid = Object.keys(errors).length === 0 && volumeMm3 > 0;

  if (!isValid || volumeMm3 <= 0) {
    return {
      isValid: false,
      errors,
      warnings,
      pieceWeightKg: 0,
      totalWeightKg: 0,
      pieceWeightMT: 0,
      totalWeightMT: 0,
      pieceWeightLbs: 0,
      totalWeightLbs: 0,
      volumeMm3: 0,
      volumeCm3: 0,
      dimensionSummary: summary || "Incomplete dimensions",
    };
  }

  // Volume in cm³ = mm³ / 1000
  const volumeCm3 = volumeMm3 / 1000;

  // Mass in grams = volume in cm³ * density in g/cm³
  // Weight in kg = mass in grams / 1000 = (volumeMm3 * density) / 1,000,000
  const pieceWeightKg = (volumeMm3 * density) / 1000000;
  const totalWeightKg = pieceWeightKg * safeQty;

  // Weight in Metric Tonnes = kg / 1000
  const pieceWeightMT = pieceWeightKg / 1000;
  const totalWeightMT = totalWeightKg / 1000;

  // Weight in Pounds (lbs) = kg * 2.20462262185
  const pieceWeightLbs = pieceWeightKg * 2.20462262;
  const totalWeightLbs = totalWeightKg * 2.20462262;

  // Add helpful engineering notes if extreme
  if (totalWeightKg > 50000) {
    warnings.push("Calculated weight exceeds 50 Metric Tonnes. Please check shipping / crane handling limits.");
  }

  return {
    isValid: true,
    errors: {},
    warnings,
    pieceWeightKg,
    totalWeightKg,
    pieceWeightMT,
    totalWeightMT,
    pieceWeightLbs,
    totalWeightLbs,
    volumeMm3,
    volumeCm3,
    dimensionSummary: summary,
  };
}
