import React from "react"
import styled from "styled-components"
import { BasicButton, CancelButton } from "./Controls"

export const TransparentOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
`
TransparentOverlay.displayName = "TransparentOverlay"

export const ModalBox = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  margin: 0;
  padding: 2.5rem;
  background-color: #eee;
  border-radius: 0.3125rem;
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.5);
  z-index: 9999;
`
ModalBox.displayName = "ModalBox"

export const ModalBoxHeader = styled.h4`
  text-align: center;
`
ModalBoxHeader.displayName = "ModalBoxHeader"

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`
ModalButtonGroup.displayName = "ModalButtonGroup"

type ConfirmDialogProps = {
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
}
export function ConfirmDialog(props: ConfirmDialogProps) {
  const { onConfirm, onCancel, confirmText, cancelText } = props
  return (
    <ModalButtonGroup>
      <BasicButton onClick={onConfirm}>{confirmText}</BasicButton>
      <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
    </ModalButtonGroup>
  )
}
