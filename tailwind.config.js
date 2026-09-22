/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#f4f8f5',
          100: '#e5f1e8',
          200: '#cbe3cf',
          300: '#a3ceaab',
          400: '#71b27c',
          500: '#489456',
          600: '#347741',
          700: '#2a5e35',
          800: '#234b2c',
          900: '#1d3e26',
          950: '#0c2213',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        }
      },
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', '"Jameel Noori Nastaleeq"', 'serif'],
        arabic: ['Amiri', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
