import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogTitle,
} satisfies Meta<typeof DialogTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const DefaultDark: Story = inDarkMode(Default)
