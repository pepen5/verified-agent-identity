import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5ECD7',
        brown: '#8B5E3C',
        sage: '#7A8C6E',
        antique: '#FAF7F0',
        rose: '#C4937A',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
      boxShadow: {
        rustic: '0 12px 30px rgba(91, 58, 34, 0.12)',
        soft: '0 8px 20px rgba(122, 140, 110, 0.12)',
      },
      backgroundImage: {
        linen: 'radial-gradient(circle at 1px 1px, rgba(139, 94, 60, 0.08) 1px, transparent 0)',
        wood: 'linear-gradient(90deg, rgba(139, 94, 60, 0.16) 0, rgba(139, 94, 60, 0.1) 12%, rgba(245, 236, 215, 0.12) 12%, rgba(245, 236, 215, 0.06) 20%, rgba(139, 94, 60, 0.08) 20%, rgba(139, 94, 60, 0.04) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
