const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  total: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    orderNotes: { type: String, default: '' }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  couponApplied: { type: String, default: null },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  currency: { type: String, default: 'PKR' },
  paymentMethod: { 
    type: String, 
    enum: ['Cash on Delivery'], 
    default: 'Cash on Delivery' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed'], 
    default: 'Pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  statusHistory: [{
    status: { type: String },
    timestamp: { type: Date, default: Date.now },
    comment: { type: String, default: '' }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
