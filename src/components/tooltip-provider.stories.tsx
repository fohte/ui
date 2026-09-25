import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#components/tooltip'

const meta = {
  component: TooltipProvider,
} satisfies Meta<typeof TooltipProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider delay={0}>
      <Tooltip open>
        <TooltipTrigger render={<Button variant="outline" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>Tooltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const DefaultDark: Story = {
  ...Default,
  globals: { theme: 'dark' },
}
