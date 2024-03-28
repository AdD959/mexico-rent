/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
      backgroundImage: {
        'mexico': "url('/src/assets/mexico-flag.png')",
        'unitedKingdom': "url('/src/assets/uk-flag.webp')",
      }
  },
  plugins: [],
}

