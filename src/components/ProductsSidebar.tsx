// src/components/ProductsSidebar.tsx

import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PRODUCTS_MENU_DATA } from "./Header";

// ─── SPECIALIZED MENU DATA ────────────────────────────────────────────────
const SPECIALIZED_MENU_DATA: Record<
  string,
  { name: string; subItems?: string[]; image: string }
> = {
  "High Tensile Strength": {
    name: "High Tensile Strength",
    subItems: ["EVONITH HARD (EVSL AS07)", "UTTAMHARD", "SAILHARD"],
    image: "/images/sheet.jpg",
  },
  "Cold Rolled": {
    name: "Cold Rolled",
    subItems: ["CRCA Coils"],
    image: "/images/sheet.jpg",
  },
  "Hot Rolled IS 2062 Plates": {
    name: "Hot Rolled IS 2062 Plates",
    subItems: [
      "IS 2062 PLates",
      "IS 2062 E250BR",
      "IS 2062 E350",
      "IS 2062 E350BR Plates",
      "IS 2062 E350C",
      "S355J2+N Plates",
      "IS 2062 E450BR",
    ],
    image: "/images/sheet.jpg",
  },
  "Abrasion Resistant Plates": {
    name: "Abrasion Resistant Plates",
    subItems: [
      "Abrex 450 Plates",
      "Abrex 500 Plates",
      "NM400 Plates",
      "NM500 Plates",
      "Rockstar 400 Plates",
      "Rockstar 450 Plates",
      "Rockstar 500 Plates",
      "Industries We Serve",
    ],
    image: "/images/sheet.jpg",
  },
  "16MO3-15MO3 & SA 204 Plates": {
    name: "16MO3-15MO3 & SA 204 Plates",
    subItems: ["16Mo3 Plate"],
    image: "/images/sheet.jpg",
  },
  "Manganese Steel Plates": {
    name: "Manganese Steel Plates",
    subItems: ["X120MN12 /SIDUR 3401", "High Manganese Plate/Steels"],
    image: "/images/sheet.jpg",
  },
  "Quenched & Tempered Plates": {
    name: "Quenched & Tempered Plates",
    subItems: [
      "S690QL Plate",
      "EN10023-6 S690QL",
      "Welten 780E Plates /Sheets",
    ],
    image: "/images/sheet.jpg",
  },
  "Boiler Quality Steel Plates": {
    name: "Boiler Quality Steel Plates",
    subItems: ["IS2041 R260 Plate", "SA 516 Grade 70 Plate"],
    image: "/images/sheet.jpg",
  },
  "Chrome Moly Plates": {
    name: "Chrome Moly Plates",
    subItems: [
      "A387 GRADE 5 CLASS 2",
      "A387 GRADE 22 CLASS 2",
      "A387/SA387 Chrome Moly Plates",
    ],
    image: "/images/sheet.jpg",
  },
  "Chequered Plate": {
    name: "Chequered Plate",
    subItems: ["IS 3502 Chequered Plates"],
    image: "/images/sheet.jpg",
  },
  "Tata Structura 355": {
    name: "Tata Structura 355",
    image: "/images/hollow.jpg",
  },
  "Corten Steel Plates": {
    name: "Corten Steel Plates",
    image: "/images/sheet.jpg",
  },
  "DSQ Plates": {
    name: "DSQ Plates",
    image: "/images/sheet.jpg",
  },
  Fittings: {
    name: "Fittings",
    subItems: ["Buttweld Fittings", "Forged Fittings"],
    image: "/images/fitting.jpg",
  },
};

// ─── Specialized matching function (same as ProductsPage) ────────────────
function isSpecializedMatch(product: any, categoryQuery?: string): boolean {
  const searchText = [
    product.title || "",
    product.category || "",
    product.product_type || "",
    ...(product.material_grades || []),
    ...(product.equivalent_grades || []),
    ...(product.availability || []),
    ...(product.common_trade_names || []),
  ]
    .join(" ")
    .toLowerCase();

  if (!categoryQuery) return false;

  const cq = categoryQuery.toLowerCase().trim();

  // Direct match
  if (searchText.includes(cq)) return true;

  // Normalize
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[()[\]{}.,/\\|]/g, " ")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const normalizedQuery = normalize(cq);
  const normalizedSearch = normalize(searchText);

  if (normalizedSearch.includes(normalizedQuery)) return true;

  // Token match
  const tokens = normalizedQuery.split(" ").filter((t) => t.length > 1);
  if (tokens.length > 0) {
    const noSpacesSearch = normalizedSearch.replace(/\s/g, "");
    return tokens.every((token) => {
      if (normalizedSearch.includes(token)) return true;
      const noSpacesToken = token.replace(/\s/g, "");
      return noSpacesSearch.includes(noSpacesToken);
    });
  }

  return false;
}

interface ProductsSidebarProps {
  currentType?: string | null;
  currentCategory?: string | null;
  isSpecialized?: boolean;
  productCount?: number;
  allProducts?: any[];
}

export function ProductsSidebar({
  currentType,
  currentCategory,
  isSpecialized = false,
  productCount = 0,
  allProducts = [],
}: ProductsSidebarProps) {
  const [searchParams] = useSearchParams();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(true);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(true);

  const currentMenu = isSpecialized
    ? null
    : PRODUCTS_MENU_DATA.find(
        (item) => item.name.toLowerCase() === (currentType || "").toLowerCase(),
      );

  // ─── Sub-items build karo ────────────────────────────────────────
  const getSubItems = (): { label: string; nested?: string[] }[] => {
    if (isSpecialized) {
      // Specialized: 13 top-level categories, each with their own subItems
      return Object.keys(SPECIALIZED_MENU_DATA).map((catName) => {
        const catData = SPECIALIZED_MENU_DATA[catName];
        return {
          label: catName,
          nested: catData.subItems,
        };
      });
    }

    if (!currentMenu?.subItems) return [];
    return currentMenu.subItems.map((sub) => {
      if (typeof sub === "string") {
        return { label: sub };
      }
      return { label: sub.name, nested: sub.subItems };
    });
  };

  const subItems = getSubItems();

  // ─── Get products for a category ────────────────────────────────
  const getProductsForCategory = (categoryName: string): any[] => {
    if (!categoryName) return [];

    if (isSpecialized) {
      // Top-level category — uske subItems ke saare products
      const parentData = SPECIALIZED_MENU_DATA[categoryName];
      if (parentData?.subItems && parentData.subItems.length > 0) {
        // SubItems ke saare products match karo
        return allProducts.filter((p) =>
          parentData.subItems!.some((sub) => isSpecializedMatch(p, sub)),
        );
      }
      // Direct match (agar koi subItems nahi hain)
      return allProducts.filter((p) => isSpecializedMatch(p, categoryName));
    }

    // Regular mode
    return allProducts.filter((p) => {
      const pType = (p.product_type || "").toLowerCase();
      const pCat = (p.category || "").toLowerCase();
      const pTitle = (p.title || "").toLowerCase();
      const catLower = categoryName.toLowerCase();

      const typeMatch = pType.includes((currentType || "").toLowerCase());
      if (!typeMatch) return false;

      return (
        pCat === catLower ||
        pCat.includes(catLower) ||
        pTitle.includes(catLower) ||
        (p.material_grades || []).some((g: string) =>
          g.toLowerCase().includes(catLower),
        ) ||
        (p.equivalent_grades || []).some((g: string) =>
          g.toLowerCase().includes(catLower),
        )
      );
    });
  };

  const buildUrl = (newCategory?: string) => {
    const params = new URLSearchParams(searchParams);
    if (isSpecialized) {
      params.set("specialized", "true");
    } else if (currentType) {
      params.set("type", currentType);
    }
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    return `/products?${params.toString()}`;
  };

  const handleTypeChange = (newType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", newType);
    params.delete("category");
    window.location.href = `/products?${params.toString()}`;
  };

  if (!isSpecialized && !currentType) return null;
  if (!isSpecialized && !currentMenu) return null;

  const allLabel = isSpecialized
    ? "All Specialized Products"
    : `All ${currentType}`;

  return (
    <aside className="w-full lg:w-[300px] flex-shrink-0">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden lg:sticky lg:top-28">
        {/* ═══ CATEGORIES SECTION ═══ */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-[#e63946]" />
              <h3 className="text-base font-bold text-gray-900">
                {isSpecialized
                  ? "Specialized Categories"
                  : "Product Categories"}
              </h3>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                categoryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryDropdownOpen && (
            <div className="px-5 pb-4">
              <div className="w-10 h-[3px] bg-[#e63946] rounded-full mb-4" />

              {isSpecialized ? (
                <div className="relative">
                  <select
                    value={currentCategory || "__all__"}
                    onChange={(e) => {
                      const val = e.target.value;
                      window.location.href = buildUrl(
                        val === "__all__" ? undefined : val,
                      );
                    }}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#e63946] cursor-pointer"
                  >
                    <option value="__all__">All Specialized Products</option>
                    {Object.keys(SPECIALIZED_MENU_DATA).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={currentType || ""}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2.5 pr-10 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#e63946] cursor-pointer"
                  >
                    {PRODUCTS_MENU_DATA.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══ PRODUCTS SECTION ═══ */}
        <div>
          <button
            onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#e63946] text-xl font-bold leading-none">
                ≡
              </span>
              <h3 className="text-base font-bold text-gray-900">Products</h3>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                productsDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {productsDropdownOpen && (
            <div className="px-3 pb-4">
              <div className="w-10 h-[3px] bg-[#e63946] rounded-full mb-3 ml-2" />

              <ul className="space-y-0.5 max-h-[600px] overflow-y-auto pr-1 sidebar-scroll">
                {/* All option */}
                <li>
                  <Link
                    to={buildUrl(undefined)}
                    className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                      !currentCategory
                        ? "bg-[#e63946]/10 text-[#e63946] font-semibold"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#e63946]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {allLabel}
                    </span>
                  </Link>
                </li>

                {/* Sub-items */}
                {subItems.map((subItem) => {
                  const isActive = currentCategory === subItem.label;
                  const hasNested = subItem.nested && subItem.nested.length > 0;

                  const subItemProducts = isActive
                    ? getProductsForCategory(subItem.label)
                    : [];

                  return (
                    <li key={subItem.label}>
                      <Link
                        to={buildUrl(subItem.label)}
                        className={`block px-3 py-2 text-[13px] rounded-md transition-colors ${
                          isActive
                            ? "bg-[#e63946]/10 text-[#e63946] font-semibold"
                            : "text-gray-700 hover:bg-gray-100 hover:text-[#e63946]"
                        }`}
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="flex items-start gap-2 flex-1">
                            <span className="w-1 h-1 rounded-full bg-current mt-1.5 flex-shrink-0" />
                            <span className="leading-snug">
                              {subItem.label}
                            </span>
                          </span>
                          {hasNested && (
                            <ChevronRight
                              size={12}
                              className="text-gray-400 mt-1 flex-shrink-0"
                            />
                          )}
                        </span>
                      </Link>

                      {/* NESTED SUB-ITEMS (shown when parent is active) */}
                      {hasNested && isActive && (
                        <ul className="ml-5 mt-1 space-y-0.5 border-l-2 border-gray-200 pl-3">
                          {subItem.nested!.map((nestedItem) => (
                            <li key={nestedItem}>
                              <Link
                                to={buildUrl(nestedItem)}
                                className="block px-3 py-1.5 text-[12px] rounded-md transition-colors text-gray-600 hover:bg-gray-100 hover:text-[#e63946]"
                              >
                                {nestedItem}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* INLINE PRODUCTS (shown when parent is active) */}
                      {isActive && subItemProducts.length > 0 && (
                        <div className="ml-4 mt-2 mb-2">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2 pl-2">
                            {subItemProducts.length}{" "}
                            {subItemProducts.length === 1
                              ? "product"
                              : "products"}{" "}
                            available
                          </p>

                          <ul className="space-y-0.5 border-l-2 border-[#e63946]/30 pl-2">
                            {subItemProducts.map((product) => {
                              const title = product.title || product.slug;
                              return (
                                <li key={product.slug}>
                                  <Link
                                    to={`/product/${product.slug}`}
                                    className="block px-2 py-1.5 text-[12px] text-gray-600 hover:bg-[#e63946]/5 hover:text-[#e63946] rounded-md transition-colors group"
                                  >
                                    <span className="flex items-start gap-2">
                                      <span className="text-[#e63946] text-[10px] mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100">
                                        ▸
                                      </span>
                                      <span className="leading-snug line-clamp-2">
                                        {title}
                                      </span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Empty state */}
                      {isActive && subItemProducts.length === 0 && (
                        <div className="ml-4 mt-2 mb-2 pl-2">
                          <p className="text-[11px] text-gray-400 italic">
                            No products available yet
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #e63946;
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #c92a36;
        }
      `}</style>
    </aside>
  );
}
