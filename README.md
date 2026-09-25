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

React 19 and React DOM 19 are peer dependencies. The component subpaths publish TSX source, so the consuming bundler must transform TSX from dependencies.

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
