import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ActivityIcon,
  ArchiveIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CompassIcon,
  FilePlus2Icon,
  FilterIcon,
  HouseIcon,
  SearchIcon,
  SettingsIcon,
} from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import {
  BottomNavigation,
  type BottomNavigationLinkItem,
} from '#components/bottom-navigation'
import { inDarkMode } from '#storybook-utils'

function createLink(
  id: string,
  label: string,
  icon?: ReactNode,
  selected = false,
): BottomNavigationLinkItem {
  return {
    id,
    type: 'link',
    label,
    icon,
    selected,
    renderLink: ({ children, ...props }) => (
      <a href={`/${id}`} {...props}>
        {children}
      </a>
    ),
  }
}

const fiveDestinations = [
  createLink('overview', 'Home', <HouseIcon />, true),
  createLink('library', 'Read', <BookOpenIcon />),
  createLink('calendar', 'Plan', <CalendarDaysIcon />),
  createLink('timeline', 'Log', <ActivityIcon />),
  createLink('preferences', 'Prefs', <SettingsIcon />),
]

const fiveDestinationsWithAction = [
  ...fiveDestinations,
  {
    id: 'compose',
    type: 'button' as const,
    label: 'Edit',
    icon: <FilePlus2Icon />,
    onClick: () => undefined,
  },
]

const fourDestinationsWithTwoActions = [
  createLink('overview', 'Home', <HouseIcon />, true),
  createLink('library', 'Read', <BookOpenIcon />),
  createLink('calendar', 'Plan', <CalendarDaysIcon />),
  createLink('archive', 'Saved', <ArchiveIcon />),
  {
    id: 'filter',
    type: 'button' as const,
    label: 'Filter',
    icon: <FilterIcon />,
    onClick: () => undefined,
    className: 'border-l border-border',
  },
  {
    id: 'find',
    type: 'button' as const,
    label: 'Find',
    icon: <SearchIcon />,
    onClick: () => undefined,
  },
]

const longLabels = [
  createLink('weekly-plan', 'Weekly planning', <CalendarDaysIcon />, true),
  createLink('reading-list', 'Personal reading list', <BookOpenIcon />),
  createLink('timeline', 'Change history', <ActivityIcon />),
  createLink('saved-items', 'Saved items', <ArchiveIcon />),
  createLink('discover', 'Discover new topics', <CompassIcon />),
  createLink('preferences', 'Display preferences', <SettingsIcon />),
]

const meta = {
  component: BottomNavigation,
  args: {
    'aria-label': 'Primary navigation',
  },
} satisfies Meta<typeof BottomNavigation>

export default meta
type Story = StoryObj<typeof meta>

function renderAtMobileWidth(args: ComponentProps<typeof BottomNavigation>) {
  return (
    <div className="w-[320px]">
      <BottomNavigation {...args} />
    </div>
  )
}

export const FiveDestinations: Story = {
  name: 'five destinations fit across the navigation.',
  args: { items: fiveDestinations },
  render: renderAtMobileWidth,
}

export const FiveDestinationsDark: Story = inDarkMode(
  FiveDestinations,
  'five destinations fit across the navigation in dark mode.',
)

export const FiveDestinationsWithAction: Story = {
  name: 'five destinations and an action share the navigation.',
  args: { items: fiveDestinationsWithAction },
  render: renderAtMobileWidth,
}

export const FiveDestinationsWithActionDark: Story = inDarkMode(
  FiveDestinationsWithAction,
  'five destinations and an action share the navigation in dark mode.',
)

export const FourDestinationsWithTwoActions: Story = {
  name: 'four destinations and two actions share the navigation.',
  args: { items: fourDestinationsWithTwoActions },
  render: renderAtMobileWidth,
}

export const FourDestinationsWithTwoActionsDark: Story = inDarkMode(
  FourDestinationsWithTwoActions,
  'four destinations and two actions share the navigation in dark mode.',
)

export const LongLabelsOverflow: Story = {
  name: 'long labels stay on one line and scroll horizontally.',
  args: { items: longLabels },
  render: renderAtMobileWidth,
  parameters: {
    overflowCheck: {
      ignoreSelectors: ['[data-slot="bottom-navigation"]'],
    },
  },
}

export const LongLabelsOverflowDark: Story = inDarkMode(
  LongLabelsOverflow,
  'long labels stay on one line and scroll horizontally in dark mode.',
)
