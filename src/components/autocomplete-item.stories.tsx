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
]

const meta = {
  component: AutocompleteItem,
} satisfies Meta<typeof AutocompleteItem>

export default meta
type Story = StoryObj<typeof meta>

export const Highlighted: Story = {
  name: 'highlights the first matching option in the open list.',
  render: () => (
    <div className="w-72">
      <Autocomplete items={suggestions} defaultOpen autoHighlight="always">
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

export const HighlightedDark: Story = inDarkMode(
  Highlighted,
  'the first matching option is highlighted in dark mode.',
)
