// src/pages/ProductPage.tsx

import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Gauge,
  CheckCircle2,
  Tag,
  Layers,
  FileText,
  Wrench,
  Package,
  Phone,
  Grid3X3,
  Maximize2,
  Ruler,
  Scale,
  Sparkles,
  Shield,
  Flame,
  Droplet,
  Zap,
  Globe,
  Award,
  Clock,
  Truck,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  List,
  Hash,
  Warehouse,
  Building2,
  Factory,
  FlaskConical,
  Thermometer,
  Weight,
  Ruler as RulerIcon,
  Thermometer as ThermometerIcon,
  Timer,
  Fan,
  AlertCircle,
  Building,
  RefreshCw,
  Search,
} from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import {
  getCategoryDisplayLabel,
  getTypeDisplayLabel,
} from "../data/categoryConfig";
import { getProductImage } from "../data/productImages";
import { useState, useMemo } from "react";

interface StockSizeCategory {
  category: string;
  items: string[];
}

interface HeatTreatment {
  condition?: string;
  temperature?: string;
  holding_time?: string;
  cooling?: string;
  notes?: string;
}

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function looksLikeCityDump(str: string): boolean {
  if (typeof str !== "string" || !str) return false;
  const commaRatio = (str.match(/,/g) ?? []).length / str.length;
  return commaRatio > 0.05 && str.length > 200;
}

function cleanText(raw: string): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/^Description\s*/i, "").trim();
}

function extractKeySpecs(
  specs: string[],
): { label: string; value: string; icon: React.ElementType }[] {
  const specMap: Record<string, { label: string; icon: React.ElementType }> = {
    Thickness: { label: "Thickness", icon: Ruler },
    Width: { label: "Width", icon: Maximize2 },
    Length: { label: "Length", icon: Scale },
    Diameter: { label: "Diameter", icon: Grid3X3 },
    Hardness: { label: "Hardness", icon: Gauge },
    Grade: { label: "Grade", icon: Tag },
    Standard: { label: "Standard", icon: Layers },
    Condition: { label: "Condition", icon: Sparkles },
    Temper: { label: "Temper", icon: Flame },
    Material: { label: "Material", icon: Package },
    "Surface Finish": { label: "Finish", icon: Sparkles },
    "UNS Number": { label: "UNS", icon: Globe },
    "AWS Specification": { label: "AWS", icon: Award },
    "ASME Specification": { label: "ASME", icon: Award },
    Classification: { label: "Classification", icon: Tag },
    "Welding Process": { label: "Process", icon: Wrench },
  };

  const result: { label: string; value: string; icon: React.ElementType }[] =
    [];

  if (!specs || !Array.isArray(specs)) return result;

  for (const spec of specs) {
    if (typeof spec !== "string") continue;
    for (const [key, config] of Object.entries(specMap)) {
      if (spec.toLowerCase().includes(key.toLowerCase())) {
        const parts = spec.split(":");
        if (parts.length > 1) {
          result.push({
            label: config.label,
            value: parts.slice(1).join(":").trim(),
            icon: config.icon,
          });
        } else {
          const match = spec.match(new RegExp(`${key}\\s*[:–-]?\\s*(.+)`, "i"));
          if (match) {
            result.push({
              label: config.label,
              value: match[1].trim(),
              icon: config.icon,
            });
          }
        }
        break;
      }
    }
  }

  return result.slice(0, 4);
}

function getFeatureIcon(feature: string): React.ElementType {
  if (typeof feature !== "string") return CheckCircle2;
  const lower = feature.toLowerCase();
  if (
    lower.includes("strength") ||
    lower.includes("strong") ||
    lower.includes("toughness")
  )
    return Shield;
  if (
    lower.includes("corrosion") ||
    lower.includes("rust") ||
    lower.includes("oxid")
  )
    return Droplet;
  if (
    lower.includes("heat") ||
    lower.includes("temperature") ||
    lower.includes("fire") ||
    lower.includes("thermal")
  )
    return Flame;
  if (
    lower.includes("weld") ||
    lower.includes("fabric") ||
    lower.includes("form")
  )
    return Wrench;
  if (
    lower.includes("machin") ||
    lower.includes("precision") ||
    lower.includes("surface")
  )
    return Zap;
  if (
    lower.includes("resistance") ||
    lower.includes("durable") ||
    lower.includes("long")
  )
    return Shield;
  return CheckCircle2;
}

function getAvailabilityText(specs: string[]): string {
  if (!specs || !Array.isArray(specs)) return "Available on Request";
  const specStr = specs.join(" ");
  if (specStr.toLowerCase().includes("stock")) return "In Stock";
  if (
    specStr.toLowerCase().includes("diameter") ||
    specStr.toLowerCase().includes("thickness")
  )
    return "Available in Multiple Sizes";
  if (specStr.toLowerCase().includes("custom")) return "Custom Sizes Available";
  return "Available on Request";
}

function formatChemicalValue(entry: any): string {
  if (!entry || typeof entry !== "object") return "—";

  if (entry.value && entry.value !== "") {
    return entry.value;
  }

  const hasMin =
    entry.min_value !== undefined &&
    entry.min_value !== null &&
    entry.min_value !== "" &&
    entry.min_value !== 0 &&
    entry.min_value !== "0";
  const hasMax =
    entry.max_value !== undefined &&
    entry.max_value !== null &&
    entry.max_value !== "" &&
    entry.max_value !== 0 &&
    entry.max_value !== "0";
  const unit = entry.unit || "";

  if (hasMin && hasMax) {
    return `${entry.min_value} - ${entry.max_value}${unit ? ` ${unit}` : ""}`;
  }
  if (hasMin) {
    return `${entry.min_value} min${unit ? ` ${unit}` : ""}`;
  }
  if (hasMax) {
    return `${entry.max_value} max${unit ? ` ${unit}` : ""}`;
  }

  return "—";
}

function formatMechanicalValue(entry: any): string {
  if (!entry || typeof entry !== "object") return "—";

  if (
    entry.value &&
    entry.value !== "—" &&
    entry.value !== "" &&
    entry.value !== 0 &&
    entry.value !== "0"
  ) {
    return entry.value;
  }

  const hasMin =
    entry.min_value !== undefined &&
    entry.min_value !== null &&
    entry.min_value !== "" &&
    entry.min_value !== 0 &&
    entry.min_value !== "0";
  const hasMax =
    entry.max_value !== undefined &&
    entry.max_value !== null &&
    entry.max_value !== "" &&
    entry.max_value !== 0 &&
    entry.max_value !== "0";
  const unit = entry.unit || "";

  if (hasMin && hasMax) {
    return `${entry.min_value} - ${entry.max_value}${unit ? ` ${unit}` : ""}`;
  }
  if (hasMin) {
    return `${entry.min_value} min${unit ? ` ${unit}` : ""}`;
  }
  if (hasMax) {
    return `${entry.max_value} max${unit ? ` ${unit}` : ""}`;
  }

  return "—";
}

function hasChemicalData(entry: any): boolean {
  if (!entry || typeof entry !== "object") return false;

  const hasElement = entry.element && entry.element.trim() !== "";
  const hasValue =
    entry.value && entry.value.trim() !== "" && entry.value !== "—";
  const hasMin =
    entry.min_value !== undefined &&
    entry.min_value !== null &&
    entry.min_value !== "" &&
    entry.min_value !== 0 &&
    entry.min_value !== "0";
  const hasMax =
    entry.max_value !== undefined &&
    entry.max_value !== null &&
    entry.max_value !== "" &&
    entry.max_value !== 0 &&
    entry.max_value !== "0";

  return hasElement && (hasValue || hasMin || hasMax);
}

function hasMechanicalData(entry: any): boolean {
  if (!entry || typeof entry !== "object") return false;

  const hasName = entry.property_name && entry.property_name.trim() !== "";
  const hasValue =
    entry.value &&
    entry.value !== "—" &&
    entry.value !== "" &&
    entry.value !== 0 &&
    entry.value !== "0";
  const hasMin =
    entry.min_value !== undefined &&
    entry.min_value !== null &&
    entry.min_value !== "" &&
    entry.min_value !== 0 &&
    entry.min_value !== "0";
  const hasMax =
    entry.max_value !== undefined &&
    entry.max_value !== null &&
    entry.max_value !== "" &&
    entry.max_value !== 0 &&
    entry.max_value !== "0";
  const hasPropertyValue =
    entry.property_value &&
    entry.property_value !== "—" &&
    entry.property_value !== "";

  return hasName && (hasValue || hasMin || hasMax || hasPropertyValue);
}

function hasHeatTreatmentData(entry: any): boolean {
  if (!entry || typeof entry !== "object") return false;
  return !!(
    entry.condition ||
    entry.temperature ||
    entry.holding_time ||
    entry.cooling ||
    entry.notes
  );
}

/* ─── Current Stock Components ────────────────────────────────────────────── */

function CurrentStockDisplay({ stockData }: { stockData: any }) {
  if (!stockData) return null;

  let stockItems = [];

  if (typeof stockData === "string") {
    try {
      const parsed = JSON.parse(stockData);
      stockItems = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      stockItems = stockData.split(/[\n,]+/).filter((s) => s.trim());
    }
  } else if (Array.isArray(stockData)) {
    stockItems = stockData;
  } else if (typeof stockData === "object") {
    stockItems = [stockData];
  }

  if (!stockItems.length) return null;

  const isStructured = stockItems.some(
    (item) =>
      typeof item === "object" &&
      (item.size ||
        item.dimension ||
        item.quantity ||
        item.stock ||
        item.grade),
  );

  if (isStructured) {
    return <StructuredStockTable items={stockItems} />;
  } else {
    return (
      <SimpleStockList
        items={stockItems.map((item) =>
          typeof item === "string" ? item : JSON.stringify(item),
        )}
      />
    );
  }
}

function StructuredStockTable({ items }: { items: any[] }) {
  const [showAll, setShowAll] = useState(false);

  const allKeys = new Set<string>();
  items.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((key) => allKeys.add(key));
    }
  });

  const headers = Array.from(allKeys).filter(
    (key) => key !== "id" && key !== "_id" && key !== "__v",
  );

  const displayItems = showAll ? items : items.slice(0, 10);
  const hasMore = items.length > 10;

  if (headers.length === 0) {
    return (
      <SimpleStockList items={items.map((item) => JSON.stringify(item))} />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/90 border-b border-brand-red/20">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest"
                >
                  {header.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, i) => (
              <tr
                key={i}
                className={`transition-all ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
              >
                {headers.map((header, idx) => (
                  <td
                    key={idx}
                    className="px-6 py-4 text-gray-700 text-base font-medium"
                  >
                    {item[header] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-4 text-sm font-display font-bold text-brand-red hover:text-white hover:bg-brand-red/10 bg-gray-50/50 hover:bg-brand-red transition-all flex items-center justify-center gap-2 border-t border-gray-200/80"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show All {items.length} Stock Items
            </>
          )}
        </button>
      )}
    </div>
  );
}

function SimpleStockList({ items }: { items: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 10);
  const hasMore = items.length > 10;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/90 border-b border-brand-red/20">
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Available Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, i) => (
              <tr
                key={i}
                className={`transition-all ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
              >
                <td className="px-6 py-4 text-gray-700 text-base font-mono font-medium">
                  {item}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-4 text-sm font-display font-bold text-brand-red hover:text-white hover:bg-brand-red/10 bg-gray-50/50 hover:bg-brand-red transition-all flex items-center justify-center gap-2 border-t border-gray-200/80"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show All {items.length} Items
            </>
          )}
        </button>
      )}
    </div>
  );
}

function StockAvailabilityBadge({ stockData }: { stockData: any }) {
  if (!stockData) return null;

  let hasStock = false;
  let stockCount = 0;

  if (Array.isArray(stockData)) {
    stockCount = stockData.length;
    hasStock = stockCount > 0;
  } else if (typeof stockData === "string") {
    try {
      const parsed = JSON.parse(stockData);
      if (Array.isArray(parsed)) {
        stockCount = parsed.length;
        hasStock = stockCount > 0;
      }
    } catch {
      hasStock = stockData.trim().length > 0;
      stockCount = 1;
    }
  } else if (typeof stockData === "object") {
    hasStock = Object.keys(stockData).length > 0;
    stockCount = 1;
  }

  if (!hasStock) return null;

  return (
    <span className="inline-flex items-center gap-2 text-sm font-display font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      {stockCount > 1 ? `${stockCount} items in stock` : "In Stock"}
    </span>
  );
}

/* ─── Table Components ────────────────────────────────────────────────────── */

function ChemicalCompositionTable({ data }: { data: any[] }) {
  const [showAll, setShowAll] = useState(false);

  const validData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(hasChemicalData);
  }, [data]);

  if (!validData.length) {
    return null;
  }

  const displayData = showAll ? validData : validData.slice(0, 10);
  const hasMore = validData.length > 10;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/90 border-b border-brand-red/20">
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Element
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Composition (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, i) => {
              const isBalance = ["fe", "al", "co", "ti", "cu", "ni"].includes(
                entry.element?.toLowerCase() || "",
              );
              const value = formatChemicalValue(entry);

              return (
                <tr
                  key={i}
                  className={`transition-all ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
                >
                  <td className="px-6 py-4 font-semibold text-brand-charcoal text-base">
                    {entry.element || "—"}
                    {isBalance && (
                      <span className="ml-3 text-xs font-body text-gray-400 uppercase">
                        (Balance)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-base font-mono font-semibold">
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-4 text-sm font-display font-bold text-brand-red hover:text-white hover:bg-brand-red/10 bg-gray-50/50 hover:bg-brand-red transition-all flex items-center justify-center gap-2 border-t border-gray-200/80"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show All {validData.length} Elements
            </>
          )}
        </button>
      )}
    </div>
  );
}

function MechanicalPropertiesTable({ data }: { data: any[] }) {
  const [showAll, setShowAll] = useState(false);

  const validData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(hasMechanicalData);
  }, [data]);

  if (!validData.length) {
    return null;
  }

  const displayData = showAll ? validData : validData.slice(0, 8);
  const hasMore = validData.length > 8;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/90 border-b border-brand-red/20">
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Property
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Value
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Condition
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, i) => {
              const hasCondition =
                entry.condition &&
                entry.condition !== "—" &&
                entry.condition !== "";

              let displayValue = formatMechanicalValue(entry);

              if (displayValue === "—" && entry.property_value) {
                displayValue = entry.property_value;
              }

              return (
                <tr
                  key={i}
                  className={`transition-all ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                  } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
                >
                  <td className="px-6 py-4 font-semibold text-brand-charcoal text-base">
                    {entry.property_name || entry.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-base font-mono font-semibold">
                    {displayValue}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {hasCondition ? (
                      <span className="inline-flex items-center gap-2 bg-brand-red/10 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-brand-red" />
                        {entry.condition}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-4 text-sm font-display font-bold text-brand-red hover:text-white hover:bg-brand-red/10 bg-gray-50/50 hover:bg-brand-red transition-all flex items-center justify-center gap-2 border-t border-gray-200/80"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show All {validData.length} Properties
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* ─── Heat Treatment Table ────────────────────────────────────────────────── */

function HeatTreatmentTable({ data }: { data: HeatTreatment[] }) {
  const [showAll, setShowAll] = useState(false);

  const validData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(hasHeatTreatmentData);
  }, [data]);

  if (!validData.length) {
    return null;
  }

  const displayData = showAll ? validData : validData.slice(0, 5);
  const hasMore = validData.length > 5;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-gradient-to-r from-brand-red via-brand-red/95 to-brand-red/90 border-b border-brand-red/20">
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Condition
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Temperature
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Holding Time
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Cooling
              </th>
              <th className="px-6 py-5 text-left font-display font-extrabold text-xs text-white uppercase tracking-widest">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, i) => (
              <tr
                key={i}
                className={`transition-all ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
              >
                <td className="px-6 py-4 font-semibold text-brand-charcoal text-base">
                  {entry.condition || "—"}
                </td>
                <td className="px-6 py-4 text-gray-700 text-base font-mono">
                  {entry.temperature || "—"}
                </td>
                <td className="px-6 py-4 text-gray-700 text-base font-mono">
                  {entry.holding_time || "—"}
                </td>
                <td className="px-6 py-4 text-gray-700 text-base">
                  {entry.cooling || "—"}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {entry.notes || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-4 text-sm font-display font-bold text-brand-red hover:text-white hover:bg-brand-red/10 bg-gray-50/50 hover:bg-brand-red transition-all flex items-center justify-center gap-2 border-t border-gray-200/80"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Show All {validData.length} Heat Treatment Cycles
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* ─── Stock Sizes Table ────────────────────────────────────────────────────── */

function StockSizesTable({ data }: { data: StockSizeCategory[] }) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(data.map((_, idx) => `category-${idx}`)),
  );

  if (!data || data.length === 0) {
    return null;
  }

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow">
      <div className="overflow-x-auto">
        {data.map((category, idx) => {
          const categoryKey = `category-${idx}`;
          const isExpanded = expandedCategories.has(categoryKey);
          const displayItems = isExpanded
            ? category.items
            : category.items.slice(0, 5);
          const hasMore = category.items.length > 5;

          return (
            <div key={idx}>
              {idx > 0 && <div className="border-t border-gray-200" />}
              <div
                className="bg-gradient-to-r from-brand-red/15 via-brand-red/12 to-brand-red/10 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-brand-red/20 transition-all border-b border-brand-red/20"
                onClick={() => toggleCategory(categoryKey)}
              >
                <p className="font-display font-extrabold text-brand-charcoal text-base flex items-center gap-2">
                  <Hash size={18} className="text-brand-red" />
                  {category.category}
                </p>
                <span className="text-sm font-display font-bold text-gray-600">
                  {category.items.length} sizes
                  {isExpanded ? (
                    <ChevronUp size={16} className="inline ml-2" />
                  ) : (
                    <ChevronDown size={16} className="inline ml-2" />
                  )}
                </span>
              </div>
              <table className="w-full text-sm font-body">
                <tbody>
                  {displayItems.map((item: string, i: number) => (
                    <tr
                      key={i}
                      className={`transition-all ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                      } hover:bg-brand-red/8 border-b border-gray-100/60 hover:border-brand-red/30`}
                    >
                      <td className="px-6 py-3 text-gray-700 text-base font-mono font-medium">
                        {item}
                      </td>
                    </tr>
                  ))}
                  {hasMore && !isExpanded && (
                    <tr className="bg-gray-50/80 hover:bg-gray-100">
                      <td className="px-6 py-3 text-sm text-brand-red font-display font-bold">
                        +{category.items.length - 5} more sizes
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sub-components ───────────────────────────────────────────────────────── */

function SectionHeading({
  icon: Icon,
  label,
  badge,
  description,
}: {
  icon: React.ElementType;
  label: string;
  badge?: string;
  description?: string;
}) {
  return (
    <div className="mb-6 pb-4 border-b-2 border-brand-red/20">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-brand-red/15 shadow-sm">
          <Icon size={22} className="text-brand-red" strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-brand-charcoal text-2xl sm:text-3xl tracking-tight">
            {label}
          </h2>
          {description && (
            <p className="text-gray-500 text-sm mt-1 font-body">
              {description}
            </p>
          )}
        </div>
        {badge && (
          <span className="ml-auto text-xs font-display font-bold text-white bg-brand-red px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function ChipList({
  items,
  color = "red",
}: {
  items: string[];
  color?: "red" | "gold" | "gray";
}) {
  if (!items?.length) return null;
  const colorClasses = {
    red: "bg-brand-red/8 border-brand-red/20 text-brand-red",
    gold: "bg-brand-gold/10 border-brand-gold/30 text-brand-charcoal",
    gray: "bg-gray-100 border-gray-200 text-gray-600",
  };
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`text-sm font-body px-4 py-2 rounded-full border ${colorClasses[color]} hover:scale-[1.02] transition-transform`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (!items || !Array.isArray(items)) return null;

  const filtered = items.filter(
    (s) =>
      s &&
      typeof s === "string" &&
      s.trim().length > 2 &&
      !looksLikeCityDump(s),
  );

  if (!filtered.length) return null;

  return (
    <ul className="space-y-2">
      {filtered.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 group hover:bg-gray-50/80 p-2 rounded-lg transition-colors"
        >
          <div className="w-2 h-2 rounded-full bg-brand-red mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
          <span className="font-body text-gray-600 text-base leading-relaxed group-hover:text-brand-charcoal transition-colors">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FeatureCard({ feature, index }: { feature: string; index: number }) {
  const Icon = getFeatureIcon(feature);
  return (
    <div
      className="group flex items-start gap-3 p-4 rounded-lg bg-gray-50/80 hover:bg-brand-red/5 border border-gray-100 hover:border-brand-red/30 transition-all duration-200 hover:shadow-sm"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
        <Icon size={18} className="text-brand-red" strokeWidth={1.75} />
      </div>
      <span className="font-body text-gray-600 text-sm leading-relaxed group-hover:text-brand-charcoal transition-colors">
        {feature}
      </span>
    </div>
  );
}

/* ─── Loading skeleton ─────────────────────────────────────────────────────── */

function Skeleton() {
  return (
    <div className="animate-pulse pt-20">
      <div className="h-80 bg-gray-200 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-12 space-y-8">
        <div className="h-10 bg-gray-200 rounded w-2/3" />
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-6 bg-gray-100 rounded w-full" />
            <div className="h-6 bg-gray-100 rounded w-5/6" />
            <div className="h-6 bg-gray-100 rounded w-4/6" />
          </div>
          <div className="space-y-4">
            <div className="h-48 bg-gray-200 rounded-2xl" />
            <div className="h-24 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug);

  // ✅ ALL HOOKS MUST BE AT THE TOP - BEFORE ANY EARLY RETURNS
  const [showAll, setShowAll] = useState(false);

  // ✅ Single useMemo for all product checks
  const productChecks = useMemo(() => {
    if (!product) {
      return {
        categoryLabel: "",
        typeLabel: "",
        isSpecialized: false,
        descriptionText: "",
        productData: null,
        heroImage: "",
        heroAlt: "",
        hasChem: false,
        hasMech: false,
        hasStockSizes: false,
        hasCurrentStock: false,
        hasFeatures: false,
        hasApplications: false,
        hasTests: false,
        hasMaterialGrades: false,
        hasEquivalentGrades: false,
        hasSpecifications: false,
        hasHeatTreatment: false,
        hasAvailability: false,
        hasCommonTradeNames: false,
        hasPeopleAlsoSearch: false,
        packingText: null,
        keySpecs: [],
        availability: "Available on Request",
        hasMetaDescription: false,
      };
    }

    const productData = product as any;

    return {
      categoryLabel: getCategoryDisplayLabel(product.category),
      typeLabel: getTypeDisplayLabel(product.product_type),
      isSpecialized: product.category !== "Products",
      descriptionText: product.description_text
        ? cleanText(product.description_text)
        : "",
      productData: productData,
      heroImage:
        product.images?.[0]?.url ||
        getProductImage(product.product_type, product.category, product.title),
      heroAlt:
        product.images?.[0]?.alt ||
        `${getTypeDisplayLabel(product.product_type)} — ${product.title}`,
      hasChem: product.chemical_composition?.some(hasChemicalData) || false,
      hasMech: product.mechanical_properties?.some(hasMechanicalData) || false,
      hasStockSizes:
        Array.isArray(product.stock_sizes) && product.stock_sizes.length > 0,
      hasCurrentStock: (() => {
        if (!product.current_stock) return false;
        if (Array.isArray(product.current_stock))
          return product.current_stock.length > 0;
        if (typeof product.current_stock === "string")
          return product.current_stock.trim().length > 0;
        if (typeof product.current_stock === "object")
          return Object.keys(product.current_stock).length > 0;
        return false;
      })(),
      hasFeatures:
        product.features?.some(
          (f) =>
            f &&
            typeof f === "string" &&
            f.trim().length > 3 &&
            !looksLikeCityDump(f),
        ) || false,
      hasApplications:
        product.applications?.some(
          (a) =>
            a &&
            typeof a === "string" &&
            a.trim().length > 3 &&
            !looksLikeCityDump(a),
        ) || false,
      hasTests:
        product.tests?.some(
          (t) =>
            t &&
            typeof t === "string" &&
            t.trim().length > 3 &&
            !looksLikeCityDump(t),
        ) || false,
      hasMaterialGrades:
        product.material_grades?.some(
          (g) => g && typeof g === "string" && g.trim().length > 0,
        ) || false,
      hasEquivalentGrades:
        product.equivalent_grades?.some(
          (g) => g && typeof g === "string" && g.trim().length > 0,
        ) || false,
      hasSpecifications:
        product.specifications?.some(
          (s) =>
            s &&
            typeof s === "string" &&
            s.trim().length > 0 &&
            !looksLikeCityDump(s),
        ) || false,
      hasHeatTreatment:
        productData?.heat_treatment?.some(hasHeatTreatmentData) || false,
      hasAvailability:
        productData?.availability?.some(
          (a: string) => a && typeof a === "string" && a.trim().length > 0,
        ) || false,
      hasCommonTradeNames:
        productData?.common_trade_names?.some(
          (n: string) => n && typeof n === "string" && n.trim().length > 0,
        ) || false,
      hasPeopleAlsoSearch:
        productData?.people_also_search?.some(
          (p: string) => p && typeof p === "string" && p.trim().length > 0,
        ) || false,
      packingText:
        product.packing &&
        typeof product.packing === "string" &&
        !looksLikeCityDump(product.packing)
          ? product.packing
          : null,
      keySpecs: extractKeySpecs(product.specifications || []),
      availability: getAvailabilityText(product.specifications || []),
      hasMetaDescription:
        product.meta_description && product.meta_description.length > 0,
    };
  }, [product]);

  // Destructure all values from the single useMemo
  const {
    categoryLabel,
    typeLabel,
    isSpecialized,
    descriptionText,
    productData,
    heroImage,
    heroAlt,
    hasChem,
    hasMech,
    hasStockSizes,
    hasCurrentStock,
    hasFeatures,
    hasApplications,
    hasTests,
    hasMaterialGrades,
    hasEquivalentGrades,
    hasSpecifications,
    hasHeatTreatment,
    hasAvailability,
    hasCommonTradeNames,
    hasPeopleAlsoSearch,
    packingText,
    keySpecs,
    availability,
    hasMetaDescription,
  } = productChecks;

  // ✅ NOW it's safe to have early returns - after all hooks are called
  if (loading) return <Skeleton />;
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-400" strokeWidth={1} />
        <h1 className="font-display font-bold text-xl text-brand-charcoal">
          Failed to load product
        </h1>
        <p className="font-body text-gray-400 text-sm">{error}</p>
        <Link
          to="/products"
          className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-400" strokeWidth={1} />
        <h1 className="font-display font-bold text-2xl text-brand-charcoal">
          Product Not Found
        </h1>
        <p className="font-body text-gray-400 text-sm max-w-xs text-center">
          We couldn't find a product matching <strong>{slug}</strong>. It may
          have been moved.
        </p>
        <Link
          to="/products"
          className="border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white font-display font-bold px-6 py-2.5 rounded-sm transition-all duration-200 text-sm"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  // ── Rest of your component JSX ──
  return (
    <>
      <title>
        {product.meta_title || `${product.title} | Nagraj Metal Industries`}
      </title>
      <meta
        name="description"
        content={
          product.meta_description ||
          `Buy ${product.title} from Nagraj Metal Industries. Verified quality, competitive pricing, pan-India dispatch.`
        }
      />

      <div className="bg-white">
        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section id="product-hero" className="relative">
          <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[500px] bg-gray-100 overflow-hidden">
            <img
              src={heroImage}
              alt={heroAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Badges - Fixed for mobile */}
            <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap gap-1.5 sm:gap-2">
              <span
                className={`text-[10px] sm:text-sm font-display font-bold px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full ${
                  isSpecialized
                    ? "bg-brand-red text-white"
                    : "bg-white/90 text-brand-charcoal"
                } shadow-lg`}
              >
                {categoryLabel}
              </span>
              <span className="text-[10px] sm:text-sm font-display font-bold px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/90 text-brand-charcoal shadow-lg">
                {typeLabel}
              </span>
              {hasCurrentStock && (
                <StockAvailabilityBadge stockData={product.current_stock} />
              )}
              {!hasCurrentStock && (
                <span className="text-[10px] sm:text-sm font-display font-bold px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-green-500/90 text-white shadow-lg">
                  {availability}
                </span>
              )}
            </div>

            {/* Title - Fixed for mobile */}
            <div className="absolute bottom-4 left-3 right-3 sm:bottom-8 sm:left-8 sm:right-8 lg:left-16 xl:left-24">
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight max-w-4xl drop-shadow-lg [word-wrap:break-word] hyphens-auto">
                {product.title}
              </h1>
              {hasMaterialGrades && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mt-2 sm:mt-4">
                  {product.material_grades.slice(0, 4).map((grade, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-sm font-body px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                    >
                      {grade}
                    </span>
                  ))}
                  {product.material_grades.length > 4 && (
                    <span className="text-[10px] sm:text-sm font-body px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                      +{product.material_grades.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">
          {/* Key Specs - Stack on mobile */}
          {keySpecs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {keySpecs.map((spec, idx) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50/80 rounded-xl border border-gray-100/80 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                      <Icon
                        size={18}
                        className="text-brand-red sm:size-[22px]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs font-body text-gray-400 uppercase tracking-wider">
                        {spec.label}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-brand-charcoal truncate group-hover:text-brand-red transition-colors">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14">
            {/* ── Left: Main Content ── */}
            <div className="lg:col-span-2 space-y-10 sm:space-y-12">
              {/* Overview Section */}
              <section id="product-overview">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-brand-red/10">
                    <FileText
                      size={18}
                      className="text-brand-red sm:size-[20px]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h2 className="font-display font-bold text-brand-charcoal text-lg sm:text-xl md:text-2xl">
                    Overview
                  </h2>
                </div>

                {hasMetaDescription && (
                  <div className="bg-gradient-to-r from-brand-red/5 to-transparent border-l-4 border-brand-red rounded-r-xl p-4 sm:p-5 mb-4">
                    <p className="font-body text-gray-600 text-sm sm:text-base leading-relaxed">
                      {product.meta_description}
                    </p>
                  </div>
                )}

                {descriptionText && descriptionText.length > 20 && (
                  <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed">
                    {descriptionText
                      .split(/\n\n+/)
                      .filter(
                        (p) => p.trim().length > 5 && !looksLikeCityDump(p),
                      )
                      .map((para, i) => (
                        <p key={i} className="text-sm sm:text-base">
                          {para.trim()}
                        </p>
                      ))}
                  </div>
                )}
              </section>

              {/* Key Features Section - Only show if hasFeatures is true */}
              {hasFeatures && (
                <section id="product-features" className="pt-0">
                  <SectionHeading
                    icon={Sparkles}
                    label="Key Features"
                    badge="Benefits"
                    description="Key advantages and characteristics of this material"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features
                      .filter(
                        (f) =>
                          f &&
                          typeof f === "string" &&
                          f.trim().length > 2 &&
                          !looksLikeCityDump(f),
                      )
                      .map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                      ))}
                  </div>
                </section>
              )}

              {/* Applications Section - Only show if hasApplications is true */}
              {hasApplications && (
                <section id="product-applications" className="pt-0">
                  <SectionHeading
                    icon={Building2}
                    label="Applications"
                    description="Common industries and use cases"
                  />
                  <BulletList items={product.applications} />
                </section>
              )}

              {/* Material Grades Section - Only show if hasMaterialGrades is true */}
              {hasMaterialGrades && (
                <section id="product-material-grades" className="pt-0">
                  <SectionHeading
                    icon={Tag}
                    label="Material Grades"
                    description="Available grades and specifications"
                  />
                  <ChipList items={product.material_grades} color="red" />
                </section>
              )}

              {/* Equivalent Grades Section - Only show if hasEquivalentGrades is true */}
              {hasEquivalentGrades && (
                <section id="product-equivalent-grades" className="pt-0">
                  <SectionHeading
                    icon={Globe}
                    label="Equivalent Grades"
                    description="International equivalent standards"
                  />
                  <div className="flex flex-wrap gap-2">
                    {product.equivalent_grades.map((grade, i) => (
                      <span
                        key={i}
                        className="text-sm font-body px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-charcoal hover:bg-brand-gold/20 transition-colors"
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Specifications Section - Only show if hasSpecifications is true */}
              {hasSpecifications && (
                <section id="product-specifications" className="pt-0">
                  <SectionHeading
                    icon={Layers}
                    label="Specifications & Standards"
                    description="Industry standards and certifications"
                  />
                  <ChipList items={product.specifications} color="gray" />
                </section>
              )}

              {/* Chemical Composition Section - Only show if hasChem is true */}
              {hasChem && (
                <section id="product-chemical-composition" className="pt-0">
                  <SectionHeading
                    icon={FlaskConical}
                    label="Chemical Composition"
                    description="Elemental composition breakdown"
                  />
                  <ChemicalCompositionTable
                    data={product.chemical_composition}
                  />
                </section>
              )}

              {/* Mechanical Properties Section - Only show if hasMech is true */}
              {hasMech && (
                <section id="product-mechanical-properties" className="pt-0">
                  <SectionHeading
                    icon={Gauge}
                    label="Mechanical Properties"
                    description="Physical and mechanical characteristics"
                  />
                  <MechanicalPropertiesTable
                    data={product.mechanical_properties}
                  />
                </section>
              )}

              {/* Heat Treatment Section - Only show if hasHeatTreatment is true */}
              {hasHeatTreatment && (
                <section id="product-heat-treatment" className="pt-0">
                  <SectionHeading
                    icon={ThermometerIcon}
                    label="Heat Treatment"
                    description="Heat treatment cycles and conditions"
                  />
                  <HeatTreatmentTable data={productData.heat_treatment} />
                </section>
              )}

              {/* Availability Section - Only show if hasAvailability is true */}
              {hasAvailability && (
                <section id="product-availability" className="pt-0">
                  <SectionHeading
                    icon={Building}
                    label="Available Forms"
                    description="Product forms and shapes available"
                  />
                  <ChipList items={productData.availability} color="gold" />
                </section>
              )}

              {/* Common Trade Names Section - Only show if hasCommonTradeNames is true */}
              {hasCommonTradeNames && (
                <section id="product-trade-names" className="pt-0">
                  <SectionHeading
                    icon={RefreshCw}
                    label="Common Trade Names"
                    description="Also known as"
                  />
                  <div className="flex flex-wrap gap-2">
                    {productData.common_trade_names.map(
                      (name: string, i: number) => (
                        <span
                          key={i}
                          className="text-sm font-body px-4 py-2 rounded-full bg-brand-red/5 border border-brand-red/20 text-brand-charcoal hover:bg-brand-red/10 transition-colors"
                        >
                          {name}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              )}

              {/* Current Stock Section - Only show if hasCurrentStock is true */}
              {hasCurrentStock && (
                <section id="product-current-stock" className="pt-0">
                  <SectionHeading
                    icon={Warehouse}
                    label="Current Stock Availability"
                    description="Real-time available stock"
                  />
                  <CurrentStockDisplay stockData={product.current_stock} />
                </section>
              )}

              {/* Stock Sizes Section - Only show if hasStockSizes is true */}
              {hasStockSizes && (
                <section id="product-stock-sizes" className="pt-0">
                  <SectionHeading
                    icon={Grid3X3}
                    label="Stock Sizes"
                    description="Available dimensions in stock"
                  />
                  <StockSizesTable data={product.stock_sizes!} />
                </section>
              )}

              {/* Tests Section - Only show if hasTests is true */}
              {hasTests && (
                <section id="product-tests" className="pt-0">
                  <SectionHeading
                    icon={ClipboardCheck}
                    label="Tests Performed"
                    description="Quality assurance and testing"
                  />
                  <BulletList items={product.tests} />
                </section>
              )}

              {/* Packing Section - Only show if packingText is truthy */}
              {packingText && (
                <section id="product-packing" className="pt-0">
                  <SectionHeading
                    icon={Package}
                    label="Packing & Delivery"
                    description="Packaging and shipping information"
                  />
                  <div className="bg-gray-50/80 rounded-xl border border-gray-100 p-4 sm:p-5 flex items-start gap-3 sm:gap-4">
                    <Truck
                      size={18}
                      className="text-brand-red flex-shrink-0 mt-0.5 sm:size-[22px]"
                      strokeWidth={1.5}
                    />
                    <p className="font-body text-gray-600 text-sm sm:text-base leading-relaxed">
                      {packingText}
                    </p>
                  </div>
                </section>
              )}

              {/* People Also Search Section - Only show if hasPeopleAlsoSearch is true */}
              {hasPeopleAlsoSearch && (
                <section id="product-people-also-search" className="pt-0">
                  <SectionHeading
                    icon={Search}
                    label="People Also Search"
                    description="Related search terms"
                  />
                  <div className="flex flex-wrap gap-2">
                    {productData.people_also_search.map(
                      (term: string, i: number) => (
                        <span
                          key={i}
                          className="text-sm font-body px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-600 hover:bg-brand-red/5 hover:border-brand-red/30 hover:text-brand-red transition-colors"
                        >
                          {term}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              )}

              {/* Back Link */}
              <div className="pt-6 border-t border-gray-100">
                <Link
                  to="/products"
                  id="product-page-back"
                  className="inline-flex items-center gap-2 text-base font-display font-bold text-gray-400 hover:text-brand-red transition-colors duration-200"
                >
                  <ArrowLeft size={18} />
                  Browse All Products
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                {/* Enquiry Card */}
                <div className="bg-gradient-to-br from-brand-red to-brand-red/90 rounded-2xl p-6 sm:p-8 shadow-xl">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/20 flex items-center justify-center mb-3 sm:mb-4">
                    <FileText
                      size={20}
                      className="text-white sm:size-[24px]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-white/80 font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-1">
                    Need this product?
                  </p>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2 leading-tight">
                    Get a Quote
                  </h3>
                  <p className="font-body text-white/70 text-sm mb-5 sm:mb-6 leading-relaxed">
                    Share your grade, size and quantity — we'll respond within
                    one business day.
                  </p>
                  <Link
                    to="/contact"
                    id={`product-${product.slug}-enquire`}
                    className="bg-white hover:bg-gray-50 text-brand-red font-display font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base w-full"
                  >
                    Enquire Now
                    <ArrowRight size={16} className="sm:size-[18px]" />
                  </Link>
                </div>

                {/* Call Card */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-body text-gray-400 text-sm mb-3">
                    Prefer to call?
                  </p>
                  <a
                    href="tel:+917073875529"
                    id={`product-${product.slug}-call`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                      <Phone
                        size={16}
                        className="text-brand-red group-hover:text-white transition-colors sm:size-[20px]"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div>
                      <p className="font-display font-bold text-brand-charcoal text-sm sm:text-base group-hover:text-brand-red transition-colors">
                        +91 7073875529
                      </p>
                      <p className="font-body text-gray-400 text-xs sm:text-sm">
                        Mumbai office
                      </p>
                    </div>
                  </a>
                </div>

                {/* Product Details */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                    <Package
                      size={16}
                      className="text-gray-400"
                      strokeWidth={1.5}
                    />
                    <p className="font-body text-gray-400 text-xs uppercase tracking-wider">
                      Product Details
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-sm mb-1">Type</p>
                    <p className="font-display font-bold text-brand-charcoal text-sm sm:text-base">
                      {product.product_type || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-sm mb-1">
                      Category
                    </p>
                    <p className="font-display font-bold text-brand-charcoal text-sm sm:text-base">
                      {categoryLabel || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-sm mb-1">Form</p>
                    <p className="font-display font-bold text-brand-red text-sm sm:text-base">
                      {typeLabel || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-gray-400 text-sm mb-1">
                      Status
                    </p>
                    {hasCurrentStock ? (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <p className="font-display font-bold text-green-600 text-sm sm:text-base">
                          In Stock
                        </p>
                      </div>
                    ) : (
                      <p className="font-display font-bold text-green-600 text-sm sm:text-base">
                        {availability || "—"}
                      </p>
                    )}
                  </div>
                  {hasMaterialGrades && (
                    <div>
                      <p className="font-body text-gray-400 text-sm mb-2">
                        Key Grades
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.material_grades.slice(0, 4).map((g, i) => (
                          <span
                            key={i}
                            className="text-xs sm:text-sm font-body bg-brand-red/8 text-brand-charcoal border border-brand-red/15 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                        {product.material_grades.length > 4 && (
                          <span className="text-xs sm:text-sm font-body text-gray-400">
                            +{product.material_grades.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {product.publish_date && (
                    <div>
                      <p className="font-body text-gray-400 text-sm mb-1">
                        Published
                      </p>
                      <p className="font-body text-gray-600 text-sm">
                        {new Date(product.publish_date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-50/80 rounded-xl border border-gray-100 p-3 sm:p-4 flex items-start gap-3">
                  <Clock
                    size={16}
                    className="text-brand-red flex-shrink-0 mt-0.5 sm:size-[18px]"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="font-display font-bold text-brand-charcoal text-xs sm:text-sm uppercase tracking-wider">
                      Quick Delivery
                    </p>
                    <p className="font-body text-gray-500 text-xs sm:text-sm">
                      Pan-India dispatch available
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
