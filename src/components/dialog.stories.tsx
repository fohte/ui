import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogDescription>
            Review the details before continuing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ClosedDark: Story = inDarkMode(Closed)

export const OpenDark: Story = inDarkMode(Open)
