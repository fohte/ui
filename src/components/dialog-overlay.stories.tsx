import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Dialog,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
} from '#components/dialog'

const meta = {
  component: DialogOverlay,
} satisfies Meta<typeof DialogOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogPortal>
        <DialogOverlay />
        <DialogPopup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 ring-1 ring-foreground/10">
          Dialog content
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  ),
}
