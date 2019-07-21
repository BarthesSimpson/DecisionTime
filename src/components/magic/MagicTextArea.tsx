import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  MutableRefObject
} from "react"

import { WorkPanelTextArea, StealthButton } from "../WorkPanel/styles" //TODO: move these

export type MagicTextAreaProps = {
  content: string
  updateContent: (content: string) => void
}

// TODO: Rename this to MagicText and allow specifying whether the editable entity
// should be a textarea or an input (and allow other props to be passed in for the ref)
// Could be a good component to open source separately
export default function MagicTextArea(props: MagicTextAreaProps) {
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
