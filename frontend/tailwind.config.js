/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#4F46E5',
        'primary-dark':'#3730A3',
        'secondary':'#8B5CF6',
        'accent':'#06B6D4',
        'surface':'#F8F7FF',
        'card':'#FFFFFF',
      },
      fontFamily:{
        'heading':['Plus Jakarta Sans', 'sans-serif'],
        'body':['Outfit', 'sans-serif'],
      },
      backgroundImage:{
        'gradient-brand':'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        'gradient-calm':'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #EDE9FE 100%)',
        'gradient-hero':'linear-gradient(135deg, #3730A3 0%, #4F46E5 40%, #7C3AED 100%)',
      },
      boxShadow:{
        'card':'0 4px 24px rgba(79,70,229,0.10)',
        'card-hover':'0 8px 40px rgba(79,70,229,0.18)',
        'glow':'0 0 24px rgba(79,70,229,0.35)',
      },
      borderRadius:{
        'xl2':'1.25rem',
        '2xl2':'1.75rem',
      }
    },
  },
  plugins: [],
}