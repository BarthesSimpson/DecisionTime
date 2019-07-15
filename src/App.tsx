import React, { useEffect } from "react"
import PastDecisions from "./components/PastDecisions"
import WorkPanel from "./components/WorkPanel"
import { Decision, newDecision, saveDecision } from "./state/decision"
import { State } from "./state"
import { AppContainer, AppHeader, LeftRail, MainPanel } from "./components/Layout"

function App() {
  useEffect(() => {
    const d: Decision = newDecision()
    saveDecision(d.id, d)
  }, [])
  return (
    <State>
        <AppHeader>Decidedly</AppHeader>
        <AppContainer>
          <LeftRail>
            <PastDecisions />
          </LeftRail>
          <MainPanel>
            <WorkPanel />
          </MainPanel>
        </AppContainer>
    </State>
  )
}

export default App
