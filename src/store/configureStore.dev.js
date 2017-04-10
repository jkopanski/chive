import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { routerStateReducer } from 'redux-router'
import createLogger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const reducer = combineReducers({
  router: routerStateReducer,
  chive: rootReducer
})

const configureStore = (epicMiddleware, initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    compose(
      // reduxReactRouter({
      //   routes,
      //   history
      // }),
      applyMiddleware(
        epicMiddleware,
        sagaMiddleware,
        createLogger(),
        thunk
      ),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore
