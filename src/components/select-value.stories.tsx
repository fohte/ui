import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select, SelectTrigger, SelectValue } from '#components/select'
import { inDarkMode } from '#storybook-utils'

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

export const PlaceholderDark: Story = inDarkMode(Placeholder)
