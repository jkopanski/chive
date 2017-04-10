/**
 * API call functions
 * based on fantasy land compliant Futures instead of Promises
 * @flow
 */
import Future from 'fluture'
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
): Api<T> =>
  fletch(makeFullUrl(endpoint), options)
  .chain(response => {
    if (!response.ok) {
      return Future.reject(
        new Error(response.statusText)
      )
    } else {
      return Future.fromPromise(_ => response.json(), 0)
    }
  })

export default call
