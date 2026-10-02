// src/components/WeightCalculator/ProductSearchSelect.tsx

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { type ProductItem } from "../../data/productCalculatorData";

interface ProductSearchSelectProps {
  items: ProductItem[];
  selectedItem: ProductItem | null;
  onSelectItem: (item: ProductItem) => void;
  categoryName: string;
}

export function ProductSearchSelect({
  items,
  selectedItem,
  onSelectItem,
  categoryName,
}: ProductSearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Filter items by search query
  const filteredItems = items.filter((item) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.subGroup && item.subGroup.toLowerCase().includes(query)) ||
      item.materialLabel.toLowerCase().includes(query)
    );
  });

  // Group items by subGroup if present
  const groupedItems = filteredItems.reduce<Record<string, ProductItem[]>>(
    (acc, item) => {
      const group = item.subGroup || "Products";
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {}
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 hover:border-gray-400 rounded-xl px-4 py-3 text-left flex items-center justify-between shadow-2xs focus:outline-none focus:border-[#B22222] focus:ring-2 focus:ring-[#B22222]/20 transition-all cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="truncate pr-2">
          {selectedItem ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm truncate">
                {selectedItem.name}
              </span>
              {selectedItem.subGroup && (
                <span className="text-[11px] text-gray-500 font-medium truncate">
                  ({selectedItem.subGroup})
                </span>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">
              Select product or sub-item...
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#B22222]" : ""
          }`}
        />
      </button>

      {/* Dropdown with Embedded Search */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-fadeIn">
          {/* Search Box */}
          <div className="p-2.5 border-b border-gray-100 bg-gray-50/70">
            <div className="relative flex items-center">
              <Search
                size={15}
                className="absolute left-3 text-gray-400 pointer-events-none"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${categoryName} (e.g. NM500, F91, Monel)...`}
                className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-8 py-2 text-xs font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#B22222] focus:ring-1 focus:ring-[#B22222]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600 rounded-md"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Items List */}
          <div className="max-h-64 overflow-y-auto p-1.5 scrollbar-thin">
            {Object.keys(groupedItems).length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No matching products found for "{searchTerm}"
              </div>
            ) : (
              Object.entries(groupedItems).map(([groupName, groupList]) => (
                <div key={groupName} className="mb-1 last:mb-0">
                  {Object.keys(groupedItems).length > 1 && (
                    <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#B22222] bg-gray-50/80 rounded-md mb-1">
                      {groupName}
                    </div>
                  )}

                  <div className="space-y-0.5">
                    {groupList.map((item) => {
                      const isSelected = selectedItem?.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            onSelectItem(item);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-red-50 text-[#B22222] font-bold"
                              : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          <div className="truncate pr-2">
                            <span className="block truncate">{item.name}</span>
                            <span className="text-[10px] text-gray-400 block truncate">
                              {item.materialLabel}
                            </span>
                          </div>
                          {isSelected && (
                            <Check size={14} className="text-[#B22222] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
