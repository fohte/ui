import * as React from 'react'

import { cn } from '#utils'

type ColorSwatchProps = Omit<
  React.ComponentProps<'span'>,
  'aria-hidden' | 'style'
> & {
  color: string
}

type ColorSwatchStyle = React.CSSProperties & {
  '--color-swatch': string
}

function ColorSwatch({ color, className, ...props }: ColorSwatchProps) {
  const style: ColorSwatchStyle = { '--color-swatch': color }

  return (
    <span
      aria-hidden="true"
      data-slot="color-swatch"
      className={cn(
        'size-2 shrink-0 rounded-full bg-(--color-swatch)',
        className,
      )}
      style={style}
      {...props}
    />
  )
}

export { ColorSwatch }
