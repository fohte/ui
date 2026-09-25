import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select, SelectTrigger, SelectValue } from '#components/select'

const meta = {
  component: SelectTrigger,
} satisfies Meta<typeof SelectTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const DefaultDark: Story = {
  ...Default,
  globals: { theme: 'dark' },
}
