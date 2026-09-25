/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          black: '#000000',
          dark: '#0B0B0B',
          card: '#151515',
          panel: '#1E1E1E',
          border: '#292929',
          borderLight: '#383838',
          muted: '#A3A3A3',
          gold: '#F5C542',
          goldHover: '#E0B232',
          goldLight: '#FDF3D6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Inter', 'sans-serif']
      },
      keyframes: {
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '28px' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' }
        }
      },
      animation: {
        'audio-wave': 'wave 1.2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
