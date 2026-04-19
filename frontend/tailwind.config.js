/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#020617',
        midnight: '#0a0e2c',
        'glow-blue': '#3b82f6',
        'glow-purple': '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gridMove: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-200px)' },
        },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 3s linear infinite',
        'grid-move': 'gridMove 30s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-x': 'bounceX 1s ease-in-out infinite',
      },
      spacing: {
        // increase vertical spacing for breathing room
        24: '6rem', // 96px, used for py-24 etc.
      },
    },
  },
  plugins: [],
};
