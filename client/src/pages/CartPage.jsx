import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  AlertCircle,
  X,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await applyCoupon(couponInput.trim());
    setCouponLoading(false);
    setCouponInput('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#000000] min-h-[75vh] flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-16 h-16 rounded-full bg-studio-card border border-studio-border flex items-center justify-center mb-4 text-studio-gold">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold mb-2 font-display">Your Shopping Cart is Empty</h1>
        <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
          Looks like you haven't added any instruments or audio equipment to your cart yet.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-studio-border mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-1">
              Order Review
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              SHOPPING CART
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Cart Items List (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              const id = product._id || product.productId;
              const price = product.salePrice && product.salePrice < product.price
                ? product.salePrice
                : product.price;
              const itemTotal = price * item.quantity;

              return (
                <div
                  key={id}
                  className="bg-[#151515] border border-studio-border rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
                >
                  {/* Image & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                      }}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-black rounded-xl p-2 border border-studio-border/70 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono text-studio-gold uppercase font-bold">
                        {product.brand}
                      </div>
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-sm sm:text-base font-bold text-white hover:text-studio-gold transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        PKR {price.toLocaleString()} each
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono mt-1">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-studio-border/50">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-studio-border rounded-xl bg-black px-2 py-1">
                      <button
                        onClick={() => updateQuantity(id, item.quantity - 1)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 font-mono font-bold text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(id, item.quantity + 1)}
                        disabled={item.quantity >= (product.stock || 10)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white text-sm disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[100px]">
                      <div className="text-base font-black font-mono text-studio-gold">
                        PKR {itemTotal.toLocaleString()}
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(id)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between items-center pt-4">
              <Link
                to="/shop"
                className="text-xs text-studio-gold hover:underline font-bold flex items-center gap-1"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary Box (4 Columns) */}
          <div className="lg:col-span-4 bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-white border-b border-studio-border pb-3">
              Order Summary
            </h3>

            {/* Coupon Application */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white uppercase focus:outline-none focus:border-studio-gold font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponLoading}
                  className="px-4 py-2 bg-[#222222] hover:bg-studio-gold hover:text-black border border-studio-border text-xs font-bold rounded-xl transition-all"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="mt-2.5 p-2.5 bg-studio-gold/10 border border-studio-gold/30 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-studio-gold font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>{appliedCoupon.code || appliedCoupon.couponCode} applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-gray-400 hover:text-white p-0.5"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="mt-2 text-[10px] text-gray-500">
                Try: <span className="font-mono text-gray-400">ROCKSTAR10</span> (10% off) or <span className="font-mono text-gray-400">STUDIO2000</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 text-xs pt-4 border-t border-studio-border/70">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-mono font-medium">PKR {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span className="font-mono font-medium">- PKR {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400">
                <div className="flex items-center gap-1">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 && (
                    <span className="text-[10px] font-mono text-studio-gold bg-studio-gold/10 px-1.5 py-0.5 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <span className="text-white font-mono font-medium">
                  {deliveryFee === 0 ? 'PKR 0' : `PKR ${deliveryFee.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-studio-border text-base">
                <span className="font-bold text-white">Total Amount</span>
                <span className="text-2xl font-black font-mono text-studio-gold">
                  PKR {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pre-launch Disclaimer Banner */}
            <div className="p-3 bg-black/60 rounded-xl border border-studio-border/60 text-[10px] font-mono text-gray-500 text-center">
              DEMO DATA — VERIFY BEFORE LAUNCH. Cash on Delivery is the initial payment method.
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-studio-gold hover:bg-studio-goldHover text-black text-sm font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-studio-gold/20 tracking-wider uppercase"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Cash on delivery reassurance */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
              <Truck className="w-4 h-4 text-studio-gold" />
              <span>Cash on Delivery supported across Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
