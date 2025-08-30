/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./*.html"
    ],
    theme: {
      extend: {
        colors: {
          'rich-brown': '#36281e',
          'elegant-gold': '#b38b4d',
          'soft-cream': '#f4ede4',
          'cream-variant': '#fcf9f0',
        },
        fontFamily: {
          'playfair': ['"Playfair Display"', 'serif'],
          'inter': ['"Inter"', 'sans-serif'],
          'libre': ['"Libre Baskerville"', 'serif'],
        }
      },
    },
    plugins: [],
  }