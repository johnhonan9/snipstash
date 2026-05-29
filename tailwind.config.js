/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        ink: "#0d0d0f",
        paper: "#f4f1ea",
        acid: "#c8ff00",
        rust: "#ff5722",
      },
    },
  },
  plugins: [],
};
