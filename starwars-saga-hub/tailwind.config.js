/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
   daisyui: {
    themes: ["nord"],
  },
  plugins: [
    require('daisyui'),
],
}

