import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx', 
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.tsx'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  viteFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': resolve(__dirname, '../'),
        '@/components': resolve(__dirname, '../components'),
        '@/lib': resolve(__dirname, '../lib'),
        '@/hooks': resolve(__dirname, '../hooks'),
        '@/app': resolve(__dirname, '../app'),
        '@/types': resolve(__dirname, '../types'),
        '@/utils': resolve(__dirname, '../utils'),
        '@/store': resolve(__dirname, '../app/store'),
      };
    }
    return config;
  },
};
export default config;
