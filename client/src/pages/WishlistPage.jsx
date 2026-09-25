import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="bg-[#000000] min-h-[75vh] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 rounded-full bg-studio-card border border-studio-border flex items-center justify-center mb-4 text-studio-gold">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 font-display">Your Wishlist is Empty</h1>
        <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
          Save musical instruments you love to track their availability or purchase later.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2"
        >
          <span>Explore Instruments</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-6 border-b border-studio-border mb-8">
          <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-1">
            Personal Studio Gear
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            MY WISHLIST ({wishlist.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const id = product._id || product.productId;
            const currentPrice = product.salePrice || product.price;

            return (
              <div
                key={id}
                className="bg-[#151515] border border-studio-border hover:border-studio-gold/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square bg-[#0C0C0C] p-6 flex items-center justify-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                      }}
                      className="max-w-full max-h-full object-contain"
                    />
                    <button
                      onClick={() => removeFromWishlist(id)}
                      className="absolute top-3 right-3 p-2 bg-black/60 rounded-xl border border-studio-border text-gray-400 hover:text-red-400 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] font-mono font-bold text-studio-gold uppercase">
                      {product.brand}
                    </div>
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-sm font-bold text-white hover:text-studio-gold transition-colors line-clamp-1 mt-1 mb-2 block"
                    >
                      {product.name}
                    </Link>
                    <div className="text-base font-mono font-black text-studio-gold">
                      PKR {currentPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => moveToCart(product)}
                    disabled={product.stock <= 0}
                    className="w-full py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:bg-gray-800 disabled:text-gray-500"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
