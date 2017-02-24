import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import { ListItem } from 'material-ui/List'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { netlistUploadRequest } from '../../actions'

@connect(
  state => ({}),
  { netlistUploadRequest }
)
class NetlistAddEntry extends Component {
  static propTypes = {
    netlistUploadRequest: PropTypes.func.isRequired
  }

  openFileDialog = () => {
    let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload)
    fileUploadDom.click()
  }

  handleUpload = event => {
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onload = ev => {
      this.props.netlistUploadRequest(file.name, ev.target.result)
    }
    reader.readAsText(file)
  }

  render () {
    return (
      <ListItem
        primaryText='Add netlist'
        leftIcon={<ContentAdd />}
        onTouchTap={this.openFileDialog}
      >
        <input
          ref='fileUpload'
          type='file'
          style={{'display': 'none'}}
          onChange={this.handleUpload}
        />
      </ListItem>
    )
  }
}

export default NetlistAddEntry
