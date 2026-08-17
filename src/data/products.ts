import allProductsData from "../data/products.json";

export interface ProductInfo {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  fallbackImageUrl: string;
  highlights: string[];
}

export const products: ProductInfo[] = [
  {
    id: "pipes-tubes",
    name: "Pipes & Tubes",
    shortDescription:
      "Seamless and welded pipes in carbon steel, stainless steel, and alloy grades for high-pressure industrial applications.",
    imageUrl: "/images/pipe.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1584824388147-38d5db229649?auto=format&fit=crop&q=80&w=800",
    highlights: ["Seamless & ERW", "Carbon / SS / Alloy", "Oil & Gas grade"],
  },
  {
    id: "flanges",
    name: "Flanges",
    shortDescription:
      "Slip-on, weld neck, blind, and socket-weld flanges machined to ANSI, ASME, DIN, and IS standards.",
    imageUrl: "/images/flange.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    highlights: ["ANSI / ASME / DIN", "Weld Neck, Blind, SO", "Custom ratings"],
  },
  {
    id: "fittings",
    name: "Fittings",
    shortDescription:
      "Buttweld and forged fittings — elbows, tees, reducers, and caps — to match every piping system requirement.",
    imageUrl: "/images/fitting.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1590481231649-7c8bd3cb27e5?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Buttweld & Forged",
      "Elbows, Tees, Reducers",
      "Pressure-rated",
    ],
  },
  {
    id: "round-bars",
    name: "Round Bars & Rods",
    shortDescription:
      "Bright and black round bars in mild steel, stainless, and tool steel — cut to length or in full mill lengths.",
    imageUrl: "/images/bar.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1506509939527-0dbf62fb438f?auto=format&fit=crop&q=80&w=800",
    highlights: ["Mild Steel / SS", "Bright & Black finish", "Cut-to-length"],
  },
  {
    id: "sheets-plates",
    name: "Sheets & Plates",
    shortDescription:
      "HR, CR, and stainless steel sheets and plates in a wide range of thicknesses and widths for structural and process use.",
    imageUrl: "/images/sheet.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1580983538118-2e86b4020c64?auto=format&fit=crop&q=80&w=800",
    highlights: ["HR / CR / SS", "Structural & Process", "Shearing available"],
  },
  {
    id: "hollow-sections",
    name: "Hollow Sections",
    shortDescription:
      "Square hollow sections (SHS) and rectangular hollow sections (RHS) in mild steel for construction and fabrication.",
    imageUrl: "/images/hollow.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
    highlights: ["SHS & RHS", "Mild Steel", "Construction grade"],
  },
];

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
      // Check if allProductsData exists and is an array
      if (!allProductsData || !Array.isArray(allProductsData)) {
        console.error("Products data is missing or invalid:", allProductsData);
        reject(new Error("Products data is missing or invalid"));
        return;
      }

      const data = allProductsData as unknown as ScrapedProduct[];
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
      // Check if allProductsData exists and is an array
      if (!allProductsData || !Array.isArray(allProductsData)) {
        console.error("Products data is missing or invalid:", allProductsData);
        return [];
      }
      productsCache = allProductsData as unknown as ScrapedProduct[];
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

// Export the static products as well
export const staticProducts = products;
