import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover'

const meta = {
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  name: 'the closed popover shows its trigger button',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent>Menu content</PopoverContent>
    </Popover>
  ),
}

export const Open: Story = {
  name: 'the open popover shows content below its trigger button',
  render: () => (
    <Popover open>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent>Menu content</PopoverContent>
    </Popover>
  ),
}
