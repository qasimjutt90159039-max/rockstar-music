import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/catalog';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import AudioWave from '../components/common/AudioWave';

const CategoryPage = ({ categorySlug: propSlug, customTitle, customDescription, filterType }) => {
  const params = useParams();
  const location = useLocation();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Determine category slug from props or URL
  const slug = propSlug || params.categorySlug || location.pathname.replace('/', '');

  const categoryMeta = INITIAL_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  ) || {
    name: customTitle || (slug ? slug.replace('-', ' ').toUpperCase() : 'Instruments'),
    description: customDescription || 'Verified musical equipment and professional studio instruments.'
  };

  // Filter products for this page
  const products = INITIAL_PRODUCTS.filter((product) => {
    if (filterType === 'new') return product.isNewProduct;
    if (filterType === 'bestSeller') return product.isBestSeller;
    if (filterType === 'deals') return product.salePrice && product.salePrice < product.price;

    const matchCat = product.category.toLowerCase() === slug.toLowerCase() ||
      (slug === 'audio' && product.category === 'Audio Equipment');

    if (!matchCat) return false;

    if (selectedSubcategory) {
      return product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();
    }

    return true;
  });

  // Collect distinct subcategories
  const subcategories = Array.from(
    new Set(
      INITIAL_PRODUCTS.filter((p) => p.category.toLowerCase() === slug.toLowerCase() || (slug === 'audio' && p.category === 'Audio Equipment'))
        .map((p) => p.subcategory)
        .filter(Boolean)
    )
  );

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header Hero */}
        <div className="bg-gradient-to-r from-[#151515] to-[#0A0A0A] border border-studio-border rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase tracking-widest mb-2">
              <AudioWave count={4} height={14} />
              <span>Catalog Section</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight mb-4">
              {categoryMeta.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              {categoryMeta.description}
            </p>
          </div>

          <div className="absolute right-6 bottom-4 text-xs font-mono text-gray-500">
            {products.length} Products Verified
          </div>
        </div>

        {/* Subcategory Pills */}
        {subcategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setSelectedSubcategory('')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedSubcategory === ''
                  ? 'bg-studio-gold text-black'
                  : 'bg-[#151515] border border-studio-border text-gray-300 hover:text-white'
              }`}
            >
              All {categoryMeta.name}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSubcategory === sub
                    ? 'bg-studio-gold text-black'
                    : 'bg-[#151515] border border-studio-border text-gray-300 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-[#151515] border border-studio-border rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-sm">No instruments currently cataloged in this selection.</p>
            <Link to="/shop" className="text-studio-gold text-xs font-bold hover:underline mt-2 inline-block">
              Browse full store catalog →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.productId}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default CategoryPage;
