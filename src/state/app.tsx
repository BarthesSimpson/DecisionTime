import React, { createContext, useState, ReactNode, useEffect } from "react"
import {
  getHighestId,
  getCurrentDB,
  setCurrentDB,
  newDecision,
  DecisionDB
} from "./decision"

type AppState = {
  currentDecisionId: number
  allDecisions: DecisionDB
}

type AppActions = {
  setCurrentDecision: (id: number) => void
  createNewDecision: () => void
}

type AppContextProps = {
  state: AppState
  actions: AppActions
}

function getInitialState(): AppState {
  const allDecisions = getCurrentDB()
  const currentDecisionId = getHighestId()
  return {
    currentDecisionId,
    allDecisions
  }
}

export const AppContext = createContext({} as AppContextProps)

type AutoSaveProps = { state: AppState }
function AutoSave(props: AutoSaveProps) {
  const { allDecisions } = props.state
  useEffect(() => {
    setCurrentDB(allDecisions)
  }, [allDecisions]) //eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function AppProvider(props: { children: ReactNode }) {
  const [appState, updateAppState] = useState(getInitialState())
  function setCurrentDecision(id: number) {
    // Make sure to save changes to the
    updateAppState(state => ({
      ...state,
      currentDecisionId: id
    }))
  }
  function createNewDecision() {
    const decision = newDecision()
    updateAppState(state => ({
      ...state,
      allDecisions: { ...state.allDecisions, [decision.id]: decision },
      currentDecisionId: decision.id
    }))
  }

  return (
    <AppContext.Provider
      value={{
        state: appState,
        actions: { setCurrentDecision, createNewDecision }
      }}
    >
      <AutoSave state={appState} />
      {props.children}
    </AppContext.Provider>
  )
}
