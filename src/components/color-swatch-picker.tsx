import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import { cn, colorSwatchStyle } from '#utils'

type AccessibleNameProps =
  | {
      'aria-label': string
      'aria-labelledby'?: never
    }
  | {
      'aria-label'?: never
      'aria-labelledby': string
    }

type ColorSwatchPickerProps<Value> = RadioGroup.Props<Value> &
  AccessibleNameProps

type ColorSwatchPickerItemProps<Value> = Omit<
  Radio.Root.Props<Value>,
  'aria-label' | 'style'
> & {
  'aria-label': string
  color: string
}

function ColorSwatchPickerItem<Value>({
  'aria-label': ariaLabel,
  className,
  color,
  ...props
}: ColorSwatchPickerItemProps<Value>) {
  return (
    <Radio.Root
      aria-label={ariaLabel}
      data-slot="color-swatch-picker-item"
      className={cn(
        'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-none bg-(--color-swatch) outline-none transition-transform data-checked:ring-2 data-checked:ring-foreground data-checked:ring-offset-2 data-checked:ring-offset-background data-unchecked:hover:scale-110 data-disabled:pointer-events-none data-disabled:opacity-50 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring',
        className,
      )}
      style={colorSwatchStyle(color)}
      {...props}
    />
  )
}

function ColorSwatchPickerRoot<Value>({
  className,
  ...props
}: ColorSwatchPickerProps<Value>) {
  return (
    <RadioGroup
      data-slot="color-swatch-picker"
      className={cn('flex flex-wrap gap-1.5', className)}
      {...props}
    />
  )
}

const ColorSwatchPicker = Object.assign(ColorSwatchPickerRoot, {
  Item: ColorSwatchPickerItem,
})

export { ColorSwatchPicker }
