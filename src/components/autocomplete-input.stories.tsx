import type { Meta, StoryObj } from '@storybook/react-vite'

import { Autocomplete, AutocompleteInput } from '#components/autocomplete'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: AutocompleteInput,
  args: { placeholder: 'Search suggestions' },
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'an empty autocomplete input shows its placeholder text.',
  render: (args) => (
    <div className="w-72">
      <Autocomplete items={[]}>
        <AutocompleteInput {...args} />
      </Autocomplete>
    </div>
  ),
}

export const DefaultDark: Story = inDarkMode(
  Default,
  'an empty autocomplete input shows its placeholder in dark mode.',
)
