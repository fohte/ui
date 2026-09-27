import type { Meta, StoryObj } from '@storybook/react-vite'

import { Panel } from '#components/panel'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Panel,
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutPadding: Story = {
  name: 'the panel content touches its border',
  render: () => <Panel padding="none">Panel content</Panel>,
}

export const SmallPadding: Story = {
  name: 'the panel uses compact padding',
  render: () => <Panel padding="sm">Panel content</Panel>,
}

export const MediumPadding: Story = {
  name: 'the panel uses comfortable padding',
  render: () => <Panel padding="md">Panel content</Panel>,
}

export const WithoutPaddingDark: Story = inDarkMode(
  WithoutPadding,
  'the panel content touches its border in dark mode',
)

export const SmallPaddingDark: Story = inDarkMode(
  SmallPadding,
  'the panel uses compact padding in dark mode',
)

export const MediumPaddingDark: Story = inDarkMode(
  MediumPadding,
  'the panel uses comfortable padding in dark mode',
)
