import { delay } from 'redux-saga'
import {
  call,
  fork,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import {
  netlistsSelector,
  simulationsSelector
} from '../reducers/selectors'
import {
  notifyRequest,
  simulationStart,
  simulationStatus,
  simulationStatusRequest,
  simulationStop
} from '../actions'
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

export const getFilename = (id, state) =>
  R.prop('filename', R.find(R.propEq('id', id), state))

export function * simulationSaga (action) {
  const { id, nodes } = action.payload
  const esim = yield call(api.netlistSimulate, id, nodes)
  const nets = yield select(netlistsSelector)
  const name = yield call(getFilename, id, nets)

  yield put(simulationStart(
    esim.map(R.assoc('netlist', name))
  ))

  yield Either.either(
    e => put(notifyRequest('Could not start simulation')),
    e => call(monitorSimulation, R.prop('id', e)),
    esim
  )
}

export function * stopSimulation (action) {
  const { id } = action.payload
  const estop = yield call(api.simulationStop, id)
  yield put(simulationStop(estop))

  if (estop.isLeft) {
    yield put(notifyRequest('Failed to stop selected simulation'))
  }
}

export function * simulations () {
  yield [
    takeEvery('netlistSimulateRequest', simulationSaga),
    takeEvery('simulationStatusRequest', updateStatus),
    takeEvery('simulationStopRequest', stopSimulation)
  ]
}
