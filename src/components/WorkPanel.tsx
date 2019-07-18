import React, { useContext } from "react"
import styled from "styled-components"
import moment from "moment"
import state from "../state/"
import { Decision } from "../state/decision"

import { BasicButton } from "./Controls"

const WorkPanelHeader = styled.h2`
  text-align: center;
  padding-right: 20%;
`
WorkPanelHeader.displayName = "WorkPanelHeader"
const WorkPanelDate = styled.h4`
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
    state: { currentDecisionId, allDecisions },
    actions: { createNewDecision }
  } = useContext(state.AppContext)
  const currentDecision = allDecisions[currentDecisionId]
  return (
    <>
      <NewDecisionButton createNewDecision={createNewDecision} />
      {currentDecision && (
        <WorkPanelContent currentDecision={currentDecision} />
      )}
    </>
  )
}

type WorkPanelContentProps = { currentDecision: Decision }
export function WorkPanelContent(props: WorkPanelContentProps) {
  const { currentDecision } = props
  return (
    <>
      <WorkPanelHeader>{currentDecision.title}</WorkPanelHeader>
      <WorkPanelDate>
        {moment(currentDecision.date).format("dddd, MMMM Do YYYY")}
      </WorkPanelDate>
    </>
  )
}
