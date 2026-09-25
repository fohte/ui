import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogHeader,
} satisfies Meta<typeof DialogHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader className="w-80">
          <DialogTitle>Dialog title</DialogTitle>
          <p className="text-muted-foreground">Dialog header content.</p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
