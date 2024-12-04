/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /^text-/,
    },
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^w-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EEBED5",
        secondary: "#A28CBD",
        thirdary: "#FCEFE9",
        success: "#97D99D",
      },
      width: {
        tfifty: "[250px]"
      }
    },
  },
  // important: true,
  plugins: [],
};
