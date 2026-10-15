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
}: {
  onOpenChange: (open: boolean) => void
  groups?: CommandPaletteGroup[]
  inputAdornment?: ReactNode
  mobileToolbar?: ReactNode
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
      />,
    )
  })
}

it('closes when the backdrop is clicked', () => {
  const openChanges: boolean[] = []
  renderPalette({ onOpenChange: (open) => openChanges.push(open) })

  const backdrop = document.querySelector<HTMLElement>(
    '[data-slot="command-palette-backdrop"]',
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
    '[data-slot="command-palette-backdrop"]',
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
