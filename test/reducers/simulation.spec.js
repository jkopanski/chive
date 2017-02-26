import test from 'tape'

import simulations from '../../src/reducers/simulations'
import { Simulation } from '../../src/constants/ActionTypes'

let sims = [{
  id: '0',
  netlist: 'test0.cir',
  status: 'finished',
  progress: 100
}, {
  id: '1',
  netlist: 'test1.cir',
  status: 'pending',
  progress: 0
}, {
  id: '2',
  netlist: 'test2.cir',
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
        netlist: 'test.cir'
      }
    }), [...sims, {
      id: 'random',
      netlist: 'test.cir',
      status: 'pending',
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
    }), [sims[0], {
      id: sims[1].id,
      netlist: sims[1].netlist,
      status: 'cancelled',
      progress: sims[1].progress
    }, sims[2]],
    'should handle simulation stop'
  )

  assert.deepEqual(
    simulations(sims, {
      type: Simulation.status,
      payload: {
        id: '1',
        status: 'running',
        progress: 54
      }
    }), [sims[0], {
      id: sims[1].id,
      netlist: sims[1].netlist,
      status: sims[1].status,
      progress: 54
    }, sims[2]],
    'should update simulation'
  )

  assert.end()
})
