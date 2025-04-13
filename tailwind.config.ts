import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        xMobile: "380px",
        mobile: "480px",
        lgMobile: "580px",
        xTablet: "920px"
      },
      fontSize: {
        clamp: "clamp(0.5rem, 5vw, 1rem)"
      },
      lineClamp: {
        8: "8"
      },
      fontFamily: {
        "Holly-Bale": ["Belanosima", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        agrandir: ["Agrandir", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        AgrandirRegular: ["AgrandirRegular", "sans-serif"]
      },
      colors: {
        "theme-green": "#127C56",
        black: "#000000",
        background: "#ffffff",
        "theme-yellow": "#fbbf24",
        debug: "#ff0000",
        "gray-100": "#f3f4f6",
        "gray-200": "#e5e7eb",
        "gray-300": "#9ca3af",
        red: "#dc2626",
        transparent: "transparent",
        blue: "#1d4ed8",
        "accent-green": "#00594C",
        "foreground-secondary": "#8E9BAE",
        "foreground-primary": "#282828"
      },

      boxShadow: {
        small: "rgba(0, 0, 0, 0.2) 0px -1px 0.7rem",
        "hero-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 0.9rem"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        "header-gradient":
          "linear-gradient(90deg,rgba(232, 249, 253, 1) 0%,rgba(228, 239, 231, 1) 50%,rgba(122, 178, 157, 1) 100%)"
      },

      keyframes: {
        "scale-pulse": {
          "50%": { transform: "scale(1.1)" }
        },
        zoomInOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        }
      },
      animation: {
        "scale-pulse": "scale-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "zoom-loading": "zoomInOut 1.5s ease-in-out infinite",
        fadeIn: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        fadeOut: "fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
      }
    }
  },
  plugins: []
};
export default config;
