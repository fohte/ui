# @fohte/ui

Shared design tokens and React components for fohte applications.

## Installation

```sh
pnpm add @fohte/ui
```

## Usage

```css
@import 'tailwindcss';
@import '@fohte/ui/tokens.css';
```

The package provides light tokens at `:root` and dark tokens under `.dark`, plus font stacks, radius values, and a `2xs` text size. Colors are available as Tailwind utilities such as `bg-background` and `text-foreground`.

The package does not follow `prefers-color-scheme`; the consuming application controls when `.dark` is applied. Tailwind CSS v4 is required to process the `@theme` directives. The font stacks reference JetBrains Mono Variable and IBM Plex Mono, which this package does not bundle; load the font files in your application if needed.

## React components

Import components from their subpaths:

```tsx
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '@fohte/ui/autocomplete'
import { Button } from '@fohte/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@fohte/ui/dialog'
import { Input } from '@fohte/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@fohte/ui/select'
import { Tooltip, TooltipContent, TooltipTrigger } from '@fohte/ui/tooltip'
```

React, React DOM, `@base-ui/react`, and `lucide-react` are peer dependencies. Make sure they are available in the consuming application. Their supported version ranges are declared in `package.json`.

The component subpaths publish TSX source, so the consuming bundler must transform TSX from dependencies.

The components also require Tailwind CSS v4, `tw-animate-css`, and `shadcn` in the consuming application. Install them as development dependencies if they are not already present:

```sh
pnpm add -D tailwindcss@^4 tw-animate-css@^1 shadcn@^4
```

For example, a select can be composed from its trigger, value, content, and items:

```tsx
<Select defaultValue="first">
  <SelectTrigger aria-label="Choose an option">
    <SelectValue placeholder="Choose an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="first">First option</SelectItem>
    <SelectItem value="second">Second option</SelectItem>
  </SelectContent>
</Select>
```

The consuming application's CSS must load Tailwind CSS v4, `tw-animate-css`, `shadcn/tailwind.css`, and this package's tokens. Tailwind v4 ignores dependency files by default, so explicitly register the package source using [`@source`](https://tailwindcss.com/docs/detecting-classes-in-source-files). Adjust the path relative to the stylesheet:

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import '@fohte/ui/tokens.css';

@source '../node_modules/@fohte/ui/src';
```

## License

MIT © Hayato Kawai
