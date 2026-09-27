import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsList, TabsPanel, TabsTab } from '#components/tabs'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: TabsPanel,
} satisfies Meta<typeof TabsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Selected: Story = {
  name: 'the panel associated with the selected tab is visible.',
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

export const SelectedDark: Story = inDarkMode(
  Selected,
  'the selected tab panel is visible in dark mode.',
)
