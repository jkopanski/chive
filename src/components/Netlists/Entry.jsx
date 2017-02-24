import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import { ListItem } from 'material-ui/List'

class NetlistEntry extends Component {
  static propTypes = {
    filename: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
  };

  render () {
    let {
      filename,
      uuid
    } = this.props

    return (
      <ListItem
        primaryText={filename}
        secondaryText={`id: ${uuid}`}
        rightIconButton={<FlatButton label='simulate' secondary />}
      />
    )
  }
}

export default NetlistEntry
