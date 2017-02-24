import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import NetlistsList from '../components/Netlists/List'

@connect(
  state => ({ netlists: state.chive.netlists })
)
export default class Netlists extends Component {
  static propTypes = {
    children: PropTypes.node,
    netlists: PropTypes.array.isRequired
  };

  static defaultProps = {
    netlists: []
  };

  render () {
    const {
      children,
      netlists
    } = this.props

    return (
      <div>
        <NetlistsList netlists={netlists} />
        {children}
      </div>
    )
  }
}
