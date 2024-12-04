module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'particle-float': 'float 5s infinite ease-in-out',
        'smooth-fade': 'fadeIn 2s ease-out',
        'bubble-fall': 'bubbleFall 10s infinite ease-in-out',
        'shimmer': 'shimmer 2s infinite linear', 
        'glowing': 'glowing 3s ease-in-out infinite', 
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        bubbleFall: {
          '0%': { transform: 'translateY(-100px)', opacity: 1 }, // Start from top
          '50%': { transform: 'translateY(300px)', opacity: 0.7 }, // Fall down to 300px
          '100%': { transform: 'translateY(-100px)', opacity: 1 }, // Reset to top (falling loop)
        },
        shimmer: { 
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideLoop: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' },
          '75%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' },
        },
        glowing: { 
          '0%': {
            textShadow: '0 0 10px #fff, 0 0 15px #fff, 0 0 30px #ff00ff, 0 0 50px #ff00ff',
          },
          '50%': {
            textShadow: '0 0 20px #fff, 0 0 30px #ff00ff, 0 0 60px #ff00ff, 0 0 100px #ff00ff',
          },
          '100%': {
            textShadow: '0 0 10px #fff, 0 0 15px #fff, 0 0 30px #ff00ff, 0 0 50px #ff00ff',
          },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 75%)',
      },
    },
  },
  plugins: [],
};
