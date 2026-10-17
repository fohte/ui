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
        'text-left disabled:hover:bg-transparent disabled:data-[hovered]:bg-transparent [&_svg]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { FieldTrigger }
