import React, { useContext } from "react"
import styled from "styled-components"
import state from "../state/"

import { BasicButton } from "./Controls"

const WorkPanelHeader = styled.h2`
  text-align: center;
  padding-right: 20%;
`
WorkPanelHeader.displayName = "WorkPanelHeader"

function NewDecisionButton(props: { createNewDecision: () => void }) {
  return (
    <BasicButton
      style={{ float: "right", margin: "1.5em 0.5em" }}
      onClick={props.createNewDecision}
    >
      + New Decision
    </BasicButton>
  )
}

export default function WorkPanel() {
  const {
    state: { currentDecision },
    actions: { createNewDecision }
  } = useContext(state.AppContext)
  return (
    <>
      <NewDecisionButton createNewDecision={createNewDecision} />
      <WorkPanelHeader>{currentDecision.title}</WorkPanelHeader>
      <div />
    </>
  )
}
