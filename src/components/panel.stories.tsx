import type { Meta, StoryObj } from '@storybook/react-vite'

import { Panel } from '#components/panel'

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
