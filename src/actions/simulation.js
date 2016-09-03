// use internal, ripped of create action so it plays well with Either
import createAction from './createAction'
import { Simulation } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'

export const simulationStart = createAction(
  Simulation.start,
  simId => Either.either(
    error => new Error(error),
    id => ({ simulationId: id }),
    simId
  )
)

export const simulationStatus = createAction(
  Simulation.status,
  progress => Either.either(
    error => new Error(error),
    percent => ({ progress: percent }),
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
