import 'isomorphic-fetch'
import React from 'react'
import express from 'express'
import path from 'path'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { match, reduxReactRouter } from 'redux-router/server'
import { createMemoryHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable'
import mostAdapter from 'redux-observable-adapter-most'
import qs from 'query-string'

import Html from './containers/Html'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { rootServerSaga } from './sagas'
import { serverEpic } from './epics'
import routes from './routes'
import QuivadeTheme from './styles/theme'

import { port } from './config'
import assets from './assets.json'

const server = express()

server.use(express.static(path.join(__dirname, 'public')))

const getRenderData = store => {
  return {
    title: 'Chive',
    description: 'Spice simulation in the cloud',
    scripts: [
      assets.vendor.js,
      assets.client.js
    ],
    state: store.getState(),
    children: renderToString(
      <Root store={store} key='provider' type='server' />
    )
  }
}

server.use((req, res) => {
  const theme = Object.assign({}, QuivadeTheme,
    { userAgent: req.headers['user-agent'] })
  // It is different store enjancer
  // then rendering client side
  const epicMiddleware = createEpicMiddleware(
    serverEpic,
    { adapter: mostAdapter }
  )
  const store = reduxReactRouter({
    routes: routes(theme),
    createHistory: createMemoryHistory
  })(configureStore)(epicMiddleware, {})
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
        const data = getRenderData(store)
        const html = renderToStaticMarkup(<Html {...data} />)
        res.status(200).send(`<!doctype html>${html}`)
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
