/* @flow */
import type {
  Dispatch as ReduxDispatch,
  Store as ReduxStore
} from 'redux'

import R from 'ramda'

import type { Action } from '../actions/simulations'
import type { Simulation } from '../types/simulations'

export type State = Array<Simulation>
export type Store = ReduxStore<State, Action>
export type Dispatch = ReduxDispatch<Action>

const simulations = (
  state: State = [],
  action: Action
): State => {
  if (action.error) return state

  switch (action.type) {
    case 'simulationStart':
      return [
        ...state, {
          id: action.payload.id,
          netlist: action.payload.netlist,
          status: 'pending',
          progress: 0
        }
      ]
    case 'simulationStop':
      return R.over(
        // focus on sim with specified id
        R.lensIndex(R.findIndex(
          R.propEq('id', action.payload.id)
        )(state)),
        R.set(
          R.lensProp('status'),
          'cancelled'
        ),
        state
      )
    case 'simulationStatus':
      return R.over(
        // focus on sim with specified id
        R.lensIndex(R.findIndex(
          R.propEq('id', action.payload.id)
        )(state)),
        R.set(
          R.lensProp('progress'),
          action.payload.progress
        ),
        state
      )
    default:
      return state
  }
}

export default simulations
