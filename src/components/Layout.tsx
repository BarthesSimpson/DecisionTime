import React, { ReactNode, useContext } from "react"
import styled from "styled-components"
import state from "../state"

const DEFAULT_ANIMATION_DURATION = "120ms"

/**
 * Main App Container Div
 */
export const AppContainer = styled.div`
  background: #ddd;
  display: flex;
  min-height: 90vh;
`
AppContainer.displayName = "AppContainer"

/**
 * App Header
 */
export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 10vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

/**
 * Left Rail
 */
export function LeftRail(props: { children: ReactNode }) {
  const {
    state: { leftRailIsOpen },
    actions: { toggleLeftRail }
  } = useContext(state.LayoutContext)
  return (
    <LeftRailContainer>
      <LeftRailContent collapsed={!leftRailIsOpen}>
        {props.children}
      </LeftRailContent>
      <LeftRailToggle onClick={toggleLeftRail}>
        <LeftRailToggleIcon>{leftRailIsOpen ? "<" : ">"}</LeftRailToggleIcon>
      </LeftRailToggle>
    </LeftRailContainer>
  )
}

export const LeftRailContainer = styled.nav`
  flex: 1;
  display: flex;
  min-height: 90vh;
`
LeftRail.displayName = "LeftRail"

type LeftRailContentProps = { collapsed: boolean }
const LeftRailContent = styled.div`
  background: #eee;
  overflow-x: hidden;
  width: ${(props: LeftRailContentProps) =>
    props.collapsed ? "0px" : "calc(100% - 1.5em)"};
  transition: width ${DEFAULT_ANIMATION_DURATION};
`
LeftRailContent.displayName = "LeftRailContent"

const LeftRailToggle = styled.div`
  width: 1em;
  min-width: 1em;
  float: right;
  padding: 0.25em;
  background-color: grey;
  display: flex;
`
LeftRailToggle.displayName = "LeftRailToggle"

const LeftRailToggleIcon = styled.div`
  align-self: center;
`
LeftRailToggleIcon.displayName = "LeftRailToggleIcon"

/**
 * Main Panel
 */
export const MainPanel = styled.article`
  flex: 5;
`
MainPanel.displayName = "MainPanel"
