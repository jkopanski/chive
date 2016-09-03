import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects'
import {
  simulationStart,
  simulationStatus,
  simulationStop
} from '../actions'
import { Simulation } from '../constants/ActionTypes'
import { api } from '../services'

export function * updateStatus () {
  while (true) {
    const simId = yield take(Simulation.status)
    const statusEither = yield call(api.simulationStatus, simId)
    yield put(simulationStatus(statusEither))
  }
}

export function * startSimulation () {
  while (true) {
    const analyses = yield take(Simulation.start)
    const simEither = yield call(api.simulationStart, analyses)
    yield put(simulationStart(simEither))
  }
}

export function * stopSimulation () {
  while (true) {
    const simId = yield take(Simulation.stop)
    const stopEither = yield call(api.simulationStop, simId)
    yield put(simulationStop(stopEither))
  }
}

export function * simulationSaga () {
  yield [
    fork(updateStatus),
    fork(startSimulation),
    fork(stopSimulation)
  ]
}
