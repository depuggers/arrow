/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      light: {
        primary: '#FF9900',
        'base-content': '#525252',
        'base-300': '#f5f5f5',
        'neutral-content': '#cccccc',
      },
      dark: {
        primary: '#FF9900',
        'base-100': '#161616',
        'base-300': '#262626',
        'base-content': '#d4d4d4',
        'neutral-content': '#666666',
      },
    }],

  },
};
