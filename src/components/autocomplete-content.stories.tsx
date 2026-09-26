import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '#components/autocomplete'
import { inDarkMode } from '#storybook-utils'

const suggestions = [
  'First suggestion',
  'Second suggestion',
  'Third suggestion',
]

const meta = {
  component: AutocompleteContent,
} satisfies Meta<typeof AutocompleteContent>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  name: 'shows matching suggestions beneath an open autocomplete input.',
  render: () => (
    <div className="w-72">
      <Autocomplete items={suggestions} defaultOpen>
        <AutocompleteInput aria-label="Search suggestions" />
        <AutocompleteContent>
          <AutocompleteEmpty>No suggestions found.</AutocompleteEmpty>
          <AutocompleteList>
            {(suggestion: string) => (
              <AutocompleteItem key={suggestion} value={suggestion}>
                {suggestion}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  ),
}

export const OpenDark: Story = inDarkMode(
  Open,
  'matching suggestions appear beneath an autocomplete input in dark mode.',
)
