import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

function getStyles (props, context) {
  const {
    snackbar,
    fontFamily
  } = context.muiTheme

  const styles = {
    snackbar: {
      ...snackbar,
      fontFamily: fontFamily
    }
  }

  return styles
}

@connect(
  state => ({
    message: state.chive.notify.message,
    open: state.chive.notify.display
  })
)
class Notify extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render () {
    let {
      message,
      open
    } = this.props

    const styles = getStyles(this.props, this.context)

    return (
      <Snackbar
        bodyStyle={styles.snackbar}
        open={open}
        message={message}
      />
    )
  }
}

export default Notify
