/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        light: {
          bg: '#FAFAFA',
          card: '#FFFFFF',
          text: '#1A1A1A',
          secondary: '#666666',
        },
        dark: {
          bg: '#0F0F0F',
          card: '#1A1A1A',
          text: '#FFFFFF',
          secondary: '#999999',
        },
      },
    },
  },
  plugins: [],
}

