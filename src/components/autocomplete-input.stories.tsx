import type { Meta, StoryObj } from '@storybook/react-vite'

import { Autocomplete, AutocompleteInput } from '#components/autocomplete'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: AutocompleteInput,
  args: { placeholder: 'Search suggestions' },
  render: (args) => (
    <div className="w-72">
      <Autocomplete items={[]}>
        <AutocompleteInput {...args} />
      </Autocomplete>
    </div>
  ),
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an empty autocomplete input shows its placeholder text.',
}

export const Disabled: Story = {
  name: 'a disabled autocomplete input shows its placeholder text.',
  args: { disabled: true },
}

export const Invalid: Story = {
  name: 'an autocomplete input shows its invalid state with its placeholder text.',
  args: { 'aria-invalid': true },
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'an empty autocomplete input shows its placeholder in dark mode.',
)

export const DisabledDark: Story = inDarkMode(
  Disabled,
  'a disabled autocomplete input shows its placeholder in dark mode.',
)

export const InvalidDark: Story = inDarkMode(
  Invalid,
  'an invalid autocomplete input shows its placeholder in dark mode.',
)
