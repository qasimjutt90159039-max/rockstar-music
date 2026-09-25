import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

const CompareDrawer = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-t border-studio-gold/40 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Summary */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-studio-gold text-black rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Compare Instruments</span>
              <span className="text-xs font-mono text-studio-gold">({compareItems.length}/4 selected)</span>
            </div>
            <div className="text-[11px] text-gray-400 hidden sm:block">
              Compare specifications, weights, dimensions & included items side-by-side
            </div>
          </div>
        </div>

        {/* Center: Selected Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {compareItems.map((item) => (
            <div
              key={item._id || item.productId}
              className="relative group bg-black/60 border border-studio-border rounded-lg p-1.5 flex items-center gap-2 flex-shrink-0"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                }}
                className="w-8 h-8 object-contain rounded"
              />
              <span className="text-xs text-gray-200 max-w-[100px] truncate hidden md:inline">
                {item.name}
              </span>
              <button
                onClick={() => removeFromCompare(item._id || item.productId)}
                className="text-gray-400 hover:text-red-400 p-0.5"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={clearCompare}
            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className="px-4 py-2 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-studio-gold/15"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
