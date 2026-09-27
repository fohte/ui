import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'

import { Button } from '#components/button'
import { Popover, PopoverContent, PopoverTrigger } from '#components/popover'
import type { Padding } from '#padding'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: PopoverContent,
} satisfies Meta<typeof PopoverContent>

export default meta
type Story = StoryObj<typeof meta>

function TriggerPopover({ padding }: { padding: Padding }) {
  return (
    <Popover open>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open menu
      </PopoverTrigger>
      <PopoverContent padding={padding}>Menu content</PopoverContent>
    </Popover>
  )
}

export const TriggerWithoutPadding: Story = {
  name: 'the trigger popover has no inner padding',
  render: () => <TriggerPopover padding="none" />,
}

export const TriggerSmallPadding: Story = {
  name: 'the trigger popover uses compact padding',
  render: () => <TriggerPopover padding="sm" />,
}

export const TriggerMediumPadding: Story = {
  name: 'the trigger popover uses comfortable padding',
  render: () => <TriggerPopover padding="md" />,
}

function AnchoredPopover({ padding }: { padding: Padding }) {
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

export const TriggerWithoutPaddingDark: Story = inDarkMode(
  TriggerWithoutPadding,
  'the trigger popover has no inner padding in dark mode',
)

export const TriggerSmallPaddingDark: Story = inDarkMode(
  TriggerSmallPadding,
  'the trigger popover uses compact padding in dark mode',
)

export const TriggerMediumPaddingDark: Story = inDarkMode(
  TriggerMediumPadding,
  'the trigger popover uses comfortable padding in dark mode',
)

export const AnchorWithoutPaddingDark: Story = inDarkMode(
  AnchorWithoutPadding,
  'the anchored popover has no inner padding in dark mode',
)

export const AnchorSmallPaddingDark: Story = inDarkMode(
  AnchorSmallPadding,
  'the anchored popover uses compact padding in dark mode',
)

export const AnchorMediumPaddingDark: Story = inDarkMode(
  AnchorMediumPadding,
  'the anchored popover uses comfortable padding in dark mode',
)
