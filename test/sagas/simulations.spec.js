import test from 'tape'
import {
  call,
  fork,
  put,
  take,
  takeEvery
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import {
  simulationStart,
  simulationStartRequest,
  simulationStatus,
  simulationStop
} from '../../src/actions'
import { Simulation } from '../../src/constants/ActionTypes'
import {
  updateStatus,
  startSimulation,
  stopSimulation,
  simulationFlow,
  simulationSaga
} from '../../src/sagas/simulations'
import { api } from '../../src/services'

test('simulation start generator', assert => {
  const generator = startSimulation()

  assert.deepEqual(
    generator.next().value,
    takeEvery(Simulation.startRequest, simulationFlow),
    'wait for every simulation start request'
  )

  assert.end()
})

test('simulation flow', assert => {
  const nid = 'b4acdb77-8b8c-427c-a598-fee0567b4812'
  const sid = '348fcfef-29f5-4bfe-9328-b25a148092c9'
  const file = 'chip.cir'
  const procs = 5

  const generator =
    simulationFlow(
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
      Either.Right({ 'id': sid, 'netlist': file }))),
    'successsful simulation start'
  )

  assert.end()
})

test('status update generator', assert => {
  const generator = updateStatus()

  assert.deepEqual(
    generator.next().value,
    take(Simulation.status),
    'wait for status update request'
  )

  assert.deepEqual(
    generator.next('id').value,
    call(api.simulationStatus, 'id'),
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
  const generator = stopSimulation()

  assert.deepEqual(
    generator.next().value,
    take(Simulation.stop),
    'wait for simulation stop request'
  )

  assert.deepEqual(
    generator.next('id').value,
    call(api.simulationStop, 'id'),
    'call api with proper id'
  )

  assert.deepEqual(
    generator.next(Either.Right({})).value,
    put(simulationStop(Either.Right({}))),
    'successsful simulation stop'
  )

  assert.end()
})

test('simulation saga', assert => {
  const generator = simulationSaga()

  assert.deepEqual(
    generator.next().value,
    [
      fork(updateStatus),
      fork(startSimulation),
      fork(stopSimulation)
    ],
    'should fork proper tasks'
  )

  assert.end()
})
