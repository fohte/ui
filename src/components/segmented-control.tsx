import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const segmentedControlItemVariants = cva(
  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
  {
    variants: {
      selected: {
        true: 'bg-background text-foreground shadow-sm',
        false: 'text-muted-foreground hover:text-foreground',
      },
    },
  },
)

type SegmentedControlOption<Value extends string> = {
  value: Value
  label: string
}

type SegmentedControlProps<Value extends string> = Omit<
  ComponentProps<'div'>,
  'children' | 'className' | 'onChange' | 'role' | 'style'
> & {
  value: Value
  options: ReadonlyArray<SegmentedControlOption<Value>>
  onValueChange: (value: Value) => void
}

function SegmentedControl<Value extends string>({
  value,
  options,
  onValueChange,
  ...props
}: SegmentedControlProps<Value>) {
  return (
    <div
      {...props}
      data-slot="segmented-control"
      role="group"
      className="inline-flex items-center rounded-md bg-secondary p-0.5"
    >
      {options.map((option) => {
        const selected = value === option.value

        return (
          <button
            key={option.value}
            data-slot="segmented-control-item"
            type="button"
            aria-pressed={selected}
            className={segmentedControlItemVariants({ selected })}
            onClick={() => {
              onValueChange(option.value)
            }}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedControl }
