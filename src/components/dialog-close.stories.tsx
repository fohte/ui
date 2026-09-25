import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Dialog, DialogClose, DialogContent } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogClose,
} satisfies Meta<typeof DialogClose>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogClose render={<Button variant="outline" />}>
          Close dialog
        </DialogClose>
      </DialogContent>
    </Dialog>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
