import type { ComponentProps } from 'react'

import { type Padding, paddingVariants } from '#padding'
import { cn } from '#utils'

function Panel({
  className,
  padding = 'md',
  ...props
}: ComponentProps<'div'> & {
  padding?: Padding
}) {
  return (
    <div
      data-slot="panel"
      className={cn(
        'border border-border',
        paddingVariants({ padding }),
        className,
      )}
      {...props}
    />
  )
}

export { Panel }
