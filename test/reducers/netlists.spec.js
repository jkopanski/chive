import test from 'tape'

import netlists from '../../src/reducers/netlists'
import { Netlists } from '../../src/constants/ActionTypes'

let nets = [{
  id: 'b4acdb77-8b8c-427c-a598-fee0567b4812',
  filename: 'smult20.cir'
}, {
  id: '348fcfef-29f5-4bfe-9328-b25a148092c9',
  filename: 'chip.cir'
}, {
  id: 'e3de0b99-b317-4a04-a9fb-39a46c0f4fa9',
  filename: 'MOS.CIR'
}]

test('netlists reducer', assert => {
  assert.deepEqual(netlists(undefined, []), [],
    'should handle initial state')

  assert.deepEqual(
    netlists(nets, {
      type: Netlists.upload,
      payload: {
        id: 'aac37bc8-10b6-41f4-bd16-5cd49d7eec6a',
        filename: 'test.cir'
      }
    }), [...nets, {
      id: 'aac37bc8-10b6-41f4-bd16-5cd49d7eec6a',
      filename: 'test.cir'
    }],
    'should handle successful netlist uplad'
  )

  assert.deepEqual(
    netlists(nets, {
      type: Netlists.upload,
      error: true,
      payload: new Error('test error')
    }),
    nets,
    'should handle simulation stop'
  )

  assert.end()
})
