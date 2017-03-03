/* @flow */
import createAction from './createAction'
import { Netlists as Actions } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'
import R from 'ramda'

export const netlistSimulateRequest = createAction(
  Actions.simulateRequest,
  id => ({ id: id })
)

export const netlistUploadRequest = createAction(
  Actions.uploadRequest,
  (name, file) => ({ filename: name, file: file })
)

export const netlistUpload = createAction(
  Actions.upload,
  response => Either.either(
    error => new Error(error),
    R.identity,
    response
  )
)
