import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music } from 'lucide-react';
import AudioWave from '../components/common/AudioWave';

const NotFound = () => {
  return (
    <div className="bg-[#000000] min-h-[80vh] flex flex-col items-center justify-center p-6 text-white text-center">
      <div className="mb-6">
        <AudioWave count={8} height={28} />
      </div>
      <div className="text-7xl sm:text-9xl font-black font-mono text-studio-gold mb-2 tracking-tighter">
        404
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 font-display">
        TRACK OUT OF RANGE
      </h1>
      <p className="text-gray-400 text-xs sm:text-sm max-w-md mb-8 leading-relaxed">
        The page you are looking for doesn't exist or has been relocated within the Rockstar Musical Instruments Shop catalog.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase rounded-2xl flex items-center gap-2 transition-all shadow-xl shadow-studio-gold/15"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Showroom</span>
      </Link>
    </div>
  );
};

export default NotFound;
