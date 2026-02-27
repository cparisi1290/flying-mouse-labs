/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./silver-tree-preview/**/*.html",
    "./assets/js/**/*.js",
    "./assets/css/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1C9DD9',
        'brand-orange': '#E4A03A',
        'brand-dark': '#041A24',
        'brand-light': '#FCFCFC',
        'deep-plum': '#664875',
        'plum': '#8B7AB8',
        'copper': '#d4a373',
        'light-text': '#FCFCFC',
        'dark-text': '#041A24',
      },
      fontFamily: {
        heading: ['iBrand', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
