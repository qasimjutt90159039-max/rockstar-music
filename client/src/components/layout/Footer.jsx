import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ShieldCheck, Truck, Music, Clock } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../../data/catalog';
import AudioWave from '../common/AudioWave';

const Footer = () => {
  return (
    <footer className="bg-[#070707] border-t border-studio-border text-gray-400 text-sm">
      {/* Studio Value Highlights */}
      <div className="border-b border-studio-border/60 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-studio-card/40 border border-studio-border/50">
              <div className="p-3 bg-studio-gold/10 border border-studio-gold/30 rounded-lg text-studio-gold">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Cash on Delivery</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Pay securely upon arrival. Store verification conducted before dispatch across Multan and nationwide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-studio-card/40 border border-studio-border/50">
              <div className="p-3 bg-studio-gold/10 border border-studio-gold/30 rounded-lg text-studio-gold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Verified Gear Catalog</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Accurate manufacturer specifications and real product models. Pre-launch demo prices subject to in-store verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-studio-card/40 border border-studio-border/50">
              <div className="p-3 bg-studio-gold/10 border border-studio-gold/30 rounded-lg text-studio-gold">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-base">Local Multan Music Store</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Serving performers, studio creators, and aspiring musicians at Peer Khurshid Colony, Multan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Business Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="text-2xl font-black tracking-widest text-white font-display">
                ROCKSTAR
              </div>
              <div className="text-[10px] tracking-widest text-studio-gold font-mono uppercase">
                MUSICAL INSTRUMENTS SHOP
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Professional musical instruments and sound equipment for musicians, performers, and recording studios in Multan, Pakistan.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-studio-gold flex-shrink-0 mt-0.5" />
                <span>{VERIFIED_BUSINESS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-studio-gold flex-shrink-0" />
                <a
                  href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                  className="font-mono text-studio-gold font-bold hover:underline"
                >
                  {VERIFIED_BUSINESS.phone}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <AudioWave count={10} height={18} />
            </div>
          </div>

          {/* Instrument Categories */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">
              Instruments
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/guitars" className="hover:text-studio-gold transition-colors">
                  Guitars
                </Link>
              </li>
              <li>
                <Link to="/keyboards" className="hover:text-studio-gold transition-colors">
                  Keyboards & Pianos
                </Link>
              </li>
              <li>
                <Link to="/drums" className="hover:text-studio-gold transition-colors">
                  Drums & Percussion
                </Link>
              </li>
              <li>
                <Link to="/microphones" className="hover:text-studio-gold transition-colors">
                  Microphones
                </Link>
              </li>
              <li>
                <Link to="/audio" className="hover:text-studio-gold transition-colors">
                  Audio & Studio Gear
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-studio-gold transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Music Guides & Brands */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">
              Guides & Brands
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/music-guides" className="hover:text-studio-gold transition-colors">
                  Music Guides Directory
                </Link>
              </li>
              <li>
                <Link to="/music-guides/how-to-choose-your-first-guitar" className="hover:text-studio-gold transition-colors">
                  Choosing First Guitar
                </Link>
              </li>
              <li>
                <Link to="/music-guides/home-studio-equipment-guide" className="hover:text-studio-gold transition-colors">
                  Home Studio Setup
                </Link>
              </li>
              <li>
                <Link to="/music-guides/how-to-choose-a-microphone" className="hover:text-studio-gold transition-colors">
                  Microphone Buying Guide
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-studio-gold transition-colors">
                  Catalog Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-studio-gold transition-colors">
                  About Rockstar Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-studio-gold transition-colors">
                  Contact Store
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-studio-gold transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-studio-gold transition-colors">
                  Returns & Claims
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-studio-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-studio-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-studio-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo Notice Banner */}
        <div className="mt-12 p-4 rounded-xl bg-[#111111] border border-studio-border/70 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-studio-gold/20 text-studio-gold font-mono font-bold text-[10px]">
                {VERIFIED_BUSINESS.priceNotice}
              </span>
              <span>All catalog prices are indicative market reference and must be verified in-store before purchase.</span>
            </div>
            <div className="text-[11px] text-gray-500 font-mono">
              Multan, Punjab, Pakistan
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-studio-border flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Rockstar Musical Instruments Shop. All rights reserved.</p>
          <p className="text-gray-600 font-mono text-[11px]">
            Designed for Musicians, Performers & Studios
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
