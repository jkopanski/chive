/* @flow */
import type { Netlists, NetlistAction } from '../types/netlists'

const netlists = (
  state: Netlists = [],
  action: NetlistAction
): Netlists => {
  if (action.error) return state

  switch (action.type) {
    case 'netlistUpload':
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
