import React, { createContext, ReactNode } from "react"
import {
  Decision,
  getHighestId,
  previewAllDecisions,
  loadDecision
} from "./decision"

type AppState = {
  state: {
    currentDecision: number
    decision: Decision
    pastDecisions: Decision[]
  }
}

function getInitialState(): AppState {
  const pastDecisions = previewAllDecisions()
  const currentDecision = getHighestId()
  const decision = loadDecision(currentDecision)
  return {
    state: {
      currentDecision,
      decision,
      pastDecisions
    }
  }
}

export const AppContext = createContext({} as AppState)

export function AppProvider(props: { children: ReactNode }) {
  return (
    <AppContext.Provider value={getInitialState()}>
      {props.children}
    </AppContext.Provider>
  )
}
