import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: SelectContent,
} satisfies Meta<typeof SelectContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'shows the available options in an open select menu.',
  render: () => (
    <Select open value="first">
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First option</SelectItem>
        <SelectItem value="second">Second option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'shows the available options in an open select menu in dark mode.',
)
