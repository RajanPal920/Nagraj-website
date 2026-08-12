import type { ProductInfo } from "../data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductInfo;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article
      id={`product-card-${product.id}`}
      className="card-base flex flex-col group overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`${product.name} — Nagraj Metal Industries product`}
    >
      {/* Image Header */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={product.imageUrl}
          onError={(e) => {
            e.currentTarget.src = product.fallbackImageUrl;
          }}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle gradient overlay to tie it to the design system */}
        <div className="absolute inset-0 bg-brand-red-dark/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>

      <div className="p-7 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-display font-bold text-lg text-brand-charcoal mb-2 group-hover:text-brand-red transition-colors duration-200">
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
              className="text-xs font-body font-medium text-brand-red bg-brand-red/8 px-2.5 py-1 rounded-lg border border-brand-red/15"
            >
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          id={`product-card-${product.id}-enquire`}
          className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-brand-red hover:text-brand-red-dark transition-colors duration-200 group/link"
        >
          Enquire Now
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
