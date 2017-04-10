import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { reduxReactRouter } from 'redux-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import createHistory from 'history/lib/createBrowserHistory'
import { createEpicMiddleware } from 'redux-observable'

import Root from './containers/Root'
import configureStore from './store/configureStore'
import { rootClientSaga } from './sagas'
import { clientEpic } from './epics'
import QuivadeTheme from './styles/theme'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const epicMiddleware = createEpicMiddleware(clientEpic)
// It is different store enhancer
// than rendering server side
const store = reduxReactRouter({
  createHistory
})(configureStore)(epicMiddleware, window.__INITIAL_STATE__)
store.runSaga(rootClientSaga)

let routes = require('./routes').default
const rootElement = document.getElementById('root')
const rootNode = Base => (
  <AppContainer>
    <Base store={store} routes={routes(QuivadeTheme)} />
  </AppContainer>
)

ReactDOM.render(rootNode(Root), rootElement)

if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require('./routes').default
    ReactDOM.render(
      rootNode(Root),
      rootElement
    )
  })
}
