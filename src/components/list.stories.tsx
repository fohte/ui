import type { Meta, StoryObj } from '@storybook/react-vite'

import { List, ListItem } from '#components/list'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: List,
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the list stacks selectable rows',
  render: () => (
    <List>
      <ListItem>First option</ListItem>
      <ListItem>Second option</ListItem>
    </List>
  ),
}

export const Listbox: Story = {
  name: 'the listbox highlights the second option',
  args: {
    role: 'listbox',
    id: 'example-listbox',
    'aria-label': 'Choose an option',
  },
  render: (args) => (
    <List {...args}>
      <ListItem id="first-option">First option</ListItem>
      <ListItem id="second-option" highlighted>
        Second option
      </ListItem>
    </List>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'the list stacks selectable rows in dark mode',
)

export const ListboxDark: Story = inDarkMode(
  Listbox,
  'the listbox highlights the second option in dark mode',
)
