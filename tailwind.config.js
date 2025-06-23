/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'velora-pink': '#e879f9',
        'velora-light-pink': '#f3e8ff',
        'velora-dark-pink': '#c026d3',
        'velora-purple': '#8b5cf6',
        'period-highlight': '#fb7185',
        'period-light': '#fce7f3'
      },
      fontFamily: {
        'handwriting': ['Dancing Script', 'cursive']
      }
    },
  },
  plugins: [],
} 