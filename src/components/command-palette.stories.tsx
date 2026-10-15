import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Chip } from '#components/chip'
import {
  CommandPalette,
  type CommandPaletteGroup,
  type CommandPaletteItem,
} from '#components/command-palette'
import { ListItem } from '#components/list'

const makeItem = (
  key: string,
  title: string,
  detail: string,
): CommandPaletteItem => {
  const select = fn()
  return {
    key,
    select,
    selectOnTab: fn(),
    render: ({ isSelected, onMouseMove }) => (
      <ListItem
        highlighted={isSelected}
        selected={isSelected}
        onSelect={select}
        onMouseMove={onMouseMove}
      >
        <span className="truncate font-mono text-sm text-foreground">
          {title}
        </span>
        <span className="ms-auto truncate text-xs text-muted-foreground">
          {detail}
        </span>
      </ListItem>
    ),
  }
}

const groups: CommandPaletteGroup[] = [
  {
    id: 'pages',
    title: 'PAGES',
    items: [
      makeItem('overview', 'Overview', 'current workspace'),
      makeItem('settings', 'Settings', 'workspace preferences'),
    ],
  },
  {
    id: 'commands',
    title: 'COMMANDS',
    sections: [
      {
        id: 'navigation',
        title: 'Navigation',
        items: [makeItem('new-page', 'Create a page', '⌘ N')],
      },
    ],
  },
]

const meta = {
  component: CommandPalette,
  args: {
    open: true,
    onOpenChange: fn(),
    value: 'over',
    onValueChange: fn(),
    groups,
  },
  render: (args) => <CommandPalette {...args} />,
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'the palette shows grouped results with the first item highlighted',
}

export const Loading: Story = {
  name: 'the palette shows a spinner while results are loading',
  args: {
    value: 'strategy',
    loading: true,
  },
}

export const Empty: Story = {
  name: 'the palette shows a message when the search has no results',
  args: {
    value: 'unmatched query',
    groups: [],
    emptyMessage: 'No results for "unmatched query"',
  },
}

export const Initial: Story = {
  name: 'the palette prompts the user before a query is entered',
  args: {
    value: '',
    groups: [],
    initialMessage: 'Type to search pages',
  },
}

export const WithInputAdornment: Story = {
  name: 'the input shows a removable scope chip',
  args: {
    prefix: '#',
    inputAdornment: (
      <span className="flex max-w-32 min-w-0">
        <Chip
          size="md"
          tone="strong"
          onRemove={fn()}
          removeLabel="Remove the workspace scope"
        >
          <span className="min-w-0 truncate">workspace:sample</span>
        </Chip>
      </span>
    ),
  },
}

export const WithMobileToolbar: Story = {
  name: 'the mobile palette shows mode filters below the input',
  args: {
    mobileToolbar: (
      <div className="flex gap-0.5" role="group" aria-label="Search mode">
        <Chip as="button" size="md" tone="strong" aria-pressed="true">
          all
        </Chip>
        <Chip as="button" size="md" tone="muted" aria-pressed="false">
          pages
        </Chip>
        <Chip as="button" size="md" tone="muted" aria-pressed="false">
          commands
        </Chip>
      </div>
    ),
  },
}
