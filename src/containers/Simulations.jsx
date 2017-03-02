/* @flow */
import { connect } from 'react-redux'

import * as actions from '../actions/simulations'
import SimulationList from '../components/Simulations/List'

import type { Connector } from 'react-redux'
import type { Dispatch } from '../types/actions'

import type { Props } from '../components/Simulations/List'

const mapStateToProps = (state: Object) => {
  return {
    simulations: state.chive.simulations
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getResults: id => { dispatch(actions.simulationStatusRequest(id)) },
    stopSimulation: id => { dispatch(actions.simulationStatusRequest(id)) }
  }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(SimulationList)
