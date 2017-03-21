/* @flow */
import type { Dispatch as ReduxDispatch } from 'redux'

export type Action = {
  type: string,
  payload?: any,
  error?: boolean,
  meta?: any
}

export type ErrorAction = {
  type: string,
  payload: Error,
  error: true,
  +meta: ?Object
}

export type ActionCreator = Object => Action
export type Dispatch = ReduxDispatch<Action>
