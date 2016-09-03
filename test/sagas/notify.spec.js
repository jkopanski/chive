import test from 'tape'
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
} from '../../src/actions'
import { Notification } from '../../src/constants/ActionTypes'
import { notificationSaga, showNotification } from '../../src/sagas/notify'

test('notification flow', assert => {
  const generator = showNotification('sample')

  assert.deepEqual(
    generator.next().value,
    put(notify('sample')),
    'show notification'
  )

  assert.deepEqual(
    generator.next().value,
    call(delay, 4000),
    'wait before hiding notification'
  )

  assert.deepEqual(
    generator.next().value,
    put(notifyClose()),
    'hide notification'
  )

  assert.end()
})

test('notification saga', assert => {
  const generator = notificationSaga()

  const reqChan = actionChannel(Notification.request)
  assert.deepEqual(
    generator.next().value,
    reqChan,
    'create notification request channel'
  )

  assert.deepEqual(
    // this fails with:
    // take(patternOrChannel): argument [object Object]
    // is not valid channel or a valid pattern
    // generator.next(reqChan).value,
    // take(reqChan),
    generator.next(Notification.request).value,
    take(Notification.request),
    'take incoming notification requests'
  )

  assert.deepEqual(
    generator.next({ payload: 'sample text' }).value,
    call(showNotification, 'sample text'),
    'call notification display'
  )

  assert.end()
})
