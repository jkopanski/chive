import React, { Component, PropTypes } from 'react'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import SimEntry from './Entry'
import SimEntryAdd from './EntryAdd'

class AnalysisList extends Component {
  static propTypes = {
    analyses: PropTypes.array.isRequired
  }

  static defaultProps = {
    analyses: []
  }

  render () {
    let {
      analyses
    } = this.props

    return (
      <List>
        {analyses.map(analysis =>
          <div>
            <SimEntry
              key={analysis.name}
              name={analysis.name}
              type={analysis.type}
              enable={analysis.enable}
            />
            <Divider />
          </div>
          )}
        <Divider />
        <SimEntryAdd />
      </List>
    )
  }
}

export default AnalysisList
