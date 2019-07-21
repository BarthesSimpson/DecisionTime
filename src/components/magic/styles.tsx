import styled from "styled-components"

export const FullWidthListItem = styled.li`
  display: block;
  display: flex;
  margin-bottom: 0.5em;
`
export const ListItemLabel = styled.span`
  flex: 3;
  font-weight: bold;
`
ListItemLabel.displayName = "ListItemLabel"

export const ListItemText = styled.span`
  flex: 8;
`
ListItemText.displayName = "ListItemText"

export const ListItemButtonContainer = styled.span`
  flex: 1;
`
ListItemButtonContainer.displayName = "ListItemButtonContainer"
