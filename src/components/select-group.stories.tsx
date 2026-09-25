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
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: SelectGroup,
} satisfies Meta<typeof SelectGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'groups fruit options under a label in an open select menu.',
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

export const OpenDark: Story = {
  ...inDarkMode(Open),
  name: 'groups fruit options under a label in an open select menu in dark mode.',
}
