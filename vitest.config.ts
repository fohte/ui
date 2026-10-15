import { playwright } from '@vitest/browser-playwright'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Knip needs an explicit pattern to discover test entry files.
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: defaultExclude,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['**/*.{test,spec}.ts'],
          exclude: [...defaultExclude, '**/*.{test,spec}.tsx'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: ['**/*.{test,spec}.tsx'],
          exclude: [...defaultExclude, '**/*.{test,spec}.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
