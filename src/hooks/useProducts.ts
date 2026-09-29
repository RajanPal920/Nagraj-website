import { useState, useEffect, useMemo } from "react";
import { loadProducts, type ScrapedProduct } from "../data/scrapedProductsData";
import {
  getCategoryDisplayLabel,
  CATEGORY_GROUPS,
  GROUP_ORDER,
} from "../data/categoryConfig";

// ── Types ────────────────────────────────────────────────────────────────────

export interface UseProductsReturn {
  products: ScrapedProduct[];
  loading: boolean;
  error: string | null;
  categories: string[];
  productTypes: string[];
  types: string[];
  categoryCounts: Record<string, number>;
  typeCounts: Record<string, number>;
  categoryTree: CategoryGroupNode[];
  typeTree: TypeTree;
}

export interface CategoryNode {
  category: string;
  label: string;
  group: string;
  totalCount: number;
  subcategories: SubcategoryNode[];
}

export interface CategoryGroupNode {
  group: string;
  categories: CategoryNode[];
}

export interface SubcategoryNode {
  type: string;
  count: number;
}

// ── Type Tree Types ─────────────────────────────────────────────────────────

export interface TypeCategoryNode {
  category: string;
  label: string;
  group: string;
  products: ScrapedProduct[];
}

export interface TypeGroupNode {
  group: string;
  categories: TypeCategoryNode[];
}

export type TypeTree = Record<string, TypeGroupNode[]>;

// ── Module-level cache ──────────────────────────────────────────────────────

let cachedProducts: ScrapedProduct[] | null = null;
let cachedCategories: string[] | null = null;
let cachedProductTypes: string[] | null = null;
let cachedTypes: string[] | null = null;
let cachedCategoryCounts: Record<string, number> | null = null;
let cachedTypeCounts: Record<string, number> | null = null;
let cachedCategoryTree: CategoryGroupNode[] | null = null;
let cachedTypeTree: TypeTree | null = null;

/* ─── Hook ─────────────────────────────────────────────────────────────────── */

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<ScrapedProduct[]>(
    cachedProducts ?? [],
  );
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already cached, skip loading
    if (cachedProducts) {
      setLoading(false);
      return;
    }

    setLoading(true);
    loadProducts()
      .then((data) => {
        console.log("Products loaded successfully:", data.length);
        cachedProducts = data;
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError(err.message || "Failed to load products");
        setLoading(false);
      });
  }, []);

  // ── Flat derived data ──────────────────────────────────────────────────────

  const categories = useMemo(() => {
    if (cachedCategories) return cachedCategories;
    const seen = new Set<string>();
    products.forEach((p) => {
      if (p.category) seen.add(p.category);
    });
    const result = Array.from(seen).sort((a, b) =>
      getCategoryDisplayLabel(a).localeCompare(getCategoryDisplayLabel(b)),
    );
    cachedCategories = result;
    return result;
  }, [products]);

  const productTypes = useMemo(() => {
    if (cachedProductTypes) return cachedProductTypes;
    const seen = new Set<string>();
    products.forEach((p) => {
      if (p.product_type) seen.add(p.product_type);
    });
    const result = Array.from(seen).sort((a, b) => a.localeCompare(b));
    cachedProductTypes = result;
    return result;
  }, [products]);

  const types = useMemo(() => {
    if (cachedTypes) return cachedTypes;
    const freq: Record<string, number> = {};
    products.forEach((p) => {
      if (p.product_type) {
        freq[p.product_type] = (freq[p.product_type] ?? 0) + 1;
      }
    });
    const result = Object.keys(freq).sort(
      (a, b) => (freq[b] ?? 0) - (freq[a] ?? 0),
    );
    cachedTypes = result;
    return result;
  }, [products]);

  const categoryCounts = useMemo(() => {
    if (cachedCategoryCounts) return cachedCategoryCounts;
    const c: Record<string, number> = {};
    products.forEach((p) => {
      if (p.category) {
        c[p.category] = (c[p.category] ?? 0) + 1;
      }
    });
    cachedCategoryCounts = c;
    return c;
  }, [products]);

  const typeCounts = useMemo(() => {
    if (cachedTypeCounts) return cachedTypeCounts;
    const c: Record<string, number> = {};
    products.forEach((p) => {
      if (p.product_type) {
        c[p.product_type] = (c[p.product_type] ?? 0) + 1;
      }
    });
    cachedTypeCounts = c;
    return c;
  }, [products]);

  // ── Hierarchical tree ──────────────────────────────────────────────────────

  const categoryTree = useMemo((): CategoryGroupNode[] => {
    if (cachedCategoryTree) return cachedCategoryTree;

    // If no products, return empty array
    if (!products.length) {
      return [];
    }

    // Build category → { typeCount } map
    const catTypeMap: Record<string, Record<string, number>> = {};
    const catCount: Record<string, number> = {};

    products.forEach((p) => {
      if (!p.category) return;
      catCount[p.category] = (catCount[p.category] ?? 0) + 1;
      if (!catTypeMap[p.category]) catTypeMap[p.category] = {};
      if (p.product_type) {
        catTypeMap[p.category][p.product_type] =
          (catTypeMap[p.category][p.product_type] ?? 0) + 1;
      }
    });

    // Collect any categories not already in CATEGORY_GROUPS
    const allSeenCats = new Set(Object.keys(catCount));
    const knownCats = new Set(Object.values(CATEGORY_GROUPS).flat());
    const unknownCats = [...allSeenCats].filter((c) => !knownCats.has(c));

    // Build group nodes in defined order, then append unknowns under "Other"
    const groupNodes: CategoryGroupNode[] = GROUP_ORDER.map((group) => {
      const groupCats = CATEGORY_GROUPS[group] ?? [];
      const categoryNodes: CategoryNode[] = groupCats
        .filter((cat) => catCount[cat] !== undefined) // only cats that have products
        .map((cat) => {
          const typeMap = catTypeMap[cat] ?? {};
          const subcategories: SubcategoryNode[] = Object.entries(typeMap)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count]) => ({ type, count }));
          return {
            category: cat,
            label: getCategoryDisplayLabel(cat),
            group,
            totalCount: catCount[cat] ?? 0,
            subcategories,
          };
        })
        .sort((a, b) => b.totalCount - a.totalCount);

      return { group, categories: categoryNodes };
    }).filter((g) => g.categories.length > 0);

    // Append "Other" group for unknown categories
    if (unknownCats.length > 0) {
      const otherCats = unknownCats.map((cat) => {
        const typeMap = catTypeMap[cat] ?? {};
        const subcategories = Object.entries(typeMap)
          .sort((a, b) => b[1] - a[1])
          .map(([type, count]) => ({ type, count }));
        return {
          category: cat,
          label: getCategoryDisplayLabel(cat),
          group: "Other",
          totalCount: catCount[cat] ?? 0,
          subcategories,
        };
      });
      groupNodes.push({ group: "Other", categories: otherCats });
    }

    cachedCategoryTree = groupNodes;
    return groupNodes;
  }, [products]);

  const typeTree = useMemo((): TypeTree => {
    if (cachedTypeTree) return cachedTypeTree;

    // If no products, return empty object
    if (!products.length) {
      return {};
    }

    const tree: TypeTree = {};

    // Group all products by Type -> Category
    const rawMap: Record<string, Record<string, ScrapedProduct[]>> = {};
    products.forEach((p) => {
      if (!p.product_type || !p.category) return;
      if (!rawMap[p.product_type]) rawMap[p.product_type] = {};
      if (!rawMap[p.product_type][p.category])
        rawMap[p.product_type][p.category] = [];
      rawMap[p.product_type][p.category].push(p);
    });

    // Build the hierarchical tree: Type -> Group -> Category
    Object.keys(rawMap).forEach((type) => {
      const typeCategories = rawMap[type];
      const knownCats = new Set(Object.values(CATEGORY_GROUPS).flat());

      const groupNodes: TypeGroupNode[] = GROUP_ORDER.map((group) => {
        const groupCats = CATEGORY_GROUPS[group] ?? [];
        const categoryNodes: TypeCategoryNode[] = groupCats
          .filter((cat) => typeCategories[cat] !== undefined)
          .map((cat) => ({
            category: cat,
            label: getCategoryDisplayLabel(cat),
            group,
            products: typeCategories[cat],
          }));

        return { group, categories: categoryNodes };
      }).filter((g) => g.categories.length > 0);

      // Other group
      const otherCats = Object.keys(typeCategories)
        .filter((cat) => !knownCats.has(cat))
        .map((cat) => ({
          category: cat,
          label: getCategoryDisplayLabel(cat),
          group: "Other",
          products: typeCategories[cat],
        }));

      if (otherCats.length > 0) {
        groupNodes.push({ group: "Other", categories: otherCats });
      }

      tree[type] = groupNodes;
    });

    cachedTypeTree = tree;
    return tree;
  }, [products]);

  return {
    products,
    loading,
    error,
    categories,
    productTypes,
    types,
    categoryCounts,
    typeCounts,
    categoryTree,
    typeTree,
  };
}
