module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'particle-float': 'float 5s infinite ease-in-out',
        'smooth-fade': 'fadeIn 2s ease-out',
        'bubble-fall': 'bubbleFall 10s infinite ease-in-out', // Change name to bubbleFall
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
        slideLoop: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(-200%)' },
          '75%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(-400%)' },
        },
      },
    },
  },
  plugins: [],
};
