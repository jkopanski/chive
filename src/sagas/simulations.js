import { delay } from 'redux-saga'
import {
  call,
  fork,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import {
  notifyRequest,
  simulationStart,
  simulationStatus,
  simulationStatusRequest,
  simulationStop
} from '../actions'
import { Simulations } from '../constants/ActionTypes'
import { api } from '../services'

export function * updateStatus (action) {
  const estatus = yield call(api.simulationStatus, action.payload.id)
  yield put(simulationStatus(estatus))
}

export function * monitorSimulation (sid) {
  let t = 30000
  let status
  const action = simulationStatusRequest(sid)
  yield call(updateStatus, action)
  do {
    yield delay(t)
    status = yield select(state =>
      R.prop('status', R.find(R.propEq('id', sid), state.chive.simulations))
    )
    yield put(action)
    if (t < 600000) t = t * 2
  } while (status === 'running' || status === 'pending')
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
  yield takeEvery(Simulations.startRequest, simulationFlow)
}

export function * stopSimulation () {
  while (true) {
    const simId = yield take(Simulations.stop)
    const stopEither = yield call(api.simulationStop, simId)
    yield put(simulationStop(stopEither))
  }
}

export function * simulations () {
  yield [
    takeEvery(Simulations.startRequest, simulationFlow),
    takeEvery(Simulations.statusRequest, updateStatus),
    fork(stopSimulation)
  ]
}
