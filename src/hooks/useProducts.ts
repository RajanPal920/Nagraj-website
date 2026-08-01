import { useState, useEffect, useMemo } from 'react';
import type { ScrapedProduct } from '../data/scrapedProductsData';
import { getCategoryLabel } from '../data/scrapedProductsData';

interface UseProductsReturn {
  products: ScrapedProduct[];
  loading: boolean;
  error: string | null;
  categories: string[];
  types: string[];
  categoryCounts: Record<string, number>;
  typeCounts: Record<string, number>;
}

// Module-level cache so re-mounts don't re-fetch
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

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<ScrapedProduct[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedProducts) return; // already loaded
    loadProducts()
      .then((data) => { setProducts(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    products.forEach((p) => seen.add(p.category));
    return Array.from(seen).sort((a, b) => {
      if (a === 'Products') return -1;
      if (b === 'Products') return 1;
      return getCategoryLabel(a).localeCompare(getCategoryLabel(b));
    });
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

  return { products, loading, error, categories, types, categoryCounts, typeCounts };
}
