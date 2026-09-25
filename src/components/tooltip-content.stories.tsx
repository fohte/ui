import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#components/tooltip'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: TooltipContent,
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'shows tooltip text above its trigger button.',
  render: () => (
    <TooltipProvider>
      <Tooltip open>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'shows tooltip text above its trigger button in dark mode.',
)
