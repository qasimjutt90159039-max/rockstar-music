const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  businessName: { 
    type: String, 
    default: 'Rockstar Musical Instruments Shop' 
  },
  businessCategory: { 
    type: String, 
    default: 'Musical Instruments / Music Equipment / Audio Equipment' 
  },
  phone: { 
    type: String, 
    default: '+92 300 6303618' 
  },
  address: { 
    type: String, 
    default: 'Service Road, Peer Khurshid Colony, Chah Usman Wala, Multan, Punjab, Pakistan' 
  },
  city: { 
    type: String, 
    default: 'Multan' 
  },
  country: { 
    type: String, 
    default: 'Pakistan' 
  },
  // Fields that are not verified remain empty or strictly truthful
  businessHours: { 
    type: String, 
    default: '' // Kept unpopulated until verified by store management
  },
  email: { 
    type: String, 
    default: '' // Do not invent fake email
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  deliveryPolicy: {
    type: String,
    default: 'We deliver across Multan and throughout Pakistan via verified courier services. Cash on Delivery is available for all eligible orders. Store verification is conducted before order dispatch.'
  },
  returnPolicy: {
    type: String,
    default: 'Items can be inspected upon delivery. Damaged or defective instruments must be reported within 48 hours with order reference and proof of purchase.'
  },
  priceNotice: {
    type: String,
    default: 'DEMO DATA — VERIFY BEFORE LAUNCH. All catalog prices reflect standard market reference and are to be verified with in-store stock before final checkout.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
