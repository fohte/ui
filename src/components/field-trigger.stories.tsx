import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDownIcon } from 'lucide-react'

import { FieldTrigger } from '#components/field-trigger'

const meta = {
  component: FieldTrigger,
  args: { children: 'Example value' },
} satisfies Meta<typeof FieldTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const WithChevron: Story = {
  name: 'a compact field trigger shows a value with a chevron.',
  render: (args) => (
    <div className="text-xs font-mono">
      <FieldTrigger {...args}>
        Example value
        <ChevronDownIcon />
      </FieldTrigger>
    </div>
  ),
}

export const WithoutIcon: Story = {
  name: 'a field trigger shows a value without an icon.',
}

export const LargeTypography: Story = {
  name: 'a field trigger inherits large typography from its parent.',
  render: (args) => (
    <div className="text-2xl font-semibold">
      <FieldTrigger {...args}>Example title</FieldTrigger>
    </div>
  ),
}

export const Disabled: Story = {
  name: 'a disabled field trigger keeps a clear background while hovered.',
  args: { disabled: true },
  render: (args) => (
    <FieldTrigger {...args} data-hovered="">
      Example value
    </FieldTrigger>
  ),
}
