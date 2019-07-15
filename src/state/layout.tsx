import React, { createContext, useState, ReactNode } from "react"

type LayoutState = {
  leftRailIsOpen: boolean
}

type LayoutActions = {
  toggleLeftRail: () => void
}

type LayoutContextProps = {
  state: LayoutState
  actions: LayoutActions
}

export const LayoutContext = createContext({} as LayoutContextProps)

export function LayoutProvider(props: { children: ReactNode }) {
  const [layoutState, updateLayoutState] = useState(getInitialState())
  function toggleLeftRail() {
    updateLayoutState(state => ({
      ...state,
      leftRailIsOpen: !state.leftRailIsOpen
    }))
  }
  return (
    <LayoutContext.Provider
      value={{ state: layoutState, actions: { toggleLeftRail } }}
    >
      {props.children}
    </LayoutContext.Provider>
  )
}

function getInitialState(): LayoutState {
  return { leftRailIsOpen: false }
}
