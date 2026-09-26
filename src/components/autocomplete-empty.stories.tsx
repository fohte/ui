import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteList,
} from '#components/autocomplete'
import { inDarkMode } from '#storybook-utils'

const meta = {
  component: AutocompleteEmpty,
} satisfies Meta<typeof AutocompleteEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  name: 'shows an empty state when there are no matching suggestions.',
  render: () => (
    <div className="w-72">
      <Autocomplete items={[]} defaultOpen>
        <AutocompleteInput aria-label="Search suggestions" />
        <AutocompleteContent>
          <AutocompleteEmpty>No suggestions found.</AutocompleteEmpty>
          <AutocompleteList />
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}

export const EmptyDark: Story = inDarkMode(
  Empty,
  'the empty suggestions state appears in dark mode.',
)
