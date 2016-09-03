import 'babel-polyfill'
import React from 'react'
import express from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
// import { Provider } from 'react-redux'
// import { ReduxRouter } from 'redux-router'
import { match, reduxReactRouter } from 'redux-router/server'
import { createMemoryHistory } from 'history'
import qs from 'query-string'

import { port } from './config'
import bundle from './bundle'

import { Root } from './containers'
import configureStore from './store/configureStore'
import { rootServerSaga } from './sagas'
import routes from './routes'
import QuivadeTheme from './styles/theme'

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

const page = (element, state, js) => (`
  <!doctype html>
  <html lang="en">
  <head>
    <title>Chive</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    <!-- Material icons font hosted by Google -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <style type="text/css">
      html, body {
        margin: 0;
        padding: 0'
      }
    </style>
  </head>
  <body>
    <div id="root" class="chive" style="height: 100%"><div>${element}</div></div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)}
    </script>
    <script src=${js}></script>
  </body>
  </html>
`)

const getMarkup = store => {
  const initialState = store.getState()
  const markup = renderToString(
    <Root store={store} key='provider' type='server' />
    // <Provider store={store} key='provider'>
    //   <ReduxRouter />
    // </Provider>
  )

  return page(markup, initialState, bundle.main.js)
}

server.use((req, res) => {
  const theme = Object.assign({}, QuivadeTheme,
    { userAgent: req.headers['user-agent'] })
  // It is different store enjancer
  // then rendering client side
  const store = reduxReactRouter({
    routes: routes(theme),
    createHistory: createMemoryHistory
  })(configureStore)({})
  const query = qs.stringify(req.query)
  const url = req.path + (query.length ? '?' + query : '')

  store.dispatch(match(url, (error, redirectLocation, routerState) => {
    if (error) {
      console.error(error)
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(
        302,
        redirectLocation.pathname + redirectLocation.search
      )
    } else if (!routerState) {
      res.status(404).send('Not Found')
    } else {
      store.runSaga(rootServerSaga).done.then(() => {
        console.log('sagas complete')
        res.status(200).send(getMarkup(store))
      }).catch(error => {
        console.error(error.message)
        res.status(500).send(error.message)
      })
    }
  }))
})

server.listen(port, 'localhost', error => {
  if (error) {
    console.log(error)
    return
  }

  console.log(`The server is running at http://localhost:${port}/`)
})
