/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'Outfit': ["'Outfit'", 'sans-serif']
      },
      gridTemplateColumns: {
        '2f1f': '2fr 1fr',
        '1f5f': '1fr 3fr',
        '3f1f': '3fr 1fr',
        '4f1f': '4fr 1fr',
      },
      colors: {
        'text': '#363636',
        'white-bg': '#FEFCF3',
        'header': '#F5EBE0',
        'titles': '#E5A357',
        'titles-border': '#B78246',
        'number-red': '#D22F2F',
        'titles2': '#DBA39A'
      }
  
    },
  },
  plugins: [],
}

