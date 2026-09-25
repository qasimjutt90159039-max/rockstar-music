const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  couponCode: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, 
    trim: true 
  },
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed'], 
    required: true 
  },
  discountValue: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  minimumOrder: { 
    type: Number, 
    default: 0 
  },
  maximumDiscount: { 
    type: Number, 
    default: null 
  },
  expiryDate: { 
    type: Date, 
    required: true 
  },
  usageLimit: { 
    type: Number, 
    default: null 
  },
  usageCount: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
