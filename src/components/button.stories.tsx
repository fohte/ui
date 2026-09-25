import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowRightIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'

import { Button } from '#components/button'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Button,
  args: { children: 'Button' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'a button uses the default variant and size.',
}

export const Variants: Story = {
  name: 'buttons display each available visual variant side by side.',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  name: 'buttons display text and icon controls at each supported size.',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Search">
        <SearchIcon />
      </Button>
      <Button size="icon-xs" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" aria-label="Download">
        <DownloadIcon />
      </Button>
      <Button size="icon-lg" aria-label="Continue">
        <ArrowRightIcon />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  name: 'the button displays its disabled appearance.',
  args: { children: 'Disabled', disabled: true },
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'the default button uses dark theme colors.',
)

export const VariantsDark: Story = inDarkMode(
  Variants,
  'button variants appear with dark theme colors.',
)

export const SizesDark: Story = inDarkMode(
  Sizes,
  'button sizes appear with dark theme colors.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'the disabled button appears with dark theme colors.',
)
