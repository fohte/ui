import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dialog, DialogContent, DialogOverlay } from '#components/dialog'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: DialogOverlay,
} satisfies Meta<typeof DialogOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'a dark backdrop dims the page behind the dialog',
  render: () => (
    <Dialog open>
      <DialogContent>Dialog content</DialogContent>
    </Dialog>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'the dark backdrop dims the page behind the dialog in dark mode',
)
