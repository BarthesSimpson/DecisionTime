import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useRef,
  useState,
  MutableRefObject
} from "react"
import moment from "moment"
import state from "../../state/"
import { Decision } from "../../state/decision"

import { BasicButton } from "../Controls"

import {
  WorkPanelHeader,
  WorkPanelDate,
  WorkPanelTextArea,
  StealthButton,
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

  return (
    <>
      <WorkPanelHeader>{currentDecision.title}</WorkPanelHeader>
      <WorkPanelDate>
        {moment(currentDecision.date).format("dddd, MMMM Do YYYY")}
      </WorkPanelDate>
      <SubHeading>Context</SubHeading>
      <MagicTextArea
        updateContent={updateContext}
        content={currentDecision.context}
      />
      <SubHeading>Problem Statement</SubHeading>
      <MagicTextArea
        updateContent={updateProblemStatement}
        content={currentDecision.problemStatement}
      />
      <SubHeading>Range of Outcomes</SubHeading>
      <MagicTextArea
        updateContent={updateRangeOfOutcomes}
        content={currentDecision.rangeOfOutcomes}
      />
      <SectionBoundary />
      <SectionHeading>Review</SectionHeading>
      <MagicTextArea
        updateContent={updateReviewContent}
        content={currentDecision.reviewContent}
      />
    </>
  )
}

type MagicTextAreaProps = {
  content: string
  updateContent: (content: string) => void
}
function MagicTextArea(props: MagicTextAreaProps) {
  const { content, updateContent } = props
  const [isEditable, setIsEditable] = useState(false)
  const toggleIsEditable = useCallback(
    () => setIsEditable(isEditable => !isEditable),
    []
  )
  const textArea = useRef(null)

  const makeEditable = useCallback(() => {
    setIsEditable(isEditable => !isEditable)
    focusTextArea(textArea)
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => updateContent(e.target.value),
    [updateContent]
  )

  return isEditable ? (
    <WorkPanelTextArea
      onBlur={toggleIsEditable}
      ref={textArea}
      value={content}
      onChange={handleChange}
    />
  ) : (
    <StealthButton onClick={makeEditable}>
      {content.trim() ? content : "Click to edit"}
    </StealthButton>
  )
}

function focusTextArea(textArea: MutableRefObject<HTMLTextAreaElement | null>) {
  setTimeout(() => {
    if (textArea.current)
      ((textArea.current as unknown) as HTMLTextAreaElement).focus()
  }, 10)
}
