import React, { useContext } from "react"
import styled from 'styled-components'
import state from "../state/"

const WorkPanelHeader = styled.h2`
  text-align: center;
`
WorkPanelHeader.displayName = "WorkPanelHeader"

export default function WorkPanel() {
  const {
    state: { decision }
  } = useContext(state.AppContext)
  return (
    <>
      <WorkPanelHeader>{decision.title}</WorkPanelHeader>
      <div />
    </>
  )
}
