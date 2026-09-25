import type { Meta, StoryObj } from '@storybook/react-vite'

const colorTokens = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'border',
  'input',
  'ring',
  'sidebar',
  'sidebar-foreground',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-accent',
  'sidebar-accent-foreground',
  'sidebar-border',
  'sidebar-ring',
  'border-strong',
  'surface-strong',
  'muted-foreground-strong',
  'muted-foreground-faint',
  'muted-foreground-ghost',
] as const

const TokenSwatches = () => (
  <main
    style={{
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      fontFamily: 'var(--font-sans, sans-serif)',
      minHeight: '100vh',
      padding: 32,
    }}
  >
    <h1 style={{ fontSize: 24, margin: '0 0 8px' }}>Design tokens</h1>
    <p style={{ margin: '0 0 24px' }}>
      Light and dark palettes, type scale, and radius values.
    </p>

    <section aria-label="Color tokens">
      <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Colors</h2>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        }}
      >
        {colorTokens.map((token) => (
          <div
            key={token}
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              padding: 8,
            }}
          >
            <div
              aria-label={`--${token} swatch`}
              style={{
                backgroundColor: `var(--${token})`,
                border: '1px solid var(--border-strong)',
                height: 44,
              }}
            />
            <code style={{ display: 'block', fontSize: 12, marginTop: 8 }}>
              --{token}
            </code>
          </div>
        ))}
      </div>
    </section>

    <section aria-label="Type and radius tokens" style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Type and radius</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-sans, sans-serif)',
            padding: 12,
          }}
        >
          --font-sans · Sample text
        </div>
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono, monospace)',
            padding: 12,
          }}
        >
          --font-mono · 012345
        </div>
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-code, monospace)',
            padding: 12,
          }}
        >
          --font-code · `sample()`
        </div>
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            fontSize: 'var(--text-2xs, 0.625rem)',
            lineHeight: 'var(--text-2xs--line-height, 0.875rem)',
            padding: 12,
          }}
        >
          --text-2xs · Small text
        </div>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'var(--primary)',
            borderRadius: 'var(--radius)',
            color: 'var(--primary-foreground)',
            display: 'flex',
            height: 44,
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
          --radius
        </div>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'var(--accent)',
            borderRadius: 'var(--keycap-radius)',
            color: 'var(--accent-foreground)',
            display: 'flex',
            height: 44,
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
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
