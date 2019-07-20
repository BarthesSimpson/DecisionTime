import styled from "styled-components"

export const WorkPanelHeader = styled.h2`
  text-align: center;
  padding-right: 20%;
`
WorkPanelHeader.displayName = "WorkPanelHeader"
export const WorkPanelDate = styled.h4`
  text-align: center;
  padding-right: 20%;
`
WorkPanelHeader.displayName = "WorkPanelHeader"
export const WorkPanelTextArea = styled.textarea`
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

export const StealthButton = styled.button`
  display: block;
  border: none;
  box-shadow: none;
  background: #ddd;
  font-size: 1.1em;
  width: 80%;
  text-align: left;
`
StealthButton.displayName = "StealthButton"

export const SectionHeading = styled.h2`
  text-align: center;
  font-weight: strong;
`
SectionHeading.displayName = "SectionHeading"

export const SubHeading = styled.h3`
  font-weight: strong;
`
SubHeading.displayName = "SubHeading"

export const SectionBoundary = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
`
SectionBoundary.displayName = "SectionBoundary"
