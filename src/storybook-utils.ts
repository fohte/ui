export const inDarkMode = <T extends object>(story: T) => ({
  ...story,
  globals: { theme: 'dark' as const },
})
