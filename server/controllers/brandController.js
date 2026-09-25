const Brand = require('../models/Brand');
const Product = require('../models/Product');

// @desc    Get all cataloged brands with item counts and disclaimers
// @route   GET /api/brands
// @access  Public
const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ isPopular: -1, name: 1 });
    
    const brandsWithCount = await Promise.all(
      brands.map(async (b) => {
        const count = await Product.countDocuments({ 
          brand: new RegExp(`^${b.name}$`, 'i') 
        });
        return {
          ...b.toObject(),
          productCount: count
        };
      })
    );

    res.status(200).json({
      success: true,
      brands: brandsWithCount
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single brand details and its products
// @route   GET /api/brands/:slug
// @access  Public
const getBrandBySlug = async (req, res, next) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug.toLowerCase() });
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    const products = await Product.find({
      brand: new RegExp(`^${brand.name}$`, 'i')
    });

    res.status(200).json({
      success: true,
      brand: {
        ...brand.toObject(),
        productCount: products.length
      },
      products
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBrands,
  getBrandBySlug
};
