import test from 'tape'

import simulations from '../../src/reducers/simulations'
import { Simulation } from '../../src/constants/ActionTypes'

let sims = [{
  id: '0',
  status: 'finished',
  progress: 100
}, {
  id: '1',
  status: 'running',
  progress: 43
}, {
  id: '2',
  status: 'cancelled',
  progress: 62
}]

test('simulations reducer', assert => {
  assert.deepEqual(simulations(undefined, []), [],
    'should handle initial state')

  assert.deepEqual(
    simulations(sims, {
      type: Simulation.start,
      payload: {
        id: 'random',
        status: 'running',
        progress: 0
      }
    }), [...sims, {
      id: 'random',
      status: 'running',
      progress: 0
    }],
    'should handle simulation start'
  )

  assert.deepEqual(
    simulations(sims, {
      type: Simulation.stop,
      payload: {
        id: '1',
        status: 'cancelled'
      }
    }), [{
      id: '0',
      status: 'finished',
      progress: 100
    }, {
      id: '1',
      status: 'cancelled',
      progress: 43
    }, {
      id: '2',
      status: 'cancelled',
      progress: 62
    }],
    'should handle simulation stop'
  )

  assert.deepEqual(
    simulations(sims, {
      type: Simulation.status,
      payload: {
        id: '1',
        progress: 54
      }
    }), [{
      id: '0',
      status: 'finished',
      progress: 100
    }, {
      id: '1',
      status: 'running',
      progress: 54
    }, {
      id: '2',
      status: 'cancelled',
      progress: 62
    }]
  )

  assert.end()
})
