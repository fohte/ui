import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from '#components/textarea'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: Textarea,
  args: { placeholder: 'Enter a longer value' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an empty textarea shows its placeholder text.',
}

export const WithValue: Story = {
  name: 'a textarea displays its prefilled example text.',
  args: { defaultValue: 'Example text\nwith another line.' },
}

export const Focused: Story = {
  name: 'a focused textarea shows the common focus ring.',
  args: { autoFocus: true },
}

export const Disabled: Story = {
  name: 'a disabled textarea shows its placeholder text.',
  args: { disabled: true },
}

export const Invalid: Story = {
  name: 'a textarea shows its invalid state with its placeholder text.',
  args: { 'aria-invalid': true },
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'an empty textarea shows its placeholder in dark mode.',
)

export const WithValueDark: Story = inDarkMode(
  WithValue,
  'a prefilled textarea appears in dark mode.',
)

export const FocusedDark: Story = inDarkMode(
  Focused,
  'a focused textarea shows the common focus ring in dark mode.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'a disabled textarea shows its placeholder in dark mode.',
)

export const InvalidDark: Story = inDarkMode(
  Invalid,
  'an invalid textarea shows its placeholder in dark mode.',
)
