/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        office: {
          blue: '#005A9E',
          dark: '#004578',
          light: '#F3F2F1',
        }
      }
    },
  },
  plugins: [],
}