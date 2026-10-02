
import {
  DIMENSION_UNITS,
  type DimensionUnit,
  type ShapeConfig,
} from "../../data/metalWeightData";
import { Minus, Plus, AlertCircle } from "lucide-react";

interface DimensionInputsProps {
  shapeConfig: ShapeConfig;
  dimensions: Record<string, number | undefined>;
  units: Record<string, DimensionUnit>;
  quantity: number;
  errors: Record<string, string>;
  onDimensionChange: (key: string, value: number | undefined) => void;
  onUnitChange: (key: string, unit: DimensionUnit) => void;
  onGlobalUnitChange: (unit: DimensionUnit) => void;
  onQuantityChange: (qty: number) => void;
}

export const DimensionInputs: React.FC<DimensionInputsProps> = ({
  shapeConfig,
  dimensions,
  units,
  quantity,
  errors,
  onDimensionChange,
  onUnitChange,
  onGlobalUnitChange,
  onQuantityChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Dimension Header & Global Unit Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-gray-100">
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider font-display">
            Dimensions for {shapeConfig.name} <span className="text-[#B22222]">*</span>
          </label>
          <span className="text-[11px] text-gray-700 font-medium">
            Formula: <code className="text-[#B22222] font-mono text-[11px]">{shapeConfig.engineeringFormula}</code>
          </span>
        </div>

        {/* Global Unit Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-gray-100/80 p-1 rounded-lg">
          <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider px-1 font-display">
            Unit:
          </span>
          {DIMENSION_UNITS.map((u) => {
            const isAllMatch = shapeConfig.fields.every(
              (f) => (units[f.id] || f.defaultUnit) === u.value
            );
            return (
              <button
                key={u.value}
                type="button"
                onClick={() => onGlobalUnitChange(u.value)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded transition-all cursor-pointer ${
                  isAllMatch
                    ? "bg-[#B22222] text-white shadow-2xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
                title={`Set all dimensions to ${u.label}`}
              >
                {u.symbol}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Dimension Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {shapeConfig.fields.map((field) => {
          const val = dimensions[field.id];
          const unit = units[field.id] || field.defaultUnit;
          const err = errors[field.id];

          return (
            <div key={field.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`dim-${field.id}`}
                  className="text-xs font-bold text-gray-700 font-display flex items-center gap-1"
                >
                  <span>{field.label}</span>
                  <span className="text-[#B22222]">*</span>
                </label>
                {field.tooltip && (
                  <span className="text-[10px] text-gray-600 italic">
                    {field.tooltip}
                  </span>
                )}
              </div>

              {/* Input + Unit Group */}
              <div className="flex rounded-xl shadow-2xs overflow-hidden border border-gray-300 focus-within:border-[#B22222] focus-within:ring-2 focus-within:ring-[#B22222]/20 transition-all bg-white">
                <input
                  id={`dim-${field.id}`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder={field.placeholder}
                  value={val !== undefined ? val : ""}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      onDimensionChange(field.id, undefined);
                    } else {
                      const num = parseFloat(raw);
                      onDimensionChange(field.id, isNaN(num) ? undefined : num);
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:outline-none ${
                    err ? "bg-red-50/40 text-red-900" : ""
                  }`}
                  aria-invalid={!!err}
                  aria-describedby={err ? `err-${field.id}` : undefined}
                />

                {/* Per-field Unit Selector */}
                <select
                  value={unit}
                  onChange={(e) =>
                    onUnitChange(field.id, e.target.value as DimensionUnit)
                  }
                  aria-label={`${field.name} Unit`}
                  className="bg-gray-100 hover:bg-gray-200/70 border-l border-gray-200 text-gray-700 text-xs font-bold px-2.5 py-2.5 focus:outline-none cursor-pointer transition-colors"
                >
                  {DIMENSION_UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.symbol}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error message */}
              {err && (
                <div
                  id={`err-${field.id}`}
                  className="flex items-center gap-1 text-[11px] font-semibold text-red-600 animate-fadeIn"
                >
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{err}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Quantity Field */}
        <div className="space-y-1">
          <label
            htmlFor="calc-quantity"
            className="text-xs font-bold text-gray-700 font-display flex items-center justify-between"
          >
            <span>Quantity (Pieces)</span>
            <span className="text-[10px] text-gray-700 font-medium">Default: 1 piece</span>
          </label>

          <div className="flex items-center rounded-xl shadow-2xs border border-gray-300 overflow-hidden bg-white focus-within:border-[#B22222] focus-within:ring-2 focus-within:ring-[#B22222]/20 transition-all">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={14} />
            </button>

            <input
              id="calc-quantity"
              type="number"
              inputMode="numeric"
              step="1"
              min="1"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onQuantityChange(isNaN(val) || val < 1 ? 1 : val);
              }}
              className="w-full text-center py-2.5 text-sm font-bold text-gray-900 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
              className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
