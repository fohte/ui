import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn, ghostFieldClassName } from '#utils'

type FieldTriggerProps = Omit<ButtonPrimitive.Props, 'type'>

function FieldTrigger({ className, ...props }: FieldTriggerProps) {
  return (
    <ButtonPrimitive
      type="button"
      data-slot="field-trigger"
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 text-left whitespace-nowrap transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:text-muted-foreground",
        ghostFieldClassName,
        className,
      )}
      {...props}
    />
  )
}

export { FieldTrigger }
