const storageKey = "decisionTimeStorage"
const emptyDB = "{}"

export type Decision = { [key: string]: any }
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
  const ids = Object.keys(currentDB).map(k => +k)
  const id = ids.length ? Math.max(...ids) + 1 : 0
  return _newDecision(id)
}

export function previewAllDecisions(): Decision[] {
  const currentDB = _getCurrentDB()
  return Object.keys(currentDB).map(k => {
    const { title } = currentDB[+k]
    return { id: k, title }
  })
}

function _getCurrentDB(): DecisionDB {
  const dbString = localStorage.getItem(storageKey) || emptyDB
  return JSON.parse(dbString)
}

function _newDecision(id: number): Decision {
  return { id, title: `Decision: ${id}` }
}
