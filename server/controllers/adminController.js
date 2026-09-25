const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Review = require('../models/Review');
const Coupon = require('../models/Coupon');
const ContactMessage = require('../models/ContactMessage');
const Category = require('../models/Category');

// @desc    Get dashboard metrics & real chart analytics
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const lowStockCount = await Product.countDocuments({ stock: { $lte: 3 } });

    // Calculate total revenue from non-cancelled orders
    const revenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Sales by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const salesTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          orderStatus: { $ne: 'Cancelled' }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Orders by status breakdown
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Low stock products alert list
    const lowStockProducts = await Product.find({ stock: { $lte: 3 } })
      .select('name sku stock brand category images')
      .limit(6);

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        lowStockCount,
        pendingOrders
      },
      recentOrders,
      salesTrend,
      ordersByStatus,
      lowStockProducts
    });
  } catch (err) {
    next(err);
  }
};

// --- Product Management ---

const adminCreateProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      brand,
      category,
      subcategory,
      description,
      shortDescription,
      images,
      price,
      salePrice,
      sku,
      stock,
      weight,
      dimensions,
      specifications,
      features,
      includedItems,
      tags,
      isFeatured,
      isNewProduct,
      isBestSeller
    } = req.body;

    const generatedSlug = slug ? slug.toLowerCase() : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingSku = await Product.findOne({ sku });
    if (existingSku) {
      return res.status(400).json({ success: false, message: 'A product with this SKU already exists' });
    }

    const product = await Product.create({
      productId: 'PROD-' + Date.now(),
      name,
      slug: generatedSlug,
      brand,
      category,
      subcategory: subcategory || '',
      description,
      shortDescription: shortDescription || '',
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop'],
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      sku,
      stock: Number(stock) || 0,
      weight: weight || '',
      dimensions: dimensions || '',
      specifications: specifications || [],
      features: features || [],
      includedItems: includedItems || [],
      tags: tags || [],
      isFeatured: !!isFeatured,
      isNewProduct: !!isNewProduct,
      isBestSeller: !!isBestSeller,
      priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Update fields
    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (err) {
    next(err);
  }
};

const adminDeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// --- Inventory Management ---

const adminGetInventory = async (req, res, next) => {
  try {
    const { search, stockFilter } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { sku: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') }
      ];
    }

    if (stockFilter === 'low') {
      query.stock = { $gt: 0, $lte: 3 };
    } else if (stockFilter === 'out') {
      query.stock = { $lte: 0 };
    } else if (stockFilter === 'in') {
      query.stock = { $gt: 3 };
    }

    const inventory = await Product.find(query)
      .select('name sku brand category price stock stockStatus images')
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.stock = Number(stock);
    await product.save();

    res.status(200).json({
      success: true,
      message: `Stock updated for ${product.name}`,
      product: {
        _id: product._id,
        stock: product.stock,
        stockStatus: product.stockStatus
      }
    });
  } catch (err) {
    next(err);
  }
};

// --- Orders Management ---

const adminGetOrders = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { orderNumber: searchRegex },
        { 'customer.fullName': searchRegex },
        { 'customer.phone': searchRegex },
        { 'customer.city': searchRegex }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      orders
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus, comment } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (orderStatus && order.orderStatus !== orderStatus) {
      order.orderStatus = orderStatus;
      order.statusHistory.push({
        status: orderStatus,
        timestamp: new Date(),
        comment: comment || `Status updated to ${orderStatus} by Rockstar Admin`
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${order.orderStatus}`,
      order
    });
  } catch (err) {
    next(err);
  }
};

// --- Customers Management ---

const adminGetCustomers = async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = { role: 'customer' };

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const customers = await User.find(query).select('-password').sort({ createdAt: -1 });

    // Include order counts
    const customersWithOrders = await Promise.all(
      customers.map(async (c) => {
        const orderCount = await Order.countDocuments({ user: c._id });
        return {
          ...c.toObject(),
          orderCount
        };
      })
    );

    res.status(200).json({
      success: true,
      count: customersWithOrders.length,
      customers: customersWithOrders
    });
  } catch (err) {
    next(err);
  }
};

// --- Coupons Management ---

const adminGetCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, coupons });
  } catch (err) {
    next(err);
  }
};

const adminCreateCoupon = async (req, res, next) => {
  try {
    const {
      couponCode,
      discountType,
      discountValue,
      minimumOrder,
      maximumDiscount,
      expiryDate,
      usageLimit
    } = req.body;

    const existing = await Coupon.findOne({ couponCode: couponCode.trim().toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    const coupon = await Coupon.create({
      couponCode: couponCode.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minimumOrder: minimumOrder ? Number(minimumOrder) : 0,
      maximumDiscount: maximumDiscount ? Number(maximumDiscount) : null,
      expiryDate: new Date(expiryDate),
      usageLimit: usageLimit ? Number(usageLimit) : null
    });

    res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (err) {
    next(err);
  }
};

const adminToggleCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.status(200).json({ success: true, message: `Coupon is now ${coupon.isActive ? 'active' : 'inactive'}`, coupon });
  } catch (err) {
    next(err);
  }
};

const adminDeleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// --- Review Moderation ---

const adminGetReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name images sku')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    next(err);
  }
};

const adminModerateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    review.isApproved = !!isApproved;
    await review.save();

    // Recompute product average rating
    const approvedReviews = await Review.find({ product: review.product, isApproved: true });
    const product = await Product.findById(review.product);
    if (product) {
      if (approvedReviews.length > 0) {
        const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
        product.rating = Number((sum / approvedReviews.length).toFixed(1));
        product.reviewCount = approvedReviews.length;
      } else {
        product.rating = 0;
        product.reviewCount = 0;
      }
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: `Review has been ${review.isApproved ? 'approved' : 'hidden'}`,
      review
    });
  } catch (err) {
    next(err);
  }
};

const adminDeleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (review) {
      const approvedReviews = await Review.find({ product: review.product, isApproved: true });
      const product = await Product.findById(review.product);
      if (product) {
        if (approvedReviews.length > 0) {
          const sum = approvedReviews.reduce((acc, r) => acc + r.rating, 0);
          product.rating = Number((sum / approvedReviews.length).toFixed(1));
          product.reviewCount = approvedReviews.length;
        } else {
          product.rating = 0;
          product.reviewCount = 0;
        }
        await product.save();
      }
    }
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};

// --- Contact Messages ---

const adminGetContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};

const adminUpdateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

module.exports = {
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
};
