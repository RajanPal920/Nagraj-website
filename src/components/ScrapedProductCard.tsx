import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ScrapedProduct } from '../data/scrapedProductsData';
import { getCategoryLabel, FALLBACK_IMAGE } from '../data/scrapedProductsData';

interface ScrapedProductCardProps {
  product: ScrapedProduct;
  index: number;
  onViewDetails: (product: ScrapedProduct) => void;
}

export function ScrapedProductCard({ product, index, onViewDetails }: ScrapedProductCardProps) {
  const imageUrl = product.images?.[0]?.url ?? FALLBACK_IMAGE;
  const categoryLabel = getCategoryLabel(product.category);
  const isSpecialized = product.category !== 'Products';

  // Use meta_description as the card subtitle — it's rich and available for all 417 products
  const subtitle = product.meta_description || product.description_text.replace(/^Description\s*/i, '').trim();

  return (
    <article
      id={`scraped-product-card-${product.slug}`}
      className="card-base flex flex-col group overflow-hidden cursor-pointer"
      style={{ animationDelay: `${(index % 12) * 50}ms` }}
      aria-label={`${product.title}`}
      onClick={() => onViewDetails(product)}
    >
      {/* Image */}
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={product.images?.[0]?.alt ?? product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-brand-green-dark/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />

        {/* Category badge — top left */}
        <span className={`absolute top-3 left-3 text-[10px] font-display font-bold px-2 py-0.5 rounded-sm
          ${isSpecialized
            ? 'bg-brand-gold/90 text-white'
            : 'bg-white/90 text-brand-green'}`}>
          {categoryLabel}
        </span>

        {/* Type badge — top right */}
        <span className="absolute top-3 right-3 text-[10px] font-display font-bold px-2 py-0.5 rounded-sm
                          bg-brand-green/90 text-white">
          {product.product_type}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display font-bold text-sm text-brand-charcoal mb-2 leading-snug
                       group-hover:text-brand-green transition-colors duration-200 line-clamp-2">
          {product.title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-body text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
            {subtitle}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <button
            id={`scraped-product-card-${product.slug}-details`}
            onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
            className="inline-flex items-center gap-1.5 text-xs font-display font-bold
                       text-brand-green hover:text-brand-gold transition-colors duration-200"
          >
            <Eye size={12} />
            View Details
          </button>
          <Link
            to="/contact"
            id={`scraped-product-card-${product.slug}-enquire`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-display font-bold
                       text-brand-gold hover:text-brand-green transition-colors duration-200"
          >
            Enquire
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
