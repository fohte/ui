import type { ReactNode } from 'react'

import type { BottomNavigationLinkItem } from '#components/bottom-navigation'

function createBottomNavigationLink(
  id: string,
  label: string,
  icon?: ReactNode,
  selected = false,
): BottomNavigationLinkItem {
  return {
    id,
    type: 'link',
    label,
    icon,
    selected,
    renderLink: ({ children, ...props }) => (
      <a href={`/${id}`} {...props}>
        {children}
      </a>
    ),
  }
}

export { createBottomNavigationLink }
