import R from 'ramda'
import { map } from 'flow-static-land/lib/Either'
import { fromPromise } from 'most'
import { combineEpics } from 'redux-observable'
import { ActionStream } from 'redux-observable-adapter-most'

import * as simulations from '../actions/simulations'
import { api } from '../services'

import type { Action } from '../actions'
import type { Store } from '../reducers'

export const netlistSimulateEpic = (
  action$: ActionStream<Action>,
  store: Store
): ActioStream<Action> =>
  action$
    .ofType('netlistSimulateRequest')
    .flatMap(action =>
      fromPromise(
        api.netlistSimulate(action.payload.id, action.payload.nodes).promise()
      ).map(esid => {
        const name = R.prop('filename',
          R.find(R.propEq('id', action.payload.id))
        )
        return simulations.start(map(R.assoc('netlist', name), esid))
      })
    )

const simulationsEpic =
  combineEpics(
    netlistSimulateEpic
  )

export default simulationsEpic
