import { useState, useEffect, useMemo } from 'react';
import type { ScrapedProduct } from '../data/scrapedProductsData';
import {
  GROUP_ORDER,
  CATEGORY_GROUPS,
  getCategoryDisplayLabel,
} from '../data/categoryConfig';

// ── Public types ──────────────────────────────────────────────────────────────

export interface SubcategoryNode {
  /** Raw product_type value */
  type: string;
  count: number;
}

export interface CategoryNode {
  /** Raw category value */
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

interface UseProductsReturn {
  products: ScrapedProduct[];
  loading: boolean;
  error: string | null;
  /** Flat list of unique category strings */
  categories: string[];
  /** Flat list of unique product_type strings sorted by frequency */
  types: string[];
  categoryCounts: Record<string, number>;
  typeCounts: Record<string, number>;
  /** Hierarchical tree: group → category → product_type */
  categoryTree: CategoryGroupNode[];
}

// ── Module-level cache ────────────────────────────────────────────────────────
let cachedProducts: ScrapedProduct[] | null = null;
let fetchPromise: Promise<ScrapedProduct[]> | null = null;

async function loadProducts(): Promise<ScrapedProduct[]> {
  if (cachedProducts) return cachedProducts;
  if (!fetchPromise) {
    fetchPromise = fetch('/data/products.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
        return res.json() as Promise<ScrapedProduct[]>;
      })
      .then((data) => {
        cachedProducts = data;
        fetchPromise = null;
        return data;
      });
  }
  return fetchPromise;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<ScrapedProduct[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedProducts) return;
    loadProducts()
      .then((data) => { setProducts(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // ── Flat derived data ──────────────────────────────────────────────────────

  const categories = useMemo(() => {
    const seen = new Set<string>();
    products.forEach((p) => seen.add(p.category));
    return Array.from(seen).sort((a, b) =>
      getCategoryDisplayLabel(a).localeCompare(getCategoryDisplayLabel(b)),
    );
  }, [products]);

  const types = useMemo(() => {
    const freq: Record<string, number> = {};
    products.forEach((p) => { freq[p.product_type] = (freq[p.product_type] ?? 0) + 1; });
    return Object.keys(freq).sort((a, b) => (freq[b] ?? 0) - (freq[a] ?? 0));
  }, [products]);

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = {};
    products.forEach((p) => { c[p.category] = (c[p.category] ?? 0) + 1; });
    return c;
  }, [products]);

  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {};
    products.forEach((p) => { c[p.product_type] = (c[p.product_type] ?? 0) + 1; });
    return c;
  }, [products]);

  // ── Hierarchical tree ──────────────────────────────────────────────────────

  const categoryTree = useMemo((): CategoryGroupNode[] => {
    // Build category → { typeCount } map
    const catTypeMap: Record<string, Record<string, number>> = {};
    const catCount: Record<string, number> = {};

    products.forEach((p) => {
      catCount[p.category] = (catCount[p.category] ?? 0) + 1;
      if (!catTypeMap[p.category]) catTypeMap[p.category] = {};
      catTypeMap[p.category][p.product_type] =
        (catTypeMap[p.category][p.product_type] ?? 0) + 1;
    });

    // Collect any categories not already in CATEGORY_GROUPS
    const allSeenCats = new Set(products.map((p) => p.category));
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
          group: 'Other',
          totalCount: catCount[cat] ?? 0,
          subcategories,
        };
      });
      groupNodes.push({ group: 'Other', categories: otherCats });
    }

    return groupNodes;
  }, [products]);

  return { products, loading, error, categories, types, categoryCounts, typeCounts, categoryTree };
}
