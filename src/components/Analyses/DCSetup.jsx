import React, { Component, PropTypes } from 'react'
import { Grid, Span } from 'react-responsive-grid'

import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Spacing from 'material-ui/styles/spacing'
import TextField from 'material-ui/TextField'

class DCSetup extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    sweepName: PropTypes.string,
    sweepStart: PropTypes.number,
    sweepStop: PropTypes.number,
    sweepSteps: PropTypes.number,
    sweepList: PropTypes.number,
    sweepType: PropTypes.string,
    sweepVar: PropTypes.string
  }

  static defaultProps = {
    sweepType: 'Linear',
    sweepVar: 'DC Source'
  }

  sweepVars = [
    'DC Source',
    'Temperature',
    'Device parameter'
  ]

  sweepTypes = [
    'Linear',
    'Octave',
    'Decade',
    'List'
  ]

  render () {
    let {
      actions,
      sweepName,
      sweepStart,
      sweepStop,
      sweepSteps,
      sweepList,
      sweepType,
      sweepVar
    } = this.props

    const styles = {
      h3: {
        marginTop: Spacing.desktopGutter,
        fontWeight: 400
      },
      h4: {
        marginTop: Spacing.desktopGutter,
        fontWeight: 300
      }
    }

    let isTemperature
    let hintMsg
    if (sweepVar === 'Temperature') {
      isTemperature = true
      hintMsg = 'Temperature'
    } else {
      isTemperature = false
      hintMsg = sweepVar + ' name'
    }

    let sweepRange
    if (sweepType === 'List') {
      sweepRange =
        <div>
          <TextField
            defaultValue={sweepList}
            floatingLabelText='Values list'
            onChange={actions.changeSweepList}
          />
        </div>
    } else {
      sweepRange =
        <Grid columns={8}>
          <Span columns={4}>
            <TextField
              defaultValue={sweepStart}
              floatingLabelText='Start'
              onChange={actions.changeStartVal}
            />
          </Span>
          <Span columns={4} last>
            <TextField
              defaulValue={sweepStop}
              floatingLabelText='Stop'
              onChange={actions.changeStopVal}
            />
          </Span>
        </Grid>
    }

    return (
      <div>
        <h3 style={styles.h3}>DC Analysis</h3>
        <Grid columns={8}>
          <Span columns={4}>
            <SelectField
              floatingLabelText='Sweep variable'
              value={sweepVar}
              onChange={actions.changeSweepVar}
            >
              {this.sweepVars.map((sweepVar, idx) =>
                <MenuItem
                  key={idx}
                  value={sweepVar}
                  primaryText={sweepVar}
                />
              )}
            </SelectField>
          </Span>
          <Span columns={4} last>
            <TextField
              defaultValue={sweepName}
              floatingLabelText={hintMsg}
              disabled={isTemperature}
              onChange={actions.changeParamName}
            />
          </Span>
          <Span columns={4}>
            <SelectField
              floatingLabelText='Sweep type'
              value={sweepType}
              onChange={actions.changeSweepType}
            >
              {this.sweepTypes.map((sweepType, idx) =>
                <MenuItem
                  key={idx}
                  value={sweepType}
                  primaryText={sweepType}
                />
              )}
            </SelectField>
          </Span>
          <Span columns={4} last>
            <TextField
              defaultValue={sweepSteps}
              floatingLabelText='Number of steps'
              value={sweepSteps}
              onChange={actions.changeSweepSteps}
            />
          </Span>
        </Grid>
        {sweepRange}
      </div>
    )
  }
}

export default DCSetup
