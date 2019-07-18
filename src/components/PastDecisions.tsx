import React, { useContext } from "react"
import state from "../state"

export default function PastDecisions() {
  const {
    state: { allDecisions },
    actions: { setCurrentDecision }
  } = useContext(state.AppContext)

  return (
    <>
      <h2>Decisions</h2>
      {Object.values(allDecisions)
        .sort(({ id }) => id)
        .map(({ id, title }) => (
          <PastDecision
            key={id}
            title={title}
            onClick={() => setCurrentDecision(id)}
          />
        ))}
    </>
  )
}

type PastDecisionProps = { title: string; onClick: () => void }
function PastDecision(props: PastDecisionProps) {
  return <div onClick={props.onClick}>{props.title}</div>
}
