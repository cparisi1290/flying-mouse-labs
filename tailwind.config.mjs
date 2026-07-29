/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sky: {
          500: '#1c9dd9',
        },
        amber: {
          500: '#e4a03a',
        },
        slate: {
          950: '#041a24',
        },
        white: '#fcfcfc',
      },
      backgroundImage: {
        'arctic-lab': 'linear-gradient(135deg, rgba(207, 250, 254, 0.8) 0%, rgba(134, 239, 252, 0.8) 20%, rgba(110, 206, 241, 0.8) 40%, rgba(207, 250, 254, 0.8) 60%, rgba(228, 160, 58, 0.4) 75%, rgba(103, 232, 249, 0.8) 100%)',
      },
      keyframes: {
        bgShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        bgShift: 'bgShift 10s infinite alternate ease-in-out',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
