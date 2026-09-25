import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingCart, Heart, Scale, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

const QuickViewModal = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();

  if (!product) return null;

  const id = product._id || product.productId;
  const isWishlisted = isInWishlist(id);
  const isCompared = isInCompare(id);
  const isOutOfStock = product.stock <= 0;

  const currentPrice = product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#111111] border border-studio-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-gray-400 hover:text-white bg-black/60 rounded-full border border-studio-border hover:border-studio-gold transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[#0B0B0B] flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-studio-border">
          <div className="w-full aspect-square relative flex items-center justify-center p-4 bg-black/40 rounded-2xl border border-studio-border/60">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
              }}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 max-w-full">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 rounded-lg p-1 border transition-all ${
                    selectedImage === idx
                      ? 'border-studio-gold bg-black'
                      : 'border-studio-border bg-black/50 hover:border-gray-500'
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

          <div className="mt-4 text-center">
            <span className="text-[10px] font-mono text-gray-400 bg-[#151515] px-3 py-1 rounded-full border border-studio-border">
              {product.priceNotice || 'DEMO DATA — VERIFY BEFORE LAUNCH'}
            </span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="text-studio-gold font-bold uppercase tracking-wider font-mono">
                {product.brand}
              </span>
              <span className="text-gray-500 font-mono">SKU: {product.sku}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1 text-studio-gold">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-white text-sm">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount || 0} reviews)</span>
              </div>
              <span className="text-gray-600">|</span>
              <div>
                {isOutOfStock ? (
                  <span className="text-red-400 font-medium">Out of Stock</span>
                ) : (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-[#151515] rounded-xl border border-studio-border mb-4">
              <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">Store Price</div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-studio-gold font-mono">
                  PKR {currentPrice.toLocaleString()}
                </span>
                {product.salePrice && product.salePrice < product.price && (
                  <span className="text-sm text-gray-500 line-through font-mono">
                    PKR {product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {product.shortDescription || product.description}
            </p>

            {/* Technical Specifications Highlights */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specifications.slice(0, 4).map((spec, i) => (
                    <div key={i} className="p-2 bg-black/40 rounded-lg border border-studio-border/60">
                      <span className="text-gray-500 block text-[10px]">{spec.key}</span>
                      <span className="text-gray-200 font-medium truncate block">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-studio-border mt-4 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-studio-border rounded-xl bg-black px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-40"
                >
                  -
                </button>
                <span className="px-3 font-mono font-bold text-sm text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-40"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-studio-gold hover:bg-studio-goldHover text-black flex items-center justify-center gap-2 transition-all disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg shadow-studio-gold/15"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isWishlisted
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'border-studio-border text-gray-300 hover:text-white hover:border-studio-gold'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Compare */}
              <button
                onClick={() => addToCompare(product)}
                className={`p-3 rounded-xl border transition-all ${
                  isCompared
                    ? 'bg-studio-gold/20 border-studio-gold text-studio-gold'
                    : 'border-studio-border text-gray-300 hover:text-white hover:border-studio-gold'
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>
            </div>

            {/* View Full Product Page */}
            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="w-full py-2.5 text-center text-xs text-studio-gold hover:underline flex items-center justify-center gap-1 font-semibold"
            >
              <span>View Full Specifications & Verified Reviews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
