import React, { Component, PropTypes } from 'react'

import Checkbox from 'material-ui/Checkbox'
import { ListItem } from 'material-ui/List'

class NetlistEntry extends Component {
  static propTypes = {
    enable: PropTypes.bool.isRequired,
    filename: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
  };

  render () {
    let {
      enable,
      filename,
      uuid
    } = this.props

    return (
      <ListItem
        primaryText={filename}
        secondaryText={uuid}
        leftCheckbox={<Checkbox checked={enable} />}
      />
    )
  }
}

export default NetlistEntry
