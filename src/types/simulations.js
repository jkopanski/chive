/* @flow */
import type { NetlistId } from './netlists'

export type SimulationId = string

export type Status
  = 'pending'
  | 'running'
  | 'failed'
  | 'finished'
  | 'stopped'

export type Simulation = {
  id: SimulationId,
  netlist: NetlistId,
  progress: number,
  status: Status
}

export type Simulations = Array<Simulation>
