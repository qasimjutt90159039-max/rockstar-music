import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, 
  Package, 
  MapPin, 
  Lock, 
  LogOut, 
  Heart, 
  Scale, 
  ShieldCheck, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useToast } from '../context/ToastContext';

const CustomerAccount = () => {
  const { user, isAuthenticated, isAdmin, logout, updateProfile } = useAuth();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'security'
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Profile Edit State
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // Address State
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('Multan');
  const [postalCode, setPostalCode] = useState('');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders/my-orders');
        if (res.data?.orders) {
          setOrders(res.data.orders);
        }
      } catch {
        // Fallback to local storage
        const saved = JSON.parse(localStorage.getItem('rockstar_user_orders') || '[]');
        setOrders(saved);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ name: profileName, phone: profilePhone });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!addressLine.trim()) return;

    const newAddr = {
      fullName: user.name,
      phone: user.phone,
      addressLine: addressLine.trim(),
      city,
      postalCode,
      isDefault: false
    };

    const currentAddresses = user.addresses || [];
    await updateProfile({ addresses: [...currentAddresses, newAddr] });
    setAddressLine('');
    addToast('Delivery address saved!', 'success');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword,
        newPassword,
        confirmNewPassword
      });
      addToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      addToast(err.response?.data?.message || 'Password update failed.', 'error');
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Header */}
        <div className="bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-studio-gold/15 border border-studio-gold/40 flex items-center justify-center text-studio-gold font-bold text-2xl font-mono">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded bg-studio-gold text-black text-[10px] font-bold font-mono">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-studio-gold text-black text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-red-950/40 border border-studio-border hover:border-red-500/50 text-gray-300 hover:text-red-400 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (3 Columns) */}
          <div className="lg:col-span-3 bg-[#111111] border border-studio-border rounded-2xl p-4 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </span>
              <span className="text-[10px] font-mono">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Account Profile</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </span>
              <span className="text-[10px] font-mono">{user.addresses?.length || 0}</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-300 hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Lock className="w-4 h-4" />
                <span>Security & Password</span>
              </span>
            </button>

            <div className="pt-3 border-t border-studio-border/60 my-2" />

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-gray-300 hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-studio-gold" />
                <span>Wishlist</span>
              </span>
              <span className="text-[10px] font-mono">{wishlistCount}</span>
            </Link>

            <Link
              to="/compare"
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-gray-300 hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-studio-gold" />
                <span>Compare</span>
              </span>
              <span className="text-[10px] font-mono">{compareCount}</span>
            </Link>
          </div>

          {/* Right: Tab Contents (9 Columns) */}
          <div className="lg:col-span-9 bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8">
            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Order History</h3>
                <p className="text-xs text-gray-400 mb-6">
                  Track shipment status and order confirmation for your musical instruments.
                </p>

                {orders.length === 0 ? (
                  <div className="p-10 bg-black/60 rounded-2xl border border-studio-border text-center">
                    <Package className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p className="text-xs text-gray-400 mb-4">You have not placed any orders yet.</p>
                    <Link to="/shop" className="px-5 py-2.5 bg-studio-gold text-black font-bold text-xs rounded-xl">
                      Browse Instruments Catalog
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderNumber}
                        className="bg-[#151515] border border-studio-border rounded-2xl p-5 hover:border-studio-gold/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-studio-border/60 gap-2 mb-3">
                          <div>
                            <span className="text-xs font-mono font-bold text-studio-gold">
                              {ord.orderNumber}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 font-mono">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono bg-studio-gold/15 text-studio-gold border border-studio-gold/30">
                              {ord.orderStatus || 'Pending'}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                              PKR {(ord.total || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Items preview */}
                        <div className="space-y-2 mb-4">
                          {(ord.items || []).map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs text-gray-300">
                              <span className="truncate pr-2">
                                {it.quantity}x {it.name}
                              </span>
                              <span className="font-mono text-studio-gold whitespace-nowrap">
                                PKR {(it.total || it.price * it.quantity).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-studio-border/40">
                          <span>Payment: <strong>{ord.paymentMethod || 'Cash on Delivery'}</strong></span>
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="text-studio-gold hover:underline font-bold"
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <h3 className="text-xl font-bold text-white mb-2">Profile Details</h3>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Email (Cannot be modified)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-3 py-2 bg-black/50 border border-studio-border/40 rounded-xl text-xs text-gray-500 cursor-not-allowed font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {/* Tab: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Delivery Addresses</h3>
                  <p className="text-xs text-gray-400">Save delivery destinations for faster store checkout.</p>
                </div>

                {/* Existing addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(user.addresses || []).map((addr, i) => (
                    <div key={i} className="p-4 bg-[#151515] border border-studio-border rounded-2xl text-xs space-y-1">
                      <div className="font-bold text-white">{addr.fullName}</div>
                      <div className="text-gray-300">{addr.addressLine}</div>
                      <div className="text-gray-400">{addr.city}, {addr.postalCode}</div>
                      <div className="text-studio-gold font-mono">{addr.phone}</div>
                    </div>
                  ))}
                </div>

                {/* Add new address */}
                <form onSubmit={handleAddAddress} className="bg-black/60 border border-studio-border rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white">Add New Address</h4>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Address Line</label>
                    <input
                      type="text"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="Street, House, Landmark"
                      className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="60000"
                        className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-studio-gold text-black text-xs font-bold rounded-xl"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Security */}
            {activeTab === 'security' && (
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                <h3 className="text-xl font-bold text-white mb-2">Change Password</h3>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">New Password (min 6 characters)</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151515] border border-studio-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border">
              <h3 className="text-lg font-bold text-white">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order ID:</span>
                <span className="font-mono text-studio-gold font-bold">{selectedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-bold text-white">{selectedOrder.orderStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment:</span>
                <span className="text-white">{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Delivery Address:</span>
                <span className="text-white text-right">{selectedOrder.customer?.address}, {selectedOrder.customer?.city}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-studio-border">
              <div className="text-xs font-bold text-white mb-2">Items:</div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedOrder.items?.map((it, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-300">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-mono text-studio-gold">PKR {(it.total || it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-studio-border flex justify-between items-baseline font-bold">
              <span>Total:</span>
              <span className="text-xl font-mono text-studio-gold">PKR {selectedOrder.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccount;
