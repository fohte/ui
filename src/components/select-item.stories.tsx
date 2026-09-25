import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/select'

const meta = {
  component: SelectItem,
} satisfies Meta<typeof SelectItem>

export default meta
type Story = StoryObj<typeof meta>

export const Selected: Story = {
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

export const SelectedDark: Story = {
  ...Selected,
  globals: { theme: 'dark' },
}
