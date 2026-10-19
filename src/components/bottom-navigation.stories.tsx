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
import type { ComponentProps } from 'react'

import { BottomNavigation } from '#components/bottom-navigation'
import { createBottomNavigationLink } from '#components/bottom-navigation.fixtures'
import { inDarkMode } from '#storybook-utils'

const fiveDestinations = [
  createBottomNavigationLink('overview', 'Home', <HouseIcon />, true),
  createBottomNavigationLink('library', 'Read', <BookOpenIcon />),
  createBottomNavigationLink('calendar', 'Plan', <CalendarDaysIcon />),
  createBottomNavigationLink('timeline', 'Log', <ActivityIcon />),
  createBottomNavigationLink('preferences', 'Prefs', <SettingsIcon />),
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
  createBottomNavigationLink('overview', 'Home', <HouseIcon />, true),
  createBottomNavigationLink('library', 'Read', <BookOpenIcon />),
  createBottomNavigationLink('calendar', 'Plan', <CalendarDaysIcon />),
  createBottomNavigationLink('archive', 'Saved', <ArchiveIcon />),
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
  createBottomNavigationLink(
    'weekly-plan',
    'Weekly planning',
    <CalendarDaysIcon />,
    true,
  ),
  createBottomNavigationLink(
    'reading-list',
    'Personal reading list',
    <BookOpenIcon />,
  ),
  createBottomNavigationLink('timeline', 'Change history', <ActivityIcon />),
  createBottomNavigationLink('saved-items', 'Saved items', <ArchiveIcon />),
  createBottomNavigationLink(
    'discover',
    'Discover new topics',
    <CompassIcon />,
  ),
  createBottomNavigationLink(
    'preferences',
    'Display preferences',
    <SettingsIcon />,
  ),
]

const disabledAction = [
  ...fiveDestinations,
  {
    id: 'compose',
    type: 'button' as const,
    label: 'Edit',
    icon: <FilePlus2Icon />,
    onClick: () => undefined,
    disabled: true,
  },
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

export const DisabledAction: Story = {
  name: 'the disabled action appears unavailable beside destinations.',
  args: { items: disabledAction },
  render: renderAtMobileWidth,
}

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
