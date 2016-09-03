import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AnalysesList from '../components/Analyses/List'

@connect(
  state => ({ analyses: state.chive.analyses })
)
export default class Analyses extends Component {
  static propTypes = {
    children: PropTypes.node,
    analyses: PropTypes.array.isRequired
  };

  static defaultProps = {
    analyses: []
  };

  render () {
    const {
      children,
      analyses
    } = this.props

    return (
      <div>
        <AnalysesList analyses={analyses} />
        {children}
      </div>
    )
  }
}
