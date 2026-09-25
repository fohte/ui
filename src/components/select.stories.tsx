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
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First option</SelectItem>
        <SelectItem value="second">Second option</SelectItem>
        <SelectItem value="third">Third option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Open: Story = {
  render: () => (
    <Select open value="second">
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First option</SelectItem>
        <SelectItem value="second">Second option</SelectItem>
        <SelectItem value="third">Third option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First option</SelectItem>
        <SelectItem value="second">Second option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const ClosedDark: Story = inDarkMode(Closed)

export const OpenDark: Story = inDarkMode(Open)

export const SmallDark: Story = inDarkMode(Small)
