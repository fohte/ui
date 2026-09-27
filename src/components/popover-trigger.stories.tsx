import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover'

const meta = {
  component: PopoverTrigger,
} satisfies Meta<typeof PopoverTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an outline button opens a menu popover',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent>Menu content</PopoverContent>
    </Popover>
  ),
}
