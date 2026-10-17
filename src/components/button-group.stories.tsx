import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '#components/button'
import { ButtonGroup } from '#components/button-group'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: ButtonGroup,
  args: {
    'aria-label': 'Period navigation',
    children: (
      <>
        <Button variant="outline" size="icon-xs" aria-label="Previous">
          <ChevronLeftIcon />
        </Button>
        <Button variant="outline" size="xs">
          Current
        </Button>
        <Button variant="outline" size="icon-xs" aria-label="Next">
          <ChevronRightIcon />
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const OutlineButtons: Story = {
  name: 'three outline buttons appear as one group.',
}

export const OutlineButtonsDark: Story = inDarkMode(
  OutlineButtons,
  'three outline buttons appear as one group in dark mode.',
)
