/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif']
      },
      maxWidth: {
        'screen-2xl': '1920px',   // This is the max-w-screen-2xl value
        'custom-max-width': '1550px', // Custom value between xl and 2xl
      },
    },
  },
  plugins: [],
}
