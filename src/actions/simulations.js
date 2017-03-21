/* @flow */
import { eitherToAction } from './index'

import type { Either } from 'flow-static-land/lib/Either'
import type { Simulation, SimulationId } from '../types/simulations'

export type Action
  = Start
  | StatusRequest
  | Status
  | StopRequest
  | Stop

export type Start
  = { type: 'simulationStart'
    , payload: Simulation
    }
  | { type: 'simulationStart'
    , error: true
    , payload: Error
    }

export type StatusRequest = {
  type: 'simulationStatusRequest',
  payload: { id: SimulationId }
}

export type Status
  = { type: 'simulationStatus'
    , payload: Simulation
    }
  | { type: 'simulationStatus'
    , error: true
    , payload: Error
    }

export type StopRequest = {
  type: 'simulationStopRequest',
  payload: { id: SimulationId }
}

export type Stop
  = { type: 'simulationStop'
    , payload: Simulation
    }
  | { type: 'simulationStop'
    , error: true
    , payload: Error
    }

export const start: Either<Error, Simulation> => Start =
  ((eitherToAction('simulationStart')): (Either<Error, Simulation> => any))

export const statusRequest = (id: SimulationId): StatusRequest => ({
  type: 'simulationStatusRequest',
  payload: { id }
})

export const status: Either<Error, Simulation> => Status =
  ((eitherToAction('simulationStatus')): (Either<Error, Simulation> => any))

export const stopRequest = (id: SimulationId): StopRequest => ({
  type: 'simulationStopRequest',
  payload: { id }
})

export const stop: Either<Error, Simulation> => Stop =
  ((eitherToAction('simulationStop')): (Either<Error, Simulation> => any))
