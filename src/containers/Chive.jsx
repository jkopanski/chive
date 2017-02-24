import React, { Component, PropTypes } from 'react'

import { Tab } from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Spacing from 'material-ui/styles/spacing'

import NavBar from '../components/NavBar'
import Notify from '../components/Notify'

function getStyles (props, context) {
  const { appBar } = context.muiTheme

  const styles = {
    root: {
      paddingTop: 2 * appBar.height,
      minHeight: 400
    },
    content: {
      margin: Spacing.desktopGutter
    },
    contentWhenMedium: {
      margin: `${Spacing.desktopGutter * 2}px ` +
        `${Spacing.desktopGutter * 3}px`
    }
  }

  return styles
}

class Chive extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  render () {
    const styles = getStyles(this.props, this.context)

    return (
      <MuiThemeProvider muiTheme={this.context.muiTheme}>
        <div>
          <NavBar>
            <Tab value='/netlists' label='Netlists' />
            <Tab value='/analyses' label='Analyses' />
          </NavBar>
          <div style={styles.root}>
            {this.props.children}
          </div>
          <Notify />
        </div>
      </MuiThemeProvider>
    )
  }
}

// class ThemedChive extends Component {
//   static propTypes = {
//     children: PropTypes.node
//   }

//   render () {
//     return (
//       <MuiThemeProvider muiTheme={chiveTheme}>
//         <Chive>
//           {this.props.children}
//         </Chive>
//       </MuiThemeProvider>
//     )
//   }
// }

export default Chive
