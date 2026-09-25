import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '#components/button'
import { Dialog, DialogTrigger } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogTrigger,
} satisfies Meta<typeof DialogTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an outline button opens the dialog',
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
    </Dialog>
  ),
}

export const DefaultDark: Story = {
  ...inDarkMode(Default),
  name: 'the outline trigger button appears against a dark background',
}
