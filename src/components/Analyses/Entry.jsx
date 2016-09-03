import React, { Component, PropTypes } from 'react'

import { grey400 } from 'material-ui/styles/colors'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import { ListItem } from 'material-ui/List'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

class AnalysisEntry extends Component {
  static propTypes = {
    enable: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  render () {
    let {
      name,
      type,
      enable
    } = this.props

    const iconButton = (
      <IconButton
        touch
        tooltip='more'
        tooltipPosition='bottom-left'
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButton}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    )

    return (
      <ListItem
        primaryText={name}
        secondaryText={type}
        leftCheckbox={<Checkbox toggled={enable} />}
        rightIconButton={rightIconMenu}
      />
    )
  }
}

export default AnalysisEntry
