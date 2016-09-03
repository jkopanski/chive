import React, { Component, PropTypes } from 'react'
import { Grid, Span } from 'react-responsive-grid'

import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

function getStyles (props, context) {
  const {
    appBar,
    spacing
  } = context.muiTheme

  const styles = {
    root: {
      width: spacing.desktopKeylineIncrement * 8
    },
    bar: {
      height: 1.5 * appBar.height
    },
    title: {
      textTransform: 'uppercase'
    },
    input: {
      width: '100%'
    },
    button: {
      float: 'right',
      marginTop: spacing.desktopGutter
    }
  }

  return styles
}

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  handleClick = () => {
    this.props.onLogin(
      this.refs.username.getValue(),
      this.refs.password.getValue()
    )
  }

  render () {
    const styles = getStyles(this.props, this.context)
    const { palette } = this.context.muiTheme

    return (
      <div>
        <Grid columns={8}>
          <Span columns={8}>
            <AppBar
              title={<span style={styles.title}>Sign in</span>}
              showMenuIconButton={false}
              style={styles.bar}
            />
          </Span>
          <Span
            columns={6}
            squish={1}
          >
            <TextField
              ref='username'
              style={styles.input}
              floatingLabelText='Email'
            />
          </Span>
          <Span
            columns={6}
            squish={1}
          >
            <TextField
              ref='password'
              style={styles.input}
              floatingLabelText='Password'
              type='password'
            />
          </Span>
          <Span
            columns={2}
            pre={4}
            squish={1}
          >
            <RaisedButton
              backgroundColor={palette.primary1Color}
              style={styles.button}
              label='login'
              labelColor={palette.alternateTextColor}
              onTouchTap={this.handleClick}
            />
          </Span>
        </Grid>
      </div>
    )
  }
}

export default Login
