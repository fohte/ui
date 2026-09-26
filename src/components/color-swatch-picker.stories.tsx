import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorSwatchPicker } from '#components/color-swatch-picker'
import { inDarkMode } from '#storybook-utils'

const colors = [
  { color: '#8f5742', label: 'Sample clay' },
  { color: '#56816a', label: 'Sample fern' },
  { color: '#566b93', label: 'Sample slate' },
  { color: '#896b9c', label: 'Sample orchid' },
]

const meta = {
  component: ColorSwatchPicker,
} satisfies Meta<typeof ColorSwatchPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Unselected: Story = {
  name: 'the picker shows unselected square color swatches.',
  render: () => (
    <ColorSwatchPicker aria-label="Sample color">
      {colors.map(({ color, label }) => (
        <ColorSwatchPicker.Item
          key={color}
          aria-label={label}
          color={color}
          value={color}
        />
      ))}
    </ColorSwatchPicker>
  ),
}

export const Selected: Story = {
  name: 'the selected swatch has a ring around it.',
  render: () => (
    <ColorSwatchPicker aria-label="Sample color" value={colors[1]?.color}>
      {colors.map(({ color, label }) => (
        <ColorSwatchPicker.Item
          key={color}
          aria-label={label}
          color={color}
          value={color}
        />
      ))}
    </ColorSwatchPicker>
  ),
}

export const UnselectedDark: Story = inDarkMode(
  Unselected,
  'the picker shows unselected color swatches in dark mode.',
)

export const SelectedDark: Story = inDarkMode(
  Selected,
  'the selected swatch has a ring around it in dark mode.',
)
