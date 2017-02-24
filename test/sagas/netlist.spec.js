import test from 'tape'
import {
  call,
  put,
  take
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import {
  netlistUpload,
  notifyRequest
} from '../../src/actions'
import { Netlists } from '../../src/constants/ActionTypes'
import { netlists } from '../../src/sagas/netlists'
import { api } from '../../src/services'

test('netlist upload flow', assert => {
  const generator = netlists()

  assert.deepEqual(
    generator.next().value,
    take(Netlist.uploadRequest),
    'create upload request'
  )

  assert.deepEqual(
    generator.next({ payload: { file: 'sample' }}).value,
    call(api.netlistUpload, 'sample'),
    'call api'
  )

  let res = Either.Left('error')
  assert.deepEqual(
    generator.next(res).value,
    put(netlistUpload(res)),
    'dispatch netlistUpload action'
  )

  assert.deepEqual(
    generator.next().value,
    put(notifyRequest('Failed to upload selected netlist')),
    'display error message to the user'
  )

  assert.deepEqual(
    generator.next().value,
    take(Netlist.uploadRequest),
    'take another upload request'
  )

  assert.end()
})
