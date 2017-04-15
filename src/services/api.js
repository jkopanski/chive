import Future from 'fluture'
import R from 'ramda'
import { left, right } from 'flow-static-land/lib/Either'

import call from './call'

const eitherFold = Future.fold(left, right)

export const authenticate = (user, pass) => eitherFold(
  call({
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
)

export const netlistUpload = fileInput => eitherFold(
  // TODO: backend does not yet support multipart-form data
  // let data = new FormData()
  // data.append('netlist', fileInput)

  call({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain; charset=UTF-8'
    },
    body: fileInput
  }, 'netlists/upload', {})
)

export const netlistSimulate = (nid, nodes) => eitherFold(
  call({
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({nodes: nodes})
  }, `netlists/${nid}/simulate`, {})
)

export const simulationStop = simId => eitherFold(
  call({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {}
  }, `simulations/${simId}/stop`, {})
)

export const simulationStatus = simId => eitherFold(
  call({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }, `simulations/${simId}`, {})
)
