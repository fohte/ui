import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '#components/input'

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

export const DefaultDark: Story = {
  ...Default,
  globals: { theme: 'dark' },
}

export const WithValueDark: Story = {
  ...WithValue,
  globals: { theme: 'dark' },
}

export const DisabledDark: Story = {
  ...Disabled,
  globals: { theme: 'dark' },
}

export const InvalidDark: Story = {
  ...Invalid,
  globals: { theme: 'dark' },
}

export const FileDark: Story = {
  ...File,
  globals: { theme: 'dark' },
}
