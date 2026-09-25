import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Check, 
  X, 
  Star, 
  Upload, 
  DollarSign, 
  Layers 
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS } from '../../data/catalog';
import { useToast } from '../../context/ToastContext';

const AdminProducts = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();

  // Form State for Create/Edit
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Yamaha',
    category: 'Guitars',
    subcategory: '',
    price: '',
    salePrice: '',
    sku: '',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop'],
    description: '',
    shortDescription: '',
    weight: '',
    dimensions: '',
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: false,
    specifications: [
      { key: 'Material', value: 'Standard Grade' },
      { key: 'Finish', value: 'Gloss' }
    ]
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: 'Yamaha',
      category: 'Guitars',
      subcategory: '',
      price: '',
      salePrice: '',
      sku: 'RS-' + Math.floor(1000 + Math.random() * 9000),
      stock: 5,
      images: ['https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop'],
      description: '',
      shortDescription: '',
      weight: '',
      dimensions: '',
      isFeatured: false,
      isNewProduct: true,
      isBestSeller: false,
      specifications: [
        { key: 'Material', value: 'High Grade' },
        { key: 'Warranty', value: 'Store Inspection' }
      ]
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      subcategory: prod.subcategory || '',
      price: prod.price,
      salePrice: prod.salePrice || '',
      sku: prod.sku,
      stock: prod.stock,
      images: prod.images || [],
      description: prod.description,
      shortDescription: prod.shortDescription || '',
      weight: prod.weight || '',
      dimensions: prod.dimensions || '',
      isFeatured: !!prod.isFeatured,
      isNewProduct: !!prod.isNewProduct,
      isBestSeller: !!prod.isBestSeller,
      specifications: prod.specifications || []
    });
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from store catalog?`)) {
      setProducts((prev) => prev.filter((p) => (p._id || p.productId) !== id));
      addToast(`"${name}" removed from catalog.`, 'info');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) {
      addToast('Please complete name, price, and SKU.', 'warning');
      return;
    }

    if (editingProduct) {
      // Update
      const updated = {
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock),
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      };
      setProducts((prev) =>
        prev.map((p) => ((p._id || p.productId) === (editingProduct._id || editingProduct.productId) ? updated : p))
      );
      addToast(`Updated "${formData.name}" successfully!`, 'success');
    } else {
      // Create
      const newProd = {
        _id: 'prod_' + Date.now(),
        productId: 'PROD-' + Date.now(),
        ...formData,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock),
        slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        rating: 5.0,
        reviewCount: 0,
        priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
      };
      setProducts((prev) => [newProd, ...prev]);
      addToast(`Added "${formData.name}" to catalog!`, 'success');
    }
    setModalOpen(false);
  };

  const handleAddSpec = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const handleSpecChange = (index, field, val) => {
    const nextSpecs = [...formData.specifications];
    nextSpecs[index][field] = val;
    setFormData((prev) => ({ ...prev, specifications: nextSpecs }));
  };

  const handleRemoveSpec = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory ? p.category === selectedCategory : true;
    return matchSearch && matchCat;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Store Catalog Management
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            INSTRUMENTS & PRODUCTS ({products.length})
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-studio-gold/15"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Instrument</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111111] border border-studio-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, brand, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-studio-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-black border border-studio-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-studio-gold w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            {INITIAL_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#111111] border border-studio-border rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515] text-gray-400 border-b border-studio-border font-mono">
              <tr>
                <th className="p-4">Instrument</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Price (PKR)</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Badges</th>
                <th className="p-4 text-right">Actions</th>
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
                      <span className="truncate max-w-xs">{prod.name}</span>
                    </td>
                    <td className="p-4 font-mono text-studio-gold">{prod.brand}</td>
                    <td className="p-4 text-gray-400">{prod.category}</td>
                    <td className="p-4 font-mono text-gray-400">{prod.sku}</td>
                    <td className="p-4 font-mono font-bold text-white">
                      {(prod.salePrice || prod.price).toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                          prod.stock <= 0
                            ? 'bg-red-950/60 text-red-400 border border-red-800'
                            : prod.stock <= 3
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {prod.stock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {prod.isFeatured && (
                          <span className="w-2 h-2 rounded-full bg-studio-gold" title="Featured" />
                        )}
                        {prod.isNewProduct && (
                          <span className="w-2 h-2 rounded-full bg-blue-400" title="New" />
                        )}
                        {prod.isBestSeller && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Best Seller" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-1.5 text-gray-400 hover:text-studio-gold rounded-lg hover:bg-black"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id, prod.name)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-black"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Create / Edit Modal (Prompt Section 27) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-studio-border mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Edit Instrument' : 'Add New Instrument to Catalog'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 block mb-1 font-medium">Instrument Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Yamaha F310 Acoustic Guitar"
                  className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Brand</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                  >
                    {INITIAL_BRANDS.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Regular Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Sale Price (Optional)</label>
                  <input
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block mb-1 font-medium">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="2.4 kg"
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-300 block mb-1 font-medium">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="104 x 40 x 12 cm"
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 block mb-1 font-medium">Primary Image URL</label>
                <input
                  type="url"
                  value={formData.images[0] || ''}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1 font-medium">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence summary"
                  className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 block mb-1 font-medium">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                />
              </div>

              {/* Badges */}
              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#F5C542]"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNewProduct}
                    onChange={(e) => setFormData({ ...formData, isNewProduct: e.target.checked })}
                    className="accent-[#F5C542]"
                  />
                  <span>Mark as New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-[#F5C542]"
                  />
                  <span>Best Seller</span>
                </label>
              </div>

              {/* Specifications Builder */}
              <div className="pt-3 border-t border-studio-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white">Technical Specifications</span>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-studio-gold hover:underline font-bold"
                  >
                    + Add Spec Row
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.specifications.map((sp, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Key (e.g. Top Material)"
                        value={sp.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-black border border-studio-border rounded-lg text-white"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. Spruce)"
                        value={sp.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-black border border-studio-border rounded-lg text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-gray-500 hover:text-red-400 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-studio-border flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#222] text-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-studio-gold text-black font-bold rounded-xl shadow-lg shadow-studio-gold/15"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
