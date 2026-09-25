import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Search as SearchIcon, 
  X, 
  ChevronDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS } from '../data/catalog';
import ProductCard from '../components/common/ProductCard';
import FilterSidebar from '../components/common/FilterSidebar';
import QuickViewModal from '../components/common/QuickViewModal';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brands: searchParams.get('brand') ? [searchParams.get('brand')] : [],
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    stockStatus: searchParams.get('stockStatus') || '',
    minRating: searchParams.get('minRating') || '',
    isFeatured: searchParams.get('featured') === 'true',
    isNewProduct: searchParams.get('new') === 'true',
    isBestSeller: searchParams.get('bestSeller') === 'true',
    sort: searchParams.get('sort') || 'featured',
    page: 1
  });

  // Sync search URL query parameter
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch !== null && urlSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, search: urlSearch }));
    }
    const urlCategory = searchParams.get('category');
    if (urlCategory !== null && urlCategory !== filters.category) {
      setFilters((prev) => ({ ...prev, category: urlCategory }));
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brands: [],
      minPrice: '',
      maxPrice: '',
      stockStatus: '',
      minRating: '',
      isFeatured: false,
      isNewProduct: false,
      isBestSeller: false,
      sort: 'featured',
      page: 1
    });
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchCat && !matchSku) return false;
      }

      // Category
      if (filters.category) {
        if (product.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Brand
      if (filters.brands && filters.brands.length > 0) {
        if (!filters.brands.includes(product.brand)) {
          return false;
        }
      }

      // Price
      const effectivePrice = product.salePrice && product.salePrice < product.price
        ? product.salePrice
        : product.price;

      if (filters.minPrice && effectivePrice < Number(filters.minPrice)) return false;
      if (filters.maxPrice && effectivePrice > Number(filters.maxPrice)) return false;

      // Stock
      if (filters.stockStatus === 'in_stock' && product.stock <= 0) return false;

      // Rating
      if (filters.minRating && product.rating < Number(filters.minRating)) return false;

      // Flags
      if (filters.isFeatured && !product.isFeatured) return false;
      if (filters.isNewProduct && !product.isNewProduct) return false;
      if (filters.isBestSeller && !product.isBestSeller) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      switch (filters.sort) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewProduct ? 1 : 0) - (a.isNewProduct ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filters]);

  return (
    <div className="bg-[#000000] min-h-screen text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs text-gray-500 font-mono mb-2">
            <span>Home</span> / <span className="text-studio-gold">Catalog</span>
            {filters.category && <span> / <span className="text-white capitalize">{filters.category}</span></span>}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
                INSTRUMENT CATALOG
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                Verified musical equipment and hardware. Showing {filteredProducts.length} verified products.
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-studio-card border border-studio-border hover:border-studio-gold rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-studio-gold" />
              <span>Filters ({[
                filters.category,
                filters.brands.length,
                filters.minPrice,
                filters.maxPrice,
                filters.stockStatus
              ].filter(Boolean).length})</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Search input, Sort options & View switcher */}
        <div className="bg-[#111111] border border-studio-border rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search within catalog */}
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in catalog..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-8 py-2 bg-black border border-studio-border rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-studio-gold transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
                  className="appearance-none bg-black border border-studio-border rounded-xl px-3 py-2 pr-8 text-xs text-white font-medium focus:outline-none focus:border-studio-gold cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Grid / List Mode */}
            <div className="flex items-center bg-black border border-studio-border rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#222222] text-studio-gold' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#222222] text-studio-gold' : 'text-gray-400 hover:text-white'
                }`}
                aria-label="List view"
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar (Left Panel) */}
          <div className="hidden lg:block bg-[#111111] border border-studio-border rounded-2xl p-6 sticky top-28">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product Grid Area (Right) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="bg-[#111111] border border-studio-border rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-studio-card border border-studio-border flex items-center justify-center mx-auto mb-4 text-studio-gold">
                  <SearchIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Matching Instruments Found</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                  We could not find any musical instruments matching your selected filters. Try broadening your criteria or reset the search.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.productId}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id || product.productId}
                    className="bg-[#151515] border border-studio-border hover:border-studio-gold/60 rounded-2xl p-4 sm:p-6 transition-all flex flex-col sm:flex-row items-center gap-6"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                      }}
                      className="w-36 h-36 object-contain bg-black rounded-xl p-2 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                        <span className="text-studio-gold font-bold uppercase font-mono">{product.brand}</span>
                        <span>•</span>
                        <span>{product.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 truncate">{product.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">{product.shortDescription || product.description}</p>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {product.priceNotice || 'DEMO DATA — VERIFY BEFORE LAUNCH'}
                      </div>
                    </div>
                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <div>
                        <div className="text-lg font-mono font-black text-studio-gold">
                          PKR {(product.salePrice || product.price).toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="px-4 py-2 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl whitespace-nowrap"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#111111] border-r border-studio-border h-full overflow-y-auto ml-auto">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Shop;
