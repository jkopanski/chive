import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

class Root extends Component {
  static propTypes = {
    routes: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
    type: PropTypes.string
  }

  render () {
    const {
      routes,
      store,
      type
    } = this.props

    return (
      <Provider store={store}>
        {
          type === 'server'
          ? <ReduxRouter />
          : <ReduxRouter routes={routes} />
        }
      </Provider>
    )
  }
}

export default Root
