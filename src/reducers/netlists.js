/* @flow */
import { Netlists } from '../constants/ActionTypes'

import type { Action } from '../types/actions'

type Netlist = {
  id: string,
  filename: string
}

const netlists = (
  state: Array<Netlist> = [],
  action: Action):
Array<Netlist> => {
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
