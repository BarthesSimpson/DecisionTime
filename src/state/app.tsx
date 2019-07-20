import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  ReactNode
} from "react"
import {
  getHighestId,
  getCurrentDB,
  setCurrentDBDebounced,
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
  updateDecision: (id: number, key: string, value: any) => void
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
const AUTOSAVE_DEBOUNCE_DELAY = 1000
type AutoSaveProps = { state: AppState }
function AutoSave(props: AutoSaveProps) {
  const { allDecisions } = props.state
  const save = useCallback(setCurrentDBDebounced(AUTOSAVE_DEBOUNCE_DELAY), [])
  useEffect(() => {
    save(allDecisions)
  }, [allDecisions]) //eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function AppProvider(props: { children: ReactNode }) {
  const [appState, updateAppState] = useState(getInitialState())
  function setCurrentDecision(id: number) {
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
  function updateDecision(id: number, key: string, value: any) {
    updateAppState(state => ({
      ...state,
      allDecisions: {
        ...state.allDecisions,
        [id]: { ...state.allDecisions[id], [key]: value }
      }
    }))
  }

  return (
    <AppContext.Provider
      value={{
        state: appState,
        actions: { setCurrentDecision, createNewDecision, updateDecision }
      }}
    >
      <AutoSave state={appState} />
      {props.children}
    </AppContext.Provider>
  )
}
