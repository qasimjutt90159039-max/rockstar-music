import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';

// Layout & Global Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import CompareDrawer from './components/common/CompareDrawer';

// Storefront Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import ComparePage from './pages/ComparePage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerAccount from './pages/CustomerAccount';
import MusicGuides from './pages/MusicGuides';
import MusicGuideDetail from './pages/MusicGuideDetail';
import BrandsPage from './pages/BrandsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQ from './pages/FAQ';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnsPolicy from './pages/ReturnsPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminInventory from './pages/admin/AdminInventory';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminReviews from './pages/admin/AdminReviews';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

const StorefrontLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <CompareDrawer />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <Router>
                <Routes>
                  {/* Public Storefront Routes with Header & Footer */}
                  <Route
                    path="/"
                    element={<StorefrontLayout><Home /></StorefrontLayout>}
                  />
                  <Route
                    path="/shop"
                    element={<StorefrontLayout><Shop /></StorefrontLayout>}
                  />

                  {/* Dedicated Category Pages */}
                  <Route
                    path="/guitars"
                    element={<StorefrontLayout><CategoryPage categorySlug="guitars" /></StorefrontLayout>}
                  />
                  <Route
                    path="/keyboards"
                    element={<StorefrontLayout><CategoryPage categorySlug="keyboards" /></StorefrontLayout>}
                  />
                  <Route
                    path="/drums"
                    element={<StorefrontLayout><CategoryPage categorySlug="drums" /></StorefrontLayout>}
                  />
                  <Route
                    path="/microphones"
                    element={<StorefrontLayout><CategoryPage categorySlug="microphones" /></StorefrontLayout>}
                  />
                  <Route
                    path="/audio"
                    element={<StorefrontLayout><CategoryPage categorySlug="audio" /></StorefrontLayout>}
                  />
                  <Route
                    path="/accessories"
                    element={<StorefrontLayout><CategoryPage categorySlug="accessories" /></StorefrontLayout>}
                  />

                  {/* Highlights / Promos */}
                  <Route
                    path="/new-arrivals"
                    element={<StorefrontLayout><CategoryPage filterType="new" customTitle="New Arrivals" customDescription="Newly cataloged musical instruments, pedals, and studio additions." /></StorefrontLayout>}
                  />
                  <Route
                    path="/best-sellers"
                    element={<StorefrontLayout><CategoryPage filterType="bestSeller" customTitle="Best Sellers" customDescription="Most requested musical gear by musicians in Multan and nationwide." /></StorefrontLayout>}
                  />
                  <Route
                    path="/deals"
                    element={<StorefrontLayout><CategoryPage filterType="deals" customTitle="Special Gear Deals" customDescription="Instruments and audio equipment featuring verified sale rates." /></StorefrontLayout>}
                  />

                  {/* Product Detail */}
                  <Route
                    path="/product/:slug"
                    element={<StorefrontLayout><ProductDetail /></StorefrontLayout>}
                  />

                  {/* Utility & Store Features */}
                  <Route
                    path="/search"
                    element={<StorefrontLayout><Shop /></StorefrontLayout>}
                  />
                  <Route
                    path="/compare"
                    element={<StorefrontLayout><ComparePage /></StorefrontLayout>}
                  />
                  <Route
                    path="/wishlist"
                    element={<StorefrontLayout><WishlistPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/cart"
                    element={<StorefrontLayout><CartPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/checkout"
                    element={<StorefrontLayout><CheckoutPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/order-success/:orderNumber"
                    element={<StorefrontLayout><OrderSuccessPage /></StorefrontLayout>}
                  />

                  {/* Customer Auth & Account */}
                  <Route
                    path="/login"
                    element={<StorefrontLayout><LoginPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/register"
                    element={<StorefrontLayout><RegisterPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/account"
                    element={<StorefrontLayout><CustomerAccount /></StorefrontLayout>}
                  />
                  <Route
                    path="/account/orders"
                    element={<StorefrontLayout><CustomerAccount /></StorefrontLayout>}
                  />
                  <Route
                    path="/account/orders/:id"
                    element={<StorefrontLayout><CustomerAccount /></StorefrontLayout>}
                  />

                  {/* Music Guides */}
                  <Route
                    path="/music-guides"
                    element={<StorefrontLayout><MusicGuides /></StorefrontLayout>}
                  />
                  <Route
                    path="/music-guides/:slug"
                    element={<StorefrontLayout><MusicGuideDetail /></StorefrontLayout>}
                  />

                  {/* Brand Catalog */}
                  <Route
                    path="/brands"
                    element={<StorefrontLayout><BrandsPage /></StorefrontLayout>}
                  />

                  {/* Company & Local Info */}
                  <Route
                    path="/about"
                    element={<StorefrontLayout><AboutPage /></StorefrontLayout>}
                  />
                  <Route
                    path="/contact"
                    element={<StorefrontLayout><ContactPage /></StorefrontLayout>}
                  />

                  {/* Policies */}
                  <Route
                    path="/faq"
                    element={<StorefrontLayout><FAQ /></StorefrontLayout>}
                  />
                  <Route
                    path="/shipping"
                    element={<StorefrontLayout><ShippingPolicy /></StorefrontLayout>}
                  />
                  <Route
                    path="/returns"
                    element={<StorefrontLayout><ReturnsPolicy /></StorefrontLayout>}
                  />
                  <Route
                    path="/privacy"
                    element={<StorefrontLayout><PrivacyPolicy /></StorefrontLayout>}
                  />
                  <Route
                    path="/terms"
                    element={<StorefrontLayout><Terms /></StorefrontLayout>}
                  />

                  {/* Admin Protected Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="inventory" element={<AdminInventory />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="analytics" element={<AdminDashboard />} />
                    <Route path="categories" element={<AdminProducts />} />
                    <Route path="brands" element={<AdminProducts />} />
                  </Route>

                  {/* 404 Route */}
                  <Route
                    path="/404"
                    element={<StorefrontLayout><NotFound /></StorefrontLayout>}
                  />
                  <Route
                    path="*"
                    element={<StorefrontLayout><NotFound /></StorefrontLayout>}
                  />
                </Routes>
              </Router>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
