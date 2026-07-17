import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';

export function ProductGrid() {
  return (
    <section id="products" className="section-padding bg-gray-50">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Our Range</p>
          <h2 className="section-title mx-auto">Product Categories</h2>
          <div className="section-divider mx-auto" />
          <p className="font-body text-gray-500 text-base max-w-2xl mx-auto">
            From structural hollow sections to high-pressure seamless pipes, Bhumi Steel
            stocks and supplies the full spectrum of industrial steel products.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            id="products-enquire-all-cta"
            className="btn-outline-green text-sm"
          >
            Request a Full Product Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
