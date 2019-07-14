import { maxHeaderSize } from "http"

const storageKey = "decisionTimeStorage"
const emptyDB = "{}"

type Decision = { [key: string]: any }
type DecisionDB = { [key: number]: Decision }

export function saveDecision(id: number, document: object) {
  const currentDB = _getCurrentDB()
  const updatedDocument = { ...currentDB, [id]: document }
  localStorage.setItem(storageKey, JSON.stringify(updatedDocument))
}

export function loadDecision(id: number) {
  const currentDB = _getCurrentDB()
  if (!(id in currentDB)) {
    throw new Error(`decision ${id} does not exist`)
  }
  return currentDB[id] as object
}

export function newDecision() {
  const currentDB = _getCurrentDB()
  const ids = Object.keys(currentDB).map(parseInt)
  const id = ids.length ? Math.max(...ids) + 1 : 1
  return _newDecision(id)
}

function _getCurrentDB(): DecisionDB {
  const dbString = localStorage.getItem(storageKey) || emptyDB
  return JSON.parse(dbString)
}

function _newDecision(id: number): Decision {
  return { id }
}
