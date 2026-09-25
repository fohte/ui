import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '#components/select'

const meta = {
  component: SelectSeparator,
} satisfies Meta<typeof SelectSeparator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select open value="pear">
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruit</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="pear">Pear</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="bread">Bread</SelectItem>
      </SelectContent>
    </Select>
  ),
}
