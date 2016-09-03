import { fork } from 'redux-saga/effects'

import { authClientSaga, authServerSaga } from './auth'
import { notificationSaga } from './notify'
import { netlist } from './netlist'
// import Api from '../services'

export function * rootClientSaga () {
  yield [
    fork(authClientSaga),
    fork(netlist),
    fork(notificationSaga)
  ]
}

export function * rootServerSaga () {
  yield [
    fork(authServerSaga)
  ]
}
