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
        'brand-blue-main': '#192683',
        'brand-blue-soft': '#6A72AE',
        'brand-pink-dark': '#7A4F5A',
        'brand-pink-main': '#986573',
        'brand-pink-medium': '#B07A87',
        'brand-pink-soft': '#BC9AA4',
        'brand-orange': '#fa623f',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
