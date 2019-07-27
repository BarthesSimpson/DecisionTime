import React, { useCallback, useContext } from "react"
import moment from "moment"
import state from "../../state/"
import { Decision } from "../../state/decision"
import MagicText from "../magic/MagicText"
import MagicListWithLabels, {
  ListItemWithLabel
} from "../magic/MagicListWithLabels"
import { BasicButton } from "../Controls"

import {
  WorkPanelHeader,
  WorkPanelDate,
  SectionBoundary,
  SectionHeading,
  SubHeading
} from "./styles"

/**
 * The main work area, which displays the currently loaded decision
 * and a button for creating a new decision
 */
export default function WorkPanel() {
  const {
    state: { currentDecisionId, allDecisions },
    actions: { createNewDecision, updateDecision }
  } = useContext(state.AppContext)
  const currentDecision = allDecisions[currentDecisionId]
  return (
    <>
      <NewDecisionButton createNewDecision={createNewDecision} />
      {currentDecision && (
        <WorkPanelContent
          currentDecision={currentDecision}
          updateDecision={updateDecision}
        />
      )}
    </>
  )
}

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

type WorkPanelContentProps = {
  currentDecision: Decision
  updateDecision: (id: number, field: string, value: any) => void
}
export function WorkPanelContent(props: WorkPanelContentProps) {
  const { currentDecision, updateDecision } = props
  function useUpdateTextField(field: string) {
    return useCallback(
      (content: string) => updateDecision(currentDecision.id, field, content),
      [field]
    )
  }
  const updateContext = useUpdateTextField("context")
  const updateProblemStatement = useUpdateTextField("problemStatement")
  const updateRangeOfOutcomes = useUpdateTextField("rangeOfOutcomes")
  const updateReviewContent = useUpdateTextField("reviewContent")
  // TODO: improve these
  const addExpectedOutcome = () => {
    updateDecision(currentDecision.id, "expectedOutcomes", [
      ...currentDecision.expectedOutcomes,
      { label: "label", text: "text" }
    ])
  }
  const updateExpectedOutcome = (idx: number, item: ListItemWithLabel) => {
    updateDecision(
      currentDecision.id,
      "expectedOutcomes",
      currentDecision.expectedOutcomes.map(
        (unchanged: ListItemWithLabel, i: number) =>
          i === idx ? item : unchanged
      )
    )
  }
  const deleteExpectedOutcome = (idx: number) => {
    updateDecision(
      currentDecision.id,
      "expectedOutcomes",
      currentDecision.expectedOutcomes.filter(
        (_: ListItemWithLabel, i: number) => i !== idx
      )
    )
  }

  return (
    <>
      <WorkPanelHeader>{currentDecision.title}</WorkPanelHeader>
      <WorkPanelDate>
        {moment(currentDecision.date).format("dddd, MMMM Do YYYY")}
      </WorkPanelDate>
      <SubHeading>Context</SubHeading>
      <MagicText
        
        updateContent={updateContext}
        content={currentDecision.context}
      />
      <SubHeading>Problem Statement</SubHeading>
      <MagicText
        
        updateContent={updateProblemStatement}
        content={currentDecision.problemStatement}
      />
      <SubHeading>Range of Outcomes</SubHeading>
      <MagicText
        
        updateContent={updateRangeOfOutcomes}
        content={currentDecision.rangeOfOutcomes}
      />
      <SubHeading>Expected Outcomes</SubHeading>
      <MagicListWithLabels
        content={currentDecision.expectedOutcomes}
        addItem={addExpectedOutcome}
        deleteItem={deleteExpectedOutcome}
        updateItem={updateExpectedOutcome}
      />
      <SectionBoundary />
      <SectionHeading>Review</SectionHeading>
      <MagicText
        
        updateContent={updateReviewContent}
        content={currentDecision.reviewContent}
      />
    </>
  )
}
