import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, expect, it } from 'vitest'

import { Button } from '#components/button'
import { ButtonGroup } from '#components/button-group'

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true)

const roots: Root[] = []
const mountNodes: HTMLDivElement[] = []

function getButtonGroupOutput() {
  const group = document.querySelector<HTMLElement>(
    '[data-slot="button-group"]',
  )

  return {
    role: group?.getAttribute('role') ?? null,
    label: group?.getAttribute('aria-label') ?? null,
    slot: group?.getAttribute('data-slot') ?? null,
    className: group?.className ?? null,
    buttons: Array.from(group?.children ?? []).map((button) => ({
      slot: button.getAttribute('data-slot'),
      label: button.textContent,
    })),
  }
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

it('joins the child buttons inside an accessible group', () => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(
      <ButtonGroup aria-label="Period navigation">
        <Button variant="outline" size="icon-xs" aria-label="Previous" />
        <Button variant="outline" size="xs">
          Current
        </Button>
        <Button variant="outline" size="icon-xs" aria-label="Next" />
      </ButtonGroup>,
    )
  })

  expect(getButtonGroupOutput()).toEqual({
    role: 'group',
    label: 'Period navigation',
    slot: 'button-group',
    className:
      'inline-flex items-center [&>[data-slot=button]:not(:first-child)]:border-l-0 [&>[data-slot=button]:focus-visible]:relative [&>[data-slot=button]:focus-visible]:z-10',
    buttons: [
      { slot: 'button', label: '' },
      { slot: 'button', label: 'Current' },
      { slot: 'button', label: '' },
    ],
  })
})
