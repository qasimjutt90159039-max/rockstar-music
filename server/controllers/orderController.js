const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// @desc    Create Cash on Delivery order
// @route   POST /api/orders
// @access  Public (Guest or Authenticated)
const createOrder = async (req, res, next) => {
  try {
    const { customer, items, couponCode } = req.body;

    if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city) {
      return res.status(400).json({ success: false, message: 'Please provide all required shipping details' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    // Verify products and stock
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`
        });
      }

      const effectivePrice = product.salePrice && product.salePrice < product.price ? product.salePrice : product.price;
      const itemTotal = effectivePrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0] || '',
        sku: product.sku,
        price: effectivePrice,
        quantity: item.quantity,
        total: itemTotal
      });
    }

    // Process coupon if present
    let discount = 0;
    let validCouponCode = null;
    if (couponCode && couponCode.trim() !== '') {
      const coupon = await Coupon.findOne({
        couponCode: couponCode.trim().toUpperCase(),
        isActive: true,
        expiryDate: { $gt: new Date() }
      });

      if (coupon) {
        if (!coupon.minimumOrder || subtotal >= coupon.minimumOrder) {
          if (coupon.discountType === 'percentage') {
            discount = Math.round((subtotal * coupon.discountValue) / 100);
            if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
              discount = coupon.maximumDiscount;
            }
          } else {
            discount = coupon.discountValue;
          }
          if (discount > subtotal) discount = subtotal;
          validCouponCode = coupon.couponCode;

          // Increment coupon usage
          coupon.usageCount += 1;
          await coupon.save();
        }
      }
    }

    // Delivery calculation: Free for orders over 15,000 PKR, else 450 PKR standard insured delivery
    const deliveryFee = subtotal >= 15000 ? 0 : 450;
    const total = Math.max(0, subtotal - discount + deliveryFee);

    // Generate readable orderNumber
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `RS-ORD-${randomSuffix}`;

    // Decrement stock for ordered products
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        if (product.stock === 0) {
          product.stockStatus = 'out_of_stock';
        } else if (product.stock <= 3) {
          product.stockStatus = 'low_stock';
        }
        await product.save();
      }
    }

    const order = await Order.create({
      orderNumber,
      user: req.user ? req.user._id : null,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        email: customer.email ? customer.email.trim() : (req.user ? req.user.email : ''),
        address: customer.address.trim(),
        city: customer.city.trim(),
        area: customer.area ? customer.area.trim() : '',
        postalCode: customer.postalCode ? customer.postalCode.trim() : '',
        orderNotes: customer.orderNotes ? customer.orderNotes.trim() : ''
      },
      items: orderItems,
      subtotal,
      discount,
      couponApplied: validCouponCode,
      deliveryFee,
      total,
      currency: 'PKR',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      statusHistory: [{
        status: 'Pending',
        timestamp: new Date(),
        comment: 'Order received. Rockstar store team will verify availability before dispatch.'
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully. Thank you for ordering with Rockstar Musical Instruments Shop!',
      order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by ID or orderNumber
// @route   GET /api/orders/:identifier
// @access  Public (for order lookup) / Private
const getOrderById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    let order;

    if (identifier.startsWith('RS-ORD-')) {
      order = await Order.findOne({ orderNumber: identifier }).populate('items.product');
    } else {
      order = await Order.findById(identifier).populate('items.product');
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check authorization: if user is logged in, must match or be admin. If guest placed, allow viewing by orderNumber
    if (order.user && req.user && req.user.role !== 'admin' && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to view this order' });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById
};
