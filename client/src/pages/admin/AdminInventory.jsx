import React, { useState } from 'react';
import { Boxes, Search, AlertTriangle, Check, ArrowUpDown, Plus, Minus } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../../data/catalog';
import { useToast } from '../../context/ToastContext';

const AdminInventory = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'low' | 'out'
  const { addToast } = useToast();

  const handleAdjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if ((p._id || p.productId) === id) {
          const newStock = Math.max(0, p.stock + delta);
          const newStatus = newStock === 0 ? 'out_of_stock' : newStock <= 3 ? 'low_stock' : 'in_stock';
          addToast(`Updated stock for ${p.name}: ${newStock} units`, 'info');
          return { ...p, stock: newStock, stockStatus: newStatus };
        }
        return p;
      })
    );
  };

  const handleSetStock = (id, newQty) => {
    const qty = Math.max(0, parseInt(newQty, 10) || 0);
    setProducts((prev) =>
      prev.map((p) => {
        if ((p._id || p.productId) === id) {
          const newStatus = qty === 0 ? 'out_of_stock' : qty <= 3 ? 'low_stock' : 'in_stock';
          return { ...p, stock: qty, stockStatus: newStatus };
        }
        return p;
      })
    );
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filterMode === 'low') return p.stock > 0 && p.stock <= 3;
    if (filterMode === 'out') return p.stock <= 0;
    return true;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Warehouse & Store Stock
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            INVENTORY MANAGEMENT
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-studio-gold text-black'
                : 'bg-[#151515] border border-studio-border text-gray-300'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'low'
                ? 'bg-amber-500 text-black font-extrabold'
                : 'bg-[#151515] border border-studio-border text-amber-400'
            }`}
          >
            Low Stock ({products.filter((p) => p.stock > 0 && p.stock <= 3).length})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterMode === 'out'
                ? 'bg-red-500 text-black font-extrabold'
                : 'bg-[#151515] border border-studio-border text-red-400'
            }`}
          >
            Out of Stock ({products.filter((p) => p.stock <= 0).length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by SKU, instrument name, or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-[#111111] border border-studio-border rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515] text-gray-400 border-b border-studio-border font-mono">
              <tr>
                <th className="p-4">Instrument / SKU</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Current Stock</th>
                <th className="p-4 text-center">Quick Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border/50">
              {filtered.map((prod) => {
                const id = prod._id || prod.productId;
                return (
                  <tr key={id} className="hover:bg-black/50 transition-colors">
                    <td className="p-4 font-semibold text-white flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt=""
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                        }}
                        className="w-10 h-10 object-contain rounded-lg bg-black border border-studio-border flex-shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white">{prod.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">SKU: {prod.sku}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-studio-gold font-bold">{prod.brand}</td>
                    <td className="p-4">
                      {prod.stock <= 0 ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-red-950/60 text-red-400 border border-red-800">
                          Out of Stock
                        </span>
                      ) : prod.stock <= 3 ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-amber-950/60 text-amber-400 border border-amber-800">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800 flex items-center gap-1 w-max">
                          <Check className="w-3 h-3" /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="number"
                        min="0"
                        value={prod.stock}
                        onChange={(e) => handleSetStock(id, e.target.value)}
                        className="w-16 px-2 py-1 bg-black border border-studio-border rounded-lg text-center font-mono font-bold text-white text-xs focus:outline-none focus:border-studio-gold"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-black border border-studio-border rounded-xl p-1">
                        <button
                          onClick={() => handleAdjustStock(id, -1)}
                          disabled={prod.stock <= 0}
                          className="p-1 hover:bg-[#222] text-gray-400 hover:text-white rounded disabled:opacity-30"
                          title="Decrease 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(id, 1)}
                          className="p-1 hover:bg-[#222] text-gray-400 hover:text-white rounded"
                          title="Add 1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAdjustStock(id, 5)}
                          className="px-2 py-0.5 text-[10px] font-mono text-studio-gold hover:bg-[#222] rounded font-bold"
                          title="Add 5"
                        >
                          +5
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
