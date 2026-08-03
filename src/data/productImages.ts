// ─── Product Image Map ─────────────────────────────────────────────────────────
// Two-level lookup: category → product_type → image path.
// Images live in /public/images/products/ sourced from D:\SunMarg\Images\Champak.
//
// Lookup order:
//  1. inferVisualType(title, productType) → resolves scraper mislabels
//  2. CATEGORY_TYPE_IMAGE[category][visualType]  – most specific
//  3. PRODUCT_TYPE_IMAGE[visualType]             – type-level fallback
//  4. DEFAULT_PRODUCT_IMAGE                      – final fallback

// ── Helper key normalizer ─────────────────────────────────────────────────────
function cat(c: string) { return c.toLowerCase(); }

// ── Title-based visual type inference ────────────────────────────────────────
/**
 * The scraper mis-tagged many products (e.g. round bars, plates, welding wires
 * all labelled as "Fitting"). This function inspects the product title with
 * keyword heuristics to determine the correct visual type for image lookup.
 *
 * The raw product_type is NOT changed — this is used only for image selection.
 */
export function inferVisualType(title: string, productType: string): string {
  const t = title.toLowerCase();

  // ── Fasteners / Bolts / Studs / Pins ──────────────────────────────────────
  if (/\bbolt\b|\bnut\b|\bscrew\b|\bstud\b|\bfastener\b|\bwasher\b|\blinch pin\b|\bretaining pin\b/.test(t))
    return 'Fastener';

  // ── Welding consumables (check before generic "wire" catches bars) ────────
  if (/filler wire|welding wire|tig.*wire|mig.*wire|wire.*tig|wire.*mig|weld.*electrode|welding electrode/.test(t))
    return 'Welding Wire';

  // ── Bars: round, flat, hex, square, bright, forged bars, wire rod ─────────
  if (/round bar|flat bar|hex bar|square bar|bright bar|forged bar|wire rod|spring wire/.test(t))
    return 'Bar';

  // ── Plates / Sheets / Coils ───────────────────────────────────────────────
  if (/\bplate|\bsheet|\bcoil/.test(t))
    return 'Plate';

  // ── Structural profiles ───────────────────────────────────────────────────
  if (/\bangle\b|\bchannel\b|hollow section|structura/.test(t))
    return 'Structural Profile';

  // ── Pipes / Tubes ─────────────────────────────────────────────────────────
  if (/\bpipe\b|\btube\b/.test(t))
    return 'Pipe';

  // ── Flanges ───────────────────────────────────────────────────────────────
  if (/\bflange\b/.test(t))
    return 'Flange';

  // ── Forgings ──────────────────────────────────────────────────────────────
  if (/\bforging\b|forged fitting/.test(t))
    return 'Forging';

  // ── Fittings (elbow, tee, reducer, cap, stub end, buttweld) ──────────────
  if (/\belbow\b|\bfitting\b|\breducer\b|buttweld/.test(t))
    return 'Fitting';

  // Fall back to whatever the scraper said
  return productType;
}

// ── Category → Type image map ─────────────────────────────────────────────────
// Keyed on lowercased category names for safe matching.
const CATEGORY_TYPE_IMAGE: Record<string, Record<string, string>> = {
  // ── Stainless Steel ───────────────────────────────────────────────────────
  'stainless steel': {
    'Bar':               '/images/products/ss-bar.jpg',
    'Pipe':              '/images/products/ss-pipe.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Flange':            '/images/products/ss-flange.jpg',
    'Forging':            '/images/products/structural-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Alloy Steel ───────────────────────────────────────────────────────────
  'alloy steel': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Carbon Steel ─────────────────────────────────────────────────────────
  'carbon steel': {
    'Bar':               '/images/products/carbon-bar.jpg',
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Duplex & Super Duplex ─────────────────────────────────────────────────
  'duplex & super duplex': {
    'Bar':               '/images/products/duplex-bar.jpg',
    'Pipe':              '/images/products/duplex-pipe.jpg',
    'Plate':             '/images/products/duplex-plate.jpg',
    'Fitting':           '/images/products/duplex-fitting.jpg',
    'Flange':            '/images/products/duplex-flange.jpg',
    'Forging':           '/images/products/duplex-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Nickel Alloy ─────────────────────────────────────────────────────────
  'nickel alloy': {
    'Bar':               '/images/products/nickel-bar.jpg',
    'Pipe':              '/images/products/nickel-pipe.jpg',
    'Plate':             '/images/products/nickel-plate.jpg',
    'Fitting':           '/images/products/nickel-fitting.jpg',
    'Flange':            '/images/products/nickel-flange.jpg',
    'Forging':           '/images/products/nickel-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Titanium ─────────────────────────────────────────────────────────────
  'titanium': {
    'Bar':               '/images/products/titanium-bar.jpg',
    'Pipe':              '/images/products/titanium-pipe.jpg',
    'Plate':             '/images/products/titanium-plate.jpg',
    'Fitting':           '/images/products/titanium-fitting.jpg',
    'Flange':            '/images/products/titanium-flange.jpg',
    'Forging':           '/images/products/titanium-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Copper & Brass ───────────────────────────────────────────────────────
  'copper & brass': {
    'Bar':               '/images/products/brass-bar.jpg',
    'Pipe':              '/images/products/copper-nickel-pipe.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Fitting':           '/images/products/copper-nickel-fitting.jpg',
    'Flange':            '/images/products/copper-nickel-flange.jpg',
    'Forging':           '/images/products/copper-nickel-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/ss-fastener.jpg',
  },
  // ── Cupro Nickel ─────────────────────────────────────────────────────────
  'cupro nickel': {
    'Bar':               '/images/products/copper-nickel-bar.jpg',
    'Pipe':              '/images/products/copper-nickel-pipe.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Fitting':           '/images/products/copper-nickel-fitting.jpg',
    'Flange':            '/images/products/copper-nickel-flange.jpg',
    'Forging':           '/images/products/copper-nickel-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/ss-fastener.jpg',
  },
  // ── Aluminium ────────────────────────────────────────────────────────────
  'aluminium': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Pipe':              '/images/products/aluminium-pipe.jpg',
    'Plate':             '/images/products/aluminium-plate.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Flange':            '/images/products/ss-flange.jpg',
    'Forging':           '/images/products/ss-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/ss-fastener.jpg',
  },
  // ── Corten / Weathering Steel ─────────────────────────────────────────────
  'corten steel': {
    'Plate':             '/images/products/corten-plate.jpg',
    'Bar':               '/images/products/carbon-bar.jpg',
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/carbon-fastener.jpg',
  },
  // ── Abrasion Resistant ───────────────────────────────────────────────────
  'abrasion resistant': {
    'Plate':             '/images/products/abrasion-resistant-plate.jpg',
    'Bar':               '/images/products/carbon-bar.jpg',
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/carbon-fastener.jpg',
  },
  // ── Chequered Plate ──────────────────────────────────────────────────────
  'chequered plate': {
    'Plate':             '/images/products/carbon-plate.jpg',
    'Bar':               '/images/products/carbon-bar.jpg',
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/carbon-fastener.jpg',
  },
  // ── Pressure Vessel Steel ────────────────────────────────────────────────
  'pressure vessel steel': {
    'Plate':             '/images/products/boiler-steel.jpg',
    'Bar':               '/images/products/alloy-bar.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Tool Steel ───────────────────────────────────────────────────────────
  'tool steel': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── High Tensile Steel ───────────────────────────────────────────────────
  'high tensile steel': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── EN Series ────────────────────────────────────────────────────────────
  'en series': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Precipitation Hardening Steel ────────────────────────────────────────
  'precipitation hardening steel': {
    'Bar':               '/images/products/ss-bar.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Pipe':              '/images/products/ss-pipe.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Flange':            '/images/products/ss-flange.jpg',
    'Forging':           '/images/products/ss-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Special Steel ────────────────────────────────────────────────────────
  'special steel': {
    'Bar':               '/images/products/alloy-bar.jpg',
    'Plate':             '/images/products/manganese-steel.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Cold Rolled ──────────────────────────────────────────────────────────
  'cold rolled': {
    'Plate':             '/images/products/ss-plate.jpg',
    'Bar':               '/images/products/ss-bar.jpg',
    'Pipe':              '/images/products/ss-pipe.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Flange':            '/images/products/ss-flange.jpg',
    'Forging':           '/images/products/ss-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Hot Rolled IS 2062 Plates ────────────────────────────────────────────
  'hot rolled is 2062 plates': {
    'Plate':             '/images/products/carbon-plate.jpg',
    'Bar':               '/images/products/carbon-bar.jpg',
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Cobalt Alloy ─────────────────────────────────────────────────────────
  'cobalt alloy': {
    'Bar':               '/images/products/hastelloy-bar.jpg',
    'Plate':             '/images/products/hastelloy-plate.jpg',
    'Pipe':              '/images/products/hastelloy-pipe.jpg',
    'Fitting':           '/images/products/hastelloy-fitting.jpg',
    'Flange':            '/images/products/hastelloy-flange.jpg',
    'Forging':           '/images/products/hastelloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Galvanized ───────────────────────────────────────────────────────────
  'galvanized': {
    'Pipe':              '/images/products/carbon-pipe.jpg',
    'Bar':               '/images/products/carbon-bar.jpg',
    'Plate':             '/images/products/carbon-plate.jpg',
    'Fitting':           '/images/products/carbon-fitting.jpg',
    'Flange':            '/images/products/carbon-flange.jpg',
    'Forging':           '/images/products/carbon-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Flanges (specialty category) ─────────────────────────────────────────
  'flanges': {
    'Flange':            '/images/products/ss-flange.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Bar':               '/images/products/ss-bar.jpg',
    'Pipe':              '/images/products/ss-pipe.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Forging':           '/images/products/ss-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
  // ── Pins ─────────────────────────────────────────────────────────────────
  'pins': {
    'Bar':               '/images/products/ss-fastener.jpg',
    'Fitting':           '/images/products/ss-fitting.jpg',
    'Flange':            '/images/products/ss-flange.jpg',
    'Forging':           '/images/products/ss-forging.jpg',
    'Pipe':              '/images/products/ss-pipe.jpg',
    'Plate':             '/images/products/ss-plate.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
    'Fastener':          '/images/products/ss-fastener.jpg',
  },
  // ── Specialized Products ─────────────────────────────────────────────────
  'specialized products': {
    'Plate':             '/images/products/boiler-steel.jpg',
    'Bar':               '/images/products/alloy-bar.jpg',
    'Pipe':              '/images/products/alloy-pipe.jpg',
    'Fitting':           '/images/products/alloy-fitting.jpg',
    'Flange':            '/images/products/alloy-flange.jpg',
    'Forging':           '/images/products/alloy-forging.jpg',
    'Welding Wire':      '/images/products/welding-wire.webp',
    'Structural Profile':'/images/products/structural-profile.webp',
  },
};

// ── Fallback: product type → image (when no category match) ──────────────────
export const PRODUCT_TYPE_IMAGE: Record<string, string> = {
  'Fastener':           '/images/products/ss-fastener.jpg',
  'Bar':                '/images/products/alloy-bar.jpg',
  'Plate':              '/images/products/carbon-plate.jpg',
  'Fitting':            '/images/products/ss-fitting.jpg',
  'Pipe':               '/images/products/ss-pipe.jpg',
  'Welding Wire':      '/images/products/welding-wire.webp',
  'Structural Profile':'/images/products/structural-profile.webp',
  'Flange':             '/images/products/ss-flange.jpg',
  'Forging':            '/images/products/structural-forging.jpg',
};

/** Generic fallback for unknown product types */
export const DEFAULT_PRODUCT_IMAGE = '/images/products/ss-bar.jpg';

/**
 * Returns the most specific local image for a product.
 *
 * Resolution order:
 *  1. inferVisualType(title, productType) corrects scraper mislabels
 *  2. CATEGORY_TYPE_IMAGE[category][visualType]
 *  3. CATEGORY_TYPE_IMAGE[category][productType] (original label, same category)
 *  4. PRODUCT_TYPE_IMAGE[visualType]
 *  5. PRODUCT_TYPE_IMAGE[productType]
 *  6. DEFAULT_PRODUCT_IMAGE
 *
 * Always safe to use — never returns an external or watermarked URL.
 */
export function getProductImage(productType: string, category?: string, title?: string): string {
  const visualType = title ? inferVisualType(title, productType) : productType;

  if (category) {
    const catMap = CATEGORY_TYPE_IMAGE[cat(category)];
    if (catMap) {
      if (catMap[visualType]) return catMap[visualType];
      // Secondary: original scraper type within same category
      if (catMap[productType]) return catMap[productType];
    }
  }

  return (
    PRODUCT_TYPE_IMAGE[visualType] ??
    PRODUCT_TYPE_IMAGE[productType] ??
    DEFAULT_PRODUCT_IMAGE
  );
}

/**
 * Returns true if the given URL is from a competitor's domain whose
 * images carry branding watermarks and should never be displayed.
 */
export function isWatermarkedUrl(url: string): boolean {
  return (
    url.includes('textronsteelalloys.com') ||
    url.includes('www.textronsteelalloys.com')
  );
}
