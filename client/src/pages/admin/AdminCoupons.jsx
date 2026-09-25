import React, { useState } from 'react';
import { Tag, Plus, Trash2, Check, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const INITIAL_COUPONS = [
  {
    id: 'c1',
    couponCode: 'ROCKSTAR10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 5000,
    maximumDiscount: 5000,
    expiryDate: '2027-12-31',
    usageLimit: 500,
    usageCount: 14,
    isActive: true
  },
  {
    id: 'c2',
    couponCode: 'STUDIO2000',
    discountType: 'fixed',
    discountValue: 2000,
    minimumOrder: 25000,
    maximumDiscount: null,
    expiryDate: '2027-12-31',
    usageLimit: 200,
    usageCount: 5,
    isActive: true
  },
  {
    id: 'c3',
    couponCode: 'WELCOME5',
    discountType: 'percentage',
    discountValue: 5,
    minimumOrder: 1000,
    maximumDiscount: 2000,
    expiryDate: '2027-12-31',
    usageLimit: 1000,
    usageCount: 22,
    isActive: true
  }
];

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    couponCode: '',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 5000,
    maximumDiscount: '',
    expiryDate: '2027-12-31',
    usageLimit: 100
  });

  const handleToggle = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    addToast('Coupon status updated.', 'info');
  };

  const handleDelete = (id, code) => {
    if (window.confirm(`Delete coupon "${code}"?`)) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      addToast(`Coupon "${code}" deleted.`, 'info');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.couponCode.trim()) return;

    const newCoupon = {
      id: 'c_' + Date.now(),
      couponCode: formData.couponCode.trim().toUpperCase(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minimumOrder: Number(formData.minimumOrder) || 0,
      maximumDiscount: formData.maximumDiscount ? Number(formData.maximumDiscount) : null,
      expiryDate: formData.expiryDate,
      usageLimit: Number(formData.usageLimit) || null,
      usageCount: 0,
      isActive: true
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    addToast(`Coupon "${newCoupon.couponCode}" created!`, 'success');
    setModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Marketing & Discounts
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            COUPON CODES ({coupons.length})
          </h1>
        </div>

        <button
          onClick={() => {
            setFormData({
              couponCode: '',
              discountType: 'percentage',
              discountValue: 10,
              minimumOrder: 5000,
              maximumDiscount: '',
              expiryDate: '2027-12-31',
              usageLimit: 100
            });
            setModalOpen(true);
          }}
          className="px-5 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-studio-gold/15"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#111111] border border-studio-border rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515] text-gray-400 border-b border-studio-border font-mono">
              <tr>
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Min Order</th>
                <th className="p-4">Max Cap</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Expires</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border/50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-black/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-studio-gold text-sm">
                    {c.couponCode}
                  </td>
                  <td className="p-4 font-bold text-white">
                    {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `PKR ${c.discountValue} OFF`}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {c.minimumOrder ? `PKR ${c.minimumOrder.toLocaleString()}` : 'None'}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {c.maximumDiscount ? `PKR ${c.maximumDiscount.toLocaleString()}` : 'No Cap'}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {c.usageCount} / {c.usageLimit || '∞'}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {c.expiryDate}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(c.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                        c.isActive
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.couponCode)}
                      className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-black"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border">
              <h3 className="text-lg font-bold text-white">Create Discount Coupon</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STUDIO15"
                  value={formData.couponCode}
                  onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono uppercase focus:outline-none focus:border-studio-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white focus:outline-none focus:border-studio-gold"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (PKR)</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Min Order (PKR)</label>
                  <input
                    type="number"
                    value={formData.minimumOrder}
                    onChange={(e) => setFormData({ ...formData, minimumOrder: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Max Cap (PKR)</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={formData.maximumDiscount}
                    onChange={(e) => setFormData({ ...formData, maximumDiscount: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-[#222] text-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-studio-gold text-black font-bold rounded-xl"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupons;
