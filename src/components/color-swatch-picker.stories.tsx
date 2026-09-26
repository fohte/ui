import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorSwatchPicker } from '#components/color-swatch-picker'
import { inDarkMode } from '#storybook-utils'

const selectedColor = '#56816a'

const colors = [
  { color: '#8f5742', label: 'Sample clay' },
  { color: selectedColor, label: 'Sample fern' },
  { color: '#566b93', label: 'Sample slate' },
  { color: '#896b9c', label: 'Sample orchid' },
]

const renderPicker = (value?: string, disabled?: boolean) => (
  <ColorSwatchPicker
    aria-label="Sample color"
    disabled={disabled}
    {...(value === undefined ? {} : { value })}
  >
    {colors.map(({ color, label }) => (
      <ColorSwatchPicker.Item
        key={color}
        aria-label={label}
        color={color}
        value={color}
      />
    ))}
  </ColorSwatchPicker>
)

const meta = {
  component: ColorSwatchPicker,
} satisfies Meta<typeof ColorSwatchPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Unselected: Story = {
  name: 'the picker shows unselected square color swatches.',
  render: () => renderPicker(),
}

export const Selected: Story = {
  name: 'the selected swatch has a ring around it.',
  render: () => renderPicker(selectedColor),
}

export const Disabled: Story = {
  name: 'the disabled picker shows dimmed color swatches.',
  render: () => renderPicker(selectedColor, true),
}

export const UnselectedDark: Story = inDarkMode(
  Unselected,
  'the picker shows unselected color swatches in dark mode.',
)

export const SelectedDark: Story = inDarkMode(
  Selected,
  'the selected swatch has a ring around it in dark mode.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'the disabled picker shows dimmed color swatches in dark mode.',
)
