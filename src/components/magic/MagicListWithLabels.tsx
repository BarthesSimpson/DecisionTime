import React from "react"
import { FullWidthListItem, ListItemButtonContainer, ListItemLabel, ListItemText } from "./styles"
import { BasicButton, IconButton } from "../Controls"
import MagicTextArea from "./MagicTextArea"

export type ListItemWithLabel = {
  label: string
  text: string
}
type MagicListWithLabelsProps = {
  content: ListItemWithLabel[]
  addItem: () => void
  deleteItem: (index: number) => void
  updateItem: (index: number, item: ListItemWithLabel) => void
}

export default function MagicListWithLabels(props: MagicListWithLabelsProps) {
  return (
    <>
      {props.content.map((li, idx) => (
        <ListRow
          key={idx}
          updateItem={(item: ListItemWithLabel) => {
            props.updateItem(idx, item)
          }}
          deleteItem={() => props.deleteItem(idx)}
          {...li}
        />
      ))}
      <BasicButton onClick={props.addItem}>+ Add</BasicButton>
    </>
  )
}

export type ListRowProps = {
  label: string
  text: string
  updateItem: (item: ListItemWithLabel) => void
  deleteItem: () => void
}
export function ListRow(props: ListRowProps) {
  const { label, text, updateItem, deleteItem } = props
  return (
    <FullWidthListItem>
      <ListItemLabel>
        <MagicTextArea
          content={label}
          updateContent={(content: string) => {
            updateItem({ label: content, text })
          }}
        />
      </ListItemLabel>
      <ListItemText>
        <MagicTextArea
          content={text}
          updateContent={(content: string) => {
            updateItem({ label, text: content })
          }}
        />
      </ListItemText>
      <ListItemButtonContainer>
      <DeleteButton onConfirm={deleteItem} />
      </ListItemButtonContainer>
    </FullWidthListItem>
  )
}

function DeleteButton(props: { onConfirm: () => void }) {
  return <IconButton>x</IconButton>
}
