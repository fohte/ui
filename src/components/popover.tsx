'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '#utils'

type PopoverAnchor = React.RefObject<Element | null>

const PopoverAnchorContext = React.createContext<PopoverAnchor | undefined>(
  undefined,
)

const popoverContentVariants = cva('', {
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

function Popover({
  anchor,
  onOpenChange,
  ...props
}: PopoverPrimitive.Root.Props & {
  anchor?: PopoverAnchor
}) {
  const handleOpenChange: PopoverPrimitive.Root.Props['onOpenChange'] = (
    open,
    eventDetails,
  ) => {
    const target = eventDetails.event.target
    if (
      !open &&
      eventDetails.reason === 'outside-press' &&
      target instanceof Node &&
      anchor?.current?.contains(target) === true
    ) {
      eventDetails.cancel()
      return
    }
    onOpenChange?.(open, eventDetails)
  }

  return (
    <PopoverAnchorContext.Provider value={anchor}>
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        onOpenChange={handleOpenChange}
      />
    </PopoverAnchorContext.Provider>
  )
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  children,
  padding = 'md',
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset'
  > & {
    padding?: 'none' | 'sm' | 'md'
  }) {
  const anchor = React.useContext(PopoverAnchorContext)

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        anchor={anchor}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'z-50 max-w-(--available-width) rounded-md border border-border bg-popover font-mono shadow-md',
            popoverContentVariants({ padding }),
            className,
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverContent, PopoverTrigger }
