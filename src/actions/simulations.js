/* @flow */
import createAction from './createAction'
import { Simulations } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'
import R from 'ramda'

import type { ActionCreator } from '../types/actions'

export const simulationStartRequest: ActionCreator = createAction(
  Simulations.startRequest,
  (nid, nodes, file) => ({ netlist: nid, nodes: nodes, name: file })
)

export const simulationStart: ActionCreator = createAction(
  Simulations.start,
  simId => Either.either(
    error => new Error(error),
    R.identity,
    simId
  )
)

export const simulationStatusRequest: ActionCreator = createAction(
  Simulations.statusRequest,
  sid => ({ id: sid })
)

export const simulationStatus: ActionCreator = createAction(
  Simulations.status,
  progress => Either.either(
    error => new Error(error),
    R.identity,
    progress
  )
)

export const simulationStopRequest: ActionCreator = createAction(
  Simulations.stopRequest,
  sid => ({ id: sid })
)

export const simulationStop: ActionCreator = createAction(
  Simulations.stop,
  res => Either.either(
    error => new Error(error),
    id => ({ simulationId: id }),
    res
  )
)
