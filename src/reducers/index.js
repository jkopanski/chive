import { combineReducers } from 'redux'
import auth from './auth'
import analyses from './analyses'
import netlists from './netlists'
import notify from './notify'
import simulations from './simulations'

import type { State as NetlistsState } from './netlists'
import type { State as SimulationsState } from './simulations'

const rootReducer = combineReducers({
  auth,
  analyses,
  notify,
  netlists,
  simulations
})

// fake store type that redux-observable uses
export type Store = {
  getState: () => ({
    chive: {
      netlists: NetlistsState,
      simulations: SimulationsState
    },
  }),
  dispatch: Function
}

export default rootReducer
