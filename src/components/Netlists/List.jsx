/* @flow */
import React from 'react'

import Divider from 'material-ui/Divider'
import List from 'material-ui/List'

import NetlistEntry from './Entry'
import NetlistEntryAdd from './EntryAdd'

import type { Netlists } from '../../types/netlists'

export type Props = {
  netlists: Netlists,
  netlistAdd: Function,
  simulateRequest: Function
}

const NetlistList = ({
  netlists,
  netlistAdd,
  simulateRequest
}: Props) => (
  <List>
    {netlists.map(netlist =>
      <div key={netlist.id}>
        <NetlistEntry
          netlist={netlist}
          simulateRequest={simulateRequest}
        />
        <Divider />
      </div>
    )}
    <Divider />
    <NetlistEntryAdd netlistAdd={netlistAdd} />
  </List>
)

export default NetlistList
