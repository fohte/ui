import '#storybook.css'

import { Checkbox } from '@fohte/ui/checkbox'
import { act, type ComponentProps } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true)

const roots: Root[] = []
const mountNodes: HTMLDivElement[] = []

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

function renderCheckbox(props: ComponentProps<typeof Checkbox>) {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(<Checkbox aria-label="Example option" {...props} />)
  })

  return mountNode
}

function getCheckboxState(mountNode: HTMLDivElement, changes: boolean[]) {
  const checkbox = mountNode.querySelector<HTMLElement>('[role="checkbox"]')

  return {
    checked: checkbox?.getAttribute('aria-checked') ?? null,
    disabled: checkbox?.hasAttribute('data-disabled') ?? false,
    ariaDisabled: checkbox?.getAttribute('aria-disabled') ?? null,
    indeterminate: checkbox?.hasAttribute('data-indeterminate') ?? false,
    changes,
  }
}

it('toggles the checked state and reports the new value', async () => {
  const changes: boolean[] = []
  const mountNode = renderCheckbox({
    defaultChecked: false,
    onCheckedChange: (checked) => {
      changes.push(checked)
    },
  })

  await act(async () => {
    await userEvent.click(
      page.getByRole('checkbox', { name: 'Example option' }).element(),
    )
  })

  expect(getCheckboxState(mountNode, changes)).toEqual({
    checked: 'true',
    disabled: false,
    ariaDisabled: null,
    indeterminate: false,
    changes: [true],
  })
})

it('exposes the indeterminate state accessibly', () => {
  const mountNode = renderCheckbox({ indeterminate: true })

  expect(getCheckboxState(mountNode, [])).toEqual({
    checked: 'mixed',
    disabled: false,
    ariaDisabled: null,
    indeterminate: true,
    changes: [],
  })
})

it('does not toggle when disabled', () => {
  const changes: boolean[] = []
  const mountNode = renderCheckbox({
    disabled: true,
    onCheckedChange: (checked) => {
      changes.push(checked)
    },
  })

  act(() => {
    mountNode.querySelector<HTMLElement>('[role="checkbox"]')?.click()
  })

  expect(getCheckboxState(mountNode, changes)).toEqual({
    checked: 'false',
    disabled: true,
    ariaDisabled: 'true',
    indeterminate: false,
    changes: [],
  })
})
