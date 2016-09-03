import test from 'tape'

import analyses from '../../src/reducers/analyses'
import { Analysis } from '../../src/constants/ActionTypes'

test('analyses reducer', assert => {
  assert.deepEqual(analyses(undefined, {}), [],
                   'should handle initial state')

  assert.deepEqual(
    analyses([], {
      type: Analysis.add,
      payload: {
        name: 'DCOp',
        type: 'dc',
        properties: [undefined]
      }
    }), [{
      id: 0,
      name: 'DCOp',
      type: 'dc',
      properties: [undefined],
      enable: true
    }],
    'should handle Analysis.add'
  )

  assert.deepEqual(
      analyses([{
        id: 0,
        name: 'DCOp',
        type: 'dc',
        properties: [undefined],
        enable: true
      }, {
        id: 1,
        name: 'slew',
        type: 'tran',
        properties: [undefined],
        enable: false
      }], {
        type: Analysis.add,
        payload: {
          name: 'gain',
          type: 'ac'
        }
      }), [{
        id: 0,
        name: 'DCOp',
        type: 'dc',
        properties: [undefined],
        enable: true
      }, {
        id: 1,
        name: 'slew',
        type: 'tran',
        properties: [undefined],
        enable: false
      }, {
        id: 2,
        name: 'gain',
        type: 'ac',
        properties: undefined,
        enable: true
      }],
      'should increment simulation id properly'
  )

  assert.end()
})
