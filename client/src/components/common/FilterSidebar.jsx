import React from 'react';
import { RotateCcw, Star, Check, SlidersHorizontal } from 'lucide-react';
import { INITIAL_CATEGORIES, INITIAL_BRANDS } from '../../data/catalog';

const FilterSidebar = ({
  filters,
  setFilters,
  onReset,
  availableBrands = INITIAL_BRANDS,
  availableCategories = INITIAL_CATEGORIES,
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const handleCategoryChange = (slug) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === slug ? '' : slug,
      page: 1
    }));
  };

  const handleBrandChange = (brandName) => {
    setFilters((prev) => {
      const current = prev.brands || [];
      const updated = current.includes(brandName)
        ? current.filter((b) => b !== brandName)
        : [...current, brandName];
      return { ...prev, brands: updated, page: 1 };
    });
  };

  const handlePriceChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value ? Number(value) : '',
      page: 1
    }));
  };

  const handleRatingChange = (ratingVal) => {
    setFilters((prev) => ({
      ...prev,
      minRating: prev.minRating === ratingVal ? '' : ratingVal,
      page: 1
    }));
  };

  const handleStockChange = (status) => {
    setFilters((prev) => ({
      ...prev,
      stockStatus: prev.stockStatus === status ? '' : status,
      page: 1
    }));
  };

  const handleBadgeToggle = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
      page: 1
    }));
  };

  return (
    <div className={`space-y-6 ${isMobileDrawer ? 'p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-studio-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-studio-gold" />
          <h3 className="font-bold text-white text-base">Filter Catalog</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-studio-gold flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Instrument Category
        </h4>
        <div className="space-y-1.5">
          {availableCategories.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-studio-gold text-black font-bold'
                    : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-black' : 'text-gray-500'}`}>
                  {cat.count || ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Manufacturer Brand
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((b) => {
            const isChecked = (filters.brands || []).includes(b.name);
            return (
              <label
                key={b.name}
                className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer select-none group"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-studio-gold border-studio-gold text-black'
                        : 'border-studio-border bg-black group-hover:border-gray-500'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{b.name}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{b.count || ''}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
          Price Range (PKR)
        </h4>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="text-[10px] text-gray-500 block mb-1">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handlePriceChange('minPrice', e.target.value)}
              className="w-full px-3 py-1.5 bg-black border border-studio-border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-studio-gold font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-500 block mb-1">Max Price</label>
            <input
              type="number"
              placeholder="350000"
              value={filters.maxPrice || ''}
              onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
              className="w-full px-3 py-1.5 bg-black border border-studio-border rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-studio-gold font-mono"
            />
          </div>
        </div>
        <div className="text-[9px] font-mono text-gray-500 bg-[#111111] p-2 rounded border border-studio-border/50 text-center">
          DEMO DATA — VERIFY BEFORE LAUNCH
        </div>
      </div>

      {/* Stock Availability */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
          Availability
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => handleStockChange('in_stock')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
              filters.stockStatus === 'in_stock'
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                : 'bg-black border-studio-border text-gray-400 hover:text-white'
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => handleStockChange('')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${
              !filters.stockStatus
                ? 'bg-[#222222] border-studio-gold text-studio-gold font-bold'
                : 'bg-black border-studio-border text-gray-400 hover:text-white'
            }`}
          >
            All Items
          </button>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
          Customer Rating
        </h4>
        <div className="space-y-1">
          {[4, 3].map((r) => {
            const isSelected = filters.minRating === r;
            return (
              <button
                key={r}
                onClick={() => handleRatingChange(r)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isSelected ? 'bg-[#222222] border border-studio-gold/60' : 'hover:bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex text-studio-gold">
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-300 font-medium">& Up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-studio-gold" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured / Badges */}
      <div>
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
          Product Highlights
        </h4>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!filters.isFeatured}
              onChange={() => handleBadgeToggle('isFeatured')}
              className="accent-[#F5C542] rounded"
            />
            <span>Featured Spotlight</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!filters.isNewProduct}
              onChange={() => handleBadgeToggle('isNewProduct')}
              className="accent-[#F5C542] rounded"
            />
            <span>New Arrivals</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={!!filters.isBestSeller}
              onChange={() => handleBadgeToggle('isBestSeller')}
              className="accent-[#F5C542] rounded"
            />
            <span>Best Sellers</span>
          </label>
        </div>
      </div>

      {isMobileDrawer && (
        <div className="pt-4 border-t border-studio-border">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-studio-gold text-black font-bold rounded-xl text-sm"
          >
            Apply Filters & Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
