import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '#utils'

const panelVariants = cva('border border-border', {
  variants: {
    padding: {
      none: 'p-0',
      sm: 'px-3 py-1.5',
      md: 'p-3',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
})

function Panel({
  className,
  padding = 'md',
  ...props
}: ComponentProps<'div'> & {
  padding?: 'none' | 'sm' | 'md'
}) {
  return (
    <div
      data-slot="panel"
      className={cn(panelVariants({ padding }), className)}
      {...props}
    />
  )
}

export { Panel }
