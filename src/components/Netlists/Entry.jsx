import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import { simulationStartRequest } from '../../actions'

@connect(
  state => ({}),
  { simulationStartRequest }
)
class NetlistEntry extends Component {
  static propTypes = {
    filename: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    simulationStartRequest: PropTypes.func.isRequired
  }

  simulate = (id, procs, file) => {
    let {
      filename,
      uuid,
      simulationStartRequest
    } = this.props
    simulationStartRequest(uuid, 1, filename)
  }

  render () {
    let {
      filename,
      uuid
    } = this.props

    const simButton =
      <FlatButton
        label='simulate'
        secondary
        onTouchTap={this.simulate}
      />

    return (
      <ListItem
        primaryText={filename}
        secondaryText={`id: ${uuid}`}
        rightIconButton={simButton}
      />
    )
  }
}

export default NetlistEntry
