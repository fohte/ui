import type { Meta, StoryObj } from '@storybook/react-vite'

import { List, ListItem } from '#components/list'

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the row shows its label without a divider',
  render: () => <ListItem>First option</ListItem>,
}

export const Hover: Story = {
  name: 'the row changes background on hover',
  render: () => <ListItem>First option</ListItem>,
  parameters: { pseudo: { hover: true } },
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
  name: 'the row exposes its selected state as a listbox option',
  render: () => (
    <List role="listbox" aria-label="Choose an option">
      <ListItem id="first-option">First option</ListItem>
      <ListItem id="second-option" selected>
        Second option
      </ListItem>
    </List>
  ),
}
