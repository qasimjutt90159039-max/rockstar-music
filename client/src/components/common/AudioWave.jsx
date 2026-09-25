import React from 'react';

const AudioWave = ({ count = 12, height = 24, className = '', animated = true }) => {
  const bars = Array.from({ length: count });

  return (
    <div className={`inline-flex items-center gap-1 h-[${height}px] ${className}`} aria-hidden="true">
      {bars.map((_, i) => {
        // Vary heights for an authentic audio spectrum
        const minH = 4;
        const maxH = height;
        const baseH = [6, 14, 22, 10, 18, 24, 12, 20, 16, 8, 22, 14][i % 12];
        const delay = (i * 0.1).toFixed(2);
        const duration = (0.8 + (i % 5) * 0.15).toFixed(2);

        return (
          <span
            key={i}
            className={`w-[2.5px] rounded-full bg-studio-gold ${
              animated ? 'audio-bar' : ''
            }`}
            style={{
              height: `${baseH}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0.85
            }}
          />
        );
      })}
    </div>
  );
};

export default AudioWave;
