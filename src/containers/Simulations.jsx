import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SimulationsList from '../components/Simulations/List'

@connect(
  state => ({ simulations: state.chive.simulations })
)
export default class Simulations extends Component {
  static propTypes = {
    children: PropTypes.node,
    simulations: PropTypes.array.isRequired
  };

  static defaultProps = {
    simulations: []
  };

  render () {
    const {
      children,
      simulations
    } = this.props

    return (
      <div>
        <SimulationsList simulations={simulations} />
        {children}
      </div>
    )
  }
}
