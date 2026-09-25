import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { INITIAL_BRANDS, INITIAL_PRODUCTS } from '../data/catalog';

const BRANDS_EXTENDED = [
  {
    name: 'Yamaha',
    slug: 'yamaha',
    country: 'Japan',
    category: 'Guitars, Keyboards, Audio',
    description: 'Renowned for acoustic pianos, Pacifica electric guitars, portable keyboards, and HS studio monitors.',
    modelsCount: 5
  },
  {
    name: 'Fender',
    slug: 'fender',
    country: 'USA',
    category: 'Electric Guitars & Strings',
    description: 'Pioneers of the Stratocaster, Telecaster, Precision Bass, and iconic electric guitar amplification.',
    modelsCount: 2
  },
  {
    name: 'Ibanez',
    slug: 'ibanez',
    country: 'Japan',
    category: 'Electric Guitars & Basses',
    description: 'Precision Japanese electric instruments favored for ultra-slim fast necks and heavy rock performance.',
    modelsCount: 2
  },
  {
    name: 'Roland',
    slug: 'roland',
    country: 'Japan',
    category: 'Digital Pianos & Drums',
    description: 'World leaders in SuperNATURAL digital pianos, V-Drums electronic kits, and synthesizers.',
    modelsCount: 2
  },
  {
    name: 'Shure',
    slug: 'shure',
    country: 'USA',
    category: 'Microphones',
    description: 'The global standard in stage and studio transducers, including the legendary SM58 and SM57 microphones.',
    modelsCount: 2
  },
  {
    name: 'Audio-Technica',
    slug: 'audio-technica',
    country: 'Japan',
    category: 'Microphones & Headphones',
    description: 'Celebrated for ATH-M50x studio monitoring headphones and AT2020 cardioid condenser microphones.',
    modelsCount: 2
  },
  {
    name: 'Behringer',
    slug: 'behringer',
    country: 'Germany',
    category: 'Audio Interfaces & Mixers',
    description: 'Specialists in accessible home studio recording hardware, U-Phoria audio interfaces, and preamps.',
    modelsCount: 1
  },
  {
    name: 'Marshall',
    slug: 'marshall',
    country: 'UK',
    category: 'Guitar Amplification',
    description: 'Legendary British guitar amplification powering classic and modern rock with punchy British distortion.',
    modelsCount: 1
  },
  {
    name: 'Tama',
    slug: 'tama',
    country: 'Japan',
    category: 'Acoustic Drums & Hardware',
    description: 'The strongest name in drums, engineered for heavy stage touring and balanced poplar shell resonance.',
    modelsCount: 1
  },
  {
    name: 'Casio',
    slug: 'casio',
    country: 'Japan',
    category: 'Keyboards & Pianos',
    description: 'Maker of portable Casiotone educational keyboards and accessible musical keyboard instruments.',
    modelsCount: 1
  },
  {
    name: 'Korg',
    slug: 'korg',
    country: 'Japan',
    category: 'Tuners & Synthesizers',
    description: 'Creators of industry-standard TM-60 chromatic tuners, metronomes, and analog synthesizers.',
    modelsCount: 1
  }
];

const BrandsPage = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-2">
            Manufacturer Catalog
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight mb-4">
            CATALOG BRANDS
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            World-class musical instrument and audio brands cataloged for identification and inventory tracking at Rockstar Musical Instruments Shop.
          </p>
        </div>

        {/* Disclaimer Notice (Prompt Section 23) */}
        <div className="p-4 sm:p-5 bg-[#111111] border border-studio-border rounded-2xl max-w-4xl mx-auto mb-16 text-xs text-gray-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-studio-gold flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Catalog Identification Notice:</strong> Brand names, model designations, and trademarks shown on this website are the property of their respective owners and are used strictly for product identification. Listing does not imply that Rockstar Musical Instruments Shop is an exclusive official supplier or authorized partner unless independently certified.
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS_EXTENDED.map((brand) => (
            <div
              key={brand.name}
              className="bg-[#111111] border border-studio-border hover:border-studio-gold/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-studio-border/60 mb-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-studio-gold transition-colors font-display tracking-tight">
                    {brand.name}
                  </h3>
                  <span className="text-[10px] font-mono text-studio-gold bg-studio-gold/10 px-2.5 py-1 rounded-full border border-studio-gold/30">
                    {brand.modelsCount} Models
                  </span>
                </div>

                <div className="text-[11px] text-gray-500 font-mono mb-2">
                  Origin: {brand.country} • {brand.category}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {brand.description}
                </p>
              </div>

              <Link
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="w-full py-3 bg-[#1A1A1A] hover:bg-studio-gold text-gray-200 hover:text-black rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Browse {brand.name} Gear</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
