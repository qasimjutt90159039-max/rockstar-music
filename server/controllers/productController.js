const Product = require('../models/Product');

// @desc    Get all products with extensive filtering, search & sorting
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      subcategory,
      brand,
      minPrice,
      maxPrice,
      stockStatus,
      rating,
      featured,
      isNew,
      bestSeller,
      sort = 'featured',
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // Search keyword
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex },
        { sku: searchRegex },
        { tags: { $in: [searchRegex] } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      // support comma separated or single
      const catList = category.split(',').map(c => new RegExp(`^${c.trim()}$`, 'i'));
      query.category = { $in: catList };
    }

    // Subcategory filter
    if (subcategory) {
      query.subcategory = new RegExp(`^${subcategory.trim()}$`, 'i');
    }

    // Brand filter
    if (brand && brand !== 'all') {
      const brandList = brand.split(',').map(b => new RegExp(`^${b.trim()}$`, 'i'));
      query.brand = { $in: brandList };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Stock availability
    if (stockStatus) {
      if (stockStatus === 'in_stock') {
        query.stock = { $gt: 0 };
      } else if (stockStatus === 'out_of_stock') {
        query.stock = { $lte: 0 };
      }
    }

    // Rating
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Badges
    if (featured === 'true') query.isFeatured = true;
    if (isNew === 'true') query.isNewProduct = true;
    if (bestSeller === 'true') query.isBestSeller = true;

    // Sort order
    let sortOptions = {};
    switch (sort) {
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1, reviewCount: -1 };
        break;
      case 'featured':
      default:
        sortOptions = { isFeatured: -1, createdAt: -1 };
        break;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limitNum),
      currentPage: pageNum,
      products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get live search suggestions
// @route   GET /api/products/suggestions
// @access  Public
const getSearchSuggestions = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(200).json({ success: true, suggestions: [] });
    }

    const regex = new RegExp(q.trim(), 'i');

    const products = await Product.find({
      $or: [
        { name: regex },
        { brand: regex },
        { category: regex }
      ]
    })
      .select('name slug brand category images price salePrice sku')
      .limit(8);

    // Also collect distinct matching brands and categories
    const matchingBrands = await Product.distinct('brand', { brand: regex });
    const matchingCategories = await Product.distinct('category', { category: regex });

    res.status(200).json({
      success: true,
      suggestions: {
        products,
        brands: matchingBrands.slice(0, 4),
        categories: matchingCategories.slice(0, 4)
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug.toLowerCase() });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get related products
// @route   GET /api/products/:slug/related
// @access  Public
const getRelatedProducts = async (req, res, next) => {
  try {
    const current = await Product.findOne({ slug: req.params.slug.toLowerCase() });
    if (!current) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const related = await Product.find({
      _id: { $ne: current._id },
      $or: [
        { category: current.category },
        { brand: current.brand }
      ]
    })
      .limit(4)
      .sort({ rating: -1, isFeatured: -1 });

    res.status(200).json({
      success: true,
      products: related
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.status(200).json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivals = async (req, res, next) => {
  try {
    const products = await Product.find({ isNewProduct: true }).sort({ createdAt: -1 }).limit(8);
    res.status(200).json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
// @access  Public
const getBestSellers = async (req, res, next) => {
  try {
    const products = await Product.find({ isBestSeller: true }).sort({ rating: -1 }).limit(8);
    res.status(200).json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getSearchSuggestions,
  getProductBySlug,
  getRelatedProducts,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers
};
