/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      colors: {
        'event-blue': {
          DEFAULT: '#0A58CA', // Primary Blue (Slightly more vibrant Bootstrap blue)
          'dark': '#084298',  // Darker for depth, hover
          'light': '#A9D1FB', // Lighter for accents
          'extralight': '#E9F3FF', // Very light for backgrounds, hero
        },
        'event-green': {
          DEFAULT: '#198754', // Bootstrap Green - for CTAs
          'dark': '#146C43',  // Darker Green
        },
        'event-dark': '#1A202C',     // Very Dark (like Tailwind gray-900)
        'event-gray-text': '#A0AEC0', // Muted text (like Tailwind gray-500)
        'event-text': {
          DEFAULT: '#1F2937',      // Primary body text (Tailwind gray-800)
          'muted': '#4B5563',      // Secondary/muted text (Tailwind gray-600)
          'heading': '#111827'     // Heading text (Tailwind gray-900)
        },
        'event-background': '#F8F9FA' // Light page background (almost white)
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 20px rgba(0, 0, 0, 0.1)',
        'nav': '0 2px 4px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 10px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem',    // 16px
      },
      transitionTimingFunction: {
       'custom-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: { // Added for potential simple CSS animations
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1'},
        }
      },
      animation: { // Added for potential simple CSS animations
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      }
    }
  },
  plugins: [],
}
