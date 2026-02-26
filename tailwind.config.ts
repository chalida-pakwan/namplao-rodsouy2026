import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', 'Sarabun', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#FFDE00',
          blue: '#004AAD',
          dark: '#003080',
          primary: '#004AAD',  // alias for brand-blue
        }
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,74,173,0.15)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
} satisfies Config
