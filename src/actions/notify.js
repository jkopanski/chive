/* @flow */
// use internal, ripped of create action so it plays well with Either
import createAction from './createAction'
import { Notification } from '../constants/ActionTypes'

export const notify = createAction(Notification.show)
export const notifyClose = createAction(Notification.close)
export const notifyRequest = createAction(Notification.request)
