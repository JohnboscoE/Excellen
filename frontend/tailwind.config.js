/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        surface2: '#1A1A1A',
        accent: '#F59E0B',
        border: '#2A2A2A',
        muted: '#6B7280',
        positive: '#22C55E',
        negative: '#EF4444',
      },
    },
  },
  plugins: [],
};