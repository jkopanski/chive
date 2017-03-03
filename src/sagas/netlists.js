/* @flow */
import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import R from 'ramda'

import {
  netlistUpload,
  notifyRequest
} from '../actions'
import { api } from '../services'

import type {
  NetlistUploadRequest
} from '../types/netlists.js'

export function * netlistUploadSaga (
  action: NetlistUploadRequest
): Generator<*, *, void> {
  const { filename, file } = action.payload
  const enid = yield call(api.netlistUpload, file)
  yield put(netlistUpload(
    enid.map(R.assoc('filename', filename))
  ))
  if (enid.isLeft) {
    yield put(notifyRequest('Failed to upload selected netlist'))
  }
}

export default function * netlists (): Generator<*, *, void> {
  yield takeEvery('netlistUploadRequest', netlistUploadSaga)
}
