import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { DialogHeaderBar } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogHeaderBar,
} satisfies Meta<typeof DialogHeaderBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DialogHeaderBar className="w-96">
      <span>Dialog heading</span>
      <Button size="icon-xs" variant="ghost" aria-label="Close">
        ×
      </Button>
    </DialogHeaderBar>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
