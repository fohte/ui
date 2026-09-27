import { CheckIcon } from 'lucide-react'
import { createContext, type HTMLAttributes, useContext } from 'react'

import { cn } from '#utils'

type ListRole = 'list' | 'listbox'

const ListRoleContext = createContext<ListRole | null>(null)

type ListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'role' | 'style'
> & { role?: ListRole }

function List({ children, role = 'list', ...props }: ListProps) {
  return (
    <ListRoleContext.Provider value={role}>
      <div {...props} role={role} data-slot="list" className="flex flex-col">
        {children}
      </div>
    </ListRoleContext.Provider>
  )
}

type ListItemProps = Omit<
  HTMLAttributes<HTMLElement>,
  | 'aria-pressed'
  | 'aria-selected'
  | 'className'
  | 'onClick'
  | 'onMouseDown'
  | 'role'
  | 'style'
> & {
  highlighted?: boolean
  selected?: boolean
  indent?: number
  onSelect?: () => void
}

function ListItem({
  children,
  highlighted = false,
  selected = false,
  indent = 0,
  onSelect,
  ...props
}: ListItemProps) {
  const role = useContext(ListRoleContext)
  const className = cn(
    'flex min-h-9 w-full items-center gap-2 px-3 text-left text-sm hover:bg-accent/50 data-[hovered]:bg-accent/50 pointer-coarse:min-h-11 focus-visible:outline-2 focus-visible:outline-ring',
    highlighted && 'bg-accent text-accent-foreground hover:bg-accent',
  )
  const style =
    indent === 0
      ? undefined
      : {
          paddingInlineStart: `calc(var(--spacing) * 3 + ${String(indent)}rem)`,
        }
  const content = (
    <>
      {children}
      {selected && (
        <CheckIcon aria-hidden="true" className="ms-auto size-4 shrink-0" />
      )}
    </>
  )
  const commonProps = {
    ...props,
    'data-slot': 'list-item',
    'data-highlighted': highlighted ? '' : undefined,
    'data-selected': selected ? '' : undefined,
    className,
    style,
  }

  if (role === 'listbox') {
    return (
      <div
        {...commonProps}
        role="option"
        aria-selected={selected}
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
      {...commonProps}
      type="button"
      aria-pressed={selected}
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
