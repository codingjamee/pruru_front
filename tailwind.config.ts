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
        'primary-100': 'var(--main-color)',
        'primary-300': 'var(--main-hover-color)',
        'secondary-100': 'var(--sub-main-color)',
        'gray-100': 'var(--gray-color)',
        'dark-gray': 'var(--dark-gray-color)',
        'logo-700': 'var(--main-logo-color)',
        'sub-logo-100': 'var(--sub-logo-color)',
        'default-text-color': 'var(--default-text-color)',
        'button-text-color': 'var(--button-text-color)',
      },
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { min: '768px', max: '1279px' },
      desktop: { min: '1280px' },
    },
  },
  darkMode: 'selector',
  plugins: [],
};
export default config;
