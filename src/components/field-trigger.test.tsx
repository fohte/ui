import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, expect, it } from 'vitest'

import { FieldTrigger } from '#components/field-trigger'

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

function renderFieldTrigger(disabled = false) {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(<FieldTrigger disabled={disabled}>Example value</FieldTrigger>)
  })

  return mountNode.querySelector('button')
}

function getNativeButtonOutput(button: HTMLButtonElement | null) {
  return {
    tagName: button?.tagName ?? null,
    type: button?.type ?? null,
  }
}

function getDisabledButtonOutput(button: HTMLButtonElement | null) {
  return { disabled: button?.disabled ?? null }
}

it('renders as a non-submitting native button', () => {
  const button = renderFieldTrigger()
  const expected = {
    tagName: 'BUTTON',
    type: 'button',
  }

  expect(getNativeButtonOutput(button)).toEqual(expected)
})

it('forwards the disabled state to the native button', () => {
  const button = renderFieldTrigger(true)
  const expected = { disabled: true }

  expect(getDisabledButtonOutput(button)).toEqual(expected)
})
