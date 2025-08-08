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
        wc1: ["0.8125rem", { lineHeight: "1rem" }], // 13px
        wc2: ["0.875rem", { lineHeight: "1.125rem" }], // 14px
        wc3: ["1rem", { lineHeight: "1.25rem" }], // 16px
        wc4: ["1.25rem", { lineHeight: "1.5rem" }], // 20px
        wc5: ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        wc6: ["2.5rem", { lineHeight: "2.5rem" }], // 40px
      },
    },
  },
  plugins: [],
};
