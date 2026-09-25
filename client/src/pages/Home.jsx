import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Volume2, 
  Disc, 
  Radio, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  MapPin,
  Phone,
  CheckCircle,
  Truck,
  ShieldCheck,
  Star
} from 'lucide-react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  VERIFIED_BUSINESS 
} from '../data/catalog';
import { MUSIC_GUIDES } from '../data/guides';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import AudioWave from '../components/common/AudioWave';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const featuredInstruments = INITIAL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = INITIAL_PRODUCTS.filter((p) => p.isNewProduct).slice(0, 4);

  return (
    <div className="bg-[#000000] text-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-studio-border">
        {/* Background Gradient & Studio Light Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#050505] to-[#000000] z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-studio-gold/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Ambient Studio Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#F5C542 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            {/* Live Studio Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151515] border border-studio-border mb-6">
              <span className="w-2 h-2 rounded-full bg-studio-gold animate-ping" />
              <span className="text-xs font-mono font-medium text-gray-300 tracking-wide uppercase">
                Multan Sound Room & Showroom
              </span>
              <span className="text-studio-gold">•</span>
              <AudioWave count={4} height={14} />
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white font-display mb-6">
              PLAY YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-gold via-[#FFE899] to-studio-gold">
                SOUND.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Professional musical instruments and equipment for musicians, performers, and studios.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-studio-gold hover:bg-studio-goldHover text-black text-sm font-black tracking-wider uppercase rounded-2xl transition-all shadow-xl shadow-studio-gold/20 flex items-center justify-center gap-2 group"
              >
                <span>SHOP INSTRUMENTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/audio"
                className="w-full sm:w-auto px-8 py-4 bg-[#151515] hover:bg-[#202020] text-white hover:text-studio-gold border border-studio-border hover:border-studio-gold/60 text-sm font-bold tracking-wider uppercase rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE AUDIO</span>
                <Volume2 className="w-4 h-4 text-studio-gold" />
              </Link>
            </div>

            {/* Verified Trust Strip */}
            <div className="mt-10 pt-8 border-t border-studio-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-studio-gold" />
                <span>Verified Brand Models</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-studio-gold" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-studio-gold" />
                <span>Peer Khurshid Colony, Multan</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Graphic / Instrument Spotlight */}
          <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
            {/* Ambient gold aura circle */}
            <div className="absolute inset-4 rounded-full border border-studio-gold/20 animate-pulse-glow" />
            <div className="absolute inset-12 rounded-full border border-dashed border-studio-border/60" />

            <div className="relative w-full h-full p-8 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&auto=format&fit=crop"
                alt="Electric & Acoustic Guitars at Rockstar"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                }}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] z-10"
              />
            </div>

            {/* Floating Gear Tag 1 */}
            <div className="absolute -bottom-2 -left-2 sm:bottom-4 sm:left-4 z-20 p-3 bg-[#151515]/90 backdrop-blur-md border border-studio-border rounded-xl shadow-xl">
              <div className="text-[10px] text-gray-400 font-mono">FEATURED MODEL</div>
              <div className="text-xs font-bold text-white">Yamaha F310 Dreadnought</div>
              <div className="text-xs font-mono text-studio-gold font-bold">Spruce Acoustic</div>
            </div>

            {/* Floating Gear Tag 2 */}
            <div className="absolute top-4 right-2 sm:right-6 z-20 p-3 bg-[#151515]/90 backdrop-blur-md border border-studio-border rounded-xl shadow-xl flex items-center gap-2.5">
              <AudioWave count={5} height={16} />
              <div>
                <div className="text-[10px] text-gray-400 font-mono">STUDIO READY</div>
                <div className="text-xs font-bold text-studio-gold">Pure Acoustics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL CATEGORY RAIL (Section 8) */}
      <section className="py-16 bg-[#0B0B0B] border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase tracking-widest mb-1">
                <span>Select Your Instrument Family</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                EXPLORE BY CATEGORY
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs sm:text-sm text-studio-gold hover:underline font-bold flex items-center gap-1"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal scroll container */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
            {INITIAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/${cat.slug}`}
                className="group relative flex-shrink-0 w-52 sm:w-60 h-72 rounded-2xl overflow-hidden bg-[#151515] border border-studio-border hover:border-studio-gold/70 transition-all duration-300 shadow-lg flex flex-col justify-end p-5"
              >
                {/* Background Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                  }}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] group-hover:scale-110 group-hover:brightness-[0.6] transition-all duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-[11px] font-mono text-studio-gold font-bold uppercase tracking-wider mb-1">
                    {cat.count} Instruments
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-studio-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED INSTRUMENTS SPOTLIGHT */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio & Stage Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              FEATURED MUSICAL INSTRUMENTS
            </h2>
          </div>
          <Link
            to="/shop?featured=true"
            className="px-5 py-2.5 rounded-xl border border-studio-border hover:border-studio-gold bg-[#151515] text-xs font-bold text-gray-300 hover:text-studio-gold transition-all self-start sm:self-auto"
          >
            Explore Featured ({featuredInstruments.length})
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredInstruments.map((product) => (
            <ProductCard
              key={product._id || product.productId}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. EDITORIAL ASYMMETRICAL SPOTLIGHT: STUDIO MONITORING & RECORDING */}
      <section className="py-16 bg-[#0B0B0B] border-y border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Large Editorial Card */}
            <div className="lg:col-span-7 bg-[#151515] border border-studio-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-studio-gold/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative z-10 max-w-xl">
                <span className="px-3 py-1 rounded-full bg-studio-gold/20 text-studio-gold font-mono text-xs font-bold tracking-wider uppercase mb-4 inline-block">
                  RECORDING STUDIO GEAR
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight font-display mb-4">
                  ACCURACY IS EVERYTHING IN THE MIX.
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Equip your studio with industry reference monitors, USB preamps, and legendary dynamic microphones. Hear the exact transient detail and true harmonic spectrum.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/audio"
                    className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-extrabold uppercase rounded-xl transition-all"
                  >
                    View Studio Gear
                  </Link>
                  <Link
                    to="/music-guides/home-studio-equipment-guide"
                    className="px-6 py-3 bg-black hover:bg-[#222222] border border-studio-border text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Studio Setup Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Side Card 1: Keyboards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#151515] border border-studio-border rounded-3xl p-6 sm:p-8 flex items-center justify-between group hover:border-studio-gold/50 transition-colors">
                <div>
                  <span className="text-[10px] font-mono text-studio-gold uppercase font-bold">
                    88-Key Weighted & Synth
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1 group-hover:text-studio-gold transition-colors">
                    Stage Keyboards & Pianos
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Roland, Yamaha, and Casio digital keyboards for practice & performance.
                  </p>
                  <Link
                    to="/keyboards"
                    className="inline-flex items-center gap-1 text-xs text-studio-gold font-bold mt-3 hover:underline"
                  >
                    <span>Browse Keyboards</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1552422535-c45813c61732?w=300&auto=format&fit=crop"
                  alt="Keyboards"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                  }}
                  className="w-24 h-24 object-cover rounded-xl border border-studio-border hidden sm:block"
                />
              </div>

              {/* Side Card 2: Microphones */}
              <div className="bg-[#151515] border border-studio-border rounded-3xl p-6 sm:p-8 flex items-center justify-between group hover:border-studio-gold/50 transition-colors">
                <div>
                  <span className="text-[10px] font-mono text-studio-gold uppercase font-bold">
                    Stage & Studio Mics
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1 group-hover:text-studio-gold transition-colors">
                    Dynamic & Condenser Microphones
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Shure SM58, SM57, and Audio-Technica AT2020 recording microphones.
                  </p>
                  <Link
                    to="/microphones"
                    className="inline-flex items-center gap-1 text-xs text-studio-gold font-bold mt-3 hover:underline"
                  >
                    <span>Browse Microphones</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop"
                  alt="Microphones"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                  }}
                  className="w-24 h-24 object-cover rounded-xl border border-studio-border hidden sm:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS & NEW ARRIVALS DUAL GRID */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Best Sellers */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-studio-border">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-studio-gold" />
                <span>Store Best Sellers</span>
              </h3>
              <Link to="/best-sellers" className="text-xs text-studio-gold hover:underline font-bold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product._id || product.productId}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-studio-border">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-studio-gold" />
                <span>New Arrivals</span>
              </h3>
              <Link to="/new-arrivals" className="text-xs text-studio-gold hover:underline font-bold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newArrivals.map((product) => (
                <ProductCard
                  key={product._id || product.productId}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EDUCATIONAL MUSIC GUIDES PREVIEW (Section 22) */}
      <section className="py-16 bg-[#0B0B0B] border-t border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-studio-gold text-xs font-mono uppercase tracking-widest mb-1.5">
                <span>Knowledge & Technique</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                MUSIC & GEAR GUIDES
              </h2>
            </div>
            <Link
              to="/music-guides"
              className="text-xs sm:text-sm text-studio-gold hover:underline font-bold flex items-center gap-1"
            >
              <span>Explore All 9 Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MUSIC_GUIDES.slice(0, 3).map((guide) => (
              <Link
                key={guide.slug}
                to={`/music-guides/${guide.slug}`}
                className="group bg-[#151515] border border-studio-border hover:border-studio-gold/60 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-studio-gold font-bold">
                    {guide.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1.5 font-mono">{guide.readTime}</div>
                    <h3 className="text-lg font-bold text-white group-hover:text-studio-gold transition-colors leading-snug mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-studio-border/50 text-xs font-bold text-studio-gold flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED STORE PROFILE & CONTACT SECTION (Sections 24 & 25) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#151515] to-[#0A0A0A] border border-studio-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-studio-gold/15 border border-studio-gold/30 text-studio-gold text-xs font-mono uppercase font-bold mb-4">
                <span>Verified Local Business</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-display mb-4">
                ROCKSTAR MUSICAL INSTRUMENTS SHOP
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                A local musical-instrument and music-equipment business located in Multan, Punjab, Pakistan. Serving students, session performers, and audio engineers with verified instrument models.
              </p>

              <div className="space-y-3.5 text-xs text-gray-200 mb-8 font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-studio-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Store Address:</div>
                    <div className="text-gray-400">{VERIFIED_BUSINESS.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-studio-gold flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Direct Phone:</div>
                    <a
                      href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                      className="font-mono text-studio-gold font-bold text-sm hover:underline"
                    >
                      {VERIFIED_BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                  className="px-6 py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-studio-gold/15"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Store</span>
                </a>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-black hover:bg-[#202020] border border-studio-border text-white text-xs font-bold rounded-xl transition-all"
                >
                  Send Inquiry Message
                </Link>
              </div>
            </div>

            {/* Map / Directions Graphic Card */}
            <div className="bg-[#0A0A0A] border border-studio-border/80 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-studio-border mb-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Multan Store Location</h4>
                  <p className="text-[11px] text-gray-400">Peer Khurshid Colony, Multan</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-studio-gold animate-pulse" />
              </div>

              <div className="aspect-video bg-[#121212] rounded-xl border border-studio-border/50 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="w-8 h-8 text-studio-gold mb-2" />
                <div className="font-bold text-white text-sm">Service Road, Peer Khurshid Colony</div>
                <div className="text-xs text-gray-400 mt-1">Chah Usman Wala, Multan, Punjab, Pakistan</div>
                <div className="mt-4 px-3 py-1 bg-black/60 rounded-full border border-studio-border text-[10px] font-mono text-studio-gold">
                  In-Store Inspection & Pickup Available
                </div>
              </div>

              <div className="mt-4 text-[11px] text-gray-400 text-center">
                All inquiries handled directly via phone: <span className="text-studio-gold font-mono font-bold">+92 300 6303618</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
