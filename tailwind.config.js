/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#fefded',
        'brand-sage-light': '#dbe4ce',
        'brand-sage-medium': '#728f78',
        'brand-sage-dark': '#536a56',
        'brand-sage-gray': '#878d7d',
        /* New accents */
        'brand-blue-main': '#192683',
        'brand-blue-soft': '#6A72AE',
        'brand-pink-main': '#986573',
        'brand-pink-soft': '#BC9AA4',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
