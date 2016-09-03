import test from 'tape'

import notify from '../../src/reducers/notify'
import { Notification } from '../../src/constants/ActionTypes'

test('notification reducer', assert => {
  assert.deepEqual(notify(undefined, {}), {
    display: false,
    message: ''
  }, 'should handle initial state')

  assert.deepEqual(notify({
    display: true,
    message: 'sample text'
  }, {
    type: Notification.close
  }), {
    display: false,
    message: 'sample text'
  }, 'should handle notification close')

  assert.deepEqual(notify(undefined, {
    type: Notification.request,
    payload: {
      message: 'sample text'
    }
  }), {
    display: false,
    message: ''
  }, 'should handle notification request')

  assert.deepEqual(notify(undefined, {
    type: Notification.show,
    payload: 'sample text'
  }), {
    display: true,
    message: 'sample text'
  }, 'should handle notification display')

  assert.end()
})
