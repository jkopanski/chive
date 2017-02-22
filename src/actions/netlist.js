import createAction from './createAction'
import { Netlist } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'

export const netlistUploadRequest = createAction(
  Netlist.uploadRequest,
  file => ({ file })
)

export const netlistUpload = createAction(
  Netlist.upload,
  response => Either.either(
    error => new Error(error),
    res => ({ netlist: res }),
    response
  )
)
