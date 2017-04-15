/* @flow */
import { combineEpics } from 'redux-observable'
import netlistsEpic from './netlists'
import simulationsEpic from './simulations'

export const clientEpic =
  combineEpics(
    netlistsEpic,
    simulationsEpic
  )

export const serverEpic = combineEpics()
