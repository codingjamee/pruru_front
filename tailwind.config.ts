import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#ADE594',
        'primary-300': '#7BC35B',
        'secondary-100': '#F3D1FF',
        'gray-100': '#EEF2F1',
        'gray-500': '#575C63',
        'logo-700': '#0E4437',
        'sub-logo-100': '#8DA69D',
        'white-100': '#ffffff',
      },
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { min: '768px', max: '1023px' },
      laptop: { min: '1024px', max: '1279px' },
      desktop: { min: '1280px' },
    },
  },
  plugins: [],
};
export default config;
