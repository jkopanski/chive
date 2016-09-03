import React, { Component, PropTypes } from 'react'

import Dialog from 'material-ui/Dialog'

import Login from './Login'

function getStyles (props, context) {
  const {
    datePicker: {
      calendarTextColor
    },
    spacing
  } = context.muiTheme

  const styles = {
    root: {
      color: calendarTextColor
    },
    content: {
      width: 8 * spacing.desktopKeylineIncrement
    },
    bodyContent: {
      padding: 0,
      paddingTop: 0,
      paddingBottom: spacing.desktopGutter
    }
  }

  return styles
}

class LoginDialog extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool
  }

  static defaultProps = {
    open: false
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render () {
    const styles = getStyles(this.props, this.context)
    const {
      onLogin,
      onRequestClose,
      open
    } = this.props

    return (
      <Dialog
        style={styles.root}
        contentStyle={styles.content}
        bodyStyle={styles.bodyContent}
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
      >
        <Login
          onLogin={onLogin}
        />
      </Dialog>
    )
  }
}

export default LoginDialog
