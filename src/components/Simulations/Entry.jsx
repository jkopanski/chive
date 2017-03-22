/* @flow */
import React from 'react'

import ActionDone from 'material-ui/svg-icons/action/done'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew'
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
// import { ListItem } from 'material-ui/List'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'

import type { SimulationId, Simulation } from '../../types/simulations'

export type Props = {
  simulation: Simulation,
  stopSimulation: SimulationId => void,
  getResults: SimulationId => void
}

const SimulationEntry = ({
  simulation,
  stopSimulation,
  getResults
}: Props) => {
  let disabled: boolean = false
  let label: string,
    primary: boolean
  let statusIndicator = <ActionAutorenew />
  let action: Function

  const {
    id,
    netlist,
    status,
    progress
  } = simulation

  switch (status) {
    case 'finished':
      label = 'results'
      primary = true
      statusIndicator = <ActionDone />
      action = getResults
      break
    case 'running':
    case 'pending':
      label = 'stop'
      primary = false
      statusIndicator = <AVPlayArrow />
      action = stopSimulation
      break
    case 'cancelled':
    default:
      label = 'results'
      disabled = true
      statusIndicator = <ActionHighlightOff />
      action = getResults
  }

  const button = <RaisedButton
    label={label}
    primary={primary && !disabled}
    secondary={!primary && !disabled}
    disabled={disabled}
    onClick={() => action(id)}
  />

  return (
    <Toolbar>
      <ToolbarGroup firstChild>
        {statusIndicator}
        <ToolbarTitle text={netlist} />
      </ToolbarGroup>
      <ToolbarGroup style={{
        width: '100%',
        maxWidth: '700px'
      }}>
        <LinearProgress mode='determinate' value={progress} />
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        {button}
      </ToolbarGroup>
    </Toolbar>
  )
}

export default SimulationEntry
