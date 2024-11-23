/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React component files
    "./index.html",       // Include your index.html
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
}

