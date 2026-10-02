// src/pages/WeightCalculatorPage.tsx

import { useState, useMemo, useEffect, useRef } from "react";
import { Copy, Check, Send, Scale, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  PRODUCT_CATEGORIES_DATA,
  type ShapeType,
  type ProductCategory,
  type ProductItem,
} from "../data/productCalculatorData";
import {
  SHAPE_DEFINITIONS,
  calculateProductWeight,
  type ProductCalcResult,
} from "../utils/productCalculatorEngine";
import { ProductSearchSelect } from "../components/WeightCalculator/ProductSearchSelect";
import { ShapeSelector } from "../components/WeightCalculator/ShapeSelector";

const COMMON_UNITS = [
  { value: "mm", label: "mm" },
  { value: "cm", label: "cm" },
  { value: "m", label: "m" },
  { value: "in", label: "in" },
  { value: "ft", label: "ft" },
];

export function WeightCalculatorPage() {
  // Page SEO title
  useEffect(() => {
    document.title = "Metal Weight Calculator | Nagraj Metal Industry";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // 1. Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("pipes-tubes");

  const currentCategory: ProductCategory = useMemo(() => {
    return (
      PRODUCT_CATEGORIES_DATA.find((c) => c.id === selectedCategoryId) ||
      PRODUCT_CATEGORIES_DATA[0]
    );
  }, [selectedCategoryId]);

  // 2. Selected Product / Sub-item
  const [selectedItemId, setSelectedItemId] = useState<string>(
    currentCategory.items[0]?.id || ""
  );

  const currentItem: ProductItem = useMemo(() => {
    const found = currentCategory.items.find((i) => i.id === selectedItemId);
    return found || currentCategory.items[0];
  }, [currentCategory, selectedItemId]);

  // 3. Selected Shape
  const [selectedShape, setSelectedShape] = useState<ShapeType>(
    currentItem?.defaultShape || currentCategory.defaultShape
  );

  // 4. Dimensions State
  const [dimensions, setDimensions] = useState<Record<string, number | undefined>>({
    outerDiameter: 50,
    wallThickness: 3,
    length: 1000,
  });

  // 5. Units State (default mm)
  const [units, setUnits] = useState<Record<string, string>>({});

  // 6. Quantity State (default 1)
  const [quantity, setQuantity] = useState<number>(1);

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);

  // Form error message (if any validation fails on submit)
  const [validationError, setValidationError] = useState<string | null>(null);

  // Ref to result card for mobile scrolling
  const resultRef = useRef<HTMLDivElement>(null);

  // Get active shape definition
  const shapeDef = SHAPE_DEFINITIONS[selectedShape] || SHAPE_DEFINITIONS.pipe;

  // Whenever category changes, pick first item and its default shape
  const handleCategoryChange = (newCatId: string) => {
    setSelectedCategoryId(newCatId);
    const newCat = PRODUCT_CATEGORIES_DATA.find((c) => c.id === newCatId);
    if (newCat && newCat.items.length > 0) {
      const firstItem = newCat.items[0];
      setSelectedItemId(firstItem.id);
      setSelectedShape(firstItem.defaultShape || newCat.defaultShape);
      resetDimensionsForShape(firstItem.defaultShape || newCat.defaultShape);
    }
    setValidationError(null);
  };

  // Whenever product item changes
  const handleItemSelect = (item: ProductItem) => {
    setSelectedItemId(item.id);
    const newShape = item.defaultShape || "round";
    setSelectedShape(newShape);
    resetDimensionsForShape(newShape);
    setValidationError(null);
  };

  // Whenever shape changes
  const handleShapeSelect = (newShape: ShapeType) => {
    setSelectedShape(newShape);
    resetDimensionsForShape(newShape);
    setValidationError(null);
  };

  // Helper to reset dimension inputs cleanly for a shape
  const resetDimensionsForShape = (shape: ShapeType) => {
    const sDef = SHAPE_DEFINITIONS[shape];
    if (!sDef) return;
    const newDims: Record<string, number | undefined> = {};
    const newUnits: Record<string, string> = {};

    sDef.fields.forEach((f) => {
      // Carry over length if present
      if (f.key === "length" && dimensions.length) {
        newDims[f.key] = dimensions.length;
      } else {
        newDims[f.key] = undefined;
      }
      newUnits[f.key] = f.defaultUnit || "mm";
    });

    setDimensions(newDims);
    setUnits(newUnits);
  };

  // Handle single dimension input change
  const handleDimensionChange = (key: string, val: string) => {
    setValidationError(null);
    if (val === "") {
      setDimensions((prev) => ({ ...prev, [key]: undefined }));
    } else {
      const num = parseFloat(val);
      setDimensions((prev) => ({
        ...prev,
        [key]: isNaN(num) ? undefined : num,
      }));
    }
  };

  // Handle unit change for a dimension
  const handleUnitChange = (key: string, newUnit: string) => {
    setUnits((prev) => ({ ...prev, [key]: newUnit }));
  };

  // Real-time calculation result
  const calcResult: ProductCalcResult = useMemo(() => {
    if (!currentItem) {
      return {
        isValid: false,
        errorMessage: null,
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
    return calculateProductWeight(
      selectedShape,
      currentItem.density,
      dimensions,
      units,
      quantity
    );
  }, [selectedShape, currentItem, dimensions, units, quantity]);

  // Handle Calculate button click
  const handleCalculateClick = () => {
    if (!calcResult.isValid) {
      setValidationError(
        calcResult.errorMessage || "Please enter the required dimensions."
      );
    } else {
      setValidationError(null);
      if (window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Copy result text
  const handleCopy = () => {
    if (!calcResult.isValid || !currentItem) return;
    const text = `Nagraj Metal Industries - Weight Calculation
Product: ${currentItem.name} (${currentCategory.name})
Shape: ${shapeDef.name}
Dimensions: ${calcResult.dimensionsSummary}
Quantity: ${quantity} ${quantity > 1 ? "Pieces" : "Piece"}
${quantity > 1 ? `Weight Per Piece: ${calcResult.formattedPieceKg} kg\n` : ""}Calculated Total Weight: ${calcResult.formattedTotalKg} kg (${calcResult.formattedTotalMT} MT)
Inquire: https://www.nagrajmetals.com/contact`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="min-h-screen bg-gray-50/70 pt-28 sm:pt-32 pb-16">
      <title>Metal Weight Calculator | Nagraj Metal Industry</title>
      <meta
        name="description"
        content="Calculate approximate weights for pipes, tubes, sheets, plates, bars, rings and specialized products according to Nagraj Metal Industry product catalog."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Simple Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#B22222] border border-red-200/80 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider mb-2">
            <Scale size={13} />
            <span>Product Weight Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gray-900 tracking-tight">
            Weight Calculator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-body mt-1 max-w-lg mx-auto">
            Calculate the approximate weight of your metal product in a few simple steps.
          </p>
        </div>

        {/* Two-Column Layout on Desktop, Single Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── LEFT: CALCULATOR FORM (7 cols) ── */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/90 shadow-sm p-5 sm:p-7 space-y-5">
            {/* STEP 1: Product Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="cat-select"
                className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display"
              >
                1. Product Category
              </label>
              <select
                id="cat-select"
                value={selectedCategoryId}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#B22222] focus:ring-2 focus:ring-[#B22222]/20 transition-all cursor-pointer shadow-2xs"
              >
                {PRODUCT_CATEGORIES_DATA.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* STEP 2: Product / Sub-item (Searchable) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display">
                2. Product / Sub-item
              </label>
              <ProductSearchSelect
                items={currentCategory.items}
                selectedItem={currentItem}
                onSelectItem={handleItemSelect}
                categoryName={currentCategory.name}
              />
            </div>

            {/* STEP 3: Shape Selector (Visual 10-Shape Grid) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display">
                  3. Shape
                </label>
                <span className="text-[11px] text-gray-500 font-medium">
                  10 Standard Geometries
                </span>
              </div>
              <ShapeSelector
                selectedShape={selectedShape}
                onSelectShape={handleShapeSelect}
              />
            </div>

            {/* STEP 4: Dimensions for selected shape */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display">
                4. Dimensions ({shapeDef.name})
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shapeDef.fields.map((f) => {
                  const currentVal = dimensions[f.key];
                  const currentUnit = units[f.key] || f.defaultUnit || "mm";

                  return (
                    <div key={f.key} className="space-y-1">
                      <label
                        htmlFor={`field-${f.key}`}
                        className="text-xs font-semibold text-gray-700 font-display flex items-center justify-between"
                      >
                        <span>{f.label}</span>
                        <span className="text-gray-400 text-[11px]">Required</span>
                      </label>

                      <div className="flex rounded-xl border border-gray-300 overflow-hidden shadow-2xs focus-within:border-[#B22222] focus-within:ring-2 focus-within:ring-[#B22222]/20 transition-all bg-white">
                        <input
                          id={`field-${f.key}`}
                          type="number"
                          inputMode="decimal"
                          step="any"
                          min="0"
                          placeholder={f.placeholder}
                          value={currentVal !== undefined ? currentVal : ""}
                          onChange={(e) =>
                            handleDimensionChange(f.key, e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 text-sm font-bold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none"
                        />

                        {/* Unit Selector */}
                        <select
                          value={currentUnit}
                          onChange={(e) =>
                            handleUnitChange(f.key, e.target.value)
                          }
                          aria-label={`${f.label} unit`}
                          className="bg-gray-100 hover:bg-gray-200/80 border-l border-gray-200 text-gray-700 text-xs font-bold px-2.5 focus:outline-none cursor-pointer"
                        >
                          {COMMON_UNITS.map((u) => (
                            <option key={u.value} value={u.value}>
                              {u.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: Quantity */}
            <div className="space-y-1.5 pt-1">
              <label
                htmlFor="input-quantity"
                className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display"
              >
                5. Quantity (Pieces)
              </label>
              <div className="flex items-center w-40 rounded-xl border border-gray-300 overflow-hidden shadow-2xs bg-white focus-within:border-[#B22222]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <input
                  id="input-quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => {
                    const q = parseInt(e.target.value, 10);
                    setQuantity(isNaN(q) || q < 1 ? 1 : q);
                  }}
                  className="w-full text-center py-2 text-sm font-bold text-gray-900 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Validation Alert */}
            {validationError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700">
                <AlertCircle size={15} className="shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* STEP 6: Calculate Weight Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCalculateClick}
                className="w-full bg-[#B22222] hover:bg-[#8B1A1A] text-white py-3.5 px-6 rounded-xl font-display font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Calculate Weight
              </button>
            </div>
          </div>

          {/* ── RIGHT: RESULT CARD (5 cols) ── */}
          <div ref={resultRef} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
              {/* Result Header */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300 font-display block mb-1">
                  Calculated Weight
                </span>

                {calcResult.isValid ? (
                  <div>
                    {/* Main Total Highlighted Weight */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                        {calcResult.formattedTotalKg}
                      </span>
                      <span className="text-2xl font-display font-bold text-[#E63946]">
                        kg
                      </span>
                    </div>

                    {/* Metric Tonnes line */}
                    <div className="mt-2 text-sm text-gray-300 font-semibold flex items-center gap-1.5">
                      <span className="text-gray-400">Total in Metric Tonnes:</span>
                      <span className="text-[#C9A84C] font-bold font-mono">
                        {calcResult.formattedTotalMT} MT
                      </span>
                    </div>

                    {/* Quantity > 1 details */}
                    {quantity > 1 && (
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                        <span>Weight Per Piece:</span>
                        <span className="font-bold text-white font-mono">
                          {calcResult.formattedPieceKg} kg
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-400">
                    <p className="text-sm font-semibold text-gray-200">
                      Enter dimensions to see weight
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill in the required fields and click Calculate Weight.
                    </p>
                  </div>
                )}
              </div>

              {/* Specifications Summary */}
              <div className="p-6 space-y-3 bg-white text-xs sm:text-sm">
                <div className="flex items-start justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Product:</span>
                  <span className="font-bold text-gray-900 text-right max-w-[65%]">
                    {currentItem ? currentItem.name : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Shape:</span>
                  <span className="font-bold text-gray-900">{shapeDef.name}</span>
                </div>

                <div className="flex items-start justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Dimensions:</span>
                  <span className="font-bold text-gray-900 font-mono text-right max-w-[65%]">
                    {calcResult.isValid ? calcResult.dimensionsSummary : "Pending input"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium">Quantity:</span>
                  <span className="font-bold text-gray-900">
                    {quantity} {quantity > 1 ? "Pieces" : "Piece"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-gray-50/80 border-t border-gray-200/80 space-y-2.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!calcResult.isValid}
                  className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copied
                      ? "bg-green-600 text-white shadow-xs"
                      : calcResult.isValid
                      ? "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-2xs"
                      : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-white" />
                      <span>Result Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Result</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/contact?inquiry=${encodeURIComponent(
                    `Inquiry for ${currentItem?.name} (${shapeDef.name}), Dimensions: ${calcResult.dimensionsSummary}, Quantity: ${quantity} pcs, Calculated Weight: ${calcResult.formattedTotalKg} kg.`
                  )}`}
                  className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                    calcResult.isValid
                      ? "bg-[#B22222] hover:bg-[#8B1A1A] text-white"
                      : "bg-gray-200 text-gray-400 pointer-events-none"
                  }`}
                >
                  <Send size={15} />
                  <span>Request Quote for this Product</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default WeightCalculatorPage;
