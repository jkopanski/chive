/* @flow */

export type Action = {
  +type: string,
  +payload: Object,
  +error: ?boolean,
  +meta: ?Object
}

export type ActionCreator = Object => Action
