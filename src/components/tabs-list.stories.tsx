import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsList, TabsPanel, TabsTab } from '#components/tabs'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: TabsList,
} satisfies Meta<typeof TabsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the list contains selected and unselected tabs.',
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

export const DefaultDark: Story = inDarkMode(
  Default,
  'the list contains tabs in dark mode.',
)
