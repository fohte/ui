import type { Meta, StoryObj } from '@storybook/react-vite'

const colorTokens = [
  ['background', 'bg-background'],
  ['foreground', 'bg-foreground'],
  ['card', 'bg-card'],
  ['card-foreground', 'bg-card-foreground'],
  ['popover', 'bg-popover'],
  ['popover-foreground', 'bg-popover-foreground'],
  ['primary', 'bg-primary'],
  ['primary-foreground', 'bg-primary-foreground'],
  ['secondary', 'bg-secondary'],
  ['secondary-foreground', 'bg-secondary-foreground'],
  ['muted', 'bg-muted'],
  ['muted-foreground', 'bg-muted-foreground'],
  ['accent', 'bg-accent'],
  ['accent-foreground', 'bg-accent-foreground'],
  ['destructive', 'bg-destructive'],
  ['border', 'bg-border'],
  ['input', 'bg-input'],
  ['ring', 'bg-ring'],
  ['sidebar', 'bg-sidebar'],
  ['sidebar-foreground', 'bg-sidebar-foreground'],
  ['sidebar-primary', 'bg-sidebar-primary'],
  ['sidebar-primary-foreground', 'bg-sidebar-primary-foreground'],
  ['sidebar-accent', 'bg-sidebar-accent'],
  ['sidebar-accent-foreground', 'bg-sidebar-accent-foreground'],
  ['sidebar-border', 'bg-sidebar-border'],
  ['sidebar-ring', 'bg-sidebar-ring'],
  ['border-strong', 'bg-border-strong'],
  ['surface-strong', 'bg-surface-strong'],
  ['muted-foreground-strong', 'bg-muted-foreground-strong'],
  ['muted-foreground-faint', 'bg-muted-foreground-faint'],
  ['muted-foreground-ghost', 'bg-muted-foreground-ghost'],
  ['tint-red', 'bg-tint-red'],
  ['tint-red-foreground', 'bg-tint-red-foreground'],
  ['tint-orange', 'bg-tint-orange'],
  ['tint-orange-foreground', 'bg-tint-orange-foreground'],
  ['tint-yellow', 'bg-tint-yellow'],
  ['tint-yellow-foreground', 'bg-tint-yellow-foreground'],
  ['tint-green', 'bg-tint-green'],
  ['tint-green-foreground', 'bg-tint-green-foreground'],
  ['tint-cyan', 'bg-tint-cyan'],
  ['tint-cyan-foreground', 'bg-tint-cyan-foreground'],
  ['tint-blue', 'bg-tint-blue'],
  ['tint-blue-foreground', 'bg-tint-blue-foreground'],
  ['tint-magenta', 'bg-tint-magenta'],
  ['tint-magenta-foreground', 'bg-tint-magenta-foreground'],
] as const

const TokenSwatches = () => (
  <main className="min-h-screen bg-background p-8 font-sans text-foreground">
    <h1 className="mb-2 text-2xl leading-normal">Design tokens</h1>
    <p className="mb-6">
      Light and dark palettes, type scale, and radius values.
    </p>

    <section aria-label="Color tokens">
      <h2 className="mb-3 text-lg leading-normal">Colors</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
        {colorTokens.map(([token, swatchClassName]) => (
          <div key={token} className="border border-border bg-card p-2">
            <div
              aria-label={`--${token} swatch`}
              className={`h-11 border border-border-strong ${swatchClassName}`}
            />
            <code className="mt-2 block text-xs leading-normal">--{token}</code>
          </div>
        ))}
      </div>
    </section>

    <section aria-label="Type and radius tokens" className="mt-8">
      <h2 className="mb-3 text-lg leading-normal">Type and radius</h2>
      <div className="flex flex-wrap gap-3">
        <div className="border border-border bg-card p-3 font-sans">
          --font-sans · Sample text
        </div>
        <div className="border border-border bg-card p-3 font-mono">
          --font-mono · 012345
        </div>
        <div className="border border-border bg-card p-3 font-code">
          --font-code · `sample()`
        </div>
        <div className="border border-border bg-card p-3 text-2xs">
          --text-2xs · Small text
        </div>
        <div className="flex h-11 items-center justify-center rounded-(--radius) bg-primary px-4 text-primary-foreground">
          --radius
        </div>
        <div className="flex h-11 items-center justify-center rounded-(--keycap-radius) bg-accent px-4 text-accent-foreground">
          --keycap-radius
        </div>
      </div>
    </section>
  </main>
)

const meta = {
  title: 'Design System/Tokens',
  component: TokenSwatches,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TokenSwatches>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  name: 'the token reference shows color, typography, and radius samples in light mode.',
  globals: {
    theme: 'light',
  },
}

export const Dark: Story = {
  name: 'the token reference shows color, typography, and radius samples in dark mode.',
  globals: {
    theme: 'dark',
  },
}
