import { CheckIcon } from 'lucide-react'
import { createContext, type ReactNode, useContext } from 'react'

import { cn } from '#utils'

type ListRole = 'list' | 'listbox'

const ListRoleContext = createContext<ListRole | null>(null)

type ListProps = {
  children?: ReactNode
  id?: string
  role?: ListRole
  'aria-label'?: string
  'aria-labelledby'?: string
}

function List({
  children,
  id,
  role = 'list',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ListProps) {
  return (
    <ListRoleContext.Provider value={role}>
      <div
        id={id}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-slot="list"
        className="flex flex-col"
      >
        {children}
      </div>
    </ListRoleContext.Provider>
  )
}

type ListItemProps = {
  children?: ReactNode
  id?: string
  highlighted?: boolean
  selected?: boolean
  indent?: number
  onSelect?: () => void
  'aria-label'?: string
  'aria-labelledby'?: string
}

function ListItem({
  children,
  id,
  highlighted = false,
  selected = false,
  indent = 0,
  onSelect,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ListItemProps) {
  const role = useContext(ListRoleContext)
  const className = cn(
    'flex min-h-9 w-full items-center gap-2 px-3 text-left text-sm hover:bg-accent/50 pointer-coarse:min-h-11 focus-visible:outline-2 focus-visible:outline-ring',
    highlighted && 'bg-accent text-accent-foreground hover:bg-accent',
  )
  const style =
    indent === 0
      ? undefined
      : { paddingInlineStart: `calc(0.75rem + ${String(indent)}rem)` }
  const content = (
    <>
      {children}
      {selected && (
        <CheckIcon aria-hidden="true" className="ms-auto size-4 shrink-0" />
      )}
    </>
  )

  if (role === 'listbox') {
    return (
      <div
        id={id}
        role="option"
        aria-selected={selected}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-slot="list-item"
        data-highlighted={highlighted ? '' : undefined}
        data-selected={selected ? '' : undefined}
        className={className}
        style={style}
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        onClick={onSelect}
      >
        {content}
      </div>
    )
  }

  const button = (
    <button
      id={id}
      type="button"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-slot="list-item"
      data-highlighted={highlighted ? '' : undefined}
      data-selected={selected ? '' : undefined}
      className={className}
      style={style}
      onClick={onSelect}
    >
      {content}
    </button>
  )

  if (role === 'list') {
    return (
      <div role="listitem" data-slot="list-item-container">
        {button}
      </div>
    )
  }

  return button
}

export { List, ListItem }
