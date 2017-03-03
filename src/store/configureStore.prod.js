import { applyMiddleware, combineReducers, createStore } from 'redux'
import { routerStateReducer } from 'redux-router'
import createSagaMiddleware, { END } from 'redux-saga'
// import createHistory from 'history/lib/createBrowserHistory'

// import routes from '../routes'
import rootReducer from '../reducers'

const reducer = combineReducers({
  router: routerStateReducer,
  chive: rootReducer
})

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducer,
    initialState,
    // compose(
    applyMiddleware(sagaMiddleware)
    //   reduxReactRouter({
    //     routes,
    //     createHistory
    //   })
    // )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore
