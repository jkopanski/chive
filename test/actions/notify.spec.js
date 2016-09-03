import test from 'tape'

import {
  notify,
  notifyRequest,
  notifyClose
} from '../../src/actions'
import { Notification } from '../../src/constants/ActionTypes'

test('notify action creators', assert => {
  assert.deepEqual(
    notify('sample text'),
    { type: Notification.show,
      payload: 'sample text'
    }, 'create proper show action'
  )

  assert.deepEqual(
    notifyClose(),
    { type: Notification.close
    }, 'create proper notification close action'
  )

  assert.deepEqual(
    notifyRequest('sample text'),
    { type: Notification.request,
      payload: 'sample text'
    }, 'create proper show action'
  )

  assert.end()
})
