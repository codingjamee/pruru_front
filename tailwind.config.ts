import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/_components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'size-font-card-title': 'var(--size-font-card-title)',
        'size-font-default': 'var(--size-font-default)',
      },
      colors: {
        'color-primary': 'var(--color-main)',
        'color-primary-m': 'var(--color-main-hover)',
        'color-secondary-100': 'var(--color-sub-main)',
        'color-gray-100': 'var(--color-gray)',
        'color-logo-700': 'var(--color-main-logo)',
        'color-sub-logo-100': 'var(--color-sub-logo)',
        'color-default-text': 'var(--color-default-text)',
        'color-text-button': 'var(--color-text-button)',
        'color-disabled': 'var(--color-disabled)',
        'color-card-bg': 'var(--color-card-bg)',
        'color-card-text': 'var(--color-card-text)',
        'color-outlined-text': 'var(--color-outlined-text)',
        'color-inbutton-outlined-text': 'var(--color-inbutton-outlined-text)',
        'color-card-border': 'var(--color-card-border)',
        'color-bg-main': 'var(--color-background-main)',
        'color-bg-sub': 'var(--color-background-sub)',
      },
      boxShadow: {
        custom: '0 4px 6px -1px rgba(255, 255, 255, 0.5)',
      },
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { min: '768px', max: '1279px' },
      desktop: { min: '1280px' },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
