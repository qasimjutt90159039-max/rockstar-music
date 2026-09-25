import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Scale, Eye, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare } = useCompare();

  const id = product._id || product.productId;
  const isWishlisted = isInWishlist(id);
  const isCompared = isInCompare(id);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const currentPrice = product.salePrice && product.salePrice < product.price
    ? product.salePrice
    : product.price;

  return (
    <div className="group relative flex flex-col bg-[#151515] border border-studio-border hover:border-studio-gold/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/80">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isNewProduct && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-studio-gold text-black tracking-wider uppercase">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#222222] text-studio-gold border border-studio-gold/40 tracking-wider uppercase">
            BEST SELLER
          </span>
        )}
        {product.salePrice && product.salePrice < product.price && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600/90 text-white tracking-wider uppercase">
            SALE
          </span>
        )}
      </div>

      {/* Floating Action Icons (Wishlist, Compare, QuickView) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
            isWishlisted
              ? 'bg-red-500/20 border-red-500 text-red-400'
              : 'bg-black/60 border-studio-border text-gray-300 hover:text-white hover:border-studio-gold'
          }`}
          aria-label="Save to Wishlist"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            addToCompare(product);
          }}
          className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
            isCompared
              ? 'bg-studio-gold/20 border-studio-gold text-studio-gold'
              : 'bg-black/60 border-studio-border text-gray-300 hover:text-white hover:border-studio-gold'
          }`}
          aria-label="Compare specifications"
          title="Compare Specifications"
        >
          <Scale className="w-4 h-4" />
        </button>

        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="p-2 rounded-xl backdrop-blur-md border bg-black/60 border-studio-border text-gray-300 hover:text-white hover:border-studio-gold transition-all"
            aria-label="Quick View"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image Area */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block w-full aspect-square bg-[#0C0C0C] overflow-hidden p-6 flex items-center justify-center"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
          }}
          className="w-full h-full object-contain filter brightness-95 group-hover:scale-108 group-hover:brightness-105 transition-all duration-500"
        />

        {/* Demo Notice Watermark Badge */}
        <div className="absolute bottom-2 left-2 right-2 text-center pointer-events-none">
          <span className="text-[9px] font-mono text-gray-500 bg-black/80 px-2 py-0.5 rounded border border-gray-800">
            {product.priceNotice || 'DEMO DATA — VERIFY BEFORE LAUNCH'}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex-1 flex flex-col p-5">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-medium">
          <span className="text-studio-gold uppercase tracking-wider font-mono text-[11px] font-bold">
            {product.brand}
          </span>
          <span className="text-gray-500">{product.category}</span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-base font-bold text-white hover:text-studio-gold line-clamp-1 transition-colors mb-1.5"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Short description */}
        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {product.shortDescription || product.description}
        </p>

        {/* Rating and Stock Indicator */}
        <div className="flex items-center justify-between mb-4 mt-auto pt-2 border-t border-studio-border/50 text-xs">
          <div className="flex items-center gap-1">
            <div className="flex items-center text-studio-gold">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-white text-[13px]">{product.rating}</span>
            <span className="text-gray-500 text-[11px]">({product.reviewCount || 0})</span>
          </div>

          <div>
            {isOutOfStock ? (
              <span className="text-red-400 font-medium text-[11px] bg-red-950/40 px-2 py-0.5 rounded border border-red-800/40">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-amber-400 font-medium text-[11px] bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-emerald-400 font-medium text-[11px] bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                <Check className="w-3 h-3" /> In Stock
              </span>
            )}
          </div>
        </div>

        {/* Price and Add to Cart Button */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-studio-gold font-mono">
                PKR {currentPrice.toLocaleString()}
              </span>
              {product.salePrice && product.salePrice < product.price && (
                <span className="text-xs text-gray-500 line-through font-mono">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              isOutOfStock
                ? 'bg-studio-border text-gray-500 cursor-not-allowed'
                : 'bg-studio-gold hover:bg-studio-goldHover text-black shadow-lg shadow-studio-gold/15 active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
