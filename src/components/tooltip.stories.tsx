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
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  name: 'shows a trigger button with its tooltip closed.',
  render: () => (
    <div className="flex h-32 w-48 items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
}

export const Open: Story = {
  name: 'shows tooltip text below its trigger button.',
  render: () => (
    <div className="flex h-32 w-48 items-center justify-center">
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger render={<Button variant="outline" />}>
            Hover me
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ),
}

export const ClosedDark: Story = {
  ...inDarkMode(Closed),
  name: 'shows a trigger button with its tooltip closed in dark mode.',
}

export const OpenDark: Story = {
  ...inDarkMode(Open),
  name: 'shows tooltip text below its trigger button in dark mode.',
}
