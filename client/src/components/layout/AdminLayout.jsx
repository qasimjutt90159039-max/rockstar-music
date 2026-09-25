import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  ShoppingCart, 
  Users, 
  Tag, 
  MessageSquare, 
  Mail, 
  Settings, 
  LogOut, 
  Store,
  Menu,
  X,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AudioWave from '../common/AudioWave';

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not admin, give notice or redirect
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <ShieldCheck className="w-16 h-16 text-studio-gold mb-4" />
        <h2 className="text-2xl font-bold mb-2">Administrator Access Required</h2>
        <p className="text-gray-400 text-xs max-w-sm mb-6">
          This portal is reserved for staff of Rockstar Musical Instruments Shop. Please log in with admin privileges.
        </p>
        <Link to="/login" className="px-6 py-2.5 bg-studio-gold text-black font-bold text-xs rounded-xl">
          Go to Login
        </Link>
      </div>
    );
  }

  const adminNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Coupons', path: '/admin/coupons', icon: Tag },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col lg:flex-row">
      {/* Mobile Admin Header */}
      <div className="lg:hidden bg-[#0B0B0B] border-b border-studio-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-black font-display text-lg tracking-wider text-white">
            ROCKSTAR ADMIN
          </span>
        </div>
        <Link to="/" className="p-2 text-studio-gold hover:text-white" title="View Storefront">
          <Store className="w-5 h-5" />
        </Link>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#090909] border-r border-studio-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-studio-border/70 flex items-center justify-between">
            <Link to="/admin" onClick={() => setSidebarOpen(false)}>
              <div className="text-xl font-black tracking-widest text-white font-display">
                ROCKSTAR
              </div>
              <div className="text-[9px] font-mono tracking-widest text-studio-gold uppercase font-bold">
                STORE MANAGEMENT
              </div>
            </Link>
            <AudioWave count={4} height={14} />
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-studio-gold text-black shadow-lg shadow-studio-gold/15'
                      : 'text-gray-300 hover:bg-[#151515] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar area */}
        <div className="p-4 border-t border-studio-border/70 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:text-studio-gold hover:bg-[#151515] rounded-xl transition-colors font-medium"
          >
            <Store className="w-4 h-4 text-studio-gold" />
            <span>Customer Storefront</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/30 rounded-xl transition-colors font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 bg-[#000000] overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
