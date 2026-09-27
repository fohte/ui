import { cva, type VariantProps } from 'class-variance-authority'

const paddingVariants = cva('', {
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

type Padding = NonNullable<VariantProps<typeof paddingVariants>['padding']>

export { paddingVariants }
export type { Padding }
