import createAction from './createAction'
import { Netlists } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'
import R from 'ramda'

export const netlistUploadRequest = createAction(
  Netlists.uploadRequest,
  (name, file) => ({ filename: name, file: file })
)

export const netlistUpload = createAction(
  Netlists.upload,
  response => Either.either(
    error => new Error(error),
    R.identity,
    response
  )
)
