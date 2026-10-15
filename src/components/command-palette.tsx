'use client'

import { Loader2, X } from 'lucide-react'
import {
  type CSSProperties,
  Fragment,
  type KeyboardEvent,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { Button } from '#components/button'
import {
  type CommandPaletteSelection,
  handleCommandPaletteKeyDown,
} from '#components/command-palette-keyboard'
import { Input } from '#components/input'
import { List } from '#components/list'
import { useVisualViewportInsets } from '#hooks/use-visual-viewport-insets'
import { cn } from '#utils'

export interface CommandPaletteItemRenderProps {
  isSelected: boolean
  onMouseMove: MouseEventHandler<HTMLElement>
}

export interface CommandPaletteItem extends CommandPaletteSelection {
  key: string
  render: (props: CommandPaletteItemRenderProps) => ReactNode
}

export interface CommandPaletteSection {
  id: string
  title: ReactNode
  items: CommandPaletteItem[]
}

export type CommandPaletteGroup = {
  id: string
  title: ReactNode
} & (
  | { items: CommandPaletteItem[]; sections?: never }
  | { items?: never; sections: CommandPaletteSection[] }
)

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
  groups: CommandPaletteGroup[]
  loading?: boolean
  emptyMessage?: ReactNode
  initialMessage?: ReactNode
  inputLabel?: string
  dialogLabel?: string
  placeholder?: string
  prefix?: ReactNode
  inputAdornment?: ReactNode
  mobileToolbar?: ReactNode
  footer?: ReactNode
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
  inputRef?: Ref<HTMLInputElement>
  defaultSelectedIndex?: number
}

export function CommandPalette({
  open,
  onOpenChange,
  value,
  onValueChange,
  groups,
  loading = false,
  emptyMessage,
  initialMessage,
  inputLabel = 'Search',
  dialogLabel = 'Command palette',
  placeholder = 'Search...',
  prefix = '›',
  inputAdornment,
  mobileToolbar,
  footer,
  onKeyDown,
  inputRef,
  defaultSelectedIndex = 0,
}: CommandPaletteProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex)
  const listRef = useRef<HTMLDivElement>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const insets = useVisualViewportInsets()

  const items = useMemo(
    () =>
      groups.flatMap((group) =>
        group.sections == null
          ? group.items
          : group.sections.flatMap((section) => section.items),
      ),
    [groups],
  )
  const itemIndexes = useMemo(
    () => new Map(items.map((item, index) => [item, index] as const)),
    [items],
  )
  const itemKeys = JSON.stringify(items.map((item) => item.key))

  useEffect(() => {
    if (open) setSelectedIndex(defaultSelectedIndex)
  }, [defaultSelectedIndex, itemKeys, open])

  useEffect(() => {
    const selected = listRef.current?.querySelector('[data-highlighted]')
    if (typeof selected?.scrollIntoView === 'function') {
      selected.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (!open || typeof document === 'undefined') return null

  const renderItem = (item: CommandPaletteItem, globalIndex: number) =>
    item.render({
      isSelected: selectedIndex === globalIndex,
      onMouseMove: (event: MouseEvent<HTMLElement>) => {
        if (
          event.clientX !== lastMousePos.current.x ||
          event.clientY !== lastMousePos.current.y
        ) {
          lastMousePos.current = {
            x: event.clientX,
            y: event.clientY,
          }
          setSelectedIndex(globalIndex)
        }
      },
    })

  const renderItems = (groupItems: CommandPaletteItem[]) =>
    groupItems.map((item) => (
      <Fragment key={item.key}>
        {renderItem(item, itemIndexes.get(item) ?? 0)}
      </Fragment>
    ))

  const palette = (
    <div
      data-slot="command-palette-backdrop"
      className={cn(
        'fixed inset-x-0 z-50 flex items-start justify-center bg-black/50 md:inset-0 md:pt-[15vh] md:h-auto',
        insets === null
          ? 'inset-y-0'
          : 'top-(--visual-viewport-top) h-(--visual-viewport-height)',
      )}
      style={
        insets === null
          ? undefined
          : ({
              '--visual-viewport-top': `${String(insets.top)}px`,
              '--visual-viewport-height': `${String(insets.height)}px`,
            } as CSSProperties & {
              '--visual-viewport-top': string
              '--visual-viewport-height': string
            })
      }
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
          event.preventDefault()
          onOpenChange(false)
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false)
      }}
    >
      <div
        className="flex h-full max-h-full w-full max-w-none flex-col overflow-hidden border-0 bg-popover text-popover-foreground md:h-auto md:max-h-120 md:max-w-160 md:border"
        role="dialog"
        aria-modal="true"
        aria-label={dialogLabel}
      >
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3 md:gap-3 md:px-4">
          {prefix != null && (
            <span
              className="shrink-0 font-mono text-sm font-bold text-primary"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          {inputAdornment}
          <Input
            ref={inputRef}
            type="text"
            variant="ghost"
            value={value}
            onChange={(event) => {
              onValueChange(event.target.value)
            }}
            placeholder={placeholder}
            autoFocus
            className="w-auto min-w-0 flex-1"
            aria-label={inputLabel}
            onKeyDown={(event) => {
              handleCommandPaletteKeyDown(event, {
                items,
                selectedIndex,
                onSelectedIndexChange: setSelectedIndex,
                onOpenChange,
                ...(onKeyDown === undefined ? {} : { onKeyDown }),
              })
              if (event.key === 'Escape') event.stopPropagation()
            }}
          />
          {loading && (
            <Loader2
              className="h-4 w-4 shrink-0 animate-spin text-muted-foreground"
              aria-label="Loading"
            />
          )}
          <span className="hidden min-w-11 items-center justify-center rounded-(--keycap-radius) border border-border bg-secondary px-1.5 py-0.5 text-center font-mono text-2xs text-foreground md:inline-flex">
            Esc
          </span>
          <Button
            type="button"
            variant="ghost"
            aria-label="Close search"
            className="size-9 shrink-0 rounded-none p-0 md:hidden"
            onClick={() => {
              onOpenChange(false)
            }}
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {mobileToolbar != null && (
          <div className="flex shrink-0 gap-0.5 overflow-x-auto border-b border-border px-3 py-1.5 md:hidden">
            {mobileToolbar}
          </div>
        )}

        <div ref={listRef} className="flex-1 overflow-y-auto py-2">
          <List role="listbox" aria-label="Search results">
            {emptyMessage != null && (
              <div className="px-4 py-8 text-center font-mono text-xs text-muted-foreground-faint">
                {emptyMessage}
              </div>
            )}

            {groups.map((group, groupIndex) => (
              <Fragment key={group.id}>
                {groupIndex > 0 && <div className="mx-4 my-1 h-px bg-border" />}
                <div className="px-4 py-1 font-mono text-2xs tracking-widest text-muted-foreground-faint">
                  {group.title}
                </div>
                {group.sections == null
                  ? renderItems(group.items)
                  : group.sections.map((section) => (
                      <Fragment key={section.id}>
                        {section.items.length > 0 && (
                          <>
                            <div className="px-4 pt-2 pb-1 font-mono text-2xs text-muted-foreground-faint">
                              {section.title}
                            </div>
                            {renderItems(section.items)}
                          </>
                        )}
                      </Fragment>
                    ))}
              </Fragment>
            ))}

            {initialMessage != null && (
              <div className="px-4 py-8 text-center font-mono text-xs text-muted-foreground-faint">
                {initialMessage}
              </div>
            )}
          </List>
        </div>

        {footer === undefined ? (
          <div className="hidden min-h-9 flex-wrap items-center gap-1.5 border-t border-border px-4 py-2 font-mono text-2xs text-muted-foreground-ghost md:flex">
            <KeyHint>↑↓</KeyHint>
            <span>navigate</span>
            {items[selectedIndex]?.selectOnTab != null && (
              <>
                <KeyHint>Tab</KeyHint>
                <span>filter / autocomplete</span>
              </>
            )}
            <KeyHint>Enter</KeyHint>
            <span>open</span>
            <KeyHint>Esc</KeyHint>
            <span>close</span>
          </div>
        ) : (
          <div className="hidden md:block">{footer}</div>
        )}
      </div>
    </div>
  )

  return createPortal(palette, document.body)
}

function KeyHint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-w-11 items-center justify-center rounded-(--keycap-radius) border border-border bg-secondary px-1.5 py-0.5 text-center text-foreground">
      {children}
    </span>
  )
}
