/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /**
         * Official brand palette:
         * | Token        | Hex       | RGB equivalent              |
         * |--------------|-----------|-----------------------------|
         * | green-dark   | #237227   | rgb(35, 114, 39)            |
         * | green        | #519A66   | rgb(81, 154, 102)           |
         * | gold         | #FFAA00   | rgb(255, 170, 0)            |
         * | cream        | #FFD786   | rgb(255, 215, 134)          |
         */
        brand: {
          /** Deep forest — primary ink, dark CTAs, emphasis */
          "green-dark": "#237227",
          /** Leaf — buttons, links, active states */
          green: "#519A66",
          /** Amber — accents, badges, secondary CTAs */
          gold: "#FFAA00",
          /** Same as gold — wordmarks, nav highlights, pill buttons */
          "gold-rich": "#FFAA00",
          /** Warm highlight — page background, inputs, soft panels */
          cream: "#FFD786",
          /** Body/heading text (matches green-dark for one brand ink) */
          dark: "#237227",
          /** Soft mint wash — borders, chips, hover fills */
          light: "#E6F0EA",
        },
      },
      fontFamily: {
        /** Primary titles — Poppins Bold (700) via `font-bold` */
        heading: ["Poppins", "system-ui", "sans-serif"],
        /** Secondary titles / kickers — Poppins Medium (500) via `font-medium` */
        subheading: ["Poppins", "system-ui", "sans-serif"],
        /** Paragraphs & UI copy — Inter Regular (400) via `font-normal` */
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
