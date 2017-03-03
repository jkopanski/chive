import test from 'tape'
import {
  call,
  put
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import {
  netlistUpload,
  netlistUploadRequest,
  notifyRequest
} from '../../src/actions'
import { netlistUploadSaga } from '../../src/sagas/netlists'
import { api } from '../../src/services'

test('netlist upload flow', assert => {
  const generator = netlistUploadSaga(
    netlistUploadRequest('test.cir', 'content')
  )

  assert.deepEqual(
    generator.next().value,
    call(api.netlistUpload, 'content'),
    'call api'
  )

  let res = Either.Left(new Error('test error'))
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
    generator.next(),
    { done: true, value: undefined },
    'finish generator'
  )

  assert.end()
})
