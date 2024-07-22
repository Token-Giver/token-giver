import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "2xl": ["6em", "1.06"],
      xl: ["clamp(0.75rem, 10vw, 3.5rem)", "1.15"],
      l: ["1em", "1.21"],
      sm: ["0.875em", "1.21"],
    },
    extend: {
      fontSize: {
        clamp: "clamp(0.5rem, 5vw, 1rem)",
      },
      colors: {
        "theme-green": "#127C56",
        "off-white": "#fffcf5",
        "theme-yellow": "#fbbf24",
      },
      fontFamily: {
        "Holly-Bale": ["Belanosima", "sans-serif"],
      },

      boxShadow: {
        small: "rgba(0, 0, 0, 0.2) 0px -1px 0.7rem",
        "hero-shadow": "rgba(0, 0, 0, 0.5) 0px 0px 0.9rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        "header-gradient":
          "linear-gradient(90deg,rgba(232, 249, 253, 1) 0%,rgba(228, 239, 231, 1) 50%,rgba(122, 178, 157, 1) 100%)",
      },
      animation: {
        "scale-pulse": "scale-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "scale-pulse": {
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
