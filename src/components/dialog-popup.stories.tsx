import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dialog, DialogContent, DialogPopup } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogPopup,
} satisfies Meta<typeof DialogPopup>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'a centered popup appears above the dialog backdrop',
  render: () => (
    <Dialog open>
      <DialogContent>Dialog content</DialogContent>
    </Dialog>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'the centered popup and backdrop use dark colors',
)
