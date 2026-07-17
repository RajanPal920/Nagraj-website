/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#1F5C3E',
            dark: '#143D28',
          },
          gold: {
            DEFAULT: '#C9982E',
            light: '#E4C574',
          },
          white: '#FFFFFF',
          charcoal: '#2B2B2B',
          red: '#B0392E',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'steel-gradient': 'linear-gradient(135deg, #0d1f18 0%, #1F5C3E 40%, #143D28 70%, #0a1510 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9982E 0%, #E4C574 50%, #C9982E 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(31, 92, 62, 0.15)',
        'gold': '0 4px 20px rgba(201, 152, 46, 0.25)',
      },
    },
  },
  plugins: [],
}
