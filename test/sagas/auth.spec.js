import '../setup'
import test from 'tape'
import {
  call,
  // cancel,
  put,
  race,
  take
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import { login } from '../../src/actions'
import { Auth } from '../../src/constants/ActionTypes'
import { authClientSaga, authenticate } from '../../src/sagas/auth'
import { api } from '../../src/services'

const setup = (assert, generator) => {
  assert.deepEqual(
    generator.next().value,
    take(Auth.request),
    'take auth request from UI'
  )

  assert.deepEqual(
    generator.next({ payload: { username: 'admin', password: 'admin' } }).value,
    race({
      session: call(authenticate, 'admin', 'admin'),
      cancel: take(Auth.logout)
    }),
    'authenticate or take concurrent and subsequent logout'
  )
}

test('authClientSaga flow', assert => {
  const generator = authClientSaga()

  setup(assert, generator)

  assert.deepEqual(
    generator.next().value,
    take(Auth.request),
    'wait for another request'
  )

  assert.end()
})

test('authenticate generator function', assert => {
  const generator = authenticate('admin', 'admin')

  assert.deepEqual(
    generator.next().value,
    call(api.authenticate, 'admin', 'admin'),
    'call api endpoint'
  )

  assert.deepEqual(
    generator.next(Either.Right('token')).value,
    put(login(Either.Right('token'))),
    'successful auth'
  )

  assert.deepEqual(
    generator.next().value,
    take(Auth.logout),
    'wait forever'
  )

  assert.end()
})

test('authenticate generator function', assert => {
  const generator = authenticate('admin', 'admin')

  assert.deepEqual(
    generator.next().value,
    call(api.authenticate, 'admin', 'admin'),
    'call api endpoint'
  )

  assert.deepEqual(
    generator.next(Either.Left('problem')).value,
    put(login(Either.Left('problem'))),
    'authentication failure'
  )

  assert.deepEqual(
    generator.next().value,
    undefined,
    'generator finished'
  )

  assert.end()
})

// test('authSaga login error', assert => {
//   const generator = authClientSaga()

//   setup(assert, generator)

//   assert.deepEqual(
//     generator.next(login(Either.Left('problem'))).value,
//     take(Auth.request),
//     'error while loging in, wait for another request'
//   )

//   assert.end()
// })

// test('authSaga logout while logging in', assert => {
//   const generator = authClientSaga()

//   setup(assert, generator)

//   assert.deepEqual(
//     generator.next(logout()).value,
//     take(Auth.request),
//     'logout while loging in, cancel auth call'
//   )

//   assert.end()
// })
