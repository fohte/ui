'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

type WithoutClassName<Props> = Omit<Props, 'className'>

function Tabs(props: WithoutClassName<TabsPrimitive.Root.Props>) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />
}

function TabsList(props: WithoutClassName<TabsPrimitive.List.Props>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className="flex items-center gap-1 border-b border-border"
      {...props}
    />
  )
}

function TabsTab(props: WithoutClassName<TabsPrimitive.Tab.Props>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className="border-b-2 border-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-active:border-foreground data-active:text-foreground"
      {...props}
    />
  )
}

function TabsPanel(props: WithoutClassName<TabsPrimitive.Panel.Props>) {
  return <TabsPrimitive.Panel data-slot="tabs-panel" {...props} />
}

export { Tabs, TabsList, TabsPanel, TabsTab }
