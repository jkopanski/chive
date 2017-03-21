/* @flow */
import { eitherToAction } from './index'

import type { Either } from 'flow-static-land/lib/Either'
import type { Url } from '../types'
import type { Token } from '../types/authentication'

export type Action
  = Request
  | Authenticate
  | Deauthenticate

export type Request =
  { type: 'authenticateRequest'
  , payload:
    { username: string
    , password: string
    , redirect: Url
    }
  }

export type Authenticate
  = { type: 'authenticate'
    , payload: { token: Token }
    }
  | { type: 'authenticate'
    , payload: Error
    }

export type Deauthenticate =
  { type: 'deauthenticate' }

export const loginRequest = (
  username: string,
  password: string,
  redirect: Url = '/'
): Request => ({
  type: 'authenticateRequest',
  payload: {
    username: username,
    password: password,
    redirect: redirect
  }
})

export const login: Either<Error, Token> => Authenticate =
  ((eitherToAction('authenticate')): (Either<Error, Token> => any))

export const logout = (): Deauthenticate => ({ type: 'deauthenticate' })
