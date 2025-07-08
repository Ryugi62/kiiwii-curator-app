/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: "#12EB90",
        border: "#E9ECEF",
      },
      boxShadow: {
        sm: "0px 1px 2px rgba(22,27,29,0.08)",
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      height: {
        46: "46px",
        64: "211px",
      },
    },
  },
  plugins: [],
};
