/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shutterUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        shutterDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0
          }
        }
      },
      animation: {
        shutterUp: 'shutterUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        shutterDown: 'shutterDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards'
      },
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};