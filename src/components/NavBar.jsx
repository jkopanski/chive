import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'redux-router'

import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Paper from 'material-ui/Paper'
import propTypes from 'material-ui/utils/propTypes'
import { Tabs } from 'material-ui/Tabs'

import LoginDialog from './Login/Dialog'

import {
  authRequest,
  logout,
  netlistUploadRequest
} from '../actions'

function getStyles (props, context) {
  const {
    appBar,
    button: {
      iconButtonSize
    },
    zIndex
  } = context.muiTheme

  const flatButtonSize = 36

  const styles = {
    root: {
      position: 'fixed',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
      flexWrap: 'wrap'
    },
    title: {
      whitespace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`
    },
    mainElement: {
      boxFlex: 1,
      flex: '1'
    },
    iconButton: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16
    },
    iconButtonIcon: {
      fill: appBar.textColor,
      color: appBar.textColor
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1
    },
    tabs: {
      width: '100%'
    }
  }

  return styles
}

@connect(
  state => ({ auth: state.chive.auth }),
  { push, authRequest, logout, netlistUploadRequest }
)
class NavBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node,
    authRequest: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    netlistUploadRequest: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    title: PropTypes.node,
    zDepth: propTypes.zDepth
  }

  static defaultProps = {
    title: 'Chive',
    zDepth: 1
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    loginDialogOpen: false
  }

  handleChange = value => {
    this.props.push(value)
  }

  handleFile = event => {
    let reader = new FileReader()
    reader.onload = ev => {
      this.props.netlistUploadRequest(ev.target.result)
    }
    reader.readAsText(event.target.files[0])
  }

  handleLogin = (username, password) => {
    this.props.authRequest(username, password)
    this.closeLoginDialog()
  }

  openLoginDialog = () => {
    this.setState({ loginDialogOpen: true })
  }

  closeLoginDialog = () => {
    this.setState({ loginDialogOpen: false })
  }

  openFileDialog = () => {
    let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload)
    fileUploadDom.click()
  }

  render () {
    const {
      auth,
      children,
      title,
      zDepth
    } = this.props

    const { prepareStyles } = this.context.muiTheme
    const styles = getStyles(this.props, this.context)

    // If the title is a string, wrap in an h1 tag.
    // If not, wrap in a div tag.
    const titleComponent =
      typeof title === 'string' || title instanceof String ? 'h1' : 'div'

    const titleElement = React.createElement(titleComponent, {
      style: prepareStyles(Object.assign(styles.title, styles.mainElement))
    }, title)

    const iconElementRightUnsigned = (
      <IconButton
        iconStyle={styles.iconButtonIcon}
        iconClassName='material-icons'
        onTouchTap={this.openLoginDialog}
        tooltip='Log in'
        tooltipPosition='bottom-left'
        touch
      >
        account_box
      </IconButton>
    )

    const iconElementRightSigned = (
      <IconMenu
        iconStyle={styles.iconButtonIcon}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem disabled primaryText='Options' />
        <MenuItem primaryText='Sign out' onTouchTap={this.props.logout} />
      </IconMenu>
    )

    const selectDesignButton = (
      <div style={styles.iconButtonIcon}>
        <FlatButton
          style={styles.flatButton}
          label='Select Design'
          onClick={this.openFileDialog}
        >
          <input
            ref='fileUpload'
            type='file'
            style={{'display': 'none'}}
            onChange={this.handleFile}
          />
        </FlatButton>
      </div>
    )

    return (
      <div>
        <Paper
          rounded={false}
          style={styles.root}
          zDepth={zDepth}
        >
          {titleElement}
          {selectDesignButton}
          {auth.username
            ? iconElementRightSigned
            : iconElementRightUnsigned
          }
          <Tabs
            onChange={this.handleChange}
            style={styles.tabs}
          >
            {children}
          </Tabs>
        </Paper>
        <LoginDialog
          onLogin={this.handleLogin}
          open={this.state.loginDialogOpen}
          onRequestClose={this.closeLoginDialog}
        />
      </div>
    )
  }
}

export default NavBar
