import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs, TabsList, TabsPanel, TabsTab } from '#components/tabs'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

function TabsExample({ value }: { value: string }) {
  return (
    <Tabs defaultValue={value}>
      <TabsList>
        <TabsTab value="summary">Summary</TabsTab>
        <TabsTab value="details">Details</TabsTab>
        <TabsTab value="history">History</TabsTab>
      </TabsList>
      <TabsPanel value="summary">Summary panel</TabsPanel>
      <TabsPanel value="details">Details panel</TabsPanel>
      <TabsPanel value="history">History panel</TabsPanel>
    </Tabs>
  )
}

export const SummarySelected: Story = {
  name: 'the summary tab is selected.',
  render: () => <TabsExample value="summary" />,
}

export const DetailsSelected: Story = {
  name: 'the details tab is selected.',
  render: () => <TabsExample value="details" />,
}

export const HistorySelected: Story = {
  name: 'the history tab is selected.',
  render: () => <TabsExample value="history" />,
}

export const SummarySelectedDark: Story = inDarkMode(
  SummarySelected,
  'the summary tab is selected in dark mode.',
)
