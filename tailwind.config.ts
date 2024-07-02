import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-green": "#127C56",
        "off-white": "#fffcf5",
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
    },
  },
  plugins: [],
};
export default config;
