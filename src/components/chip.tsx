import { cva } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { Button } from '#components/button'
import { cn } from '#utils'

const chipVariants = cva(
  'inline-flex items-center gap-1 border font-mono text-2xs',
  {
    variants: {
      size: {
        sm: 'px-1',
        md: 'px-1.5 py-0.5',
      },
      tone: {
        muted: 'border-border text-muted-foreground',
        strong: 'border-border-strong text-foreground',
        faint: 'border-border text-muted-foreground-faint',
      },
    },
    defaultVariants: {
      size: 'sm',
      tone: 'muted',
    },
  },
)

type ChipVisualProps = {
  children: ReactNode
  size?: 'sm' | 'md'
  tone?: 'muted' | 'strong' | 'faint'
}

type RemovableProps = {
  onRemove: () => void
  removeLabel: string
}

type NonRemovableProps = {
  onRemove?: never
  removeLabel?: never
}

type SpanChipProps = Omit<ComponentProps<'span'>, 'children' | 'className'> &
  ChipVisualProps & {
    as?: 'span'
  } & (RemovableProps | NonRemovableProps)

type ButtonChipProps = Omit<
  ComponentProps<'button'>,
  'children' | 'className'
> &
  ChipVisualProps & {
    as: 'button'
  }

type ChipProps = SpanChipProps | ButtonChipProps

function Chip(props: ChipProps) {
  if (props.as === 'button') {
    const {
      as: Element,
      size = 'sm',
      tone = 'muted',
      children,
      ...buttonProps
    } = props

    return (
      <Element
        {...buttonProps}
        type={buttonProps.type ?? 'button'}
        data-slot="chip"
        className={cn(chipVariants({ size, tone }), 'cursor-pointer')}
      >
        {children}
      </Element>
    )
  }

  const {
    as: Element = 'span',
    size = 'sm',
    tone = 'muted',
    children,
    onRemove,
    removeLabel,
    ...spanProps
  } = props

  return (
    <Element
      {...spanProps}
      data-slot="chip"
      className={chipVariants({ size, tone })}
    >
      {children}
      {onRemove && (
        <Button
          type="button"
          variant="plain"
          aria-label={removeLabel}
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
        >
          <XIcon className="size-3" aria-hidden="true" />
        </Button>
      )}
    </Element>
  )
}

export { Chip }
