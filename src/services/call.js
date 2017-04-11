/**
 * API call functions
 * based on fantasy land compliant Futures instead of Promises
 * @flow
 */
import Future from 'fluture'
import R from 'ramda'
import { apiUrl } from '../config'

import type { Either } from 'flow-static-land/lib/Either'
import type { Url } from '../types'

export type Response<T> = Either<Error, T>
export type Api<T> = Future<Response<T>>

const fletch = Future.fromPromise2((e, a) => fetch(e, a))

const makeFullUrl = (endpoint: Url): Url => {
  const fullUrl = (endpoint.indexOf(apiUrl) === -1)
    ? apiUrl + endpoint
    : endpoint

  return fullUrl
}

const call = <T>(
  options: Object,
  endpoint: Url
): Api<T> => {
  let opt = options
  // make it const for now
  // const token = window.localStorage.getItem('Auth')
  const token = 'Basic ' + window.btoa('admin:admin')
  if (token) {
    opt = R.over(
      R.lensProp('headers'),
      R.assoc('Authorization', token),
      options
    )
  }

  return fletch(makeFullUrl(endpoint), opt)
    .chain(response => {
      if (!response.ok) {
        return Future.reject(
          new Error(response.statusText)
        )
      } else {
        return Future.fromPromise(_ => response.json(), 0)
      }
    })
}

export default call
