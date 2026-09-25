import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogFooter,
} satisfies Meta<typeof DialogFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the footer aligns cancel and continue actions at the bottom of the dialog',
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm changes</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'the cancel and continue actions sit in a dark dialog footer',
)
