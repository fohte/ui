import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '#components/checkbox'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Checkbox,
  args: { 'aria-label': 'Example option' },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  name: 'an unchecked checkbox has a neutral border.',
}

export const Checked: Story = {
  name: 'a checked checkbox uses the neutral foreground color.',
  args: { defaultChecked: true },
}

export const Indeterminate: Story = {
  name: 'an indeterminate checkbox displays a horizontal mark.',
  args: { indeterminate: true },
}

export const Focused: Story = {
  name: 'a focused checkbox shows the common focus ring.',
  args: { autoFocus: true },
}

export const Disabled: Story = {
  name: 'a disabled checkbox appears subdued.',
  args: { disabled: true },
}

export const Invalid: Story = {
  name: 'an invalid checkbox uses a destructive border and ring.',
  args: { 'aria-invalid': true },
}

export const UncheckedDark: Story = inDarkMode(
  Unchecked,
  'an unchecked checkbox has a neutral border in dark mode.',
)

export const CheckedDark: Story = inDarkMode(
  Checked,
  'a checked checkbox uses the neutral foreground color in dark mode.',
)

export const IndeterminateDark: Story = inDarkMode(
  Indeterminate,
  'an indeterminate checkbox displays a horizontal mark in dark mode.',
)

export const FocusedDark: Story = inDarkMode(
  Focused,
  'a focused checkbox shows the common focus ring in dark mode.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'a disabled checkbox appears subdued in dark mode.',
)

export const InvalidDark: Story = inDarkMode(
  Invalid,
  'an invalid checkbox uses a destructive border and ring in dark mode.',
)
