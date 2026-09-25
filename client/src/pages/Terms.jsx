import React from 'react';
import { VERIFIED_BUSINESS } from '../data/catalog';

const Terms = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black font-display mb-4">
          TERMS OF SERVICE
        </h1>
        <div className="text-xs font-mono text-studio-gold mb-8">
          Rockstar Musical Instruments Shop • Multan, Punjab, Pakistan
        </div>

        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-10 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing the Rockstar Musical Instruments Shop website or placing an order, you agree to comply with our store terms and verified delivery policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Catalog Pricing Notice</h2>
            <p>
              All prices displayed on this platform during pre-launch carry the notice: "DEMO DATA — VERIFY BEFORE LAUNCH". Prices represent standard market reference and are verified by store staff prior to dispatch.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Product Availability</h2>
            <p>
              We strive to keep stock figures accurate. In the rare event that an item is depleted before an order is verified, our staff will contact you immediately via telephone (+92 300 6303618) to offer alternatives or cancellation without penalty.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
