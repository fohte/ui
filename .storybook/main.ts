import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
    '@fohte/storybook-addon',
  ],
  viteFinal: (config) => {
    config.plugins ??= []
    config.plugins.push(tailwindcss())
    return config
  },
}

export default config
