import test from 'tape'
import { Either } from 'ramda-fantasy'

import {
  netlistUpload,
  netlistUploadRequest
} from '../../src/actions'
import { Netlist } from '../../src/constants/ActionTypes'

test('netlist action creators', assert => {
  assert.deepEqual(
    netlistUploadRequest('test.cir', 'sample data'),
    { type: Netlist.uploadRequest,
      payload: {
        filename: 'test.cir',
        file: 'sample data'
      }
    }, 'create proper upload request action'
  )

  assert.deepEqual(
    netlistUpload(Either.Right({
      id: 'b4acdb77-8b8c-427c-a598-fee0567b4812',
      filename: 'test.cir'
    })),
    { type: Netlist.upload,
      payload: {
        id: 'b4acdb77-8b8c-427c-a598-fee0567b4812',
        filename: 'test.cir'
      }
    }, 'create proper upload action'
  )

  assert.deepEqual(
    netlistUpload(Either.Left('test msg')),
    { type: Netlist.upload,
      error: true,
      payload: new Error('test msg')
    }, 'create proper failed uplad action'
  )

  assert.end()
})