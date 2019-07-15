const storageKey = "decisionTimeStorage"
const emptyDB = "{}"

export type Decision = { [key: string]: any }
type DecisionDB = { [key: number]: Decision }

export function saveDecision(id: number, document: object) {
  const currentDB = _getCurrentDB()
  const updatedDocument = { ...currentDB, [id]: document }
  localStorage.setItem(storageKey, JSON.stringify(updatedDocument))
}

export function loadDecision(id: number): Decision {
  const currentDB = _getCurrentDB()
  if (!(id in currentDB)) {
    return newDecision
  }
  return currentDB[id] as Decision
}

export function newDecision() {
  return _newDecision(getHighestId() + 1)
}

export function getHighestId(): number {
  const currentDB = _getCurrentDB()
  const ids = Object.keys(currentDB).map(k => +k)
  return ids.length ? Math.max(...ids) : -1
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
  return { id, title: `Decision ${id}` }
}
