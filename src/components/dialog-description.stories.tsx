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
  component: DialogDescription,
} satisfies Meta<typeof DialogDescription>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm changes</DialogTitle>
          <DialogDescription>
            Review the details before continuing.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
