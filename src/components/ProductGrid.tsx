import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { getProductImage } from '../data/productImages';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function ProductGrid() {
  const { types, typeTree, loading } = useProducts();
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="products" className="section-padding bg-gray-50">
      <div className="container-xl">
        {/* Header */}
        <div 
          ref={headerRef} 
          className={`text-center mb-14 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <p className="section-label">Our Range</p>
          <h2 className="section-title mx-auto">Product Categories</h2>
          <div className="section-divider mx-auto" />
          <p className="font-body text-gray-500 text-base max-w-2xl mx-auto">
            From structural profiles to high-pressure seamless pipes, Bhumi Steel
            stocks and supplies the full spectrum of industrial steel products.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="min-h-[200px]">
          {loading ? (
            <div className="text-center py-12 text-gray-400 font-body">Loading catalogue...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {types.map((type, index) => {
                const groups = typeTree[type] || [];
                const count = groups.reduce((acc, g) => acc + g.categories.reduce((c, cat) => c + cat.products.length, 0), 0);
                const image = getProductImage(type, undefined, type);
                const topGroups = groups.map(g => g.group).slice(0, 3);

                return (
                  <article
                    key={type}
                    id={`home-product-card-${type.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`card-base flex flex-col group overflow-hidden bg-white rounded-sm border border-gray-100 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${gridVisible ? `animate-fade-in-up stagger-${(index % 4) + 1}` : 'opacity-0'}`}
                  >
                    {/* Image Header */}
                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                      <img 
                        src={image} 
                        alt={type}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      {/* Name */}
                      <h3 className="font-display font-bold text-xl text-brand-charcoal mb-1 group-hover:text-brand-green transition-colors duration-200">
                        {type}
                      </h3>

                      {/* Count */}
                      <p className="font-body text-xs font-semibold text-brand-gold uppercase tracking-wider mb-4">
                        {count} Specifications Available
                      </p>

                      {/* Top Groups / Materials */}
                      {topGroups.length > 0 && (
                        <ul className="flex flex-wrap gap-1.5 mb-6">
                          {topGroups.map((g) => (
                            <li
                              key={g}
                              className="text-xs font-body font-medium text-brand-green bg-brand-green/8 px-2 py-0.5 rounded-sm border border-brand-green/15"
                            >
                              {g}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-2">
                        <Link
                          to={`/products?type=${encodeURIComponent(type)}`}
                          id={`home-product-card-${type.toLowerCase().replace(/\s+/g, '-')}-link`}
                          className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-brand-green hover:text-brand-green-dark transition-colors duration-200 group/link"
                        >
                          Explore {type}
                          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            id="products-view-full-catalogue-cta"
            className="btn-outline-green text-sm"
          >
            View Full Product Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
