// src/components/ProductTable.tsx

import React from "react";
import { Table, Beaker, Gauge, Ruler, Package, Layers } from "lucide-react";

interface ProductTableProps {
  title: string;
  headers: string[];
  rows: string[][];
  type: string;
}

const ProductTable: React.FC<ProductTableProps> = ({
  title,
  headers,
  rows,
  type,
}) => {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case "chemical":
        return Beaker;
      case "mechanical":
        return Gauge;
      case "physical":
        return Ruler;
      case "specifications":
        return Layers;
      case "stock":
        return Package;
      default:
        return Table;
    }
  };

  const getHeaderColor = () => {
    switch (type) {
      case "chemical":
        return "bg-brand-red";
      case "mechanical":
        return "bg-amber-600";
      case "physical":
        return "bg-purple-600";
      case "specifications":
        return "bg-blue-600";
      case "stock":
        return "bg-green-600";
      default:
        return "bg-brand-charcoal";
    }
  };

  const Icon = getIcon();

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-1.5 bg-brand-red/10 rounded-lg">
          <Icon size={18} className="text-brand-red" strokeWidth={1.75} />
        </div>
        <h2 className="font-display font-bold text-brand-red text-sm uppercase tracking-[0.15em]">
          {title}
        </h2>
        <span className="text-xs font-body bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full capitalize">
          {type}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm font-body">
          <thead className={`${getHeaderColor()} text-white`}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2.5 text-gray-700">
                    {cell || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductTable; // ✅ Make sure this is here
