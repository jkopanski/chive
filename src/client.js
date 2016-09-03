import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { reduxReactRouter } from 'redux-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import createHistory from 'history/lib/createBrowserHistory'

import { Root } from './containers'
import configureStore from './store/configureStore'
import routes from './routes'
import { rootClientSaga } from './sagas'
import QuivadeTheme from './styles/theme'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// It is different store enhancer
// than rendering server side
const store = reduxReactRouter({
  createHistory
})(configureStore)(window.__INITIAL_STATE__)
store.runSaga(rootClientSaga)
const rootElement = document.getElementById('root')
const node = (
  <Root store={store} routes={routes(QuivadeTheme)} />
  // <Provider store={store}>
  //   <ReduxRouter routes={routes(QuivadeTheme)} />
  // </Provider>
)

ReactDOM.render(node, rootElement)
