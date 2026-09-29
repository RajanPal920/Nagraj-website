import { useMemo } from "react";
import { useProducts } from "./useProducts";
import type { ScrapedProduct } from "../data/scrapedProductsData";

interface UseProductReturn {
  product: ScrapedProduct | null;
  loading: boolean;
  error: string | null;
  productType: string | null;
  category: string | null;
}

/**
 * Find a single product by slug.
 * Reuses the same module-level cache as useProducts — no double fetch.
 */
export function useProduct(slug: string | undefined): UseProductReturn {
  const { products, loading, error } = useProducts();

  const product = useMemo(() => {
    if (!slug || !products.length) return null;
    return products.find((p) => p.slug === slug) ?? null;
  }, [products, slug]);

  // Get product type and category from the product
  const productType = useMemo(() => {
    if (!product) return null;
    return product.product_type || null;
  }, [product]);

  const category = useMemo(() => {
    if (!product) return null;
    return product.category || null;
  }, [product]);

  return {
    product,
    loading,
    error,
    productType,
    category,
  };
}
