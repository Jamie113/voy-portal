/** @type {import('tailwindcss').Config} */
export default {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        voy: {
          green: '#19301E',
          'green-light': '#9BD1C2',
          'green-pale': '#EAF0EE',
          stone: '#F4F1E7',
          'light-stone': '#FCFBF8',
          bg: '#F4F1E7',
          hair: '#9BD1C2',
          weight: '#FFA87C',
          testosterone: '#B9F00A',
          menopause: '#C6C2FF',
        }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
