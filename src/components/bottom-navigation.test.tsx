import '#storybook.css'

import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

import {
  BottomNavigation,
  type BottomNavigationItem,
} from '#components/bottom-navigation'
import { createBottomNavigationLink } from '#components/bottom-navigation.fixtures'

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

function renderBottomNavigation(
  items: ReadonlyArray<BottomNavigationItem>,
  width?: number,
) {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const root = createRoot(mountNode)
  roots.push(root)
  mountNodes.push(mountNode)

  act(() => {
    root.render(
      <BottomNavigation
        aria-label="Primary navigation"
        items={items}
        style={width === undefined ? undefined : { width }}
      />,
    )
  })

  return mountNode
}

function getNavigationOutput() {
  const navigation = document.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation"]',
  )
  const list = navigation?.querySelector('[data-slot="bottom-navigation-list"]')

  return {
    navigation: {
      tagName: navigation?.tagName ?? null,
      label: navigation?.getAttribute('aria-label') ?? null,
    },
    items: Array.from(
      list?.querySelectorAll<HTMLElement>(
        '[data-slot="bottom-navigation-item"]',
      ) ?? [],
    ).map((item) => ({
      tagName: item.tagName,
      label:
        item.querySelector('[data-slot="bottom-navigation-label"]')
          ?.textContent ?? null,
      current: item.getAttribute('aria-current'),
      pressed: item.getAttribute('aria-pressed'),
    })),
  }
}

function getTouchTargetOutput() {
  const navigation = document.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation"]',
  )
  const item = navigation?.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation-item"]',
  )
  const label = item?.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation-label"]',
  )
  const list = navigation?.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation-list"]',
  )
  return {
    overflowX: navigation ? getComputedStyle(navigation).overflowX : null,
    listDisplay: list ? getComputedStyle(list).display : null,
    listWrap: list ? getComputedStyle(list).flexWrap : null,
    itemMinHeight: item ? getComputedStyle(item).minHeight : null,
    itemMinWidth: item ? getComputedStyle(item).minWidth : null,
    labelWhiteSpace: label ? getComputedStyle(label).whiteSpace : null,
  }
}

function getActionOutput(calls: string[]) {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-slot="bottom-navigation-item"]',
  )

  return {
    tagName: button?.tagName ?? null,
    type: button?.type ?? null,
    pressed: button?.getAttribute('aria-pressed') ?? null,
    calls,
  }
}

function getDisabledActionOutput(calls: string[]) {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-slot="bottom-navigation-item"]',
  )
  button?.click()

  return {
    tagName: button?.tagName ?? null,
    disabled: button?.disabled ?? false,
    calls,
  }
}

function getFocusedItemOutput() {
  const navigation = document.querySelector<HTMLElement>(
    '[data-slot="bottom-navigation"]',
  )
  const focusedItem = document.activeElement
  const navigationRect = navigation?.getBoundingClientRect()
  const focusedRect =
    focusedItem instanceof HTMLElement
      ? focusedItem.getBoundingClientRect()
      : null

  return {
    label:
      focusedItem?.querySelector('[data-slot="bottom-navigation-label"]')
        ?.textContent ?? null,
    hasOverflow: navigation
      ? navigation.scrollWidth > navigation.clientWidth
      : false,
    scrollPositionMoved: navigation ? navigation.scrollLeft > 0 : false,
    focusTargetVisible:
      navigationRect !== undefined &&
      focusedRect !== null &&
      focusedRect.left >= navigationRect.left &&
      focusedRect.right <= navigationRect.right,
  }
}

it('renders router links and action buttons with their native selected states', () => {
  renderBottomNavigation([
    createBottomNavigationLink('overview', 'Overview', undefined, true),
    createBottomNavigationLink('library', 'Library'),
    createBottomNavigationLink('calendar', 'Calendar'),
    createBottomNavigationLink('timeline', 'Log'),
    createBottomNavigationLink('options', 'Options'),
    {
      id: 'compose',
      type: 'button',
      label: 'Compose',
      onClick: () => undefined,
    },
  ])

  expect(getNavigationOutput()).toEqual({
    navigation: { tagName: 'NAV', label: 'Primary navigation' },
    items: [
      {
        tagName: 'A',
        label: 'Overview',
        current: 'page',
        pressed: null,
      },
      { tagName: 'A', label: 'Library', current: null, pressed: null },
      { tagName: 'A', label: 'Calendar', current: null, pressed: null },
      { tagName: 'A', label: 'Log', current: null, pressed: null },
      { tagName: 'A', label: 'Options', current: null, pressed: null },
      { tagName: 'BUTTON', label: 'Compose', current: null, pressed: null },
    ],
  })
})

it('activates a selected action as a native toggle button', () => {
  const calls: string[] = []
  renderBottomNavigation([
    {
      id: 'filter',
      type: 'button',
      label: 'Filter',
      selected: true,
      onClick: () => calls.push('filter'),
    },
  ])

  document
    .querySelector<HTMLButtonElement>('[data-slot="bottom-navigation-item"]')
    ?.click()

  expect(getActionOutput(calls)).toEqual({
    tagName: 'BUTTON',
    type: 'button',
    pressed: 'true',
    calls: ['filter'],
  })
})

it('keeps disabled actions inactive', () => {
  const calls: string[] = []
  renderBottomNavigation([
    {
      id: 'compose',
      type: 'button',
      label: 'Compose',
      disabled: true,
      onClick: () => calls.push('compose'),
    },
  ])

  expect(getDisabledActionOutput(calls)).toEqual({
    tagName: 'BUTTON',
    disabled: true,
    calls: [],
  })
})

it('keeps one row, 52 pixel touch targets, and single-line labels', () => {
  renderBottomNavigation([
    createBottomNavigationLink('overview', 'Overview'),
    createBottomNavigationLink('library', 'Library'),
    createBottomNavigationLink('calendar', 'Calendar'),
    createBottomNavigationLink('timeline', 'Log'),
    createBottomNavigationLink('settings', 'Settings'),
  ])

  expect(getTouchTargetOutput()).toEqual({
    overflowX: 'auto',
    listDisplay: 'flex',
    listWrap: 'nowrap',
    itemMinHeight: '52px',
    itemMinWidth: '52px',
    labelWhiteSpace: 'nowrap',
  })
})

it('scrolls the focused item into view during keyboard navigation', async () => {
  renderBottomNavigation(
    [
      createBottomNavigationLink('overview', 'Overview'),
      createBottomNavigationLink('library', 'Library'),
      createBottomNavigationLink('calendar', 'Calendar'),
      createBottomNavigationLink('timeline', 'Log'),
      createBottomNavigationLink('options', 'Options'),
      {
        id: 'compose',
        type: 'button',
        label: 'Compose',
        onClick: () => undefined,
      },
    ],
    180,
  )

  const firstLink = document.querySelector<HTMLAnchorElement>(
    '[data-slot="bottom-navigation-item"]',
  )
  firstLink?.focus()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  await new Promise((resolve) => window.requestAnimationFrame(resolve))

  expect(getFocusedItemOutput()).toEqual({
    label: 'Compose',
    hasOverflow: true,
    scrollPositionMoved: true,
    focusTargetVisible: true,
  })
})
