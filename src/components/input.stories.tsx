import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '#components/input'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Input,
  args: { placeholder: 'Enter a value' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: 'Example value' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Invalid: Story = {
  args: { 'aria-invalid': true },
}

export const File: Story = {
  args: { type: 'file' },
}

export const DefaultDark: Story = inDarkMode(Default)

export const WithValueDark: Story = inDarkMode(WithValue)

export const DisabledDark: Story = inDarkMode(Disabled)

export const InvalidDark: Story = inDarkMode(Invalid)

export const FileDark: Story = inDarkMode(File)
