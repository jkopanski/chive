import { Simulation } from '../constants/ActionTypes'
import R from 'ramda'

const simulations = (state = [], action) => {
  if (action.error) return state

  switch (action.type) {
    case Simulation.start:
      return [
        ...state, {
          id: action.payload.id,
          netlist: action.payload.netlist,
          status: 'pending',
          progress: 0
        }
      ]
    case Simulation.stop:
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
    case Simulation.status:
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
