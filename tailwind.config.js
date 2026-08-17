/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            DEFAULT: "#B22222",
            dark: "#8B1A1A",
            light: "#D43A3A",
          },
          gold: {
            DEFAULT: "#C9A84C",
            light: "#D4B85A",
            dark: "#A8892E",
          },
          charcoal: {
            DEFAULT: "#1A1A1A",
            light: "#2D2D2D",
            dark: "#0D0D0D",
          },
          white: "#FFFFFF",
          steel: {
            DEFAULT: "#7A8A8A",
            light: "#9AABAB",
            dark: "#5A6A6A",
          },
        },
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #1A1A1A 0%, #B22222 40%, #8B1A1A 70%, #0D0D0D 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #A8892E 0%, #C9A84C 50%, #D4B85A 100%)",
        "steel-gradient":
          "linear-gradient(135deg, #5A6A6A 0%, #7A8A8A 50%, #9AABAB 100%)",
        "metallic-shine":
          "linear-gradient(135deg, #C9A84C 0%, #F0E6B0 30%, #C9A84C 60%, #A8892E 100%)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        slideDown: "slideDown 0.2s ease-out",
        fadeIn: "fadeIn 0.15s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-5px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.12)",
        "card-hover": "0 8px 40px rgba(178, 34, 34, 0.18)",
        gold: "0 4px 20px rgba(201, 168, 76, 0.24)",
        "gold-glow": "0 0 30px rgba(201, 168, 76, 0.3)",
        industrial: "0 4px 20px rgba(0, 0, 0, 0.3)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
    },
  },
  plugins: [],
};
