export interface CommandPaletteSelection {
  select: () => void
  selectOnTab?: () => void
}

export interface CommandPaletteKeyboardEvent {
  key: string
  nativeEvent: Pick<globalThis.KeyboardEvent, 'isComposing' | 'keyCode'>
  readonly defaultPrevented: boolean
  preventDefault: () => void
}

interface CommandPaletteKeyboardOptions<
  TEvent extends CommandPaletteKeyboardEvent,
> {
  items: readonly CommandPaletteSelection[]
  selectedIndex: number
  onSelectedIndexChange: (index: number) => void
  onOpenChange: (open: boolean) => void
  enableResultNavigation?: boolean
  onKeyDown?: (event: TEvent) => void
}

function isImeConfirmationKey(event: CommandPaletteKeyboardEvent) {
  if (event.nativeEvent.isComposing) return true

  // WebKit reports the Enter key that confirms an IME conversion as keyCode 229.
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- WebKit marks IME confirmation with this legacy key code.
  return event.nativeEvent.keyCode === 229
}

export function handleCommandPaletteKeyDown<
  TEvent extends CommandPaletteKeyboardEvent,
>(
  event: TEvent,
  {
    items,
    selectedIndex,
    onSelectedIndexChange,
    onOpenChange,
    enableResultNavigation = true,
    onKeyDown,
  }: CommandPaletteKeyboardOptions<TEvent>,
) {
  if (isImeConfirmationKey(event)) return

  onKeyDown?.(event)
  if (event.defaultPrevented) return
  if (!enableResultNavigation && event.key !== 'Escape') return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      if (items.length > 0) {
        onSelectedIndexChange(
          selectedIndex < items.length - 1 ? selectedIndex + 1 : 0,
        )
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (items.length > 0) {
        onSelectedIndexChange(
          selectedIndex > 0 ? selectedIndex - 1 : items.length - 1,
        )
      }
      break
    case 'Enter':
      event.preventDefault()
      items[selectedIndex]?.select()
      break
    case 'Tab':
      event.preventDefault()
      items[selectedIndex]?.selectOnTab?.()
      break
    case 'Escape':
      event.preventDefault()
      onOpenChange(false)
      break
  }
}
