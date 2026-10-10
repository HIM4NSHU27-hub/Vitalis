/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: {
          light: '#F5F8F7',
          dark: '#0A1A20',
        },
        ink: {
          light: '#10262E',
          dark: '#E6F1EF',
        },
        card: {
          light: '#FFFFFF',
          dark: '#11262E',
          border: '#D6DDE0',
          borderDark: '#1E3842',
        },
        tulsi: {
          DEFAULT: '#0B7A6B',
          hover: '#096357',
          light: '#E6F4F1',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}