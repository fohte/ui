import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Chip } from '#components/chip'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Chip,
  args: { children: 'Chip' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Muted: Story = {
  name: 'a muted chip uses the default text and border colors.',
  args: { tone: 'muted' },
}

export const Strong: Story = {
  name: 'a strong chip uses foreground text and a strong border.',
  args: { tone: 'strong' },
}

export const Faint: Story = {
  name: 'a faint chip uses subdued text and a default border.',
  args: { tone: 'faint' },
}

export const Small: Story = {
  name: 'a small chip has compact horizontal padding.',
  args: { size: 'sm', children: 'Small' },
}

export const Medium: Story = {
  name: 'a medium chip has roomier padding.',
  args: { size: 'md' },
}

export const Removable: Story = {
  name: 'a removable chip has a labeled remove button.',
  args: {
    children: 'Removable',
    onRemove: fn(),
    removeLabel: 'Remove chip',
  },
}

export const WithColorDot: Story = {
  name: 'a chip can contain a color dot before its label.',
  args: {
    children: (
      <>
        <span className="size-2 rounded-full bg-primary" />
        Project
      </>
    ),
  },
}

export const AsButton: Story = {
  name: 'a chip can be rendered as a button.',
  args: { as: 'button', children: 'Filter', onClick: fn() },
}

export const MutedDark: Story = inDarkMode(
  Muted,
  'a muted chip uses the default colors in dark mode.',
)

export const StrongDark: Story = inDarkMode(
  Strong,
  'a strong chip uses foreground text and a strong border in dark mode.',
)

export const FaintDark: Story = inDarkMode(
  Faint,
  'a faint chip uses subdued text and a default border in dark mode.',
)

export const SmallDark: Story = inDarkMode(
  Small,
  'a small chip has compact horizontal padding in dark mode.',
)

export const MediumDark: Story = inDarkMode(
  Medium,
  'a medium chip has roomier padding in dark mode.',
)

export const RemovableDark: Story = inDarkMode(
  Removable,
  'a removable chip has a labeled remove button in dark mode.',
)

export const WithColorDotDark: Story = inDarkMode(
  WithColorDot,
  'a chip can contain a color dot before its label in dark mode.',
)

export const AsButtonDark: Story = inDarkMode(
  AsButton,
  'a chip rendered as a button appears in dark mode.',
)
