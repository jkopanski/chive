/**
 * reducers/suimulations.js
 * @flow
 */
import { Simulations } from '../constants/ActionTypes'
import R from 'ramda'

import type { Action } from '../actions'

type Status
  = 'pending'
  | 'running'
  | 'failed'
  | 'finished'
  | 'stopped'

type Simulation = {
  id: string,
  netlist: string,
  status: Status,
  progress: number
}

const simulations = (
  state: Array<Simulation> = [],
  action: Action):
Array<Simulation> => {
  if (action.error) return state

  switch (action.type) {
    case Simulations.start:
      return [
        ...state, {
          id: action.payload.id,
          netlist: action.payload.netlist,
          status: 'pending',
          progress: 0
        }
      ]
    case Simulations.stop:
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
    case Simulations.status:
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
