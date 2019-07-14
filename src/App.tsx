import React, { useEffect } from "react"
import "./App.css"
import PastDecisions from "./components/PastDecisions"
import WorkPanel from "./components/WorkPanel"
import { Decision, newDecision, saveDecision } from "./state/decision"

function App() {
  useEffect(() => {
    const d: Decision = newDecision()
    saveDecision(d.id, d)
  }, [])
  return (
    <div className="App">
      <header className="App-header">Decision Time</header>
      <div style={{ display: "flex" }}>
        <PastDecisions />
        <WorkPanel />
      </div>
    </div>
  )
}

export default App
