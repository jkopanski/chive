/* @flow */
import { either } from 'flow-static-land/lib/Either'
import type { Either } from 'flow-static-land/lib/Either'

import type { Action as AuthAction } from './authentication'
import type { Action as NetlistAction } from './netlists'
import type { Action as NotificationAction } from './notifications'
import type { Action as SimulationAction } from './simulations'
import type { Action as GenericAction } from '../types/actions'

export type Action
  = AuthAction
  | NetlistAction
  | NotificationAction
  | SimulationAction

// eitherToAction :: type -> Either<Error, T> -> Action<type>
export const eitherToAction = <T>(
  type: string
): (Either<Error, T> => GenericAction) =>
  (e: Either<Error, T>) => either(
    (err: Error): GenericAction => ({
      type: type,
      error: true,
      payload: err
    }),
    (data: T): GenericAction => ({
      type: type,
      payload: data
    }),
    e
  )
