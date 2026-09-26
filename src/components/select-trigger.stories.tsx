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
  component: SelectTrigger,
} satisfies Meta<typeof SelectTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'shows a closed select trigger with its placeholder.',
  render: () => (
    <Select>
      <SelectTrigger aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'shows a closed select trigger with its placeholder in dark mode.',
)

export const CustomIcon: Story = {
  name: 'shows a select trigger with a larger icon.',
  render: () => (
    <Select>
      <SelectTrigger aria-label="Choose an option" iconClassName="size-5">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const CustomIconDark: Story = inDarkMode(
  CustomIcon,
  'shows a select trigger with a larger icon in dark mode.',
)

export const Ghost: Story = {
  name: 'a ghost select trigger shows its placeholder without a border.',
  render: () => (
    <Select>
      <SelectTrigger variant="ghost" aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const GhostHovered: Story = {
  name: 'a hovered ghost select trigger highlights its background.',
  render: () => (
    <Select>
      <SelectTrigger
        variant="ghost"
        aria-label="Choose an option"
        data-hovered=""
      >
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const GhostFocused: Story = {
  name: 'a focused ghost select trigger shows its underline.',
  render: () => (
    <Select>
      <SelectTrigger variant="ghost" aria-label="Choose an option" autoFocus>
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
    </Select>
  ),
}

export const GhostOpen: Story = {
  name: 'an open ghost select trigger keeps its underline visible.',
  render: () => (
    <Select open value="first">
      <SelectTrigger variant="ghost" aria-label="Choose an option">
        <SelectValue placeholder="Choose an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="first">First option</SelectItem>
        <SelectItem value="second">Second option</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const GhostDark: Story = inDarkMode(
  Ghost,
  'a ghost select trigger shows its placeholder without a border in dark mode.',
)

export const GhostHoveredDark: Story = inDarkMode(
  GhostHovered,
  'a hovered ghost select trigger highlights its background in dark mode.',
)

export const GhostFocusedDark: Story = inDarkMode(
  GhostFocused,
  'a focused ghost select trigger shows its underline in dark mode.',
)

export const GhostOpenDark: Story = inDarkMode(
  GhostOpen,
  'an open ghost select trigger keeps its underline visible in dark mode.',
)
