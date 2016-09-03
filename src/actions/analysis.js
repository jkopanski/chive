import { Analysis } from '../constants/ActionTypes'

export function addAnalysis (simName, simType, simProps) {
  return {
    type: Analysis.add,
    payload: {
      name: simName,
      type: simType,
      properties: simProps
    }
  }
}

export function removeAnalysis (sim) {
  return {
    type: Analysis.remove,
    sim
  }
}

export function modifyAnalysis (sim) {
  return {
    type: Analysis.modify,
    sim
  }
}

export function toggleAnalysis (sim) {
  return {
    type: Analysis.toggle,
    sim
  }
}
