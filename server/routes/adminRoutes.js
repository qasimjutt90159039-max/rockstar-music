const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminGetInventory,
  adminUpdateStock,
  adminGetOrders,
  adminUpdateOrderStatus,
  adminGetCustomers,
  adminGetCoupons,
  adminCreateCoupon,
  adminToggleCoupon,
  adminDeleteCoupon,
  adminGetReviews,
  adminModerateReview,
  adminDeleteReview,
  adminGetContactMessages,
  adminUpdateMessageStatus
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// All routes require authentication and admin role
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Products
router.post('/products', adminCreateProduct);
router.put('/products/:id', adminUpdateProduct);
router.delete('/products/:id', adminDeleteProduct);

// Inventory
router.get('/inventory', adminGetInventory);
router.put('/inventory/:id/stock', adminUpdateStock);

// Orders
router.get('/orders', adminGetOrders);
router.put('/orders/:id/status', adminUpdateOrderStatus);

// Customers
router.get('/customers', adminGetCustomers);

// Coupons
router.get('/coupons', adminGetCoupons);
router.post('/coupons', adminCreateCoupon);
router.put('/coupons/:id/toggle', adminToggleCoupon);
router.delete('/coupons/:id', adminDeleteCoupon);

// Reviews
router.get('/reviews', adminGetReviews);
router.put('/reviews/:id/moderate', adminModerateReview);
router.delete('/reviews/:id', adminDeleteReview);

// Messages
router.get('/messages', adminGetContactMessages);
router.put('/messages/:id/status', adminUpdateMessageStatus);

module.exports = router;
