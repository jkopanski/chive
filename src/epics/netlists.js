import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { Observable } from 'rxjs/Observable'
import { ActionObservable, combineEpics } from 'redux-observable'

import * as netlists from '../actions/netlists'
import { api } from '../services'

import type { Action } from '../actions'

const netlistUploadEpic = (
  action$: ActionObservable<Action>
): ActioObservable<Action> =>
  action$
    .ofType('netlistUploadRequest')
    .mergeMap(action =>
      // TODO: write fromFuture wrapper
      Observable.fromPromise(
        api.netlistUpload(action.payload.file).promise()
      ).map(netlists.upload)
    )

const netlistsEpic =
  combineEpics(
    netlistUploadEpic
  )

export default netlistsEpic
