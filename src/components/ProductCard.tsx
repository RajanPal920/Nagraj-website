import type { ProductInfo } from '../data/products';
import { ArrowRight, Cylinder, Circle, GitBranch, Minus, LayoutGrid, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

// Map icon name strings to lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Cylinder,
  Circle,
  GitBranch,
  Minus,
  LayoutGrid,
  Square,
};

interface ProductCardProps {
  product: ProductInfo;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const Icon = iconMap[product.iconName] ?? Circle;

  return (
    <article
      id={`product-card-${product.id}`}
      className="card-base p-7 flex flex-col group"
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`${product.name} — Bhumi Steel product`}
    >
      {/* Icon */}
      <div className="mb-5 w-14 h-14 rounded-sm bg-brand-green/8 border border-brand-green/15 flex items-center justify-center group-hover:bg-brand-green transition-all duration-300">
        <Icon
          size={26}
          strokeWidth={1.5}
          className="text-brand-green group-hover:text-white transition-colors duration-300"
        />
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-lg text-brand-charcoal mb-2 group-hover:text-brand-green transition-colors duration-200">
        {product.name}
      </h3>

      {/* Description */}
      <p className="font-body text-gray-500 text-sm leading-relaxed mb-5 flex-1">
        {product.shortDescription}
      </p>

      {/* Highlights */}
      <ul className="flex flex-wrap gap-2 mb-5">
        {product.highlights.map((h) => (
          <li
            key={h}
            className="text-xs font-body font-medium text-brand-green bg-brand-green/8 px-2.5 py-1 rounded-sm border border-brand-green/15"
          >
            {h}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/contact"
        id={`product-card-${product.id}-enquire`}
        className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-brand-gold hover:text-brand-green transition-colors duration-200 group/link"
      >
        Enquire Now
        <ArrowRight
          size={14}
          className="transition-transform duration-200 group-hover/link:translate-x-1"
        />
      </Link>
    </article>
  );
}
