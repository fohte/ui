import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

import {
  CommandPalette,
  type CommandPaletteGroup,
} from '#components/command-palette'

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true)

const roots: Root[] = []
const mountNodes: HTMLDivElement[] = []

function getDialogClickOutcome(
  openChanges: boolean[],
  clickEvents: { targetRole: string | null; currentRole: string | null }[],
) {
  return { openChanges, clickEvents }
}

function getToolbarKeyboardOutcome(
  focusedControl: string | null | undefined,
  calls: string[],
) {
  return { focusedControl, calls }
}

function getBodyReplacementOutcome() {
  const body = document.querySelector<HTMLElement>(
    '[data-testid="custom-palette-body"]',
  )
  const dialog = document.querySelector<HTMLElement>('[role="dialog"]')

  return {
    bodyParentRole: body?.parentElement?.getAttribute('role') ?? null,
    dialogChildren: Array.from(dialog?.children ?? []).map(
      (child) => child.textContent,
    ),
    listboxNames: Array.from(
      document.querySelectorAll('[role="listbox"]'),
      (listbox) => listbox.getAttribute('aria-label'),
    ),
  }
}

function getStableSlotOutcome() {
  const getSlot = (name: string) =>
    document
      .querySelector(`[data-slot="${name}"]`)
      ?.getAttribute('data-slot') ?? null

  return {
    overlay: getSlot('command-palette-overlay'),
    prefix: getSlot('command-palette-prefix'),
    loading: getSlot('command-palette-loading'),
  }
}

function getToolbarGroupOutcome() {
  const toolbar = document.querySelector<HTMLElement>('[role="group"]')

  return {
    role: toolbar?.getAttribute('role') ?? null,
    label: toolbar?.getAttribute('aria-label') ?? null,
  }
}

function getHiddenResultKeyboardOutcome(
  selectCalls: string[],
  focusedControl: string | null,
) {
  return { selectCalls, focusedControl }
}

afterEach(() => {
  act(() => {
    roots.forEach((root) => {
      root.unmount()
    })
  })
  mountNodes.forEach((node) => {
    node.remove()
  })
  roots.length = 0
  mountNodes.length = 0
})

function renderPalette({
  onOpenChange,
  groups = [],
  inputAdornment,
  mobileToolbar,
  mobileToolbarLabel,
  body,
  emptyMessage,
  initialMessage,
  loading,
  prefix,
}: {
  onOpenChange: (open: boolean) => void
  groups?: CommandPaletteGroup[]
  inputAdornment?: ReactNode
  mobileToolbar?: ReactNode
  mobileToolbarLabel?: string
  body?: ReactNode
  emptyMessage?: ReactNode
  initialMessage?: ReactNode
  loading?: boolean
  prefix?: ReactNode
}) {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        value=""
        onValueChange={() => {}}
        groups={groups}
        inputAdornment={inputAdornment}
        mobileToolbar={mobileToolbar}
        {...(mobileToolbarLabel === undefined ? {} : { mobileToolbarLabel })}
        body={body}
        emptyMessage={emptyMessage}
        initialMessage={initialMessage}
        {...(loading === undefined ? {} : { loading })}
        prefix={prefix}
      />,
    )
  })
}

it('closes when the backdrop is clicked', () => {
  const openChanges: boolean[] = []
  renderPalette({ onOpenChange: (open) => openChanges.push(open) })

  const backdrop = document.querySelector<HTMLElement>(
    '[data-slot="command-palette-overlay"]',
  )
  backdrop?.click()

  expect(openChanges).toEqual([false])
})

it('stays open when the dialog content is clicked', () => {
  const openChanges: boolean[] = []
  renderPalette({ onOpenChange: (open) => openChanges.push(open) })

  const clickEvents: {
    targetRole: string | null
    currentRole: string | null
  }[] = []
  const backdrop = document.querySelector<HTMLElement>(
    '[data-slot="command-palette-overlay"]',
  )
  backdrop?.addEventListener('click', (event) => {
    const getRole = (target: EventTarget | null) =>
      target instanceof HTMLElement ? target.getAttribute('role') : null
    clickEvents.push({
      targetRole: getRole(event.target),
      currentRole: getRole(event.currentTarget),
    })
  })
  document.querySelector<HTMLElement>('[role="dialog"]')?.click()

  expect(getDialogClickOutcome(openChanges, clickEvents)).toEqual({
    openChanges: [],
    clickEvents: [{ targetRole: 'dialog', currentRole: null }],
  })
})

it('keeps Tab navigation and Enter activation available to mobile toolbar controls', async () => {
  const calls: string[] = []
  renderPalette({
    onOpenChange: (open) => calls.push(`open:${String(open)}`),
    mobileToolbar: (
      <>
        <button
          type="button"
          aria-label="First mode"
          onClick={() => calls.push('first')}
        />
        <button
          type="button"
          aria-label="Second mode"
          onClick={() => calls.push('second')}
        />
      </>
    ),
  })

  page.getByRole('button', { name: 'First mode' }).element().focus()
  await userEvent.tab()
  const focusedControl = document.activeElement?.getAttribute('aria-label')
  await userEvent.keyboard('{Enter}')

  expect(getToolbarKeyboardOutcome(focusedControl, calls)).toEqual({
    focusedControl: 'Second mode',
    calls: ['second'],
  })
})

it('replaces the result region with the provided body', () => {
  renderPalette({
    onOpenChange: () => {},
    groups: [
      {
        id: 'example',
        title: 'Example group',
        items: [
          {
            key: 'example-result',
            select: () => {},
            render: () => (
              <div data-testid="example-result">Example result</div>
            ),
          },
        ],
      },
    ],
    body: <div data-testid="custom-palette-body">Help content</div>,
    emptyMessage: 'No matching results',
    initialMessage: 'Type a query',
  })

  expect(getBodyReplacementOutcome()).toEqual({
    bodyParentRole: 'dialog',
    dialogChildren: ['›Esc', 'Help content', 'Escclose'],
    listboxNames: [],
  })
})

it('does not select hidden results and keeps Tab navigation available in body mode', async () => {
  const selectCalls: string[] = []
  renderPalette({
    onOpenChange: () => {},
    groups: [
      {
        id: 'hidden-results',
        title: 'Hidden results',
        items: [
          {
            key: 'hidden-result',
            select: () => selectCalls.push('selected'),
            render: () => <div>Hidden result</div>,
          },
        ],
      },
    ],
    body: (
      <div data-testid="custom-palette-body">
        <button type="button" aria-label="Help control" />
      </div>
    ),
  })

  page.getByRole('textbox').element().focus()
  await userEvent.keyboard('{Enter}')
  await userEvent.tab()
  await userEvent.tab()
  const focusedControl =
    document.activeElement?.getAttribute('aria-label') ?? null

  expect(getHiddenResultKeyboardOutcome(selectCalls, focusedControl)).toEqual({
    selectCalls: [],
    focusedControl: 'Help control',
  })
})

it('exposes stable slots for the overlay, prefix, and loading indicator', () => {
  renderPalette({
    onOpenChange: () => {},
    loading: true,
    prefix: '#',
  })

  expect(getStableSlotOutcome()).toEqual({
    overlay: 'command-palette-overlay',
    prefix: 'command-palette-prefix',
    loading: 'command-palette-loading',
  })
})

it('labels the mobile toolbar wrapper as a group', () => {
  renderPalette({
    onOpenChange: () => {},
    mobileToolbarLabel: 'Search mode filters',
    mobileToolbar: <button type="button">All</button>,
  })

  expect(getToolbarGroupOutcome()).toEqual({
    role: 'group',
    label: 'Search mode filters',
  })
})

it('uses the default accessible label for the mobile toolbar', () => {
  renderPalette({
    onOpenChange: () => {},
    mobileToolbar: <button type="button">All</button>,
  })

  expect(getToolbarGroupOutcome()).toEqual({
    role: 'group',
    label: 'Search mode',
  })
})
