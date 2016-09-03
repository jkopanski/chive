import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'redux-router'
import { ListItem } from 'material-ui/List'
import ContentAdd from 'material-ui/svg-icons/content/add'

@connect(
  state => ({}),
  { push }
)
class AnalysisAddEntry extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  }

  handleAdd = () => {
    this.props.push('/analyses/add')
  }

  render () {
    return (
      <ListItem
        primaryText='Add analysis'
        leftIcon={<ContentAdd />}
        onTouchTap={this.handleAdd}
      />
    )
  }
}

export default AnalysisAddEntry
