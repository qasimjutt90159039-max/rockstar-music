import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ShoppingCart, Trash2, ArrowRight, Check, Star } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';

const ComparePage = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (compareItems.length === 0) {
    return (
      <div className="bg-[#000000] min-h-[75vh] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 rounded-full bg-studio-card border border-studio-border flex items-center justify-center mb-4 text-studio-gold">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 font-display">No Instruments to Compare</h1>
        <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
          Select up to 4 instruments from the same family (e.g. guitars vs guitars, mics vs mics) using the scale icon on any product card.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2"
        >
          <span>Browse Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // Extract all unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(
      compareItems.flatMap((item) => (item.specifications || []).map((s) => s.key))
    )
  );

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-studio-border mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-1">
              Specification Matrix
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              COMPARE INSTRUMENTS
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Comparing {compareItems.length} instrument models side-by-side.
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-[#151515] border border-studio-border hover:border-red-500/50 text-gray-300 hover:text-red-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Comparison</span>
          </button>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto pb-6">
          <div className="min-w-[700px] border border-studio-border rounded-3xl overflow-hidden bg-[#0E0E0E]">
            {/* Products Header Row */}
            <div className="grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border bg-[#151515]">
              <div className="p-4 sm:p-6 flex flex-col justify-end font-bold text-xs text-gray-400 uppercase font-mono">
                Instrument
              </div>
              {compareItems.map((item) => (
                <div key={item._id || item.productId} className="p-4 sm:p-6 flex flex-col items-center text-center relative group">
                  <button
                    onClick={() => removeFromCompare(item._id || item.productId)}
                    className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-black transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-black rounded-xl p-2 mb-3 border border-studio-border flex items-center justify-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                      }}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <span className="text-[10px] font-mono text-studio-gold font-bold uppercase">
                    {item.brand}
                  </span>
                  <Link
                    to={`/product/${item.slug}`}
                    className="text-xs sm:text-sm font-bold text-white hover:text-studio-gold transition-colors line-clamp-2 mt-1 mb-2"
                  >
                    {item.name}
                  </Link>

                  <div className="text-sm sm:text-base font-mono font-black text-studio-gold mb-3">
                    PKR {(item.salePrice || item.price).toLocaleString()}
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    disabled={item.stock <= 0}
                    className="w-full py-2 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all disabled:bg-gray-800 disabled:text-gray-500"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
              {/* Fill remaining empty columns if < 4 */}
              {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                <div key={i} className="p-6 flex flex-col items-center justify-center text-center text-gray-600 border-dashed">
                  <span className="text-xs">Add another product to compare</span>
                  <Link to="/shop" className="text-xs text-studio-gold hover:underline mt-2">
                    + Add from Shop
                  </Link>
                </div>
              ))}
            </div>

            {/* Row: Brand & Category */}
            <div className="grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border/70 text-xs py-3 px-4 sm:px-6 bg-[#0B0B0B]">
              <div className="font-semibold text-gray-400">Category</div>
              {compareItems.map((item) => (
                <div key={item._id || item.productId} className="text-center font-medium text-gray-200">
                  {item.category} ({item.subcategory || '-'})
                </div>
              ))}
              {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                <div key={i} />
              ))}
            </div>

            {/* Row: Stock Status */}
            <div className="grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border/70 text-xs py-3 px-4 sm:px-6">
              <div className="font-semibold text-gray-400">Availability</div>
              {compareItems.map((item) => (
                <div key={item._id || item.productId} className="text-center">
                  {item.stock > 0 ? (
                    <span className="text-emerald-400 font-semibold inline-flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> In Stock ({item.stock})
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">Out of Stock</span>
                  )}
                </div>
              ))}
              {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                <div key={i} />
              ))}
            </div>

            {/* Row: Weight */}
            <div className="grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border/70 text-xs py-3 px-4 sm:px-6 bg-[#0B0B0B]">
              <div className="font-semibold text-gray-400">Weight</div>
              {compareItems.map((item) => (
                <div key={item._id || item.productId} className="text-center font-mono text-gray-300">
                  {item.weight || '-'}
                </div>
              ))}
              {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                <div key={i} />
              ))}
            </div>

            {/* Row: Dimensions */}
            <div className="grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border/70 text-xs py-3 px-4 sm:px-6">
              <div className="font-semibold text-gray-400">Dimensions</div>
              {compareItems.map((item) => (
                <div key={item._id || item.productId} className="text-center font-mono text-gray-300">
                  {item.dimensions || '-'}
                </div>
              ))}
              {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                <div key={i} />
              ))}
            </div>

            {/* Technical Specifications Matrix Rows */}
            {allSpecKeys.map((key, idx) => (
              <div
                key={key}
                className={`grid grid-cols-5 divide-x divide-studio-border border-b border-studio-border/70 text-xs py-3 px-4 sm:px-6 ${
                  idx % 2 === 0 ? 'bg-[#0B0B0B]' : 'bg-[#0E0E0E]'
                }`}
              >
                <div className="font-semibold text-gray-400">{key}</div>
                {compareItems.map((item) => {
                  const specObj = (item.specifications || []).find((s) => s.key === key);
                  return (
                    <div key={item._id || item.productId} className="text-center text-gray-200">
                      {specObj ? specObj.value : <span className="text-gray-600">—</span>}
                    </div>
                  );
                })}
                {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                  <div key={i} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
