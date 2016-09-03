import {
  call,
  put,
  race,
  take
} from 'redux-saga/effects'
import { login } from '../actions'
import { Auth } from '../constants/ActionTypes'
import { api } from '../services'

export function * authenticate (username, password) {
  const tokEither = yield call(api.authenticate, username, password)
  yield put(login(tokEither))
  if (tokEither.isRight) {
    // wait forever,that is for logout to cancel this task
    yield take(Auth.logout)
  }
}

export function * authClientSaga () {
  while (true) {
    const {
      payload: {
        username,
        password
      }
    } = yield take(Auth.request)
    yield race({
      session: call(authenticate, username, password),
      cancel: take(Auth.logout)
    })
  }
}

export function * authServerSaga () {
}
