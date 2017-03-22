/* @flow */
import { connect } from 'react-redux'

import * as actions from '../actions/simulations'
import SimulationList from '../components/Simulations/List'

import type { Connector } from 'react-redux'
import type { Dispatch } from '../reducers/simulations'

import type { Props } from '../components/Simulations/List'

const mapStateToProps = (state: Object) => {
  return {
    simulations: state.chive.simulations
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getResults: id => { dispatch(actions.statusRequest(id)) },
    stopSimulation: id => { dispatch(actions.stopRequest(id)) }
  }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(SimulationList)
