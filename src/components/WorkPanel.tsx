import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useRef,
  useState,
  MutableRefObject
} from "react"
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
const WorkPanelTextArea = styled.textarea`
  width: 80%;
  background: #eee;
  font-size: 1.1em;
  height: auto;
  font-weight: 400;
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  border-radius: 3px;
  border: none;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  transition: height 150ms ease;
`
WorkPanelTextArea.displayName = "WorkPanelTextArea"

const StealthButton = styled.button`
  display: block;
  border: none;
  box-shadow: none;
  background: #ddd;
  font-size: 1.1em;
  width: 80%;
  text-align: left;
`
StealthButton.displayName = "StealthButton"

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

type WorkPanelContentProps = {
  currentDecision: Decision
  updateDecision: (id: number, field: string, value: any) => void
}
export function WorkPanelContent(props: WorkPanelContentProps) {
  const { currentDecision, updateDecision } = props
  const updateContext = useCallback(
    (content: string) => updateDecision(currentDecision.id, "context", content),
    [currentDecision.id, updateDecision]
  )
  return (
    <>
      <WorkPanelHeader>{currentDecision.title}</WorkPanelHeader>
      <WorkPanelDate>
        {moment(currentDecision.date).format("dddd, MMMM Do YYYY")}
      </WorkPanelDate>
      <MagicTextArea
        updateContent={updateContext}
        content={currentDecision.context}
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
      {content || "Click to edit"}
    </StealthButton>
  )
}

function focusTextArea(textArea: MutableRefObject<HTMLTextAreaElement | null>) {
  setTimeout(() => {
    if (textArea.current)
      ((textArea.current as unknown) as HTMLTextAreaElement).focus()
  }, 10)
}
