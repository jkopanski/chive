/**
 * reducers/suimulations.js
 * @flow
 */
import { Simulations as Actions } from '../constants/ActionTypes'
import R from 'ramda'

import type { Action } from '../types/actions'
import type { Simulations } from '../types/simulations'

const simulations = (
  state: Simulations = [],
  action: Action
): Simulations => {
  if (action.error) return state

  switch (action.type) {
    case Actions.start:
      return [
        ...state, {
          id: action.payload.id,
          netlist: action.payload.netlist,
          status: 'pending',
          progress: 0
        }
      ]
    case Actions.stop:
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
    case Actions.status:
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
