import { fork } from 'redux-saga/effects'

import { authClientSaga, authServerSaga } from './auth'
import { notificationSaga } from './notify'
import { netlists } from './netlists'
import { simulations } from './simulations'
// import Api from '../services'

export function * rootClientSaga () {
  yield [
    fork(authClientSaga),
    fork(netlists),
    fork(notificationSaga),
    fork(simulations)
  ]
}

export function * rootServerSaga () {
  yield [
    fork(authServerSaga)
  ]
}
