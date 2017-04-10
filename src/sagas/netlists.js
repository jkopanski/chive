/* @flow */
import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects'
import {
  isLeft,
  map
} from 'flow-static-land/lib/Either'
import R from 'ramda'

import * as netlist from '../actions/netlists'
import * as notify from '../actions/notifications'
import { api } from '../services'

import type {
  NetlistUploadRequest
} from '../types/netlists.js'

export function * netlistUploadSaga (
  action: NetlistUploadRequest
): Generator<*, *, void> {
  const { filename, file } = action.payload
  const feNid = yield call(api.netlistUpload, file)
  feNid.value(function * (enid) {
    yield put(netlist.upload(
      map(R.assoc('filename', filename), enid)
    ))
    if (isLeft(enid)) {
      yield put(notify.request('Failed to upload selected netlist'))
    }
  })
}

export function * netlists (): Generator<*, *, void> {
  yield takeEvery('netlistUploadRequest', netlistUploadSaga)
}
