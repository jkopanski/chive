import test from 'tape'
import {
  call,
  fork,
  put,
  take
} from 'redux-saga/effects'
import { Either } from 'ramda-fantasy'

import {
  simulationStart,
  simulationStatus,
  simulationStop
} from '../../src/actions'
import { Simulation } from '../../src/constants/ActionTypes'
import {
  updateStatus,
  startSimulation,
  stopSimulation,
  simulationSaga
} from '../../src/sagas/simulation'
import { api } from '../../src/services'

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

test('simulation start generator', assert => {
  const generator = startSimulation()
  const analyses = [{
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
  }]

  assert.deepEqual(
    generator.next().value,
    take(Simulation.start),
    'wait for simulation start request'
  )

  assert.deepEqual(
    generator.next(analyses).value,
    call(api.simulationStart, analyses),
    'call api with proper analyses'
  )

  assert.deepEqual(
    generator.next(Either.Right({})).value,
    put(simulationStart(Either.Right({}))),
    'successsful simulation start'
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
