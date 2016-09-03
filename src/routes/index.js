import React from 'react'
import { Route, IndexRoute } from 'react-router'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {
  Analyses,
  Chive
} from '../containers'
import {
  Login,
  SetupDialogAdd,
  SetupDialogEdit,
  Outputs,
  withTheme
} from '../components'

const routes = theme =>
  <Route path='/' component={withTheme(getMuiTheme(theme))(Chive)}>
    {/* Default to *whatever* should be */}
    {/* set in components/Navbar as well */}
    <IndexRoute component={Analyses} />
    {/* Need to add navigation to */}
    {/* containers/Chive and components/NavBar */}
    <Route path='login' component={Login} />
    <Route path='outputs' component={Outputs} />
    <Route path='analyses' component={Analyses}>
      <Route
        path='add(/:type)'
        component={SetupDialogAdd}
      />
      <Route
        path='edit/:name'
        component={SetupDialogEdit}
      />
    </Route>
  </Route>

export default routes