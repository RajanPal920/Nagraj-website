// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  alt: string;
  local_path?: string;
  checksum?: string;
}

export interface ProductAttachment {
  url: string;
  title: string;
  file_type: string;
  local_path?: string;
}

export interface ChemicalEntry {
  element: string;
  min_value: string;
  max_value: string;
  unit: string;
}

export interface MechanicalEntry {
  property_name: string;
  value: string;
  unit: string;
  condition: string;
}

export interface ScrapedProduct {
  url: string;
  title: string;
  slug: string;
  description_text: string;
  product_type: string;
  /** Raw category from scraper — "Products" means general/standard */
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
  chemical_composition: ChemicalEntry[];
  mechanical_properties: MechanicalEntry[];
  images: ProductImage[];
  attachments: ProductAttachment[];
  scraped_at: string;
  status: string;
}

// ─── Display label mapping ─────────────────────────────────────────────────────
// "Products" = general/standard; all other categories are specialized.

export const CATEGORY_DISPLAY: Record<string, string> = {
  Products: 'Standard',
};

export function getCategoryLabel(raw: string): string {
  return CATEGORY_DISPLAY[raw] ?? raw;
}

// ─── Fallback image ───────────────────────────────────────────────────────────
// Used only as a last resort. For per-type clean images, see productImages.ts.
export const FALLBACK_IMAGE = '/images/bar.jpg';
