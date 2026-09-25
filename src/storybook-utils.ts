export const inDarkMode = <T extends object>(story: T, name: string) => ({
  ...story,
  name,
  globals: { theme: 'dark' as const },
})
