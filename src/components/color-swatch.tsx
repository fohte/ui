import * as React from 'react'

import { cn, colorSwatchStyle } from '#utils'

type ColorSwatchProps = Omit<
  React.ComponentProps<'span'>,
  'aria-hidden' | 'style'
> & {
  color: string
}

function ColorSwatch({ color, className, ...props }: ColorSwatchProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="color-swatch"
      className={cn(
        'size-2 shrink-0 rounded-full bg-(--color-swatch)',
        className,
      )}
      style={colorSwatchStyle(color)}
      {...props}
    />
  )
}

export { ColorSwatch }
