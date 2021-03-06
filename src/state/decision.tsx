import moment from "moment"
import debounce from "debounce"
const storageKey = "decisionTimeStorage"
const emptyDB = "{}"

export type Decision = { [key: string]: any }
export type DecisionDB = { [key: number]: Decision }

export function saveDecision(id: number, document: object) {
  const currentDB = getCurrentDB()
  const updatedDocument = { ...currentDB, [id]: document }
  localStorage.setItem(storageKey, JSON.stringify(updatedDocument))
}

export function loadDecision(id: number): Decision {
  const currentDB = getCurrentDB()
  if (!(id in currentDB)) {
    return newDecision
  }
  return currentDB[id] as Decision
}

export function newDecision() {
  return _newDecision(getHighestId() + 1)
}

export function getHighestId(): number {
  const currentDB = getCurrentDB()
  const ids = Object.keys(currentDB).map(k => +k)
  return ids.length ? Math.max(...ids) : 0
}

export function previewAllDecisions(): Decision[] {
  const currentDB = getCurrentDB()
  return Object.keys(currentDB).map(k => {
    const { title } = currentDB[+k]
    return { id: k, title }
  })
}

export function getCurrentDB(): DecisionDB {
  const dbString = localStorage.getItem(storageKey) || emptyDB
  return JSON.parse(dbString)
}

export function setCurrentDB(db: DecisionDB) {
  console.log("saving...")
  console.log({ db })
  localStorage.setItem(storageKey, JSON.stringify(db))
}

export const setCurrentDBDebounced = (delay: number) =>
  debounce(setCurrentDB, delay)

function _newDecision(id: number): Decision {
  return {
    id,
    title: `Decision ${id}`,
    date: moment(),
    context: "",
    problemStatement: "",
    factors: [],
    alternatives: [],
    rangeOfOutcomes: "",
    expectedOutcomes: [],
    reviewDate: moment().add(60, "days"),
    reviewContent: ""
  }
}
