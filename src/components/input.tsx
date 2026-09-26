import { Input as InputPrimitive } from '@base-ui/react/input'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#utils'

const inputVariants = cva(
  'h-8 w-full min-w-0 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default:
          'rounded-none border border-input bg-transparent px-2.5 py-1 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        ghost:
          '-mx-1 border-x-0 border-t-0 border-b border-transparent bg-transparent px-1 py-1 hover:bg-accent/50 data-[hovered]:bg-accent/50 focus:border-b-border-strong focus-visible:border-b-border-strong focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0 dark:bg-transparent dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input }
