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
  component: SelectLabel,
} satisfies Meta<typeof SelectLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'labels a group of fruit options in an open select menu.',
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

export const DefaultDark: Story = inDarkMode(
  Default,
  'labels a group of fruit options in an open select menu in dark mode.',
)
