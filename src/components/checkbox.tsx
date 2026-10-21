import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { CheckIcon, MinusIcon } from 'lucide-react'

import { cn } from '#utils'

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'group/checkbox relative flex size-4 shrink-0 items-center justify-center border border-input bg-transparent text-background outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 data-checked:border-foreground data-checked:bg-foreground data-indeterminate:border-foreground data-indeterminate:bg-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <CheckIcon
          aria-hidden="true"
          className="size-3 group-data-[indeterminate]/checkbox:hidden"
        />
        <MinusIcon
          aria-hidden="true"
          className="hidden size-3 group-data-[indeterminate]/checkbox:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
