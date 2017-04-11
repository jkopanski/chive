import R from 'ramda'
import { map } from 'flow-static-land/lib/Either'
import { fromPromise } from 'most'
import { combineEpics } from 'redux-observable'
import { ActionStream } from 'redux-observable-adapter-most'

import * as netlists from '../actions/netlists'
import { api } from '../services'

import type { Action } from '../actions'

const netlistUploadEpic = (
  action$: ActionStream<Action>
): ActioStream<Action> =>
  action$
    .ofType('netlistUploadRequest')
    .flatMap(action =>
      // TODO: write fromFuture wrapper
      fromPromise(
        api.netlistUpload(action.payload.file).promise()
      ).map(enid => netlists.upload(
        map(R.assoc('filename', action.payload.filename), enid)
      ))
    )

const netlistsEpic =
  combineEpics(
    netlistUploadEpic
  )

export default netlistsEpic
