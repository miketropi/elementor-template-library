/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.etl-tailwind-scope',
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,php}',
    './templates/**/*.{html,php}',
    './**/*.php' 
  ],
  theme: {
    fontFamily: {
      'space-mono': ['Space Mono', 'sans-serif'],
    },
  },
};
