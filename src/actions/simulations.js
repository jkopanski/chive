// use internal, ripped of create action so it plays well with Either
import createAction from './createAction'
import { Simulations } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'
import R from 'ramda'

export const simulationStartRequest = createAction(
  Simulations.startRequest,
  (nid, nodes, file) => ({ netlist: nid, nodes: nodes, name: file })
)

export const simulationStart = createAction(
  Simulations.start,
  simId => Either.either(
    error => new Error(error),
    R.identity,
    simId
  )
)

export const simulationStatus = createAction(
  Simulations.status,
  progress => Either.either(
    error => new Error(error),
    R.identity,
    progress
  )
)

export const simulationStop = createAction(
  Simulations.stop,
  res => Either.either(
    error => new Error(error),
    id => ({ simulationId: id }),
    res
  )
)
