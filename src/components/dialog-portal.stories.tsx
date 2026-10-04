import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dialog, DialogContent, DialogPortal } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogPortal,
} satisfies Meta<typeof DialogPortal>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'the open dialog renders its content in a portal above the page',
  render: () => (
    <Dialog open>
      <DialogContent>Portaled dialog content</DialogContent>
    </Dialog>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'the portaled dialog and backdrop use dark colors',
)
