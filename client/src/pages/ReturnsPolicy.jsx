import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';

const ReturnsPolicy = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black font-display mb-4">
          RETURNS & EXCHANGE POLICY
        </h1>
        <div className="text-xs font-mono text-studio-gold mb-8">
          Rockstar Musical Instruments Shop • Multan, Punjab, Pakistan
        </div>

        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-10 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Transit Damage or Manufacturing Defects</h2>
            <p>
              If your musical instrument or studio equipment arrives with physical damage or a proven manufacturing fault, you must notify Rockstar Musical Instruments Shop within 48 hours of delivery at +92 300 6303618.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Conditions for Return / Exchange</h2>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
              <li>Product must be in its original factory packaging with all accessories, cords, and manual inserts.</li>
              <li>Serial numbers on the instrument must match the store order reference.</li>
              <li>Products showing misuse, modifications, altered truss rods, or intentional damage cannot be returned.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Consumables Exception</h2>
            <p>
              Opened guitar strings, drumsticks with play marks, and in-ear monitors cannot be returned for hygiene and wear-and-tear reasons unless defective upon unboxing.
            </p>
          </section>

          <div className="p-4 bg-black/60 rounded-xl border border-studio-border text-xs text-gray-400">
            For returns evaluation, please contact Rockstar Musical Instruments Shop, Service Road, Peer Khurshid Colony, Multan, Pakistan (+92 300 6303618).
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;
