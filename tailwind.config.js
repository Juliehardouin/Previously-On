/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        boxShadow: {
        'form-text' : '0 5px 0 gray',
      },
    },
  },
  plugins: [],
}
