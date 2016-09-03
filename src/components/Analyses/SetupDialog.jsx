import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-router'
import { Grid, Span } from 'react-responsive-grid'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

import * as actions from '../../actions/analysis'
import DCSetup from './DCSetup'

@connect(
  state => ({}),
  { push }
)
class SetupDialog extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    name: PropTypes.string,
    push: PropTypes.func.isRequired,
    type: PropTypes.string,
    query: PropTypes.object
  }

  static defaultProps = {
    type: 'dc'
  }

  state = {
    analysis: this.props.type,
    name: this.props.name,
    properties: {}
  }

  analyses = [
    'dc',
    'ac',
    'tran',
    'noise',
    'hb',
    'sensitivity'
  ]

  handleAction = () => {
    this.props.action(
      this.state.name,
      this.state.analysis,
      this.state.properties
    )
    this.handleClose()
  }

  handleAnalysisChange = (event, index, value) => {
    this.setState({ analysis: value })
  }

  handleChange = stateVar => {
    // because javascript won't bind to 'this' properly
    // we can't just do:
    // return (event, value) => {
    let fun = (event, index, value) => {
      let json = this.state.properties
      json[stateVar] = event.target.value || value
      this.setState({ properties: json })
    }
    return fun
  }

  handleClose = () => {
    this.props.push('/analyses')
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  dcActions = {
    changeParamName: this.handleChange('sweepName'),
    changeStartVal: this.handleChange('sweepStart'),
    changeStopVal: this.handleChange('sweepStop'),
    changeSweepList: this.handleChange('sweepList'),
    changeSweepSteps: this.handleChange('sweepSteps'),
    changeSweepType: this.handleChange('sweepType'),
    changeSweepVar: this.handleChange('sweepVar')
  }

  render () {
    const actionButtons = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={this.props.actionType}
        secondary
        keyboardFocused
        onTouchTap={this.handleAction}
      />
    ]

    return (
      <Dialog
        title='Setup analysis'
        actions={actionButtons}
        modal={false}
        open
        autoScrollBodyContent
      >
        <Grid columns={8}>
          <Span columns={4}>
            <SelectField
              floatingLabelText='Select analysis'
              onChange={this.handleAnalysisChange}
              value={this.state.analysis}
            >
              {this.analyses.map((analysis, idx) =>
                <MenuItem
                  key={idx}
                  primaryText={analysis}
                  value={analysis}
                />
              )}
            </SelectField>
          </Span>
          <Span columns={4} last>
            <TextField
              defaultValue={this.props.name}
              floatingLabelText='Analysis name'
              onChange={this.handleNameChange}
            />
          </Span>
        </Grid>
        <Divider />
        <DCSetup
          actions={this.dcActions}
          sweepName={this.state.properties.sweepName}
          sweepStart={this.state.properties.sweepStart}
          sweepStop={this.state.properties.sweepStop}
          sweepSteps={this.state.properties.sweepSteps}
          sweepList={this.state.properties.sweepList}
          sweepType={this.state.properties.sweepType}
          sweepVar={this.state.properties.sweepVar}
        />
      </Dialog>
    )
  }
}

@connect(
  state => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)
export class SetupDialogAdd extends SetupDialog {
  static propTypes = {
    addAnalysis: PropTypes.func.isRequired
  }

  render () {
    let { type } = this.props.params
    let { query } = this.props.location
    let name = query && query.name

    return (
      <SetupDialog
        action={this.props.addAnalysis}
        actionType='Add'
        activeSim={this.props.params.type}
        name={name}
        type={type}
        query={query}
      />
    )
  }
}

export class SetupDialogEdit extends SetupDialog {
  render () {
    return (
      <SetupDialog actionType='Edit' />
    )
  }
}

export default SetupDialog
