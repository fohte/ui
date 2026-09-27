import type { Meta, StoryObj } from '@storybook/react-vite'

import { List, ListItem } from '#components/list'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the row shows its label on a plain background',
  render: () => <ListItem>First option</ListItem>,
}

export const Hover: Story = {
  name: 'the row changes background on hover',
  render: () => <ListItem data-hovered="">First option</ListItem>,
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
  name: 'the row moves right for a nested level',
  args: { indent: 1, children: 'Nested option' },
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
  'the row moves right for a nested level in dark mode',
)

export const ListboxOptionDark: Story = inDarkMode(
  ListboxOption,
  'the listbox marks the second option with a check in dark mode',
)
