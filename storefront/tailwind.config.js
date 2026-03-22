/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#5C8A5C",
          /** Darker green — primary CTA (Order Now) */
          "green-dark": "#3F6B3F",
          gold: "#D4A96A",
          /** Rich gold — brand wordmark in nav */
          "gold-rich": "#C4833A",
          cream: "#FDF8F2",
          dark: "#2C2C2C",
          light: "#EAF2EA",
        },
      },
      fontFamily: {
        /** Headings — Playfair Display */
        heading: ["Playfair Display", "Georgia", "serif"],
        /** UI / labels — same as body (Lato) for utilities like `font-subheading` */
        subheading: ["Lato", "system-ui", "sans-serif"],
        body: ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
