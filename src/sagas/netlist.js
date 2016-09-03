import {
  call,
  put,
  take
} from 'redux-saga/effects'
// import R from 'ramda'
// import { Either } from 'ramda-fantasy'

import {
  netlistUpload,
  notifyRequest
} from '../actions'
import { Netlist } from '../constants/ActionTypes'
import { api } from '../services'

export function * netlist () {
  while (true) {
    const { file } = yield take(Netlist.uploadRequest)
    const resEither = yield call(api.netlist, file)
    yield put(netlistUpload(resEither))
    if (resEither.isLeft) {
      yield put(notifyRequest('Failed to upload selected netlist'))
    }
  }
}
