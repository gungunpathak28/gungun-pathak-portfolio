/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        primary: "#00ffcc", // Neon Cyan
        secondary: "#00ff66", // Neon Green
        darkGray: "#1a1a1a",
        lightGray: "#2a2a2a",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['"Caveat"', 'cursive'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ffcc, 0 0 10px #00ffcc' },
          '100%': { boxShadow: '0 0 20px #00ffcc, 0 0 30px #00ffcc' },
        }
      }
    },
  },
  plugins: [],
}
