import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2, ArrowRight } from 'lucide-react';
import { MUSIC_GUIDES } from '../data/guides';
import AudioWave from '../components/common/AudioWave';

const MusicGuideDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const guide = MUSIC_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="bg-black min-h-[70vh] flex flex-col items-center justify-center p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Guide Not Found</h2>
        <Link to="/music-guides" className="text-studio-gold text-xs underline">
          Return to Music Guides
        </Link>
      </div>
    );
  }

  const otherGuides = MUSIC_GUIDES.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[#000000] min-h-screen text-white py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/music-guides"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-studio-gold mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Music Guides</span>
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs mb-3">
            <span className="px-3 py-1 rounded-full bg-studio-gold/20 text-studio-gold font-mono font-bold">
              {guide.category}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            {guide.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-studio-border mb-12 bg-black">
          <img
            src={guide.image}
            alt={guide.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-sm sm:text-base space-y-6">
          {guide.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-2xl font-bold text-white pt-4 pb-1 border-b border-studio-border font-display">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-lg font-bold text-studio-gold pt-2">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').map((l) => l.replace(/^[*|-]\s*/, ''));
              return (
                <ul key={idx} className="space-y-2 list-disc list-inside text-gray-300 pl-2">
                  {items.map((it, i) => (
                    <li key={i} className="leading-relaxed">
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="leading-relaxed">{trimmed}</p>;
          })}
        </div>

        {/* Author / Store Box */}
        <div className="mt-14 p-6 sm:p-8 bg-[#111111] border border-studio-border rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[10px] font-mono text-studio-gold uppercase font-bold tracking-wider">
              Educational Guide by
            </div>
            <h4 className="text-lg font-bold text-white mt-1">
              Rockstar Musical Instruments Shop
            </h4>
            <p className="text-xs text-gray-400 mt-1 max-w-md">
              Peer Khurshid Colony, Multan, Pakistan. Need assistance picking the right gear? Contact our store directly at +92 300 6303618.
            </p>
          </div>
          <Link
            to="/shop"
            className="px-6 py-3 bg-studio-gold text-black text-xs font-black uppercase rounded-xl whitespace-nowrap shadow-lg shadow-studio-gold/15"
          >
            Explore Catalog
          </Link>
        </div>

        {/* Other Guides Carousel / Grid */}
        <div className="mt-16 pt-12 border-t border-studio-border">
          <h3 className="text-2xl font-extrabold text-white mb-6">More Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherGuides.map((og) => (
              <Link
                key={og.slug}
                to={`/music-guides/${og.slug}`}
                className="group bg-[#111111] border border-studio-border hover:border-studio-gold/60 p-4 rounded-2xl transition-all block"
              >
                <img
                  src={og.image}
                  alt={og.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop';
                  }}
                  className="w-full aspect-video object-cover rounded-xl mb-3"
                />
                <span className="text-[10px] font-mono text-studio-gold font-bold">{og.category}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-studio-gold line-clamp-2 mt-1">
                  {og.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicGuideDetail;
