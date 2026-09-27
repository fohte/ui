import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsList, TabsPanel, TabsTab } from '#components/tabs'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: TabsTab,
} satisfies Meta<typeof TabsTab>

export default meta
type Story = StoryObj<typeof meta>

export const Selected: Story = {
  name: 'the active tab uses foreground text and an underline.',
  render: () => (
    <Tabs defaultValue="summary">
      <TabsList>
        <TabsTab value="summary">Summary</TabsTab>
        <TabsTab value="details">Details</TabsTab>
      </TabsList>
      <TabsPanel value="summary">Summary panel</TabsPanel>
      <TabsPanel value="details">Details panel</TabsPanel>
    </Tabs>
  ),
}

export const Unselected: Story = {
  name: 'an inactive tab uses muted text and a transparent underline.',
  render: () => (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTab value="summary">Inactive</TabsTab>
        <TabsTab value="details">Selected</TabsTab>
      </TabsList>
      <TabsPanel value="summary">Inactive tab panel</TabsPanel>
      <TabsPanel value="details">Selected tab panel</TabsPanel>
    </Tabs>
  ),
}

export const SelectedDark: Story = inDarkMode(
  Selected,
  'the active tab uses foreground text and an underline in dark mode.',
)
