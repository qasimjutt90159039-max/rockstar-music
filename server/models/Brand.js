const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  logo: { type: String, default: '' },
  description: { type: String, default: '' },
  disclaimer: { 
    type: String, 
    default: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.' 
  },
  isPopular: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Brand', brandSchema);
