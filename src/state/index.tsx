import React, { ReactNode } from "react"
import { LayoutContext, LayoutProvider } from "./layout"
import { AppContext, AppProvider } from "./app"

export function State(props: { children: ReactNode }) {
  return (
    <AppProvider>
      <LayoutProvider>{props.children}</LayoutProvider>
    </AppProvider>
  )
}

export default { LayoutContext, AppContext, State }
