/* @flow */
import { combineEpics } from 'redux-observable'
import netlistsEpic from './netlists'

export const clientEpic =
  combineEpics(
    netlistsEpic
  )

export const serverEpic = combineEpics()
