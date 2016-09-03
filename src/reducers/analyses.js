import { Analysis } from '../constants/ActionTypes'

const analyses = (state = [], action) => {
  switch (action.type) {
    case Analysis.add:
      return [
        ...state,
        {
          id: state.reduce((maxId, sim) => Math.max(sim.id, maxId), -1) + 1,
          name: action.payload.name,
          type: action.payload.type,
          properties: action.payload.properties,
          enable: true
        }
      ]
    default:
      return state
  }
}

export default analyses
