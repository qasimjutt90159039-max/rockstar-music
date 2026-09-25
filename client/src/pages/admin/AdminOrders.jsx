import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, Eye, Filter, Check, Clock, Truck, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const STATUS_OPTIONS = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled'
];

const INITIAL_DEMO_ORDERS = [
  {
    orderNumber: 'RS-ORD-849201',
    customer: {
      fullName: 'Hamza Khan',
      phone: '+92 300 8923411',
      email: 'hamza@example.com',
      address: 'House 42, Street 7, Gulgasht Colony',
      city: 'Multan'
    },
    items: [
      { name: 'Yamaha F310 Acoustic Guitar', quantity: 1, price: 34000, total: 34000 }
    ],
    subtotal: 34000,
    deliveryFee: 0,
    total: 34000,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    orderNumber: 'RS-ORD-739102',
    customer: {
      fullName: 'Bilal Ahmed',
      phone: '+92 321 4455667',
      email: 'bilal@example.com',
      address: 'Flat 3B, DHA Phase 5',
      city: 'Lahore'
    },
    items: [
      { name: 'Shure SM58 Cardioid Dynamic Vocal Microphone', quantity: 2, price: 32500, total: 65000 }
    ],
    subtotal: 65000,
    deliveryFee: 0,
    total: 65000,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Shipped',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/admin/orders');
        if (res.data?.orders && res.data.orders.length > 0) {
          setOrders(res.data.orders);
          return;
        }
      } catch {
        // Fallback to local storage or demo orders
      }
      const saved = JSON.parse(localStorage.getItem('rockstar_user_orders') || '[]');
      const combined = [...saved, ...INITIAL_DEMO_ORDERS];
      setOrders(combined);
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = (orderNum, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNum ? { ...o, orderStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.orderNumber === orderNum) {
      setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
    }
    addToast(`Order ${orderNum} status updated to ${newStatus}`, 'success');
  };

  const handleUpdatePayment = (orderNum, newPayStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNum ? { ...o, paymentStatus: newPayStatus } : o))
    );
    if (selectedOrder && selectedOrder.orderNumber === orderNum) {
      setSelectedOrder((prev) => ({ ...prev, paymentStatus: newPayStatus }));
    }
    addToast(`Payment status updated to ${newPayStatus}`, 'info');
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer?.phone?.includes(search) ||
      o.customer?.city?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter ? o.orderStatus === statusFilter : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Dispatch & Fulfillment
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            ORDER FULFILLMENT ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111111] border border-studio-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-studio-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-black border border-studio-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-studio-gold w-full sm:w-auto"
          >
            <option value="">All Order Statuses</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111111] border border-studio-border rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515] text-gray-400 border-b border-studio-border font-mono">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer & City</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total (PKR)</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border/50">
              {filtered.map((ord) => (
                <tr key={ord.orderNumber} className="hover:bg-black/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-studio-gold">
                    {ord.orderNumber}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">{ord.customer?.fullName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {ord.customer?.city} • {ord.customer?.phone}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    PKR {(ord.total || 0).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded border border-studio-border">
                      {ord.paymentStatus || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.orderStatus || 'Pending'}
                      onChange={(e) => handleUpdateStatus(ord.orderNumber, e.target.value)}
                      className={`text-[10px] font-bold font-mono px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : ord.orderStatus === 'Cancelled'
                          ? 'bg-red-950/60 border-red-500 text-red-300'
                          : ord.orderStatus === 'Shipped'
                          ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                          : 'bg-studio-gold/15 border-studio-gold/40 text-studio-gold'
                      }`}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st} className="bg-black text-white">{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="px-3 py-1 bg-[#1A1A1A] hover:bg-studio-gold hover:text-black rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border">
              <div>
                <span className="text-[10px] font-mono text-studio-gold uppercase font-bold">Order Details</span>
                <h3 className="text-xl font-bold text-white font-mono">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Recipient */}
            <div className="p-4 bg-black/60 rounded-xl border border-studio-border text-xs space-y-1">
              <div className="font-bold text-white">{selectedOrder.customer?.fullName}</div>
              <div className="text-gray-400">{selectedOrder.customer?.phone} • {selectedOrder.customer?.email}</div>
              <div className="text-gray-300">{selectedOrder.customer?.address}</div>
              <div className="text-studio-gold font-mono">{selectedOrder.customer?.city} {selectedOrder.customer?.postalCode}</div>
              {selectedOrder.customer?.orderNotes && (
                <div className="text-gray-400 italic pt-1 border-t border-studio-border/50">
                  Note: "{selectedOrder.customer.orderNotes}"
                </div>
              )}
            </div>

            {/* Items */}
            <div>
              <div className="text-xs font-bold text-white mb-2">Ordered Items:</div>
              <div className="space-y-2">
                {selectedOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 bg-black/40 rounded-lg">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-mono text-studio-gold font-bold">
                      PKR {(it.total || it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Change inside modal */}
            <div className="pt-3 border-t border-studio-border grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Order Status</label>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => handleUpdateStatus(selectedOrder.orderNumber, e.target.value)}
                  className="w-full px-2 py-1.5 bg-black border border-studio-border rounded-lg text-white font-mono"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Payment Status</label>
                <select
                  value={selectedOrder.paymentStatus || 'Pending'}
                  onChange={(e) => handleUpdatePayment(selectedOrder.orderNumber, e.target.value)}
                  className="w-full px-2 py-1.5 bg-black border border-studio-border rounded-lg text-white font-mono"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-studio-border flex justify-between items-baseline font-bold text-sm">
              <span>Total Payable (COD):</span>
              <span className="text-2xl font-mono text-studio-gold font-black">
                PKR {selectedOrder.total?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
