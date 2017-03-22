/* @flow */
import type {
  Dispatch as ReduxDispatch,
  Store as ReduxStore
} from 'redux'

import type { Action } from '../actions/netlists'
import type { Netlist } from '../types/netlists'

export type State = Array<Netlist>
export type Store = ReduxStore<State, Action>
export type Dispatch = ReduxDispatch<Action>

const netlists = (
  state: State = [],
  action: Action
): State => {
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
