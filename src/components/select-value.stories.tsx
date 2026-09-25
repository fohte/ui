import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select, SelectTrigger, SelectValue } from '#components/select'

const meta = {
  component: SelectValue,
} satisfies Meta<typeof SelectValue>

export default meta
type Story = StoryObj<typeof meta>

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}
