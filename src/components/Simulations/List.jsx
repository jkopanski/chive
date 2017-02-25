import React, { Component, PropTypes } from 'react'

import List from 'material-ui/List'

import SimulationEntry from './Entry'

class SimulationsList extends Component {
  static propTypes = {
    simulations: PropTypes.array.isRequired
  }

  static defaultProps = {
    simulations: []
  }

  render () {
    let {
      simulations
    } = this.props

    return (
      <List>
        {simulations.map(simulation =>
          <SimulationEntry
            key={simulation.id}
            netlist={simulation.netlist}
            uuid={simulation.id}
          />
        )}
      </List>
    )
  }
}

export default SimulationsList
