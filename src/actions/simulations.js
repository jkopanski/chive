// use internal, ripped of create action so it plays well with Either
import createAction from './createAction'
import { Simulation } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'
import R from 'ramda'

export const simulationStartRequest = createAction(
  Simulation.startRequest,
  (nid, nodes, file) => ({ netlist: nid, nodes: nodes, name: file })
)

export const simulationStart = createAction(
  Simulation.start,
  simId => Either.either(
    error => new Error(error),
    R.identity,
    simId
  )
)

export const simulationStatus = createAction(
  Simulation.status,
  progress => Either.either(
    error => new Error(error),
    R.identity,
    progress
  )
)

export const simulationStop = createAction(
  Simulation.stop,
  res => Either.either(
    error => new Error(error),
    id => ({ simulationId: id }),
    res
  )
)
