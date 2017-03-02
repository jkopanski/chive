/* @flow */
import React from 'react'
import List from 'material-ui/List'

import SimulationEntry from './Entry'

import type { Simulations } from '../../types/simulations'

export type Props = {
  simulations: Simulations,
  getResults: Function,
  stopSimulation: Function
}

const SimulationList = ({
  simulations,
  getResults,
  stopSimulation
}: Props) => (
  <List>
    {simulations.map(simulation =>
      <SimulationEntry
        key={simulation.id}
        simulation={simulation}
        getResults={getResults}
        stopSimulation={stopSimulation}
      />
    )}
  </List>
)

export default SimulationList
