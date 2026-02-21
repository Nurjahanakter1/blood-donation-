/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#E53935',
        'primary-dark': '#C62828',
        'primary-light': '#FFCDD2',
      },
    },
  },
  plugins: [],
};
