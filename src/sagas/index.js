import { fork } from 'redux-saga/effects'

import { authClientSaga, authServerSaga } from './auth'
import { notificationSaga } from './notify'
import { netlists } from './netlists'
import { simulations } from './simulations'
// import Api from '../services'

export function * rootClientSaga () {
  yield [
    authClientSaga(),
    netlists(),
    notificationSaga(),
    simulations()
  ]
}

export function * rootServerSaga () {
  yield [
    authServerSaga()
  ]
}
