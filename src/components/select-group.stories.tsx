import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#components/select'

const meta = {
  component: SelectGroup,
} satisfies Meta<typeof SelectGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => (
    <Select open value="pear">
      <SelectTrigger aria-label="Choose a fruit">
        <SelectValue placeholder="Choose a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruit</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="pear">Pear</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
