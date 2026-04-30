/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05090A",
          900: "#0A1216",
          800: "#0E191E",
          700: "#152127",
          600: "#1D2C34",
        },
        sage: {
          50: "#F4F8F7",
          100: "#DFEAE8",
          200: "#CBDAD8",
          300: "#BBC9C7",
          400: "#9AADAB",
          500: "#7A8F8D",
        },
      },
      fontFamily: {
        display: ['"General Sans"', "system-ui", "sans-serif"],
        sans: ['"General Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 5.8vw, 5.25rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.85rem, 3.8vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      animation: {
        "float-slow": "float 9s ease-in-out infinite",
        "float-slower": "float 13s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-24px,0) rotate(6deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
