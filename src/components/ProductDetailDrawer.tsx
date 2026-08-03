import { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, Beaker, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ScrapedProduct } from '../data/scrapedProductsData';
import { getCategoryLabel } from '../data/scrapedProductsData';
import { getProductImage } from '../data/productImages';

interface ProductDetailDrawerProps {
  product: ScrapedProduct | null;
  onClose: () => void;
}

export function ProductDetailDrawer({ product, onClose }: ProductDetailDrawerProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!product) return null;

  const imageUrl = getProductImage(product.product_type, product.category, product.title);
  const categoryLabel = getCategoryLabel(product.category);
  const isSpecialized = product.category !== 'Products';

  // Parse description — strip leading "Description\n\n" if present
  const descriptionText = product.description_text
    .replace(/^Description\s*/i, '')
    .trim();

  // Check for chem/mech data
  const hasChem = product.chemical_composition?.length > 0;
  const hasMech = product.mechanical_properties?.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        id="product-drawer-backdrop"
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        id={`product-drawer-${product.slug}`}
        role="dialog"
        aria-modal="true"
        aria-label={product.title}
        className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col
                   animate-[slideInDrawer_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        style={{ willChange: 'transform' }}
      >
        {/* ── Header image ── */}
        <div className="relative h-64 w-full flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = getProductImage(product.product_type, product.category, product.title); }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges over image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`text-xs font-display font-bold px-2.5 py-1 rounded-sm
              ${isSpecialized
                ? 'bg-brand-gold text-white'
                : 'bg-white/90 text-brand-green'}`}>
              {categoryLabel}
            </span>
            <span className="text-xs font-display font-bold px-2.5 py-1 rounded-sm bg-brand-green text-white">
              {product.product_type}
            </span>
          </div>

          {/* Close button */}
          <button
            id="product-drawer-close"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white
                       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close product details"
          >
            <X size={20} />
          </button>

          {/* Title over image */}
          <div className="absolute bottom-4 left-4 right-14">
            <h2 className="font-display font-extrabold text-white text-xl leading-tight">
              {product.title}
            </h2>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Meta description */}
          {product.meta_description && (
            <div className="px-6 pt-5 pb-4 border-b border-gray-100">
              <p className="font-body text-gray-600 text-sm leading-relaxed">
                {product.meta_description}
              </p>
            </div>
          )}

          {/* Full description */}
          {descriptionText && descriptionText.length > 10 && (
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-display font-bold text-brand-green text-sm uppercase tracking-widest mb-3">
                Description
              </h3>
              <div className="font-body text-gray-600 text-sm leading-relaxed space-y-2 max-h-48 overflow-y-auto
                              pr-2 scrollbar-thin">
                {descriptionText.split('\n\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* Chemical Composition */}
          {hasChem && (
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-display font-bold text-brand-green text-sm uppercase tracking-widest mb-3
                             flex items-center gap-2">
                <Beaker size={15} className="text-brand-gold" />
                Chemical Composition
              </h3>
              <div className="overflow-x-auto rounded border border-gray-100">
                <table className="w-full text-xs font-body">
                  <thead className="bg-brand-green text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Element</th>
                      <th className="px-3 py-2 text-left">Value / Range</th>
                      <th className="px-3 py-2 text-left">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.chemical_composition.map((entry, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 font-medium text-brand-charcoal">{entry.element}</td>
                        <td className="px-3 py-2 text-gray-600">{entry.min_value}</td>
                        <td className="px-3 py-2 text-gray-500">{entry.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mechanical Properties */}
          {hasMech && (
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-display font-bold text-brand-green text-sm uppercase tracking-widest mb-3
                             flex items-center gap-2">
                <Gauge size={15} className="text-brand-gold" />
                Mechanical Properties
              </h3>
              <div className="overflow-x-auto rounded border border-gray-100">
                <table className="w-full text-xs font-body">
                  <thead className="bg-brand-green text-white">
                    <tr>
                      <th className="px-3 py-2 text-left">Property</th>
                      <th className="px-3 py-2 text-left">Value</th>
                      <th className="px-3 py-2 text-left">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.mechanical_properties.map((entry, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 font-medium text-brand-charcoal">{entry.property_name}</td>
                        <td className="px-3 py-2 text-gray-600">{entry.value}</td>
                        <td className="px-3 py-2 text-gray-500">{entry.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* External link to original */}
          <div className="px-6 py-4 border-b border-gray-100">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`product-drawer-${product.slug}-external`}
              className="inline-flex items-center gap-2 text-xs font-display font-semibold text-gray-400
                         hover:text-brand-green transition-colors duration-200"
            >
              <ExternalLink size={13} />
              View full specification on Textron Steel & Alloys
            </a>
          </div>
        </div>

        {/* ── Sticky CTA footer ── */}
        <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
          <Link
            to="/contact"
            id={`product-drawer-${product.slug}-enquire`}
            onClick={onClose}
            className="flex-1 btn-primary justify-center text-sm py-3"
          >
            Enquire About This Product
            <ArrowRight size={15} />
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-3 border-2 border-gray-200 text-gray-500 font-display font-bold text-sm
                       rounded-sm hover:border-brand-green hover:text-brand-green transition-all duration-200"
          >
            Close
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes slideInDrawer {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
