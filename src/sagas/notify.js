import { delay } from 'redux-saga'
import {
  actionChannel,
  call,
  put,
  take
} from 'redux-saga/effects'
import {
  notify,
  notifyClose
} from '../actions'
import { Notification } from '../constants/ActionTypes'

export function * showNotification (message) {
  yield put(notify(message))
  yield call(delay, 4000)
  yield put(notifyClose())
}

export function * notificationSaga () {
  const requestChan = yield actionChannel(Notification.request)
  while (true) {
    const { payload } = yield take(requestChan)
    yield call(showNotification, payload)
  }
}
