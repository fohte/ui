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
  name: 'shows a closed select with three available options.',
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
  name: 'shows the second option selected in an open select.',
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
  name: 'shows a compact select trigger with its placeholder.',
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

export const ClosedDark: Story = {
  ...inDarkMode(Closed),
  name: 'shows a closed select with three available options in dark mode.',
}

export const OpenDark: Story = {
  ...inDarkMode(Open),
  name: 'shows the second option selected in an open select in dark mode.',
}

export const SmallDark: Story = {
  ...inDarkMode(Small),
  name: 'shows a compact select trigger with its placeholder in dark mode.',
}
