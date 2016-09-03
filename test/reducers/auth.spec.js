import test from 'tape'

import auth from '../../src/reducers/auth'
import { Auth } from '../../src/constants/ActionTypes'

test('auth reducer', assert => {
  assert.deepEqual(auth(undefined, {}), {
    username: undefined,
    isAuthPending: false
  }, 'Correct initial state')

  const initialState = {
    username: 'user',
    isAuthPending: true
  }

  assert.deepEqual(
    auth(initialState, {
      type: Auth.login,
      payload: {
        token: 'test_token'
      }
    }), {
      username: 'user',
      isAuthPending: false,
      token: 'test_token'
    },
    'Should handle correct login'
  )

  assert.deepEqual(
    auth(initialState, {
      type: Auth.login,
      payload: new Error('e msg'),
      error: true
    }), {
      username: undefined,
      isAuthPending: false,
      token: undefined
    },
    'Should handle auth error message'
  )

  assert.deepEqual(
    auth(initialState, {
      type: Auth.logout,
      payload: {}
    }), {
      username: undefined,
      isAuthPending: false,
      token: undefined
    },
    'Should handle logout'
  )

  assert.deepEqual(
    auth(initialState, {
      type: Auth.request,
      payload: {
        username: 'user2',
        password: 'upw',
        redirect: '/link'
      }
    }), {
      username: 'user2',
      isAuthPending: true
    },
    'Should handle auth request'
  )

  assert.end()
})
