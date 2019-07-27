import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
  MutableRefObject
} from "react"

import {
  WorkPanelTextArea,
  WorkPanelTextInput,
  StealthButton
} from "../WorkPanel/styles"
export type MagicTextProps = {
  content: string
  updateContent: (content: string) => void
  useInput?: boolean
}

// The enter key
const ENTER = "Enter"

// TODO: Let caller pass in the target input themselves; could
// be a nice component to open source with that sort of flexibility.
export default function MagicText(props: MagicTextProps) {
  const { content, updateContent, useInput = false } = props
  const [isEditable, setIsEditable] = useState(false)
  const toggleIsEditable = useCallback(
    () => setIsEditable(isEditable => !isEditable),
    []
  )
  const textArea = useRef<HTMLTextAreaElement>(null)
  const textInput = useRef<HTMLInputElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  const makeEditable = useCallback(() => {
    setIsEditable(isEditable => !isEditable)
    focusElement(useInput ? textInput : textArea)
  }, [useInput])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      updateContent(e.target.value),
    [updateContent]
  )

  const blurOnShiftEnter = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.key === ENTER && e.shiftKey) {
        e.preventDefault()
        e.currentTarget.blur()
        focusElement(button)
      }
    },
    []
  )

  const textEditProps = {
    onBlur: toggleIsEditable,
    onKeyPress: blurOnShiftEnter,
    value: content,
    onChange: handleChange
  }

  return isEditable ? (
    useInput ? (
      <WorkPanelTextInput ref={textInput} {...textEditProps} />
    ) : (
      <WorkPanelTextArea ref={textArea} {...textEditProps} />
    )
  ) : (
    <StealthButton onClick={makeEditable} ref={button}>
      {content.trim() ? content : "Click to edit"}
    </StealthButton>
  )
}

function focusElement(ref: MutableRefObject<HTMLElement | undefined | null>) {
  setTimeout(() => {
    if (ref.current) ((ref.current as unknown) as HTMLElement).focus()
  }, 10)
}
