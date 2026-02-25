/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./services.html",
    "./components/**/*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'deep-plum': '#664875',
        'copper': '#d9ac88',
        'powder-blue': '#bdd4e0',
        'blue': '#4e70af',
        'warm-grey': '#cabcb0',
        'light-text': '#f7f5f3',
        'dark-text': '#160F1A',
        'plum': '#9b7eac',
      },
      fontFamily: {
        'dm-serif-display': ['"DM Serif Display"', 'serif'],
        'poppins': ['"Poppins"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
