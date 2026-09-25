import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight, BookOpen } from 'lucide-react';
import { MUSIC_GUIDES } from '../data/guides';

const MusicGuides = () => {
  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-studio-border text-studio-gold text-xs font-mono uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight mb-4">
            MUSIC & GEAR GUIDES
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Expert educational buying guides and technical breakdowns for guitarists, drummers, vocalists, and home studio engineers.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MUSIC_GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              to={`/music-guides/${guide.slug}`}
              className="group bg-[#111111] border border-studio-border hover:border-studio-gold/60 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black"
            >
              <div>
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
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono font-bold text-studio-gold">
                    {guide.category}
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="text-[11px] text-gray-500 font-mono mb-2">{guide.readTime}</div>
                  <h3 className="text-xl font-bold text-white group-hover:text-studio-gold transition-colors leading-snug mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <div className="pt-4 border-t border-studio-border/60 flex items-center justify-between text-xs font-bold text-studio-gold">
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicGuides;
