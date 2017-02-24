import {
  call,
  put,
  take
} from 'redux-saga/effects'
import R from 'ramda'
// import { Either } from 'ramda-fantasy'

import {
  netlistUpload,
  notifyRequest
} from '../actions'
import { Netlists } from '../constants/ActionTypes'
import { api } from '../services'

export function * netlists () {
  while (true) {
    const { payload: { filename, file } } = yield take(Netlists.uploadRequest)
    const enid = yield call(api.netlistUpload, file)
    yield put(netlistUpload(
      enid.map(R.assoc('filename', filename))
    ))
    if (enid.isLeft) {
      yield put(notifyRequest('Failed to upload selected netlist'))
    }
  }
}
