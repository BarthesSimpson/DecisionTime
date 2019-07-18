import React from "react"
import PastDecisions from "./components/PastDecisions"
import WorkPanel from "./components/WorkPanel"
import { State } from "./state"
import {
  AppContainer,
  AppHeader,
  LeftRail,
  MainPanel
} from "./components/Layout"

function App() {
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
