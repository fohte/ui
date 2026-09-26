import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select, SelectTrigger, SelectValue } from '#components/select'
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
