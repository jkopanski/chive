/* @flow */
import { eitherToAction } from './index'

import type { Either } from 'flow-static-land/lib/Either'
import type { NetlistId, Netlist } from '../types/netlists'

export type Action
  = SimulateRequest
  | UploadRequest
  | Upload

export type SimulateRequest =
  { type: 'netlistSimulateRequest'
  , payload: { id: NetlistId
             , nodes: number
             }
  }

export type UploadRequest =
  { type: 'netlistUploadRequest'
  , payload: { filename: string
             , file: string
             }
  }

export type Upload
  = { type: 'netlistUpload'
    , payload: Netlist
    }
  | { type: 'netlistUpload'
    , error: true
    , payload: Error
    }

export const simulateRequest = (
  id: NetlistId,
  procs: number
): SimulateRequest => ({
  type: 'netlistSimulateRequest',
  payload: {
    id: id,
    nodes: procs
  }
})

export const uploadRequest = (
  name: string,
  file: string,
): UploadRequest => ({
  type: 'netlistUploadRequest',
  payload: {
    filename: name,
    file: file
  }
})

export const upload: Either<Error, Netlist> => Upload =
  ((eitherToAction('netlistUpload')): (Either<Error, Netlist> => any))
