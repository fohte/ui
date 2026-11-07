import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd } from '#components/kbd'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Kbd,
  args: { children: 'Esc' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'a key is shown as a small keycap.',
}

export const InlineHint: Story = {
  name: 'keycaps sit inline with the text of a hint.',
  render: () => (
    <p className="text-xs text-muted-foreground">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to search, <Kbd>Esc</Kbd> to close.
    </p>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'a key is shown as a small keycap in dark mode.',
)

export const InlineHintDark: Story = inDarkMode(
  InlineHint,
  'keycaps sit inline with the text of a hint in dark mode.',
)
