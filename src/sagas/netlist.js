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
    const { payload: { file } } = yield take(Netlist.uploadRequest)
    const enid = yield call(api.netlistUpload, file)
    yield put(netlistUpload(enid))
    if (enid.isLeft) {
      yield put(notifyRequest('Failed to upload selected netlist'))
    }
  }
}
