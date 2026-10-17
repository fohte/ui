import type { ComponentProps } from 'react'

import { cn } from '#utils'

type ButtonGroupProps = Omit<ComponentProps<'div'>, 'role'>

function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return (
    <div
      {...props}
      data-slot="button-group"
      role="group"
      className={cn(
        'inline-flex items-center [&>[data-slot=button]:not(:first-child)]:border-l-0 [&>[data-slot=button]:focus-visible]:relative [&>[data-slot=button]:focus-visible]:z-10',
        className,
      )}
    />
  )
}

export { ButtonGroup }
