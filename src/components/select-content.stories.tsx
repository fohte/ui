import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select'

const meta = {
  component: SelectContent,
} satisfies Meta<typeof SelectContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
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

export const OpenDark: Story = {
  ...Open,
  globals: { theme: 'dark' },
}
