import React from 'react';
import { Truck, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';

const ShippingPolicy = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black font-display mb-4">
          SHIPPING & DELIVERY POLICY
        </h1>
        <div className="text-xs font-mono text-studio-gold mb-8">
          Rockstar Musical Instruments Shop • Multan, Punjab, Pakistan
        </div>

        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-10 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Delivery Coverage</h2>
            <p>
              Rockstar Musical Instruments Shop provides delivery services across Multan city as well as nationwide delivery to major cities and districts across Pakistan through reputable courier partners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Delivery Timeframes</h2>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
              <li><strong>Multan Local:</strong> Typically 24 to 48 hours following telephone order verification.</li>
              <li><strong>Punjab Major Cities:</strong> 2 to 4 business days.</li>
              <li><strong>Sindh, KPK, Balochistan & Nationwide:</strong> 3 to 6 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Shipping Charges</h2>
            <p>
              Standard courier delivery charge is PKR 450 per parcel. Orders exceeding PKR 15,000 qualify for complimentary delivery.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Cash on Delivery (COD) Inspection</h2>
            <p>
              All shipments are dispatched via verified Cash on Delivery. Customers are advised to examine external packaging condition upon arrival before completing payment.
            </p>
          </section>

          <div className="p-4 bg-black/60 rounded-xl border border-studio-border text-xs text-gray-400">
            For urgent shipment inquiries or tracking updates, contact our Multan shop at <span className="text-studio-gold font-mono font-bold">+92 300 6303618</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
