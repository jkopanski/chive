import { Simulation } from '../constants/ActionTypes'
import R from 'ramda'

const simulations = (state = [], action) => {
  switch (action.type) {
    case Simulation.start:
      return [
        ...state, {
          id: (action.error ? undefined : action.payload.id),
          status: 'running',
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
