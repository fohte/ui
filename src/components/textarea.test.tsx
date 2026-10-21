import { Textarea } from '@fohte/ui/textarea'
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

function renderTextarea(props: ComponentProps<typeof Textarea>) {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(<Textarea {...props} />)
  })

  return mountNode
}

function getTextareaOutput(mountNode: HTMLDivElement) {
  const textarea = mountNode.querySelector('textarea')

  return {
    tagName: textarea?.tagName ?? null,
    value: textarea?.value ?? null,
    disabled: textarea?.disabled ?? null,
    ariaInvalid: textarea?.getAttribute('aria-invalid') ?? null,
    slot: textarea?.getAttribute('data-slot') ?? null,
  }
}

it('accepts multiline text input', async () => {
  const mountNode = renderTextarea({
    'aria-label': 'Notes',
    defaultValue: 'First line',
  })

  await userEvent.type(
    page.getByRole('textbox', { name: 'Notes' }).element(),
    '{End}{Enter}Second line',
  )

  expect(getTextareaOutput(mountNode)).toEqual({
    tagName: 'TEXTAREA',
    value: 'First line\nSecond line',
    disabled: false,
    ariaInvalid: null,
    slot: 'textarea',
  })
})

it('forwards disabled and invalid states to the native textarea', () => {
  const mountNode = renderTextarea({
    disabled: true,
    'aria-invalid': true,
    defaultValue: 'Saved text',
  })

  expect(getTextareaOutput(mountNode)).toEqual({
    tagName: 'TEXTAREA',
    value: 'Saved text',
    disabled: true,
    ariaInvalid: 'true',
    slot: 'textarea',
  })
})
