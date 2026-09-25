const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  brand: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  subcategory: { type: String, default: '', index: true },
  description: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  currency: { type: String, default: 'PKR' },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  stockStatus: { 
    type: String, 
    enum: ['in_stock', 'low_stock', 'out_of_stock'], 
    default: 'in_stock' 
  },
  weight: { type: String, default: '' },
  dimensions: { type: String, default: '' },
  variants: [{
    name: { type: String },
    sku: { type: String },
    price: { type: Number },
    stock: { type: Number }
  }],
  specifications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{ type: String }],
  includedItems: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isNewProduct: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  priceNotice: { type: String, default: 'DEMO DATA — VERIFY BEFORE LAUNCH' }
}, {
  timestamps: true
});

productSchema.pre('save', function(next) {
  if (this.stock <= 0) {
    this.stockStatus = 'out_of_stock';
  } else if (this.stock <= 3) {
    this.stockStatus = 'low_stock';
  } else {
    this.stockStatus = 'in_stock';
  }
  next();
});

productSchema.index({ name: 'text', brand: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
