// src/components/WeightCalculator/ResultCard.tsx

import { useState } from "react";
import { Copy, Check, Send, Scale, FileCheck2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { type ShapeConfig, type MaterialGrade } from "../../data/metalWeightData";
import {
  type CalculationResult,
  formatWeight,
  formatNumber,
} from "../../utils/metalCalculatorEngine";

interface ResultCardProps {
  shapeConfig: ShapeConfig;
  selectedGrade: MaterialGrade;
  customDensity?: number;
  quantity: number;
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  shapeConfig,
  selectedGrade,
  customDensity,
  quantity,
  result,
}) => {
  const [copied, setCopied] = useState(false);

  const activeDensity = customDensity || selectedGrade.density;

  const handleCopy = () => {
    const textToCopy = `--- NAGRAJ METAL INDUSTRY ---
METAL WEIGHT CALCULATION
Material: ${selectedGrade.name} (${activeDensity} g/cm³)
Shape: ${shapeConfig.name}
Dimensions: ${result.dimensionSummary}
Quantity: ${quantity} ${quantity > 1 ? "Pieces" : "Piece"}
Weight in kg: ${formatWeight(result.totalWeightKg)} kg
Weight in Metric Tonnes: ${formatWeight(result.totalWeightMT, true)} MT
${quantity > 1 ? `Weight per piece: ${formatWeight(result.pieceWeightKg)} kg\n` : ""}Calculated via Nagraj Metal Industry Weight Calculator
Website: https://www.nagrajmetals.com/weight-calculator`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const enquiryMessage = encodeURIComponent(
    `Hello Nagraj Metal Industries, I am inquiring about: ${selectedGrade.name}, Shape: ${shapeConfig.name}, Dimensions: ${result.dimensionSummary}, Quantity: ${quantity} pcs, Calculated Weight: ${formatWeight(result.totalWeightKg)} kg (${formatWeight(result.totalWeightMT, true)} MT). Please provide a quotation.`
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300">
      {/* Top Banner Header */}
      <div className="bg-linear-to-r from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] text-white p-5 sm:p-6 border-b border-gray-800 relative overflow-hidden">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#B22222]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B22222] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 font-display">
              Calculated Weight
            </span>
          </div>

          <span className="text-[11px] font-mono bg-white/10 text-white/90 px-2 py-0.5 rounded border border-white/10">
            Density: {activeDensity} g/cm³
          </span>
        </div>

        {/* Primary Prominent Weight Display */}
        {result.isValid ? (
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white">
                {formatWeight(result.totalWeightKg)}
              </span>
              <span className="text-xl sm:text-2xl font-display font-bold text-[#E63946]">
                kg
              </span>
            </div>

            {/* Metric Tonnes Prominent Line */}
            <div className="mt-2 flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-200">
              <span className="text-gray-400">Weight in Metric Tonnes:</span>
              <span className="text-[#C9A84C] font-mono font-bold text-base sm:text-lg">
                {formatWeight(result.totalWeightMT, true)} MT
              </span>
            </div>

            {/* Extra details when quantity > 1 */}
            {quantity > 1 && (
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                <span>Single Piece Weight:</span>
                <span className="font-mono font-semibold text-white">
                  {formatWeight(result.pieceWeightKg)} kg ({formatWeight(result.pieceWeightMT, true)} MT)
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 text-gray-300 flex items-center justify-center mx-auto mb-2.5">
              <Scale size={24} />
            </div>
            <p className="text-sm font-semibold text-gray-200">Ready to Calculate</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              Select material, shape, and enter dimensions to view accurate weight.
            </p>
          </div>
        )}
      </div>

      {/* Specifications Breakdown */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 bg-white">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700 font-display">
            Calculation Specifications
          </span>
          {result.isValid && (
            <span className="text-[11px] text-green-700 bg-green-50 font-semibold px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
              <FileCheck2 size={12} />
              Verified Standard
            </span>
          )}
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          {/* Material */}
          <div className="flex items-start justify-between py-1 border-b border-gray-100/70">
            <span className="text-gray-700 font-medium">Material:</span>
            <span className="font-bold text-gray-900 text-right max-w-[65%]">
              {selectedGrade.name}
            </span>
          </div>

          {/* Shape */}
          <div className="flex items-center justify-between py-1 border-b border-gray-100/70">
            <span className="text-gray-700 font-medium">Shape:</span>
            <span className="font-bold text-gray-900">{shapeConfig.name}</span>
          </div>

          {/* Dimensions */}
          <div className="flex items-start justify-between py-1 border-b border-gray-100/70">
            <span className="text-gray-700 font-medium">Dimensions:</span>
            <span className="font-mono font-bold text-gray-900 text-right max-w-[65%]">
              {result.isValid ? result.dimensionSummary : "Pending input"}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between py-1 border-b border-gray-100/70">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <span className="font-bold text-gray-900">
              {quantity} {quantity > 1 ? "Pieces" : "Piece"}
            </span>
          </div>

          {/* Volume */}
          {result.isValid && (
            <div className="flex items-center justify-between py-1 border-b border-gray-100/70">
              <span className="text-gray-700 font-medium">Total Volume:</span>
              <span className="font-mono text-gray-800">
                {formatNumber(result.volumeCm3 * quantity, 2)} cm³
              </span>
            </div>
          )}

          {/* Secondary Imperial Weight */}
          {result.isValid && (
            <div className="flex items-center justify-between py-1 border-b border-gray-100/70">
              <span className="text-gray-700 font-medium">Weight in Pounds:</span>
              <span className="font-mono text-gray-800 font-semibold">
                {formatWeight(result.totalWeightLbs)} lbs
              </span>
            </div>
          )}
        </div>

        {/* Engineering Warnings (if any) */}
        {result.warnings && result.warnings.length > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
            {result.warnings.map((w, idx) => (
              <p key={idx}>{w}</p>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-5 sm:p-6 bg-gray-50/70 border-t border-gray-200/80 space-y-2.5">
        {/* Copy Result Button */}
        <button
          type="button"
          onClick={handleCopy}
          disabled={!result.isValid}
          className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            copied
              ? "bg-green-600 text-white shadow-md"
              : result.isValid
              ? "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 shadow-2xs hover:border-gray-400"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          {copied ? (
            <>
              <Check size={16} className="text-white" />
              <span>Result Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy Result</span>
            </>
          )}
        </button>

        {/* Request Quotation */}
        <Link
          to={`/contact?inquiry=${enquiryMessage}`}
          className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
            result.isValid
              ? "bg-[#B22222] hover:bg-[#8B1A1A] text-white hover:shadow-lg hover:-translate-y-0.5"
              : "bg-gray-300 text-gray-500 pointer-events-none"
          }`}
        >
          <Send size={15} />
          <span>Request Quote for this Weight</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};
