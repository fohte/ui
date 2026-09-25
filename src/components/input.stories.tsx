import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '#components/input'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Input,
  args: { placeholder: 'Enter a value' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an empty input shows its placeholder text.',
}

export const WithValue: Story = {
  name: 'an input displays its prefilled example value.',
  args: { defaultValue: 'Example value' },
}

export const Disabled: Story = {
  name: 'a disabled input shows its placeholder text.',
  args: { disabled: true },
}

export const Invalid: Story = {
  name: 'an input shows its invalid state with its placeholder text.',
  args: { 'aria-invalid': true },
}

export const File: Story = {
  name: 'a file input shows its browser-provided upload control.',
  args: { type: 'file' },
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'an empty input shows its placeholder in dark mode.',
)

export const WithValueDark: Story = inDarkMode(
  WithValue,
  'a prefilled input appears in dark mode.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'a disabled input shows its placeholder in dark mode.',
)

export const InvalidDark: Story = inDarkMode(
  Invalid,
  'an invalid input shows its placeholder in dark mode.',
)

export const FileDark: Story = inDarkMode(
  File,
  'a file input shows its upload control in dark mode.',
)
