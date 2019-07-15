import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react"
import {
  Decision,
  getHighestId,
  getCurrentDB,
  setCurrentDB,
  loadDecision,
  newDecision,
  DecisionDB
} from "./decision"

const DEFAULT_AUTO_SAVE_INTERVAL = 10000

type AppState = {
  currentDecisionId: number
  currentDecision: Decision
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
  const currentDecision = loadDecision(currentDecisionId)
  return {
    currentDecisionId,
    currentDecision,
    allDecisions
  }
}

export const AppContext = createContext({} as AppContextProps)

type AutoSaveProps = { interval?: number }
function AutoSave(props: AutoSaveProps) {
  const {
    state: { currentDecisionId, currentDecision, allDecisions }
  } = useContext(AppContext)
  useEffect(() => {
    setInterval(() => {
      setCurrentDB({ ...allDecisions, [currentDecisionId]: currentDecision })
    }, props.interval || DEFAULT_AUTO_SAVE_INTERVAL)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function AppProvider(props: { children: ReactNode }) {
  const [appState, updateAppState] = useState(getInitialState())
  function setCurrentDecision(id: number) {
    updateAppState(state => ({
      ...state,
      currentDecisionId: id,
      currentDecision: state.allDecisions[id]
    }))
  }
  function createNewDecision() {
    const decision = newDecision()
    updateAppState(state => ({
      ...state,
      allDecisions: { ...state.allDecisions, [decision.id]: decision },
      currentDecisionId: decision.id,
      currentDecision: decision
    }))
  }

  return (
    <AppContext.Provider
      value={{
        state: appState,
        actions: { setCurrentDecision, createNewDecision }
      }}
    >
      <AutoSave />
      {props.children}
    </AppContext.Provider>
  )
}
