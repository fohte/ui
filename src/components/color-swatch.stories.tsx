import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorSwatch } from '#components/color-swatch'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: ColorSwatch,
  args: { color: '#8f5742' },
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'a color swatch appears as a small decorative dot.',
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'a color swatch appears as a small decorative dot in dark mode.',
)
