/* @flow */
export type SimId = string

export type Status
  = 'pending'
  | 'running'
  | 'failed'
  | 'finished'
  | 'stopped'

export type Simulation = {
  id: string,
  netlist: string,
  progress: number,
  status: Status
}

export type Simulations = Array<Simulation>
