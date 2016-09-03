// use internal, ripped of create action so it plays well with Either
import createAction from './createAction'
import { Auth } from '../constants/ActionTypes'
import { Either } from 'ramda-fantasy'

export const authRequest = createAction(
  Auth.request,
  (username, password, redirect = '/') => ({
    username: username,
    password: password,
    redirect: redirect
  })
)

// export const authRequest = createAction(Auth.request)
export const login = createAction(
  Auth.login,
  token => Either.either(
    error => {
      window.localStorage.removeItem('Auth')
      return new Error(error)
    },
    tok => {
      window.localStorage.setItem('Auth', tok)
      return { token: tok }
    },
    token
  )
)

export const logout = createAction(Auth.logout)
