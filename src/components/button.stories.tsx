import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowRightIcon,
  DownloadIcon,
  PlusIcon,
  SearchIcon,
} from 'lucide-react'

import { Button } from '#components/button'

const meta = {
  component: Button,
  args: { children: 'Button' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
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
  args: { children: 'Disabled', disabled: true },
}
