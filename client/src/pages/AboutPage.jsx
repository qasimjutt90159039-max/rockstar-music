import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Music, CheckCircle2 } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';
import AudioWave from '../components/common/AudioWave';

const AboutPage = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-studio-border text-studio-gold text-xs font-mono uppercase tracking-widest mb-4">
            <Music className="w-3.5 h-3.5" />
            <span>Local Multan Business</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight mb-4">
            ABOUT OUR STORE
          </h1>
          <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Rockstar Musical Instruments Shop is a real local musical-instrument and music-equipment business located in Multan, Punjab, Pakistan.
          </p>
        </div>

        {/* Core Business Information Card */}
        <div className="bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-12 mb-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Rockstar Musical Instruments Shop
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              We provide performers, students, studio creators, and music enthusiasts with guitars, keyboards, drums, microphones, and audio equipment. Our store is established at Service Road, Peer Khurshid Colony, Chah Usman Wala in Multan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-studio-border">
            {/* Address */}
            <div className="p-5 bg-black/60 border border-studio-border/70 rounded-2xl">
              <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase font-bold mb-2">
                <MapPin className="w-4 h-4" />
                <span>Store Location</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {VERIFIED_BUSINESS.address}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Multan, Punjab, Pakistan
              </div>
            </div>

            {/* Direct Phone */}
            <div className="p-5 bg-black/60 border border-studio-border/70 rounded-2xl">
              <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase font-bold mb-2">
                <Phone className="w-4 h-4" />
                <span>Direct Contact</span>
              </div>
              <a
                href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                className="text-base font-bold font-mono text-studio-gold hover:underline"
              >
                {VERIFIED_BUSINESS.phone}
              </a>
              <div className="text-xs text-gray-400 mt-1">
                Voice calls and WhatsApp inquiries
              </div>
            </div>
          </div>

          {/* Operational Principles */}
          <div className="pt-4 border-t border-studio-border">
            <h3 className="text-base font-bold text-white mb-3">Our Core Commitments</h3>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-studio-gold flex-shrink-0 mt-0.5" />
                <span>Real product specifications verified directly against reliable manufacturer standards.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-studio-gold flex-shrink-0 mt-0.5" />
                <span>Truthful store pricing: Pre-launch demo prices subject to stock verification prior to order dispatch.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-studio-gold flex-shrink-0 mt-0.5" />
                <span>Cash on Delivery support for safe customer inspection across Pakistan.</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/shop"
            className="px-8 py-4 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-studio-gold/15 inline-block"
          >
            Browse Musical Instruments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
