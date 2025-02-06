/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      height:{
        "9/10":"90%",
        "8/10":"80%"
      },
      width:{
        "8/10":"80%"
      },
      colors: {
        blue: {
          900: '#2c3848', // Custom blue-900
        },
        slate:{
          150:'#d9d9d9'
        },
        yellow:{
          50:'#fbf8f3' // Custom BG color
        }
      },
    },
  },
  plugins: [],
}

