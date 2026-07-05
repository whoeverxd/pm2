/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050B1F',
          bgAlt: '#0A1330',
          surface: '#0F1B3D',
          blue: '#1E63D6',
          blueDark: '#134AAA',
          red: '#C0202B',
          redDark: '#8E1720',
          yellow: '#F4B400',
          yellowDark: '#C99400',
          text: '#F5F7FB',
          muted: '#A6B1CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Barlow', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(30, 99, 214, 0.45)',
        glowRed: '0 20px 60px -20px rgba(192, 32, 43, 0.45)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse at top, rgba(30,99,214,0.25), transparent 60%), radial-gradient(ellipse at bottom right, rgba(192,32,43,0.18), transparent 55%)',
      },
    },
  },
  plugins: [],
};
