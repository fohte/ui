import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { List, ListItem } from '#components/list'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

function PaddedStory({ children }: { children: ReactNode }) {
  // Keep the row away from the viewport origin where screenshot capture may hover.
  return <div className="p-2">{children}</div>
}

export const Default: Story = {
  name: 'the row shows its label on a plain background',
  render: () => (
    <PaddedStory>
      <ListItem>First option</ListItem>
    </PaddedStory>
  ),
}

export const Hover: Story = {
  name: 'the row changes background on hover',
  render: () => (
    <PaddedStory>
      <ListItem data-hovered="">First option</ListItem>
    </PaddedStory>
  ),
}

export const Highlighted: Story = {
  name: 'the highlighted row uses the accent colors',
  args: { highlighted: true, children: 'Second option' },
}

export const Selected: Story = {
  name: 'the selected row shows a check at the end',
  args: { selected: true, children: 'Third option' },
}

export const Indented: Story = {
  name: 'nested rows move farther right at deeper levels',
  render: () => (
    <PaddedStory>
      <List>
        <ListItem>First option</ListItem>
        <ListItem indent={1}>Nested option</ListItem>
        <ListItem indent={2}>Deeper nested option</ListItem>
      </List>
    </PaddedStory>
  ),
}

export const ListboxOption: Story = {
  name: 'the listbox marks the second option with a check',
  render: () => (
    <List role="listbox" aria-label="Choose an option">
      <ListItem id="first-option">First option</ListItem>
      <ListItem id="second-option" selected>
        Second option
      </ListItem>
    </List>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'the row shows its label on a plain background in dark mode',
)

export const HoverDark: Story = inDarkMode(
  Hover,
  'the row changes background on hover in dark mode',
)

export const HighlightedDark: Story = inDarkMode(
  Highlighted,
  'the highlighted row uses the accent colors in dark mode',
)

export const SelectedDark: Story = inDarkMode(
  Selected,
  'the selected row shows a check at the end in dark mode',
)

export const IndentedDark: Story = inDarkMode(
  Indented,
  'nested rows move farther right at deeper levels in dark mode',
)

export const ListboxOptionDark: Story = inDarkMode(
  ListboxOption,
  'the listbox marks the second option with a check in dark mode',
)
