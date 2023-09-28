/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    fontFamily: {
      title: 'Glockenspiel',
      main: 'Altersan',
    },
    extend: {
      colors: {
        'square-black': '#301c11',
        'square-white': '#a88b70',
        main: '#553726',
      },
    },
  },
  plugins: [],
};
