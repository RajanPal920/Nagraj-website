import { useState } from 'react';
import { Search, X, ChevronDown, ChevronRight, SlidersHorizontal } from 'lucide-react';
import type { CategoryGroupNode } from '../hooks/useProducts';
import { getTypeDisplayLabel } from '../data/categoryConfig';

// ── Props ─────────────────────────────────────────────────────────────────────

interface ProductsFilterProps {
  search: string;
  onSearch: (v: string) => void;
  selectedCategory: string;
  onCategory: (v: string) => void;
  selectedType: string;
  onType: (v: string) => void;
  totalCount: number;
  filteredCount: number;
  categoryTree: CategoryGroupNode[];
  /** Mobile drawer open state managed by parent */
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProductsFilter({
  search,
  onSearch,
  selectedCategory,
  onCategory,
  selectedType,
  onType,
  totalCount,
  filteredCount,
  categoryTree,
  mobileOpen = false,
  onMobileClose,
}: ProductsFilterProps) {
  const isFiltered = !!(search || selectedCategory || selectedType);

  const clearAll = () => {
    onSearch('');
    onCategory('');
    onType('');
  };

  const handleCategoryClick = (cat: string) => {
    if (selectedCategory === cat) {
      // deselect
      onCategory('');
      onType('');
    } else {
      onCategory(cat);
      onType(''); // reset subcategory when switching category
    }
  };

  const handleTypeClick = (cat: string, type: string) => {
    if (selectedCategory === cat && selectedType === type) {
      onType(''); // deselect subcategory only
    } else {
      onCategory(cat);
      onType(type);
    }
  };

  const sidebarContent = (
    <aside className="flex flex-col h-full">
      {/* ── Search ── */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            id="products-search-input"
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products, grades…"
            className="w-full pl-9 pr-4 py-2.5 text-sm font-body border border-gray-200 rounded-sm
                       bg-gray-50 focus:bg-white focus:border-brand-green focus:outline-none
                       focus:ring-2 focus:ring-brand-green/20 transition-all duration-200
                       placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ── Filter header ── */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-gray-400">
          Browse by Category
        </span>
        {isFiltered && (
          <button
            id="products-filter-clear"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[10px] font-display font-semibold
                       text-gray-400 hover:text-brand-red transition-colors duration-200"
          >
            <X size={11} />
            Clear
          </button>
        )}
      </div>

      {/* ── All Products chip ── */}
      <div className="px-3 pb-2">
        <button
          id="cat-all"
          onClick={clearAll}
          className={`w-full text-left px-3 py-2 rounded-sm text-sm font-display font-semibold
                     flex items-center justify-between transition-all duration-150
                     ${!selectedCategory && !search
                       ? 'bg-brand-green text-white'
                       : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <span>All Products</span>
          <span className={`text-xs font-body rounded-full px-2 py-0.5 leading-none
                           ${!selectedCategory && !search ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {totalCount}
          </span>
        </button>
      </div>

      {/* ── Tree ── */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-1 scrollbar-thin">
        {categoryTree.map((groupNode) => (
          <GroupSection
            key={groupNode.group}
            groupNode={groupNode}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            onCategoryClick={handleCategoryClick}
            onTypeClick={handleTypeClick}
            filteredCount={filteredCount}
          />
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-gray-100 bg-white min-h-[calc(100vh-80px)] sticky top-[80px] self-start max-h-[calc(100vh-80px)] overflow-hidden">
        {sidebarContent}
      </div>

      {/* ── Mobile drawer backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden
                   ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="font-display font-bold text-sm text-brand-charcoal">Filter Products</span>
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-sm hover:bg-gray-100 transition-colors"
            aria-label="Close filters"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="h-[calc(100%-52px)] overflow-hidden">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}

// ── Mobile trigger button (exported for use in ProductsPage) ──────────────────

interface MobileFilterTriggerProps {
  onClick: () => void;
  filteredCount: number;
  totalCount: number;
  isFiltered: boolean;
}

export function MobileFilterTrigger({ onClick, filteredCount, totalCount, isFiltered }: MobileFilterTriggerProps) {
  return (
    <button
      id="products-mobile-filter-btn"
      onClick={onClick}
      className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-gray-200
                 bg-white text-sm font-display font-semibold text-gray-600
                 hover:border-brand-green hover:text-brand-green transition-all duration-200"
    >
      <SlidersHorizontal size={15} />
      Filter
      {isFiltered && (
        <span className="ml-1 w-5 h-5 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center justify-center">
          ✓
        </span>
      )}
      <span className="text-xs font-body text-gray-400">
        {isFiltered ? `${filteredCount} / ${totalCount}` : totalCount}
      </span>
    </button>
  );
}

// ── Group section ─────────────────────────────────────────────────────────────

interface GroupSectionProps {
  groupNode: CategoryGroupNode;
  selectedCategory: string;
  selectedType: string;
  onCategoryClick: (cat: string) => void;
  onTypeClick: (cat: string, type: string) => void;
  filteredCount: number;
}

function GroupSection({
  groupNode,
  selectedCategory,
  selectedType,
  onCategoryClick,
  onTypeClick,
}: GroupSectionProps) {
  const groupHasActive = groupNode.categories.some((c) => c.category === selectedCategory);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mt-3 first:mt-0">
      {/* Group header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-2 py-1.5 group"
        aria-expanded={!collapsed}
      >
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-gray-400 group-hover:text-brand-green transition-colors">
          {groupNode.group}
        </span>
        {collapsed
          ? <ChevronRight size={12} className="text-gray-300 group-hover:text-brand-green transition-colors" />
          : <ChevronDown size={12} className="text-gray-300 group-hover:text-brand-green transition-colors" />
        }
      </button>

      {!collapsed && (
        <div className="mt-0.5 space-y-0.5">
          {groupNode.categories.map((catNode) => (
            <CategoryRow
              key={catNode.category}
              catNode={catNode}
              isActive={selectedCategory === catNode.category}
              activeType={selectedCategory === catNode.category ? selectedType : ''}
              onCategoryClick={onCategoryClick}
              onTypeClick={onTypeClick}
              forceOpen={groupHasActive && selectedCategory === catNode.category}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Category row ──────────────────────────────────────────────────────────────

interface CategoryRowProps {
  catNode: { category: string; label: string; totalCount: number; subcategories: { type: string; count: number }[] };
  isActive: boolean;
  activeType: string;
  onCategoryClick: (cat: string) => void;
  onTypeClick: (cat: string, type: string) => void;
  forceOpen?: boolean;
}

function CategoryRow({
  catNode,
  isActive,
  activeType,
  onCategoryClick,
  onTypeClick,
  forceOpen = false,
}: CategoryRowProps) {
  const [open, setOpen] = useState(forceOpen);
  const hasSubcats = catNode.subcategories.length > 1; // only expand if multiple types

  const handleClick = () => {
    onCategoryClick(catNode.category);
    if (hasSubcats) setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center gap-1">
        {/* Expand toggle (only if multiple types) */}
        {hasSubcats ? (
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-1 text-gray-300 hover:text-brand-green transition-colors flex-shrink-0"
            aria-label={open ? 'Collapse' : 'Expand'}
          >
            {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
        ) : (
          <span className="w-6 flex-shrink-0" />
        )}

        {/* Category button */}
        <button
          id={`cat-${catNode.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          onClick={handleClick}
          className={`flex-1 flex items-center justify-between px-2.5 py-2 rounded-sm text-xs
                     font-display font-semibold transition-all duration-150 text-left
                     ${isActive && !activeType
                       ? 'bg-brand-green text-white'
                       : isActive
                         ? 'bg-brand-green/10 text-brand-green'
                         : 'text-gray-600 hover:bg-gray-100 hover:text-brand-green'}`}
        >
          <span className="leading-snug">{catNode.label}</span>
          <span className={`text-[10px] font-body rounded-full px-1.5 py-0.5 leading-none ml-2 flex-shrink-0
                           ${isActive && !activeType
                             ? 'bg-white/20 text-white'
                             : isActive
                               ? 'bg-brand-green/15 text-brand-green'
                               : 'bg-gray-100 text-gray-400'}`}>
            {catNode.totalCount}
          </span>
        </button>
      </div>

      {/* Subcategory list */}
      {hasSubcats && open && (
        <div className="ml-6 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-2">
          {/* "All" sub-option */}
          <button
            id={`subcat-${catNode.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-all`}
            onClick={() => { onCategoryClick(catNode.category); onTypeClick(catNode.category, ''); }}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-xs
                       font-display font-medium transition-all duration-150 text-left
                       ${isActive && !activeType
                         ? 'text-brand-green font-semibold'
                         : 'text-gray-400 hover:text-brand-green hover:bg-gray-50'}`}
          >
            <span>All</span>
            <span className={`text-[10px] font-body px-1.5 py-0.5 rounded-full leading-none
                             ${isActive && !activeType ? 'bg-brand-green/10 text-brand-green' : 'bg-gray-100 text-gray-400'}`}>
              {catNode.totalCount}
            </span>
          </button>

          {catNode.subcategories.map(({ type, count }) => (
            <button
              key={type}
              id={`subcat-${catNode.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => onTypeClick(catNode.category, type)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-sm text-xs
                         font-display font-medium transition-all duration-150 text-left
                         ${isActive && activeType === type
                           ? 'bg-brand-green text-white font-semibold'
                           : 'text-gray-500 hover:text-brand-green hover:bg-gray-50'}`}
            >
              <span>{getTypeDisplayLabel(type)}</span>
              <span className={`text-[10px] font-body px-1.5 py-0.5 rounded-full leading-none
                               ${isActive && activeType === type
                                 ? 'bg-white/20 text-white'
                                 : 'bg-gray-100 text-gray-400'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
