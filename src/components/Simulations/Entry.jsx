import React, { PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'
import ActionDone from 'material-ui/svg-icons/action/done'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew'
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'

const SimulationEntry = props => {
  let disabled = false
  let label, primary
  let statusIndicator = <ActionAutorenew />

  switch (props.status) {
    case 'finished':
      label = 'results'
      primary = true
      statusIndicator = <ActionDone />
      break
    case 'running':
    case 'pending':
      label = 'stop'
      primary = false
      statusIndicator = <AVPlayArrow />
      break
    case 'cancelled':
    default:
      label = 'results'
      disabled = true
      statusIndicator = <ActionHighlightOff />
  }

  const button = <FlatButton
    label={label}
    primary={primary && !disabled}
    secondary={!primary && !disabled}
    disabled={disabled}
  />

  return (
    <ListItem
      leftIcon={statusIndicator}
      primaryText={`circuit: ${props.netlist}`}
      secondaryText={`id: ${props.uuid}`}
      rightIconButton={button}
    />
  )
}

SimulationEntry.propTypes = {
  netlist: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default SimulationEntry
