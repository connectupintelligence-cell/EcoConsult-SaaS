/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        eco: {
          dark: '#0b131f',
          surface: '#111c2e',
          card: '#18263e',
          border: '#243754',
          accent: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6'
        }
      }
    },
  },
  plugins: [],
}
