import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Scale, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown, 
  SlidersHorizontal,
  ExternalLink,
  Music,
  ShieldCheck,
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_PRODUCTS } from '../../data/catalog';
import AudioWave from '../common/AudioWave';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const accountMenuRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setAccountMenuOpen(false);
  }, [location.pathname]);

  // Handle live search autocomplete
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matched = INITIAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    ).slice(0, 5);

    setSuggestions(matched);
  }, [searchQuery]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Close account menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Guitars', path: '/guitars' },
    { name: 'Keyboards', path: '/keyboards' },
    { name: 'Drums', path: '/drums' },
    { name: 'Microphones', path: '/microphones' },
    { name: 'Audio', path: '/audio' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Brands', path: '/brands' },
  ];

  return (
    <>
      {/* Top Studio Notification Bar */}
      <div className="bg-[#0B0B0B] border-b border-studio-border text-xs py-1.5 px-4 text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-studio-gold animate-pulse" />
            <span className="text-gray-300 font-medium">Rockstar Musical Instruments Shop</span>
            <span className="hidden sm:inline text-gray-500">•</span>
            <span className="hidden sm:inline">Multan, Punjab, Pakistan</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+923006303618"
              className="text-studio-gold hover:underline font-mono text-xs font-semibold tracking-wide"
            >
              +92 300 6303618
            </a>
            <span className="text-gray-600">|</span>
            <Link to="/music-guides" className="hover:text-studio-gold transition-colors flex items-center gap-1">
              <Music className="w-3.5 h-3.5 text-studio-gold" />
              <span>Music Guides</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-studio-border/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-gray-300 hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-studio-gold"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex flex-col group">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black tracking-widest text-white group-hover:text-studio-gold transition-colors font-display">
                    ROCKSTAR
                  </span>
                  <AudioWave count={5} height={16} className="hidden sm:inline-flex opacity-80" />
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-studio-gold font-medium uppercase -mt-1 font-mono">
                  MUSICAL INSTRUMENTS SHOP
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-studio-gold bg-studio-card/80 font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-studio-card/40'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-300 hover:text-studio-gold hover:bg-studio-card/60 rounded-full transition-colors relative"
                aria-label="Search musical instruments"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Compare Icon */}
              <Link
                to="/compare"
                className="p-2 text-gray-300 hover:text-studio-gold hover:bg-studio-card/60 rounded-full transition-colors relative hidden sm:flex items-center justify-center"
                aria-label="Product comparison"
                title="Compare instruments"
              >
                <Scale className="w-5 h-5" />
                {compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-studio-card border border-studio-gold text-studio-gold text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </Link>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="p-2 text-gray-300 hover:text-studio-gold hover:bg-studio-card/60 rounded-full transition-colors relative hidden sm:flex items-center justify-center"
                aria-label="Wishlist"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-studio-card border border-studio-gold text-studio-gold text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Customer Account Dropdown */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="p-2 text-gray-300 hover:text-studio-gold hover:bg-studio-card/60 rounded-full transition-colors flex items-center gap-1"
                  aria-label="Account menu"
                >
                  <UserIcon className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5 hidden sm:block text-gray-500" />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#151515] border border-studio-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-studio-border/60">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-studio-gold font-mono truncate">{user.email}</p>
                        </div>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-studio-gold hover:bg-[#1f1f1f] font-medium"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <Link
                          to="/account"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#1f1f1f]"
                        >
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <span>My Account</span>
                        </Link>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#1f1f1f]"
                        >
                          <PackageCheck className="w-4 h-4 text-gray-400" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex sm:hidden items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#1f1f1f]"
                        >
                          <Heart className="w-4 h-4 text-gray-400" />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>
                        <Link
                          to="/compare"
                          className="flex sm:hidden items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#1f1f1f]"
                        >
                          <Scale className="w-4 h-4 text-gray-400" />
                          <span>Compare ({compareCount})</span>
                        </Link>
                        <div className="border-t border-studio-border/60 mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#1f1f1f] text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-studio-border/60">
                          <p className="text-xs text-gray-400">Welcome to Rockstar</p>
                          <p className="text-sm font-medium text-white">Sign in for orders & history</p>
                        </div>
                        <Link
                          to="/login"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-studio-gold hover:bg-[#1f1f1f] font-semibold"
                        >
                          <span>Customer Login</span>
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#1f1f1f]"
                        >
                          <span>Create Account</span>
                        </Link>
                        <div className="border-t border-studio-border/60 my-1" />
                        <Link
                          to="/login"
                          className="flex items-center justify-between px-4 py-1.5 text-xs text-gray-400 hover:text-white"
                        >
                          <span>Store Staff Access</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-studio-gold" />
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Cart Icon */}
              <Link
                to="/cart"
                className="p-2 bg-studio-card hover:bg-[#1f1f1f] border border-studio-border hover:border-studio-gold text-white rounded-full transition-all flex items-center justify-center relative group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 text-studio-gold group-hover:scale-105 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-studio-gold text-black text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-studio-gold/20">
                    {totalItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Live Search Bar Slide-Down Drawer */}
        {searchOpen && (
          <div className="border-t border-studio-border bg-[#0B0B0B] py-4 px-4 sm:px-6 shadow-2xl animate-in slide-in-from-top-2">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-studio-gold pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search real musical instruments, Yamaha, Fender, Roland, SM58, drums..."
                  className="w-full pl-12 pr-28 py-3.5 bg-[#151515] border border-studio-border focus:border-studio-gold text-white placeholder-gray-500 rounded-xl text-sm focus:outline-none transition-colors"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-lg transition-colors"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <div className="mt-3 bg-[#151515] border border-studio-border rounded-xl p-3 divide-y divide-studio-border/50">
                  <div className="text-[11px] font-semibold text-gray-400 px-2 py-1 uppercase tracking-wider">
                    Instant Suggestions ({suggestions.length})
                  </div>
                  {suggestions.map((item) => (
                    <Link
                      key={item._id || item.productId}
                      to={`/product/${item.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-[#1f1f1f] rounded-lg transition-colors group"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                        }}
                        className="w-10 h-10 object-cover rounded bg-black flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white group-hover:text-studio-gold truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.brand} • <span className="text-studio-gold">PKR {item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs text-studio-gold hover:underline font-medium"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#0B0B0B] border-r border-studio-border p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-studio-border">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="text-2xl font-black tracking-widest text-white font-display">
                    ROCKSTAR
                  </div>
                  <div className="text-[9px] tracking-widest text-studio-gold font-mono uppercase">
                    MUSICAL INSTRUMENTS SHOP
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-studio-gold hover:bg-[#151515] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-studio-border/60 my-2" />
                <Link
                  to="/music-guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-studio-gold flex items-center gap-2"
                >
                  <Music className="w-4 h-4" />
                  <span>Music Guides</span>
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-gray-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-studio-gold" />
                    <span>Compare Products</span>
                  </span>
                  {compareCount > 0 && (
                    <span className="bg-studio-card text-studio-gold border border-studio-gold text-xs px-2 py-0.5 rounded-full font-bold">
                      {compareCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-gray-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-studio-gold" />
                    <span>Wishlist</span>
                  </span>
                  {wishlistCount > 0 && (
                    <span className="bg-studio-card text-studio-gold border border-studio-gold text-xs px-2 py-0.5 rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-studio-border">
              <div className="text-xs text-gray-400 mb-2">Multan Store Contact:</div>
              <a
                href="tel:+923006303618"
                className="block text-studio-gold font-mono font-bold text-sm hover:underline mb-4"
              >
                +92 300 6303618
              </a>
              <div className="text-[11px] text-gray-500 leading-tight">
                Service Road, Peer Khurshid Colony, Multan, Pakistan.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
