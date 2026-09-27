import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'

import { Button } from '#components/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover'

const meta = {
  component: PopoverContent,
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof meta>

export const TriggerWithoutPadding: Story = {
  name: 'the trigger popover has no inner padding',
  render: () => (
    <Popover open>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent padding="none">Menu content</PopoverContent>
    </Popover>
  ),
}

export const TriggerSmallPadding: Story = {
  name: 'the trigger popover uses compact padding',
  render: () => (
    <Popover open>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent padding="sm">Menu content</PopoverContent>
    </Popover>
  ),
}

export const TriggerMediumPadding: Story = {
  name: 'the trigger popover uses comfortable padding',
  render: () => (
    <Popover open>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent padding="md">Menu content</PopoverContent>
    </Popover>
  ),
}

function AnchoredPopover({ padding }: { padding: 'none' | 'sm' | 'md' }) {
  const anchorRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button ref={anchorRef} variant="outline">
        Select an option
      </Button>
      <Popover open anchor={anchorRef}>
        <PopoverContent padding={padding}>Popover content</PopoverContent>
      </Popover>
    </>
  )
}

export const AnchorWithoutPadding: Story = {
  name: 'the anchored popover has no inner padding',
  render: () => <AnchoredPopover padding="none" />,
}

export const AnchorSmallPadding: Story = {
  name: 'the anchored popover uses compact padding',
  render: () => <AnchoredPopover padding="sm" />,
}

export const AnchorMediumPadding: Story = {
  name: 'the anchored popover uses comfortable padding',
  render: () => <AnchoredPopover padding="md" />,
}
