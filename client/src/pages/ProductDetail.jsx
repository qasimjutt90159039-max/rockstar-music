import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Scale, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  HelpCircle,
  Package,
  Layers,
  FileText,
  MessageSquarePlus,
  Share2
} from 'lucide-react';
import { INITIAL_PRODUCTS, VERIFIED_BUSINESS } from '../data/catalog';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/common/ProductCard';
import AudioWave from '../components/common/AudioWave';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'features' | 'included' | 'reviews' | 'description'

  // Review submission form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
    if (found) {
      setProduct(found);
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-2">Instrument Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The requested instrument model is not currently cataloged.</p>
        <Link to="/shop" className="px-6 py-3 bg-studio-gold text-black font-bold rounded-xl text-xs">
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  const id = product._id || product.productId;
  const isWishlisted = isInWishlist(id);
  const isCompared = isInCompare(id);
  const isOutOfStock = product.stock <= 0;

  const currentPrice = product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => (p._id || p.productId) !== id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please login to your customer account to submit a review.', 'warning');
      navigate('/login');
      return;
    }

    if (!reviewComment.trim()) {
      addToast('Please enter your review comments.', 'warning');
      return;
    }

    setSubmittingReview(true);
    setTimeout(() => {
      const newReview = {
        id: 'rev_' + Date.now(),
        userName: user.name,
        rating: Number(reviewRating),
        title: reviewTitle,
        comment: reviewComment,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        verifiedPurchase: true
      };
      setLocalReviews((prev) => [newReview, ...prev]);
      setReviewComment('');
      setReviewTitle('');
      setSubmittingReview(false);
      addToast('Your review has been submitted. Thank you for your feedback!', 'success');
    }, 600);
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-gray-500 font-mono mb-8 flex flex-wrap items-center gap-1.5">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white transition-colors">Catalog</Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-studio-gold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* Left: Product Images Gallery (5 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-[#0B0B0B] border border-studio-border rounded-3xl p-8 flex items-center justify-center overflow-hidden group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                }}
                className="max-w-full max-h-full object-contain filter brightness-95 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNewProduct && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-studio-gold text-black uppercase tracking-wider">
                    NEW MODEL
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1a1a1a] text-studio-gold border border-studio-gold/40 uppercase tracking-wider">
                    BEST SELLER
                  </span>
                )}
              </div>

              {/* Price Notice Watermark */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                <span className="text-[10px] font-mono text-gray-500 bg-black/85 px-3 py-1 rounded-full border border-gray-800">
                  {product.priceNotice || 'DEMO DATA — VERIFY BEFORE LAUNCH'}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl p-2 border transition-all flex-shrink-0 bg-[#0B0B0B] ${
                      selectedImage === idx
                        ? 'border-studio-gold ring-1 ring-studio-gold'
                        : 'border-studio-border hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                      }}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Commercial Information & Buy Box (7 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand & SKU bar */}
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <Link
                  to={`/shop?brand=${encodeURIComponent(product.brand)}`}
                  className="text-studio-gold hover:underline font-bold uppercase tracking-wider font-mono text-sm"
                >
                  {product.brand}
                </Link>
                <span className="font-mono text-gray-500">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating & Stock Summary */}
              <div className="flex flex-wrap items-center gap-4 text-xs mb-6">
                <div className="flex items-center gap-1.5 bg-[#151515] px-3 py-1.5 rounded-lg border border-studio-border">
                  <Star className="w-4 h-4 text-studio-gold fill-current" />
                  <span className="font-bold text-white text-sm">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  {isOutOfStock ? (
                    <span className="text-red-400 font-semibold px-3 py-1.5 bg-red-950/40 border border-red-800/40 rounded-lg">
                      Currently Out of Stock
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-semibold px-3 py-1.5 bg-emerald-950/40 border border-emerald-800/40 rounded-lg flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> In Stock ({product.stock} units available)
                    </span>
                  )}
                </div>
              </div>

              {/* Price Panel */}
              <div className="bg-[#111111] border border-studio-border rounded-2xl p-6 mb-6">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Catalog Reference Price
                </div>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl sm:text-4xl font-black text-studio-gold font-mono">
                    PKR {currentPrice.toLocaleString()}
                  </span>
                  {product.salePrice && product.salePrice < product.price && (
                    <span className="text-base text-gray-500 line-through font-mono">
                      PKR {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Price in Pakistani Rupees (PKR). Cash on Delivery available.
                </p>
              </div>

              {/* Short summary */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {product.shortDescription || product.description}
              </p>

              {/* Quantity & Cart Actions */}
              <div className="space-y-4 pt-4 border-t border-studio-border">
                <div className="flex items-center gap-4">
                  {/* Quantity Controller */}
                  <div className="flex items-center border border-studio-border rounded-2xl bg-black px-3 py-2">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="px-2.5 py-1 text-gray-400 hover:text-white disabled:opacity-40 text-base"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono font-bold text-sm text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="px-2.5 py-1 text-gray-400 hover:text-white disabled:opacity-40 text-base"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={isOutOfStock}
                    className="flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-studio-gold hover:bg-studio-goldHover text-black flex items-center justify-center gap-2 transition-all disabled:bg-gray-800 disabled:text-gray-500 shadow-xl shadow-studio-gold/15"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>ADD TO CART</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-2xl border transition-all ${
                      isWishlisted
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'border-studio-border bg-[#151515] text-gray-300 hover:text-white hover:border-studio-gold'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Compare toggle */}
                  <button
                    onClick={() => addToCompare(product)}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCompared
                        ? 'bg-studio-gold/20 border-studio-gold text-studio-gold'
                        : 'border-studio-border bg-[#151515] text-gray-300 hover:text-white hover:border-studio-gold'
                    }`}
                    title="Compare Product"
                  >
                    <Scale className="w-5 h-5" />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white border border-studio-border hover:border-studio-gold transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Zap className="w-4 h-4 text-studio-gold" />
                  <span>Instant Checkout (Cash on Delivery)</span>
                </button>
              </div>

              {/* Service & Guarantee Guarantees */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-studio-border/60 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-studio-gold" />
                  <span>Cash on Delivery Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-studio-gold" />
                  <span>Verified Manufacturer Specs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specs, Features, Included Items, Reviews, Description */}
        <div className="mt-16 bg-[#0E0E0E] border border-studio-border rounded-3xl p-6 sm:p-10 mb-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-studio-border pb-4 mb-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'specs'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'features'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'included'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Included Items
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Verified Customer Reviews
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'description'
                  ? 'bg-studio-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              Full Description
            </button>
          </div>

          {/* Tab 1: Specifications */}
          {activeTab === 'specs' && (
            <div className="max-w-4xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Verified Manufacturer Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3.5 bg-[#151515] border border-studio-border/80 rounded-xl text-xs"
                    >
                      <span className="text-gray-400 font-medium">{item.key}</span>
                      <span className="text-white font-mono font-semibold text-right">{item.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-xs">Standard manufacturer specifications apply.</p>
                )}
                {product.weight && (
                  <div className="flex justify-between items-center p-3.5 bg-[#151515] border border-studio-border/80 rounded-xl text-xs">
                    <span className="text-gray-400 font-medium">Weight</span>
                    <span className="text-white font-mono font-semibold">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between items-center p-3.5 bg-[#151515] border border-studio-border/80 rounded-xl text-xs">
                    <span className="text-gray-400 font-medium">Dimensions</span>
                    <span className="text-white font-mono font-semibold">{product.dimensions}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Features */}
          {activeTab === 'features' && (
            <div className="max-w-4xl">
              <h3 className="text-lg font-bold text-white mb-4">Instrument Highlights & Engineering</h3>
              <ul className="space-y-3">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="mt-1 w-2 h-2 rounded-full bg-studio-gold flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-xs">Features verified per official catalog.</li>
                )}
              </ul>
            </div>
          )}

          {/* Tab 3: Included Accessories */}
          {activeTab === 'included' && (
            <div className="max-w-4xl">
              <h3 className="text-lg font-bold text-white mb-4">What's in the Box</h3>
              <ul className="space-y-3">
                {product.includedItems && product.includedItems.length > 0 ? (
                  product.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-200">
                      <Package className="w-4 h-4 text-studio-gold" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-xs">Standard factory packaging and documentation.</li>
                )}
              </ul>
            </div>
          )}

          {/* Tab 4: Verified Reviews (Prompt Section 21: NO FAKE REVIEWS) */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Verified Customer Feedback</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Rockstar strictly enforces verified purchases. Only genuine customers who purchased this instrument can review.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-studio-gold fill-current" />
                  <span className="text-xl font-bold font-mono text-white">{product.rating}</span>
                  <span className="text-xs text-gray-500">/ 5.0</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 mb-8">
                {localReviews.length === 0 ? (
                  <div className="p-6 bg-[#151515] rounded-2xl border border-studio-border text-center">
                    <p className="text-xs text-gray-400">
                      No customer reviews submitted yet for this product. Be the first verified customer to submit feedback!
                    </p>
                  </div>
                ) : (
                  localReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-[#151515] border border-studio-border rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{rev.userName}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                            Verified Buyer
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-500">{rev.date}</span>
                      </div>
                      <div className="flex text-studio-gold mb-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      {rev.title && <h4 className="text-xs font-bold text-white mb-1">{rev.title}</h4>}
                      <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Box */}
              <div className="bg-[#151515] border border-studio-border rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <MessageSquarePlus className="w-4 h-4 text-studio-gold" />
                  <span>Submit Verified Review</span>
                </h4>
                <p className="text-xs text-gray-400 mb-4">
                  Purchased this product from Rockstar Musical Instruments Shop? Share your experience with other performers.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-studio-gold hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= reviewRating ? 'fill-current' : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Review Headline (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Crisp tone, excellent fretwork"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Your Detailed Feedback</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the playability, build quality, and sound..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all disabled:opacity-50"
                  >
                    {submittingReview ? 'Submitting...' : 'Post Verified Review'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab 5: Description */}
          {activeTab === 'description' && (
            <div className="max-w-3xl text-sm text-gray-300 leading-relaxed space-y-4">
              <p>{product.description}</p>
            </div>
          )}
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-studio-border">
              <h3 className="text-2xl font-extrabold text-white">Related Musical Gear</h3>
              <Link to="/shop" className="text-xs text-studio-gold hover:underline font-bold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id || p.productId} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
