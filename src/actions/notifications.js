/* @flow */
export type Action
  = Close
  | Request
  | Show

export type Close = { type: 'notificationClose' }

export type Request =
  { type: 'notificationRequest'
  , payload: { message: string }
  }

export type Show =
  { type: 'notificationShow'
  , payload: { message: string }
  }

export const close = (): Close => ({ type: 'notificationClose' })

export const request = (msg: string): Request => ({
  type: 'notificationRequest',
  payload: { message: msg }
})

export const show = (msg: string): Show => ({
  type: 'notificationShow',
  payload: { message: msg }
})
