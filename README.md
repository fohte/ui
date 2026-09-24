# @fohte/ui

Shared design tokens for fohte applications.

## Installation

```sh
pnpm add @fohte/ui
```

## Usage

```css
@import 'tailwindcss';
@import '@fohte/ui/tokens.css';
```

The package provides a dark palette, font stacks, radius values, and a `2xs` text size. Colors are available as Tailwind utilities such as `bg-background` and `text-foreground`. A light palette is not included.

Tailwind CSS v4 is required to process the `@theme` directives. The font stacks reference JetBrains Mono Variable and IBM Plex Mono, which this package does not bundle; load the font files in your application if needed.

## License

MIT © Hayato Kawai
