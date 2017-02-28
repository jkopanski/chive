/* @flow */
export * from './analysis'
export * from './auth'
export * from './netlists'
export * from './notify'
export * from './simulations'

export type Action = {
  type: string,
  payload: Object,
  error: ?boolean,
  meta: ?Object
}

export type ActionCreator = Object => Action
