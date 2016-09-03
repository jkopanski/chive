import { combineReducers } from 'redux'
import auth from './auth'
import analyses from './analyses'
import notify from './notify'
import simulations from './simulations'

const rootReducer = combineReducers({
  auth,
  analyses,
  notify,
  simulations
})

export default rootReducer
