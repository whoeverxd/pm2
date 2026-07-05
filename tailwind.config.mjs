/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#060B18',
          bgAlt: '#0B1222',
          surface: '#0D1528',
          surfaceAlt: '#121C34',
          blue: '#3B82F6',
          blueDark: '#2563EB',
          yellow: '#E8C547',
          yellowSoft: '#F4D96D',
          text: '#FFFFFF',
          muted: '#A7B0C0',
          line: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 28px 80px -36px rgba(59, 130, 246, 0.42)',
        'glow-accent': '0 24px 64px -36px rgba(232, 197, 71, 0.55)',
        panel: '0 24px 80px -48px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 42%), radial-gradient(circle at 80% 18%, rgba(232,197,71,0.08), transparent 26%)',
      },
    },
  },
  plugins: [],
};
