/* @flow */
import type { Dispatch as ReduxDispatch } from 'redux'

export type NetId = string

export type NetlistActionType
  = 'netlistUploadRequest'
  | 'netlistUpload'
  | 'netlistSimulateRequest'

export type NetlistUploadRequest
  = { type: 'netlistUploadRequest'
    , payload: { filename: string
               , file: string
               }
    }

export type NetlistUpload
  = { type: 'netlistUpload'
    , payload: { id: NetId
               , filename: string
               }
    }
  | { type: 'netlistUpload'
    , error: true
    , payload: Object
    }

export type NetlistSimulateRequest
  = { type: 'netlsitSimulateRequest'
    , payload: { id: NetId }
    }

export type NetlistAction
  = NetlistUploadRequest
  | NetlistUpload
  | NetlistSimulateRequest

export type Netlist = {
  id: NetId,
  filename: string
}

export type Netlists = Array<Netlist>
