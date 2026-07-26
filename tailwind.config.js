/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        surface: "#0e0e11",
        glass: "rgba(255, 255, 255, 0.03)",
        borderGlass: "rgba(255, 255, 255, 0.08)",
        accent: "#3b82f6",
        cyanGlow: "#06b6d4",
      },
      fontFamily: {
        sans: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}