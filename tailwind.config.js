/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: 'var(--color-primary-blue)',
          light: 'var(--color-primary-light)',
        },
        accent: {
          orangeLight: 'var(--color-accent-orange-light)',
          orangeDark: 'var(--color-accent-orange-dark)',
        },
        text: {
          dark: 'var(--color-text-dark)',
          light: 'var(--color-text-light)',
        },
        ui: {
          inputBorder: 'var(--color-input-border)',
          disabledGrey: 'var(--color-disabled-grey)',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        'pill': '9999px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  safelist: [
    'bg-primary-blue',
    'text-primary-blue',
    'border-primary-blue',
    'bg-primary-light',
    'bg-accent-orange-light',
    'bg-accent-orange-dark',
    'text-white',
    'text-black',
    'text-text-dark',
    'text-text-light',
  ],
  plugins: [],
};