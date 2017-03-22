/* @flow */
import React from 'react'

import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

import type { NetlistId, Netlist } from '../../types/netlists'

export type Props = {
  netlist: Netlist,
  simulateRequest: (NetlistId, number) => void
}

const NetlistEntry = ({
  netlist,
  simulateRequest
}: Props) => {
  const { id, filename } = netlist

  const simButton =
    <FlatButton
      label='simulate'
      secondary
      onTouchTap={() => simulateRequest(id, 1)}
    />

  return (
    <ListItem
      primaryText={filename}
      secondaryText={`id: ${id}`}
      rightIconButton={simButton}
    />
  )
}

export default NetlistEntry
