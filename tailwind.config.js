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
        "raffle-gradient":
          "radial-gradient(98.89% 98.89% at 50% 0%, #801CFF 0%, #6930e0 0%, rgba(0, 137, 255, 0.00) 100%)",
        "raffle-card": "rgba(60, 23, 139, 0.07)",
      },
      boxShadow: {
        "raffle-card": "0px 0px 12.444px 0px #A277E0 inset",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
