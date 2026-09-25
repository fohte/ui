import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Dialog, DialogTrigger } from '#components/dialog'

const meta = {
  component: DialogTrigger,
} satisfies Meta<typeof DialogTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
    </Dialog>
  ),
}
