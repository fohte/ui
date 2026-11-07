import type { ComponentProps } from 'react'

import { cn } from '#utils'

function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex min-w-4 items-center justify-center rounded-(--keycap-radius) border border-border bg-muted px-1 font-mono text-2xs text-muted-foreground-strong select-none',
        className,
      )}
      {...props}
    />
  )
}

export { Kbd }
