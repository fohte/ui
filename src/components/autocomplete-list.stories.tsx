import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '#components/autocomplete'
import { inDarkMode } from '#storybook-utils'

const suggestions = [
  'First suggestion',
  'Second suggestion',
  'Third suggestion',
  'Fourth suggestion',
]

const meta = {
  component: AutocompleteList,
} satisfies Meta<typeof AutocompleteList>

export default meta
type Story = StoryObj<typeof meta>

export const WithSuggestions: Story = {
  name: 'shows each matching suggestion as an option in the list.',
  render: () => (
    <div className="w-72">
      <Autocomplete items={suggestions} defaultOpen>
        <AutocompleteInput aria-label="Search suggestions" />
        <AutocompleteContent>
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

export const WithSuggestionsDark: Story = inDarkMode(
  WithSuggestions,
  'matching suggestions appear in the list in dark mode.',
)
