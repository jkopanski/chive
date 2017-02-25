import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

class SimulationEntry extends Component {
  static propTypes = {
    netlist: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
  };

  render () {
    let {
      netlist,
      uuid
    } = this.props

    return (
      <ListItem
        primaryText={`circuit: ${netlist}`}
        secondaryText={`id: ${uuid}`}
        rightIconButton={<FlatButton label='simulate' secondary />}
      />
    )
  }
}

export default SimulationEntry
