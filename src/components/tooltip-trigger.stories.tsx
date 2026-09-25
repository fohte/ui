import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Tooltip, TooltipTrigger } from '#components/tooltip'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: TooltipTrigger,
} satisfies Meta<typeof TooltipTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
    </Tooltip>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
