const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Submit a verified customer review
// @route   POST /api/reviews
// @access  Private (Authenticated buyer only)
const createReview = async (req, res, next) => {
  try {
    const { productId, rating, reviewTitle, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide product ID, rating, and review text' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if customer has ordered this product
    const verifiedOrder = await Order.findOne({
      user: req.user._id,
      'items.product': productId
    });

    if (!verifiedOrder) {
      return res.status(403).json({
        success: false,
        message: 'Only verified customers who have purchased this musical instrument from Rockstar Musical Instruments Shop can submit a review.'
      });
    }

    // Check if customer already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this instrument.'
      });
    }

    // Create review - pending admin moderation
    const review = await Review.create({
      product: productId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      reviewTitle: reviewTitle || '',
      comment,
      isVerifiedPurchase: true,
      isApproved: false // Requires admin moderation
    });

    res.status(201).json({
      success: true,
      message: 'Your review has been submitted for moderation. Thank you for your verified customer feedback!',
      review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get approved reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, isApproved: true })
      .sort({ createdAt: -1 })
      .select('-user');

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getProductReviews
};
