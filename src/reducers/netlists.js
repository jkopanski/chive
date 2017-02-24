import { Netlists } from '../constants/ActionTypes'

const netlists = (state = [], action) => {
  if (action.error) return state

  switch (action.type) {
    case Netlists.upload:
      return [
        ...state, {
          id: action.payload.id,
          filename: action.payload.filename
        }
      ]
    default:
      return state
  }
}

export default netlists
