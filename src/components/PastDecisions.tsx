import React, { useContext } from "react"
import state from "../state"

export default function PastDecisions() {
  const {
    state: { allDecisions }
  } = useContext(state.AppContext)

  return (
    <>
      <h2>Decisions</h2>
      {Object.values(allDecisions)
        .sort(({ id }) => id)
        .map(({ id, title }) => (
          <PastDecision key={id} title={title} />
        ))}
    </>
  )
}

type PastDecisionProps = { title: string }
function PastDecision(props: PastDecisionProps) {
  return <div>{props.title}</div>
}
