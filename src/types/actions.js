/* @flow */
import type { Dispatch as ReduxDispatch } from 'redux'

export type Action = {
  type: string,
  +payload: Object,
  +error: ?boolean,
  +meta: ?Object
}

export type ActionCreator = Object => Action
export type Dispatch = ReduxDispatch<Action>
