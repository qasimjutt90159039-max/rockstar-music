import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rockstar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('rockstar_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('rockstar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('rockstar_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('rockstar_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    if (product.stock <= 0) {
      addToast(`"${product.name}" is currently out of stock.`, 'warning');
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => (item.product._id || item.product.productId) === (product._id || product.productId));
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        addToast(`Updated quantity for "${product.name}" (${newQty} in cart)`, 'success');
        return prev.map((item) =>
          (item.product._id || item.product.productId) === (product._id || product.productId)
            ? { ...item, quantity: newQty }
            : item
        );
      } else {
        const initialQty = Math.min(product.stock, quantity);
        addToast(`Added "${product.name}" to cart!`, 'success');
        return [...prev, { product, quantity: initialQty }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => (i.product._id || i.product.productId) === productId);
      if (item) {
        addToast(`Removed "${item.product.name}" from cart.`, 'info');
      }
      return prev.filter((i) => (i.product._id || i.product.productId) !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if ((item.product._id || item.product.productId) === productId) {
          const maxStock = item.product.stock || 10;
          const cappedQty = Math.min(maxStock, quantity);
          return { ...item, quantity: cappedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.salePrice && item.product.salePrice < item.product.price
      ? item.product.salePrice
      : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  // Delivery: Free over PKR 15,000, else PKR 450
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 15000 ? 0 : 450;

  // Coupon discount calculation
  let discountAmount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maximumDiscount && discountAmount > appliedCoupon.maximumDiscount) {
        discountAmount = appliedCoupon.maximumDiscount;
      }
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
    if (discountAmount > subtotal) discountAmount = subtotal;
  }

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = async (code) => {
    if (!code || code.trim() === '') {
      addToast('Please enter a coupon code.', 'warning');
      return false;
    }

    const cleanCode = code.trim().toUpperCase();

    // Check API first
    try {
      const res = await axios.post('/api/coupons/validate', { code: cleanCode, subtotal });
      if (res.data?.success && res.data.coupon) {
        setAppliedCoupon(res.data.coupon);
        addToast(`Coupon "${cleanCode}" applied! Saved PKR ${res.data.coupon.discountAmount.toLocaleString()}`, 'success');
        return true;
      }
    } catch {
      // Local fallback for pre-seeded coupons
      if (cleanCode === 'ROCKSTAR10') {
        if (subtotal < 5000) {
          addToast('ROCKSTAR10 requires a minimum order of PKR 5,000', 'warning');
          return false;
        }
        const couponObj = {
          code: 'ROCKSTAR10',
          discountType: 'percentage',
          discountValue: 10,
          maximumDiscount: 5000
        };
        setAppliedCoupon(couponObj);
        addToast('Coupon ROCKSTAR10 applied (10% off)!', 'success');
        return true;
      } else if (cleanCode === 'STUDIO2000') {
        if (subtotal < 25000) {
          addToast('STUDIO2000 requires a minimum order of PKR 25,000', 'warning');
          return false;
        }
        const couponObj = {
          code: 'STUDIO2000',
          discountType: 'fixed',
          discountValue: 2000
        };
        setAppliedCoupon(couponObj);
        addToast('Coupon STUDIO2000 applied (PKR 2,000 off)!', 'success');
        return true;
      } else if (cleanCode === 'WELCOME5') {
        const couponObj = {
          code: 'WELCOME5',
          discountType: 'percentage',
          discountValue: 5,
          maximumDiscount: 2000
        };
        setAppliedCoupon(couponObj);
        addToast('Coupon WELCOME5 applied (5% off)!', 'success');
        return true;
      } else {
        addToast('Invalid or expired coupon code.', 'error');
        return false;
      }
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed.', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
