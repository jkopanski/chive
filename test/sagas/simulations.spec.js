import test from 'tape'
import {
  call,
  put
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import {
  notifyRequest,
  simulationStart,
  simulationStartRequest,
  simulationStatus,
  simulationStatusRequest,
  simulationStop,
  simulationStopRequest
} from '../../src/actions'
import {
  updateStatus,
  stopSimulation,
  simulationSaga
} from '../../src/sagas/simulations'
import { api } from '../../src/services'

test('simulation saga', assert => {
  const nid = 'b4acdb77-8b8c-427c-a598-fee0567b4812'
  const sid = '348fcfef-29f5-4bfe-9328-b25a148092c9'
  const file = 'chip.cir'
  const procs = 5

  const generator =
    simulationSaga(
      simulationStartRequest(nid, procs, file)
    )

  assert.deepEqual(
    generator.next().value,
    call(api.netlistSimulate, nid, procs),
    'call api endpoint'
  )

  assert.deepEqual(
    generator.next(
      Either.Right({ 'id': sid })
    ).value,
    put(simulationStart(
      Either.Right({ 'id': sid, 'netlist': file })
    )),
    'successsful simulation start'
  )

  assert.end()
})

test('status update generator', assert => {
  const sid = '348fcfef-29f5-4bfe-9328-b25a148092c9'

  const generator = updateStatus(
    simulationStatusRequest(sid)
  )

  assert.deepEqual(
    generator.next().value,
    call(api.simulationStatus, sid),
    'call api with proper id'
  )

  assert.deepEqual(
    generator.next(Either.Right({ progress: 80 })).value,
    put(simulationStatus(Either.Right({ progress: 80 }))),
    'successsful status update'
  )

  assert.end()
})

test('simulation stop generator', assert => {
  const sid = '348fcfef-29f5-4bfe-9328-b25a148092c9'

  const generator = stopSimulation(
    simulationStopRequest(sid)
  )

  assert.deepEqual(
    generator.next().value,
    call(api.simulationStop, sid),
    'call api with proper id'
  )

  const res = Either.Left(new Error('some error'))
  assert.deepEqual(
    generator.next(res).value,
    put(simulationStop(res)),
    'simulation stop failed'
  )

  assert.deepEqual(
    generator.next().value,
    put(notifyRequest('Failed to stop selected simulation')),
    'display error message to the user'
  )

  assert.deepEqual(
    generator.next(),
    { done: true, value: undefined },
    'finish generator'
  )

  assert.end()
})
