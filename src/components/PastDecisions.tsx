import React, { useState } from "react"
import styled from "styled-components"
import { previewAllDecisions } from "../state/decision"

const Container = styled.div`
  flex: 1;
`

function PastDecisions() {
  const [decisions] = useState(previewAllDecisions)
  return (
    <>
      <h2>Decisions</h2>,
      {decisions.map(({ id, title }) => (
        <PastDecision key={id} title={title} />
      ))}
    </>
  )
}

type PastDecisionProps = { title: string }
function PastDecision(props: PastDecisionProps) {
  return <div>{props.title}</div>
}

export default () => (
  <Container>
    <PastDecisions />
  </Container>
)
