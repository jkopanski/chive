import React, { Component, PropTypes } from 'react'

import Divider from 'material-ui/Divider'
import List from 'material-ui/List'

import NetlistEntry from './Entry'
import NetlistEntryAdd from './EntryAdd'

class NetlistsList extends Component {
  static propTypes = {
    netlists: PropTypes.array.isRequired
  }

  static defaultProps = {
    netlists: []
  }

  render () {
    let {
      netlists
    } = this.props

    return (
      <List>
        {netlists.map(netlist =>
          <div key={netlist.id}>
            <NetlistEntry
              filename={netlist.filename}
              uuid={netlist.id}
            />
            <Divider />
          </div>
        )}
        <Divider />
        <NetlistEntryAdd />
      </List>
    )
  }
}

export default NetlistsList
