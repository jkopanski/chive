import { combineReducers } from 'redux'
import auth from './auth'
import analyses from './analyses'
import netlists from './netlists'
import notify from './notify'
import simulations from './simulations'

const rootReducer = combineReducers({
  auth,
  analyses,
  notify,
  netlists,
  simulations
})

export default rootReducer
