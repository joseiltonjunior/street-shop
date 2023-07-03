/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: { max: '899px' },
    },
    extend: {
      colors: {
        gray: {
          500: '#2E2E35',
          800: '#202024',
          900: '#121214',
        },
        orange: {
          500: '#FFBA00',
        },
      },
    },
  },
  plugins: [],
}
