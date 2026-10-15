import { describe, expect, it } from 'vitest'

import {
  type CommandPaletteKeyboardEvent,
  type CommandPaletteSelection,
  handleCommandPaletteKeyDown,
} from '#components/command-palette-keyboard'

function makeKeyboardEvent(key: string, isComposing = false, keyCode = 0) {
  let defaultPrevented = false
  return {
    event: {
      key,
      nativeEvent: { isComposing, keyCode },
      preventDefault() {
        defaultPrevented = true
      },
      get defaultPrevented() {
        return defaultPrevented
      },
    } satisfies CommandPaletteKeyboardEvent,
  }
}

function makeItems(calls: string[]): CommandPaletteSelection[] {
  return [
    {
      select: () => calls.push('first'),
      selectOnTab: () => calls.push('tab-first'),
    },
    {
      select: () => calls.push('second'),
    },
  ]
}

function getOutcome(
  event: ReturnType<typeof makeKeyboardEvent>,
  calls: string[],
  selectedIndex?: number,
) {
  return selectedIndex === undefined
    ? { calls, prevented: event.event.defaultPrevented }
    : { selectedIndex, calls, prevented: event.event.defaultPrevented }
}

describe('handleCommandPaletteKeyDown', () => {
  it('moves down and wraps to the first result', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('ArrowDown')
    let selectedIndex = 1

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex,
      onSelectedIndexChange: (index) => {
        selectedIndex = index
      },
      onOpenChange: () => calls.push('open-change'),
    })

    expect(getOutcome(event, calls, selectedIndex)).toEqual({
      selectedIndex: 0,
      calls: [],
      prevented: true,
    })
  })

  it('moves up and wraps to the last result', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('ArrowUp')
    let selectedIndex = 0

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex,
      onSelectedIndexChange: (index) => {
        selectedIndex = index
      },
      onOpenChange: () => calls.push('open-change'),
    })

    expect(getOutcome(event, calls, selectedIndex)).toEqual({
      selectedIndex: 1,
      calls: [],
      prevented: true,
    })
  })

  it('selects the highlighted result with Enter', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Enter')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 1,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['second'],
      prevented: true,
    })
  })

  it('runs the highlighted result tab action with Tab', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Tab')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['tab-first'],
      prevented: true,
    })
  })

  it('allows native navigation without result actions when result navigation is disabled', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Tab')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
      enableResultNavigation: false,
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: [],
      prevented: false,
    })
  })

  it('closes the palette on Escape when result navigation is disabled', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Escape')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: (open) => calls.push(`open:${String(open)}`),
      enableResultNavigation: false,
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['open:false'],
      prevented: true,
    })
  })

  it('closes the palette with Escape', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Escape')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: (open) => calls.push(`open:${String(open)}`),
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['open:false'],
      prevented: true,
    })
  })

  it('lets the consumer handle keys such as Backspace', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Backspace')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
      onKeyDown: (keyboardEvent) => {
        calls.push(keyboardEvent.key)
        keyboardEvent.preventDefault()
      },
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['Backspace'],
      prevented: true,
    })
  })

  it('lets the consumer prevent the built-in Enter action', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Enter')

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
      onKeyDown: (keyboardEvent) => {
        calls.push('consumer-keydown')
        keyboardEvent.preventDefault()
      },
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: ['consumer-keydown'],
      prevented: true,
    })
  })

  it('ignores keys during IME composition', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Enter', true)

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
      onKeyDown: () => calls.push('consumer-keydown'),
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: [],
      prevented: false,
    })
  })

  it('ignores the Enter key used to confirm Safari IME composition', () => {
    const calls: string[] = []
    const event = makeKeyboardEvent('Enter', false, 229)

    handleCommandPaletteKeyDown(event.event, {
      items: makeItems(calls),
      selectedIndex: 0,
      onSelectedIndexChange: () => calls.push('index-change'),
      onOpenChange: () => calls.push('open-change'),
      onKeyDown: () => calls.push('consumer-keydown'),
    })

    expect(getOutcome(event, calls)).toEqual({
      calls: [],
      prevented: false,
    })
  })
})
