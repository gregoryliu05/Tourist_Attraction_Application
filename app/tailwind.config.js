/** @type {import('tailwindcss').Config} */
module.exports =  {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Includes all files in the `src` folder
    './public/index.html',        // Includes your main HTML file
    './src/pages/**/*.{js,jsx,ts,tsx}'
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

