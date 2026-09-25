import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogContent,
} satisfies Meta<typeof DialogContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const OpenDark: Story = inDarkMode(Open)
