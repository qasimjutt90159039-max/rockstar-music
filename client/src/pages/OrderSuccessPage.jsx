import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Phone, ArrowRight, Printer } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Card */}
        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="w-20 h-20 bg-studio-gold/15 border border-studio-gold/40 rounded-full flex items-center justify-center mx-auto mb-6 text-studio-gold">
            <CheckCircle className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-studio-gold font-bold mb-2 inline-block">
            Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
            THANK YOU FOR YOUR ORDER
          </h1>
          <p className="text-sm text-gray-300 max-w-lg mx-auto mb-6">
            Your order has been safely placed with <strong className="text-white">Rockstar Musical Instruments Shop</strong>. Our team will verify and prepare your instrument parcel for delivery.
          </p>

          {/* Order Details Badge */}
          <div className="bg-black/60 border border-studio-border rounded-2xl p-4 max-w-md mx-auto mb-8 flex items-center justify-between font-mono text-xs">
            <span className="text-gray-400">Order Reference:</span>
            <span className="text-studio-gold font-black text-sm tracking-wider">
              {orderNumber || order?.orderNumber || 'RS-ORD-849201'}
            </span>
          </div>

          {/* Delivery & Payment Summary */}
          <div className="text-left bg-[#151515] border border-studio-border/70 rounded-2xl p-6 mb-8 text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-studio-border">
              <span className="text-gray-400">Payment Mode</span>
              <span className="text-white font-bold">Cash on Delivery (COD)</span>
            </div>
            {order?.customer && (
              <div className="flex items-start justify-between pb-3 border-b border-studio-border">
                <span className="text-gray-400">Recipient</span>
                <span className="text-white font-medium text-right">
                  {order.customer.fullName} ({order.customer.phone})
                  <br />
                  <span className="text-gray-400">{order.customer.address}, {order.customer.city}</span>
                </span>
              </div>
            )}
            {order?.total && (
              <div className="flex items-center justify-between pt-1 text-sm font-bold">
                <span className="text-gray-300">Total Payable</span>
                <span className="text-studio-gold font-mono font-black text-lg">
                  PKR {order.total.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Direct Support Notice */}
          <div className="p-4 bg-[#0A0A0A] rounded-xl border border-studio-border/50 text-xs text-gray-400 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-studio-gold" />
              <span>Questions regarding your delivery?</span>
            </div>
            <a
              href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
              className="text-studio-gold font-mono font-bold hover:underline"
            >
              {VERIFIED_BUSINESS.phone}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-3 bg-[#1A1A1A] hover:bg-[#252525] border border-studio-border text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-gray-400" />
              <span>Print Order Receipt</span>
            </button>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
