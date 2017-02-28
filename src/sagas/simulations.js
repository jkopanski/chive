import {
  call,
  fork,
  put,
  take,
  takeEvery
} from 'redux-saga/effects'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import {
  notifyRequest,
  simulationStart,
  simulationStatus,
  simulationStop
} from '../actions'
import { Simulation } from '../constants/ActionTypes'
import { api } from '../services'

// export function * updateStatus () {
//   while (true) {
//     const simId = yield take(Simulation.status)
//     const statusEither = yield call(api.simulationStatus, simId)
//     yield put(simulationStatus(statusEither))
//   }
// }

export function * monitorSimulation (sid) {
  const estatus = yield call(api.simulationStatus, sid)
  yield put(simulationStatus(estatus))
}

export function * simulationFlow (action) {
  const { netlist, nodes, name } = action.payload
  const esim = yield call(api.netlistSimulate, netlist, nodes)
  yield put(simulationStart(
    esim.map(R.assoc('netlist', name))
  ))

  yield Either.either(
    e => put(notifyRequest('Could not start simulation')),
    e => call(monitorSimulation, R.prop('id', e)),
    esim
  )
}

export function * startSimulation () {
  yield takeEvery(Simulation.startRequest, simulationFlow)
}

export function * stopSimulation () {
  while (true) {
    const simId = yield take(Simulation.stop)
    const stopEither = yield call(api.simulationStop, simId)
    yield put(simulationStop(stopEither))
  }
}

export function * simulations () {
  yield [
    takeEvery(Simulation.startRequest, simulationFlow),
    // fork(updateStatus),
    fork(stopSimulation)
  ]
}