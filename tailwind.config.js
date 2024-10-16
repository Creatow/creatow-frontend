/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        "readex-pro": "Readex Pro",
      },
      backgroundImage: {
        "card-tag":
          "radial-gradient(circle at 50% 50%, #7873D2 8%, #EFB7D3 35%, #A998D9 63%, #BEB6E5 100%);",
        "search-bar-icon": "url('src/assets/navbar/search.svg')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
