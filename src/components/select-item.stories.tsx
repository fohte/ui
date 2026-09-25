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
  component: SelectItem,
} satisfies Meta<typeof SelectItem>

export default meta
type Story = StoryObj<typeof meta>

export const Selected: Story = {
  name: 'shows the second option selected in an open select menu.',
  render: () => (
    <Select open value="second">
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

export const SelectedDark: Story = inDarkMode(
  Selected,
  'shows the second option selected in an open select menu in dark mode.',
)
