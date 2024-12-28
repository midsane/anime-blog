/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#242424",
        secondary: "#333333",
        primary: "#ffd10f",
        dark: "#181818",
        orange: "#f47938",
        name: "#f2f2f2",
        credits: "#777",
        desc: "#fff",
        date: "#b6b4b5"
      },
    },
  },
  plugins: [],
};
