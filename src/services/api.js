// import 'isomorphic-fetch'
import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import { apiUrl } from '../config'
// import { netlistSchema } from '../constants'

function makeFullUrl (endpoint) {
  const fullUrl = (endpoint.indexOf(apiUrl) === -1)
    ? apiUrl + endpoint
    : endpoint

  return fullUrl
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape,
// regardless of how nested it was.
const callApi = R.curry((options, endpoint, schema) => {
  const fullUrl = makeFullUrl(endpoint)
  const norm = R.curry(normalize)
  const handleResponse = R.compose(
    norm(R.__, schema),
    camelizeKeys
  )

  let opt = options
  // make it const for now
  // const token = window.localStorage.getItem('Auth')
  const token = 'Basic ' + window.btoa('admin:admin')
  if (token) {
    opt = R.over(
      R.lensProp('headers'),
      R.assoc('Authorization', token),
      options
    )
  }

  return fetch(fullUrl, opt)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText)
      }
      return response.json().then(json => {
        return handleResponse(json)
      })
    })
    .then(
      response => Either.Right(response),
      error => Either.Left(error)
    )
})

export const authenticate = (user, pass) => {
  return callApi({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': user,
      'password': pass
    })
  }, 'login', {})
  .then(e =>
    e.map(R.compose(R.prop('sessionId'), R.prop('result')))
  )
}

export const netlistUpload = fileInput => {
  // TODO: backend does not yet support multipart-form data
  // let data = new FormData()
  // data.append('netlist', fileInput)

  return callApi({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain; charset=UTF-8'
    },
    body: fileInput
  }, 'netlists/upload', {})
  .then(e =>
    e.map(R.compose(R.prop('id'), R.prop('result')))
  )
}

export const simulationStart = analyses => {
  return callApi({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(R.filter(R.prop('enable'), analyses))
  }, 'sim/run', {})
  .then(e =>
    e.map(R.compose(R.prop('simId'), R.prop('result')))
  )
}

export const simulationStop = simId => {
  return callApi({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {}
  }, `sim/terminate/${simId}`, {})
  .then(e =>
    e.map(R.compose(R.prop('result')))
  )
}

export const simulationStatus = simId => {
  return callApi({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {}
  }, `sim/status/${simId}`, {})
  .then(e =>
    e.map(R.compose(R.prop('result')))
  )
}
