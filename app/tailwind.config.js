/** @type {import('tailwindcss').Config} */
module.exports =  {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: '#1E3A8A', // Example custom color
        },
      },
    },
  },
  plugins: [],
}

