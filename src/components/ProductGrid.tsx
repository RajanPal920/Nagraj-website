import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { getProductImage } from "../data/productImages";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export function ProductGrid() {
  const { types, typeTree, loading } = useProducts();
  const [headerRef, headerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [gridRef, gridVisible] = useIntersectionObserver<HTMLDivElement>();

  // FIX: Use typeTree keys if types array is empty
  const productTypes =
    types && types.length > 0 ? types : Object.keys(typeTree || {});

  // ─── NEW: Limit to 8 product types ───
  const limitedProductTypes = productTypes.slice(0, 8);

  console.log("ProductGrid - Fixed:", {
    productTypes,
    limited: limitedProductTypes,
    typeTreeKeys: Object.keys(typeTree || {}),
  });

  return (
    <section id="products" className="section-padding bg-gray-50">
      <div className="container-xl px-4 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-10 ${headerVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <p className="section-label text-brand-red">Our Range</p>
          <h2 className="section-title text-brand-charcoal mx-auto">
            Product <span className="text-brand-red">Categories</span>
          </h2>
          <div className="section-divider mx-auto bg-brand-red" />
          <p className="font-body text-gray-500 text-base max-w-2xl mx-auto">
            From structural profiles to high-pressure seamless pipes, Nagraj
            Metal Industries stocks and supplies the full spectrum of industrial
            steel products.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="min-h-[200px]">
          {loading ? (
            <div className="text-center py-12 text-gray-400 font-body">
              Loading catalogue...
            </div>
          ) : limitedProductTypes.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-body">
              No product types available
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {limitedProductTypes.map((type, index) => {
                  const groups = typeTree[type] || [];
                  // Calculate count based on your data structure
                  const count = groups.reduce(
                    (acc, g) =>
                      acc +
                      (g.categories?.reduce(
                        (c, cat) => c + (cat.products?.length || 0),
                        0,
                      ) || 0),
                    0,
                  );
                  const image = getProductImage(type, undefined, type);
                  const topGroups = groups.map((g) => g.group).slice(0, 3);

                  return (
                    <article
                      key={type}
                      id={`home-product-card-${type.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`card-base flex flex-col group overflow-hidden bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${
                        gridVisible
                          ? `animate-fade-in-up stagger-${(index % 4) + 1}`
                          : "opacity-0"
                      }`}
                    >
                      {/* Image Header - Reduced height */}
                      <div className="relative h-32 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={image}
                          alt={type}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      {/* Content - Compact spacing */}
                      <div className="p-4 flex flex-col flex-1">
                        {/* Name - Smaller text */}
                        <h3 className="font-display font-bold text-base text-brand-charcoal mb-0.5 group-hover:text-brand-red transition-colors duration-200">
                          {type}
                        </h3>

                        {/* Count - Smaller text */}
                        <p className="font-body text-[10px] font-semibold text-brand-red uppercase tracking-wider mb-2">
                          {count} Specifications
                        </p>

                        {/* Top Groups / Materials - Compact */}
                        {topGroups.length > 0 && (
                          <ul className="flex flex-wrap gap-1 mb-3">
                            {topGroups.map((g) => (
                              <li
                                key={g}
                                className="text-[10px] font-body font-medium text-brand-red bg-brand-red/8 px-1.5 py-0.5 rounded border border-brand-red/15"
                              >
                                {g}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* CTA - Compact */}
                        <div className="mt-auto pt-1">
                          <Link
                            to={`/products?type=${encodeURIComponent(type)}`}
                            id={`home-product-card-${type.toLowerCase().replace(/\s+/g, "-")}-link`}
                            className="inline-flex items-center gap-1 text-xs font-display font-bold text-brand-red hover:text-brand-red-dark transition-colors duration-200 group/link"
                          >
                            Explore
                            <ArrowRight
                              size={12}
                              className="transition-transform group-hover/link:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* ─── NEW: Show "View All" link if there are more than 8 products ─── */}
              {/* {productTypes.length > 8 && (
                <div className="text-center mt-6">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-display font-semibold text-brand-red hover:text-brand-red-dark transition-colors duration-200 group"
                  >
                    View All {productTypes.length} Categories
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              )} */}
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            id="products-view-full-catalogue-cta"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-display font-bold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
          >
            View Full Product Catalogue
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}