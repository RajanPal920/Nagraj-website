// src/pages/ProductPage.tsx

import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
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
  Hash,
  Warehouse,
  Building2,
  FlaskConical,
  Thermometer,
  Building,
  RefreshCw,
  Search,
  Gauge,
  ShoppingBag,
  Send,
  Mail,
  MapPin,
  Check,
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Element
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
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
                  className={`border-b border-gray-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-gray-100/50 transition-colors`}
                >
                  <td className="px-6 py-3.5 font-medium text-gray-800">
                    {entry.element || "—"}
                    {isBalance && (
                      <span className="ml-2 text-xs text-gray-400">
                        (Balance)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-gray-700 font-mono">
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
          className="w-full py-3 text-sm font-medium text-[#c41e24] hover:text-[#c41e24]/80 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Property
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Value
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
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
                  className={`border-b border-gray-100 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-gray-100/50 transition-colors`}
                >
                  <td className="px-6 py-3.5 font-medium text-gray-800">
                    {entry.property_name || entry.name || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-gray-700 font-mono">
                    {displayValue}
                  </td>
                  <td className="px-6 py-3.5 text-gray-600">
                    {hasCondition ? (
                      <span className="inline-flex items-center gap-1.5 bg-[#c41e24]/10 px-3 py-1 rounded-full text-xs font-medium text-[#c41e24]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c41e24]" />
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
          className="w-full py-3 text-sm font-medium text-[#c41e24] hover:text-[#c41e24]/80 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show All {validData.length} Properties
            </>
          )}
        </button>
      )}
    </div>
  );
}

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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Condition
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Temperature
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Holding Time
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Cooling
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((entry, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-100/50 transition-colors`}
              >
                <td className="px-6 py-3.5 font-medium text-gray-800">
                  {entry.condition || "—"}
                </td>
                <td className="px-6 py-3.5 text-gray-700 font-mono">
                  {entry.temperature || "—"}
                </td>
                <td className="px-6 py-3.5 text-gray-700 font-mono">
                  {entry.holding_time || "—"}
                </td>
                <td className="px-6 py-3.5 text-gray-700">
                  {entry.cooling || "—"}
                </td>
                <td className="px-6 py-3.5 text-gray-600">
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
          className="w-full py-3 text-sm font-medium text-[#c41e24] hover:text-[#c41e24]/80 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show All {validData.length} Heat Treatment Cycles
            </>
          )}
        </button>
      )}
    </div>
  );
}

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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                className="px-6 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200"
                onClick={() => toggleCategory(categoryKey)}
              >
                <p className="font-medium text-gray-800 flex items-center gap-2">
                  <Hash size={16} className="text-[#c41e24]" />
                  {category.category}
                </p>
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  {category.items.length} sizes
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {displayItems.map((item: string, i: number) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      } hover:bg-gray-100/50 transition-colors`}
                    >
                      <td className="px-6 py-3 text-gray-700 font-mono">
                        {item}
                      </td>
                    </tr>
                  ))}
                  {hasMore && !isExpanded && (
                    <tr className="bg-gray-50">
                      <td className="px-6 py-2.5 text-sm text-[#c41e24] font-medium">
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-left font-semibold text-gray-700 text-sm"
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
                className={`border-b border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-100/50 transition-colors`}
              >
                {headers.map((header, idx) => (
                  <td key={idx} className="px-6 py-3.5 text-gray-700">
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
          className="w-full py-3 text-sm font-medium text-[#c41e24] hover:text-[#c41e24]/80 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700 text-sm">
                Available Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {displayItems.map((item, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                } hover:bg-gray-100/50 transition-colors`}
              >
                <td className="px-6 py-3.5 text-gray-700 font-mono">{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 text-sm font-medium text-[#c41e24] hover:text-[#c41e24]/80 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border-t border-gray-200"
        >
          {showAll ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
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
    <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200">
      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      {stockCount > 1 ? `${stockCount} items in stock` : "In Stock"}
    </span>
  );
}

/* ─── Sub-components ───────────────────────────────────────────────────────── */

function SectionHeading({
  icon: Icon,
  label,
  description,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-[#c41e24]/10">
          <Icon size={20} className="text-[#c41e24]" strokeWidth={1.75} />
        </div>
        <h2 className="font-display font-bold text-gray-900 text-xl">
          {label}
        </h2>
      </div>
      {description && (
        <p className="text-gray-500 text-sm ml-11">{description}</p>
      )}
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
    red: "bg-[#c41e24]/10 text-[#c41e24] border-[#c41e24]/20",
    gold: "bg-amber-50 text-amber-700 border-amber-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`text-sm font-medium px-4 py-2 rounded-full border ${colorClasses[color]} hover:scale-[1.02] transition-transform cursor-default`}
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
    <ul className="space-y-2.5">
      {filtered.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Check
            size={18}
            className="text-[#c41e24] mt-0.5 flex-shrink-0"
            strokeWidth={2.5}
          />
          <span className="text-gray-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FeatureCard({ feature, index }: { feature: string; index: number }) {
  const Icon = getFeatureIcon(feature);
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-[#c41e24]/30 hover:shadow-md transition-all duration-200">
      <div className="w-9 h-9 rounded-lg bg-[#c41e24]/10 flex items-center justify-center flex-shrink-0">
        <Icon size={17} className="text-[#c41e24]" strokeWidth={1.75} />
      </div>
      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
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

  const [showAll, setShowAll] = useState(false);

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

  if (loading) return <Skeleton />;
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20 px-4">
        <Package size={48} className="text-gray-400" strokeWidth={1} />
        <h1 className="font-display font-bold text-xl text-gray-900">
          Failed to load product
        </h1>
        <p className="text-gray-400 text-sm">{error}</p>
        <Link
          to="/products"
          className="border-2 border-[#c41e24] text-[#c41e24] hover:bg-[#c41e24] hover:text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 text-sm"
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
        <h1 className="font-display font-bold text-2xl text-gray-900">
          Product Not Found
        </h1>
        <p className="text-gray-400 text-sm max-w-xs text-center">
          We couldn't find a product matching <strong>{slug}</strong>.
        </p>
        <Link
          to="/products"
          className="border-2 border-[#c41e24] text-[#c41e24] hover:bg-[#c41e24] hover:text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 text-sm"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

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

      <div className="bg-gray-50 min-h-screen">
        {/* ── Hero Section ────────────────────────────────────────────── */}
        <section className="relative">
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] bg-gray-200 overflow-hidden">
            <img
              src={heroImage}
              alt={heroAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
              <span
                className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                  isSpecialized
                    ? "bg-[#c41e24] text-white"
                    : "bg-white/90 text-gray-800"
                } shadow-lg`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/90 text-gray-800 shadow-lg">
                {typeLabel}
              </span>
              {hasCurrentStock && (
                <StockAvailabilityBadge stockData={product.current_stock} />
              )}
              {!hasCurrentStock && (
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-500/90 text-white shadow-lg">
                  {availability}
                </span>
              )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 lg:left-16 xl:left-24">
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-4xl drop-shadow-lg">
                {product.title}
              </h1>
              {hasMaterialGrades && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.material_grades.slice(0, 4).map((grade, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                    >
                      {grade}
                    </span>
                  ))}
                  {product.material_grades.length > 4 && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                      +{product.material_grades.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12">
          {/* Key Specs */}
          {keySpecs.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-6 relative z-10">
              {keySpecs.map((spec, idx) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#c41e24]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#c41e24]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
            {/* ── Left: Main Content ── */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[#c41e24]/10">
                    <FileText size={18} className="text-[#c41e24]" />
                  </div>
                  <h2 className="font-display font-bold text-gray-900 text-xl">
                    Overview
                  </h2>
                </div>

                {hasMetaDescription && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {product.meta_description}
                    </p>
                  </div>
                )}

                {descriptionText && descriptionText.length > 20 && (
                  <div className="space-y-4 text-gray-700 leading-relaxed">
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

              {/* Key Features */}
              {hasFeatures && (
                <section>
                  <SectionHeading
                    icon={Sparkles}
                    label="Key Features"
                    description="Key advantages and characteristics"
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

              {/* Applications */}
              {hasApplications && (
                <section>
                  <SectionHeading
                    icon={Building2}
                    label="Applications"
                    description="Common industries and use cases"
                  />
                  <BulletList items={product.applications} />
                </section>
              )}

              {/* Material Grades */}
              {hasMaterialGrades && (
                <section>
                  <SectionHeading
                    icon={Tag}
                    label="Material Grades"
                    description="Available grades and specifications"
                  />
                  <ChipList items={product.material_grades} color="red" />
                </section>
              )}

              {/* Equivalent Grades */}
              {hasEquivalentGrades && (
                <section>
                  <SectionHeading
                    icon={Globe}
                    label="Equivalent Grades"
                    description="International equivalent standards"
                  />
                  <div className="flex flex-wrap gap-2">
                    {product.equivalent_grades.map((grade, i) => (
                      <span
                        key={i}
                        className="text-sm font-medium px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Specifications */}
              {hasSpecifications && (
                <section>
                  <SectionHeading
                    icon={Layers}
                    label="Specifications & Standards"
                    description="Industry standards and certifications"
                  />
                  <ChipList items={product.specifications} color="gray" />
                </section>
              )}

              {/* Chemical Composition */}
              {hasChem && (
                <section>
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

              {/* Mechanical Properties */}
              {hasMech && (
                <section>
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

              {/* Heat Treatment */}
              {hasHeatTreatment && (
                <section>
                  <SectionHeading
                    icon={Thermometer}
                    label="Heat Treatment"
                    description="Heat treatment cycles and conditions"
                  />
                  <HeatTreatmentTable data={productData.heat_treatment} />
                </section>
              )}

              {/* Availability */}
              {hasAvailability && (
                <section>
                  <SectionHeading
                    icon={Building}
                    label="Available Forms"
                    description="Product forms and shapes available"
                  />
                  <ChipList items={productData.availability} color="gold" />
                </section>
              )}

              {/* Common Trade Names */}
              {hasCommonTradeNames && (
                <section>
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
                          className="text-sm font-medium px-4 py-2 rounded-full bg-[#c41e24]/5 text-gray-700 border border-[#c41e24]/20"
                        >
                          {name}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              )}

              {/* Current Stock */}
              {hasCurrentStock && (
                <section>
                  <SectionHeading
                    icon={Warehouse}
                    label="Current Stock Availability"
                    description="Real-time available stock"
                  />
                  <CurrentStockDisplay stockData={product.current_stock} />
                </section>
              )}

              {/* Stock Sizes */}
              {hasStockSizes && (
                <section>
                  <SectionHeading
                    icon={Grid3X3}
                    label="Stock Sizes"
                    description="Available dimensions in stock"
                  />
                  <StockSizesTable data={product.stock_sizes!} />
                </section>
              )}

              {/* Tests */}
              {hasTests && (
                <section>
                  <SectionHeading
                    icon={ClipboardCheck}
                    label="Tests Performed"
                    description="Quality assurance and testing"
                  />
                  <BulletList items={product.tests} />
                </section>
              )}

              {/* Packing */}
              {packingText && (
                <section>
                  <SectionHeading
                    icon={Package}
                    label="Packing & Delivery"
                    description="Packaging and shipping information"
                  />
                  <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4">
                    <Truck
                      size={20}
                      className="text-[#c41e24] flex-shrink-0 mt-0.5"
                    />
                    <p className="text-gray-700 leading-relaxed">
                      {packingText}
                    </p>
                  </div>
                </section>
              )}

              {/* People Also Search */}
              {hasPeopleAlsoSearch && (
                <section>
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
                          className="text-sm font-medium px-4 py-2 rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-[#c41e24]/5 hover:border-[#c41e24]/30 hover:text-[#c41e24] transition-colors cursor-default"
                        >
                          {term}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              )}

              {/* Back Link */}
              <div className="pt-6 border-t border-gray-200">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#c41e24] transition-colors"
                >
                  <ArrowLeft size={16} />
                  Browse All Products
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Enquiry Card */}
              <div className="bg-[#c41e24] rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Send size={20} className="text-white" />
                </div>
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">
                  Need this product?
                </p>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Get a Quote
                </h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">
                  Share your grade, size and quantity — we'll respond within one
                  business day.
                </p>
                <Link
                  to="/contact"
                  className="bg-white hover:bg-gray-50 text-[#c41e24] font-medium px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm w-full"
                >
                  Enquire Now
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Call Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-400 text-sm mb-3">Prefer to call?</p>
                <a
                  href="tel:+917073875529"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#c41e24]/10 flex items-center justify-center group-hover:bg-[#c41e24] transition-colors duration-300">
                    <Phone
                      size={16}
                      className="text-[#c41e24] group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-[#c41e24] transition-colors">
                      +91 7073875529
                    </p>
                    <p className="text-gray-400 text-sm">Mumbai office</p>
                  </div>
                </a>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <Package size={16} className="text-gray-400" />
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                    Product Details
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Type</p>
                  <p className="font-medium text-gray-900">
                    {product.product_type || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Category</p>
                  <p className="font-medium text-gray-900">
                    {categoryLabel || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Form</p>
                  <p className="font-medium text-[#c41e24]">
                    {typeLabel || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  {hasCurrentStock ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <p className="font-medium text-green-600">In Stock</p>
                    </div>
                  ) : (
                    <p className="font-medium text-green-600">
                      {availability || "—"}
                    </p>
                  )}
                </div>
                {hasMaterialGrades && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Key Grades</p>
                    <div className="flex flex-wrap gap-2">
                      {product.material_grades.slice(0, 4).map((g, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium bg-[#c41e24]/10 text-gray-800 px-2.5 py-1 rounded-full"
                        >
                          {g}
                        </span>
                      ))}
                      {product.material_grades.length > 4 && (
                        <span className="text-xs text-gray-400">
                          +{product.material_grades.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {product.publish_date && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Published</p>
                    <p className="text-gray-600 text-sm">
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
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3 shadow-sm">
                <Clock
                  size={16}
                  className="text-[#c41e24] flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm uppercase tracking-wider">
                    Quick Delivery
                  </p>
                  <p className="text-gray-500 text-sm">
                    Pan-India dispatch available
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
