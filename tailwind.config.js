/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sentimentGreen: "#10B981",
        sentimentRed: "#EF4444",
      },
      fontSize: {
        wc1: ["1rem", { lineHeight: "1.25rem" }], // ~16px
        wc2: ["1.25rem", { lineHeight: "1.5rem" }], // ~20px
        wc3: ["1.5rem", { lineHeight: "1.75rem" }], // ~24px
        wc4: ["1.875rem", { lineHeight: "2.25rem" }], // ~30px
        wc5: ["2.25rem", { lineHeight: "2.75rem" }], // ~36px
        wc6: ["2.5rem", { lineHeight: "3rem" }], // ~40px
      },
    },
  },
  plugins: [],
};
