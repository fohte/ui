import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

import { cn } from '#utils'

type BottomNavigationLinkRenderProps = {
  children: ReactNode
  className: string
  'aria-current': 'page' | undefined
  'data-slot': 'bottom-navigation-item'
}

type BottomNavigationItemBase = {
  id: string
  label: string
  icon?: ReactNode
  selected?: boolean
  className?: string
}

type BottomNavigationLinkItem = BottomNavigationItemBase & {
  type: 'link'
  renderLink: (props: BottomNavigationLinkRenderProps) => ReactNode
}

type BottomNavigationActionItem = BottomNavigationItemBase & {
  type: 'button'
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

type BottomNavigationAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string }

type BottomNavigationProps = Omit<
  ComponentProps<'nav'>,
  'aria-label' | 'aria-labelledby' | 'children' | 'role'
> &
  BottomNavigationAccessibleName & {
    items: ReadonlyArray<BottomNavigationItem>
  }

type BottomNavigationItem =
  BottomNavigationLinkItem | BottomNavigationActionItem

function getItemContent(item: BottomNavigationItem) {
  return (
    <>
      {item.icon === undefined ? null : (
        <span
          aria-hidden="true"
          data-slot="bottom-navigation-icon"
          className="flex size-4 items-center justify-center"
        >
          {item.icon}
        </span>
      )}
      <span data-slot="bottom-navigation-label">{item.label}</span>
    </>
  )
}

function getItemClassName(item: BottomNavigationItem) {
  return cn(
    'relative box-border flex min-h-[52px] min-w-[52px] flex-col items-center justify-center gap-1 whitespace-nowrap px-2 text-[11px] leading-none no-underline outline-none transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
    item.selected === true
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:text-foreground',
    item.type === 'button' && item.disabled === true
      ? 'cursor-not-allowed opacity-50'
      : undefined,
    item.className,
  )
}

function BottomNavigation({
  items,
  className,
  onFocus,
  ...props
}: BottomNavigationProps) {
  return (
    <nav
      {...props}
      data-slot="bottom-navigation"
      onFocus={(event) => {
        onFocus?.(event)

        const navigation = event.currentTarget
        const target = event.target instanceof HTMLElement ? event.target : null

        if (target === null) return

        window.requestAnimationFrame(() => {
          const navigationRect = navigation.getBoundingClientRect()
          const targetRect = target.getBoundingClientRect()

          if (
            targetRect.left < navigationRect.left ||
            targetRect.right > navigationRect.right
          ) {
            target.scrollIntoView({
              block: 'nearest',
              inline: 'center',
            })
          }
        })
      }}
      className={cn(
        'w-full min-w-0 overflow-x-auto overscroll-x-contain',
        className,
      )}
    >
      {/* Trailing space lets keyboard focus scroll the final item into view. */}
      <ul
        data-slot="bottom-navigation-list"
        className="m-0 flex w-max min-w-full list-none items-stretch p-0 pe-1"
      >
        {items.map((item) => {
          const className = getItemClassName(item)
          const children = getItemContent(item)

          return (
            <li
              key={item.id}
              className="flex min-w-[52px] flex-[1_0_max-content]"
            >
              {item.type === 'link' ? (
                item.renderLink({
                  children,
                  className,
                  'aria-current': item.selected === true ? 'page' : undefined,
                  'data-slot': 'bottom-navigation-item',
                })
              ) : (
                <button
                  type="button"
                  data-slot="bottom-navigation-item"
                  aria-pressed={item.selected}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={className}
                >
                  {children}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { BottomNavigation }
export type {
  BottomNavigationActionItem,
  BottomNavigationItem,
  BottomNavigationLinkItem,
  BottomNavigationLinkRenderProps,
  BottomNavigationProps,
}
