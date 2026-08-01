import { Search, X } from 'lucide-react';
import { getCategoryLabel } from '../data/scrapedProductsData';

interface ProductsFilterProps {
  search: string;
  onSearch: (v: string) => void;
  selectedCategory: string;
  onCategory: (v: string) => void;
  selectedType: string;
  onType: (v: string) => void;
  totalCount: number;
  filteredCount: number;
  categories: string[];
  types: string[];
  categoryCounts: Record<string, number>;
  typeCounts: Record<string, number>;
}

export function ProductsFilter({
  search,
  onSearch,
  selectedCategory,
  onCategory,
  selectedType,
  onType,
  totalCount,
  filteredCount,
  categories,
  types,
  categoryCounts,
  typeCounts,
}: ProductsFilterProps) {
  const isFiltered = search || selectedCategory || selectedType;

  const clearAll = () => {
    onSearch('');
    onCategory('');
    onType('');
  };

  return (
    <div
      id="products-filter-bar"
      className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30 py-4 px-4 sm:px-8 lg:px-16 xl:px-24"
    >
      <div className="max-w-7xl mx-auto space-y-3">

        {/* Top row: search + result count */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              id="products-search-input"
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products, grades, standards…"
              className="w-full pl-9 pr-4 py-2.5 text-sm font-body border border-gray-200 rounded-sm
                         bg-gray-50 focus:bg-white focus:border-brand-green focus:outline-none
                         focus:ring-2 focus:ring-brand-green/20 transition-all duration-200
                         placeholder:text-gray-500"
            />
          </div>

          {/* Results count */}
          <span className="text-xs font-body text-gray-500 whitespace-nowrap">
            {isFiltered ? (
              <><span className="font-semibold text-brand-green">{filteredCount}</span> of {totalCount}</>
            ) : (
              <><span className="font-semibold text-brand-charcoal">{totalCount}</span> products</>
            )}
          </span>

          {/* Clear filters */}
          {isFiltered && (
            <button
              id="products-filter-clear"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs font-display font-bold text-gray-400
                         hover:text-brand-red transition-colors duration-200 whitespace-nowrap"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-500 shrink-0 mr-1">
            Category
          </span>
          {/* "All" chip */}
          <FilterChip
            id="cat-all"
            label="All"
            count={totalCount}
            active={!selectedCategory}
            onClick={() => onCategory('')}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              label={getCategoryLabel(cat)}
              count={categoryCounts[cat] ?? 0}
              active={selectedCategory === cat}
              onClick={() => onCategory(selectedCategory === cat ? '' : cat)}
              specialized={cat !== 'Products'}
            />
          ))}
        </div>

        {/* Type chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gray-500 shrink-0 mr-1">
            Type
          </span>
          <FilterChip
            id="type-all"
            label="All Types"
            count={totalCount}
            active={!selectedType}
            onClick={() => onType('')}
          />
          {types.map((type) => (
            <FilterChip
              key={type}
              id={`type-${type.toLowerCase()}`}
              label={type}
              count={typeCounts[type] ?? 0}
              active={selectedType === type}
              onClick={() => onType(selectedType === type ? '' : type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component: individual chip ───────────────────────────────────────────

interface FilterChipProps {
  id: string;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  specialized?: boolean;
}

function FilterChip({ id, label, count, active, onClick, specialized }: FilterChipProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-display font-semibold
                  px-3 py-1.5 rounded-sm border transition-all duration-200 whitespace-nowrap
                  ${active
                    ? specialized
                      ? 'bg-brand-gold border-brand-gold text-white shadow-gold'
                      : 'bg-brand-green border-brand-green text-white shadow-sm'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-brand-green hover:text-brand-green'
                  }`}
    >
      {label}
      <span className={`text-[10px] font-body rounded-full px-1.5 py-0.5 leading-none
                        ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
        {count}
      </span>
    </button>
  );
}
