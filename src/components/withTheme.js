import React, { Component, PropTypes } from 'react'

const withTheme = theme => BaseComponent => {
  return class WithTheme extends Component {
    static childContextTypes = {
      muiTheme: PropTypes.object
    }

    getChildContext = () => {
      return { muiTheme: theme }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }
}

export default withTheme
