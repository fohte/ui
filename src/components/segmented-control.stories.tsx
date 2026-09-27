import type { Meta, StoryObj } from '@storybook/react-vite'

import { SegmentedControl } from '#components/segmented-control'
import { inDarkMode } from '#storybook-utils'

const options = [
  { value: 'compact', label: 'Compact' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'spacious', label: 'Spacious' },
] as const

const meta = {
  component: SegmentedControl,
  args: {
    'aria-label': 'Display density',
    options,
    onValueChange: () => undefined,
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const CompactSelected: Story = {
  name: 'the compact option appears selected.',
  args: { value: 'compact' },
}

export const ComfortableSelected: Story = {
  name: 'the comfortable option appears selected.',
  args: { value: 'comfortable' },
}

export const SpaciousSelected: Story = {
  name: 'the spacious option appears selected.',
  args: { value: 'spacious' },
}

export const CompactSelectedDark: Story = inDarkMode(
  CompactSelected,
  'the compact option appears selected in dark mode.',
)

export const ComfortableSelectedDark: Story = inDarkMode(
  ComfortableSelected,
  'the comfortable option appears selected in dark mode.',
)

export const SpaciousSelectedDark: Story = inDarkMode(
  SpaciousSelected,
  'the spacious option appears selected in dark mode.',
)
