/* @flow */
import { connect } from 'react-redux'

import * as actions from '../actions/netlists'
import NetlistList from '../components/Netlists/List'

import type { Connector } from 'react-redux'

import type { Dispatch } from '../reducers/netlists'
import type { Props } from '../components/Netlists/List'

const mapStateToProps = (state: Object) => {
  return {
    netlists: state.chive.netlists
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  netlistAdd: (name: string, file: string) => {
    dispatch(actions.uploadRequest(name, file))
  },
  simulateRequest: (id, procs) => {
    dispatch(actions.simulateRequest(id, procs))
  }
})

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(NetlistList)
