import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black font-display mb-4">
          PRIVACY POLICY
        </h1>
        <div className="text-xs font-mono text-studio-gold mb-8">
          Rockstar Musical Instruments Shop • Multan, Punjab, Pakistan
        </div>

        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-10 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Information Collection</h2>
            <p>
              Rockstar Musical Instruments Shop collects customer delivery information (name, telephone number, and postal address) solely for the fulfillment and shipping of your orders and to communicate order updates.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Data Security</h2>
            <p>
              Customer account passwords are encrypted using one-way bcrypt hashing. We never sell, lease, or distribute your personal details to third-party advertising companies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Cookies & Local Storage</h2>
            <p>
              We utilize browser local storage to preserve your shopping cart items, wishlist preferences, and session tokens across visits.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
