import { Button as ButtonPrimitive } from '@base-ui/react/button'

import { cn, fieldTriggerBaseClassName, ghostFieldClassName } from '#utils'

type FieldTriggerProps = Omit<ButtonPrimitive.Props, 'type'>

function FieldTrigger({ className, ...props }: FieldTriggerProps) {
  return (
    <ButtonPrimitive
      type="button"
      data-slot="field-trigger"
      className={cn(
        fieldTriggerBaseClassName,
        ghostFieldClassName,
        'relative min-h-8 border-b-0 py-2 text-left after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:border-b after:border-transparent focus:after:border-b-border-strong aria-invalid:after:border-destructive dark:aria-invalid:after:border-destructive/50 focus:aria-invalid:after:border-b-destructive dark:focus:aria-invalid:after:border-b-destructive/50 disabled:hover:bg-transparent disabled:data-[hovered]:bg-transparent [&_svg]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { FieldTrigger }
