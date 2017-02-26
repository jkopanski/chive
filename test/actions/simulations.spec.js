import test from 'tape'
import { Either } from 'ramda-fantasy'

import {
  simulationStartRequest,
  simulationStart
} from '../../src/actions'
import { Simulation } from '../../src/constants/ActionTypes'

test('simulations action creators', assert => {
  let nid = 'b4acdb77-8b8c-427c-a598-fee0567b4812'
  let nodes = 1
  let file = 'test.cir'

  assert.deepEqual(
    simulationStartRequest(nid, nodes, file),
    { type: Simulation.startRequest,
      payload: {
        netlist: nid,
        nodes: nodes,
        name: file
      }
    }, 'create proper simulation start request action'
  )

  assert.deepEqual(
    simulationStart(Either.Right({
      id: 'b4acdb77-8b8c-427c-a598-fee0567b4812',
      netlist: 'test.cir'
    })),
    { type: Simulation.start,
      payload: {
        id: 'b4acdb77-8b8c-427c-a598-fee0567b4812',
        netlist: 'test.cir'
      }
    }, 'create proper upload action'
  )

  assert.deepEqual(
    simulationStart(Either.Left('test msg')),
    { type: Simulation.start,
      error: true,
      payload: new Error('test msg')
    }, 'create proper failed uplad action'
  )

  assert.end()
})
