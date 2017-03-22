/* @flow */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { ListItem } from 'material-ui/List'
import ContentAdd from 'material-ui/svg-icons/content/add'

export type Props = {
  netlistAdd: Function
}

class NetlistAddEntry extends Component {
  props: Props

  openFileDialog = () => {
    let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload)
    fileUploadDom.click()
  }

  handleUpload = (event: Event) => {
    let reader = new FileReader()
    // $FlowFixMe: What type shoult event have? Event?
    let file = event.target.files[0]
    reader.onload = ev => {
      this.props.netlistAdd(file.name, ev.target.result)
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
