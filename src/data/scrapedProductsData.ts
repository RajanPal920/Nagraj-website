// src/data/products.ts

import allProducts from "../data/products.json";

export interface ScrapedProduct {
  url: string;
  title: string;
  slug: string;
  description_text: string;
  product_type: string;
  category: string;
  breadcrumbs: string;
  meta_title: string;
  meta_description: string;
  publish_date: string;
  modified_date: string;
  material_grades: string[];
  equivalent_grades: string[];
  specifications: string[];
  applications: string[];
  features: string[];
  tests: string[];
  packing: string;
  chemical_composition: Array<{
    element: string;
    min_value?: string;
    max_value?: string;
    value?: string;
  }>;
  mechanical_properties: Array<{
    property_name: string;
    value?: string;
    min_value?: string;
    max_value?: string;
    condition?: string;
  }>;
  stock_sizes?: Array<{
    category: string;
    items: string[];
  }>;
  current_stock?: any;
  images: Array<{
    url: string;
    alt: string;
  }>;
  attachments: string[];
  scraped_at: string;
  status: string;
}

// ── Module-level product data ──────────────────────────────────────────────

let productsCache: ScrapedProduct[] | null = null;
let loadPromise: Promise<ScrapedProduct[]> | null = null;

/**
 * Load products from the JSON file.
 * Uses a module-level cache to avoid re-loading on every call.
 */
export function loadProducts(): Promise<ScrapedProduct[]> {
  // If already cached, return immediately
  if (productsCache) {
    return Promise.resolve(productsCache);
  }

  // If already loading, return the existing promise
  if (loadPromise) {
    return loadPromise;
  }

  // Start loading
  loadPromise = new Promise((resolve, reject) => {
    try {
      // Check if allProducts exists and is an array
      if (!allProducts || !Array.isArray(allProducts)) {
        console.error("Products data is missing or invalid:", allProducts);
        reject(new Error("Products data is missing or invalid"));
        return;
      }

      const data = allProducts as unknown as ScrapedProduct[];
      productsCache = data;
      loadPromise = null;
      resolve(data);
    } catch (error) {
      console.error("Error loading products:", error);
      loadPromise = null;
      reject(error);
    }
  });

  return loadPromise;
}

/**
 * Synchronous version for use in contexts where async is not needed.
 * Returns the cached products if available, otherwise loads from the JSON.
 */
export function getProducts(): ScrapedProduct[] {
  if (!productsCache) {
    try {
      // Check if allProducts exists and is an array
      if (!allProducts || !Array.isArray(allProducts)) {
        console.error("Products data is missing or invalid:", allProducts);
        return [];
      }
      productsCache = allProducts as unknown as ScrapedProduct[];
    } catch (error) {
      console.error("Error getting products:", error);
      return [];
    }
  }
  return productsCache || [];
}

/**
 * Find a product by slug.
 */
export function findProductBySlug(slug: string): ScrapedProduct | undefined {
  const products = getProducts();
  return products.find((p) => p.slug === slug);
}

/**
 * Get all unique categories from products.
 */
export function getAllCategories(): string[] {
  const products = getProducts();
  const seen = new Set<string>();
  products.forEach((p) => {
    if (p.category) {
      seen.add(p.category);
    }
  });
  return Array.from(seen).sort();
}

/**
 * Get all unique product types from products.
 */
export function getAllProductTypes(): string[] {
  const products = getProducts();
  const seen = new Set<string>();
  products.forEach((p) => {
    if (p.product_type) {
      seen.add(p.product_type);
    }
  });
  return Array.from(seen).sort();
}

/**
 * Get products by category.
 */
export function getProductsByCategory(category: string): ScrapedProduct[] {
  const products = getProducts();
  return products.filter((p) => p.category === category);
}

/**
 * Get products by type.
 */
export function getProductsByType(type: string): ScrapedProduct[] {
  const products = getProducts();
  return products.filter((p) => p.product_type === type);
}

/**
 * Search products by title, description, or material grades.
 */
export function searchProducts(query: string): ScrapedProduct[] {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter((p) => {
    const titleMatch = p.title?.toLowerCase().includes(lowerQuery) || false;
    const descMatch =
      p.description_text?.toLowerCase().includes(lowerQuery) || false;
    const gradeMatch =
      p.material_grades?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      false;
    const specMatch =
      p.specifications?.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      false;
    const categoryMatch =
      p.category?.toLowerCase().includes(lowerQuery) || false;
    const typeMatch =
      p.product_type?.toLowerCase().includes(lowerQuery) || false;
    return (
      titleMatch ||
      descMatch ||
      gradeMatch ||
      specMatch ||
      categoryMatch ||
      typeMatch
    );
  });
}

// Export the products directly as well
export const products = (allProducts as unknown as ScrapedProduct[]) || [];
