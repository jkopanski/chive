import React, { Component } from 'react'
import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'

class Outputs extends Component {
  render () {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>simulation</TableHeaderColumn>
            <TableHeaderColumn>name</TableHeaderColumn>
            <TableHeaderColumn>expression</TableHeaderColumn>
            <TableHeaderColumn>save</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>simulation</TableRowColumn>
            <TableRowColumn>name</TableRowColumn>
            <TableRowColumn>expression</TableRowColumn>
            <TableRowColumn>save</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>simulation</TableRowColumn>
            <TableRowColumn>name</TableRowColumn>
            <TableRowColumn>expression</TableRowColumn>
            <TableRowColumn>save</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>simulation</TableRowColumn>
            <TableRowColumn>name</TableRowColumn>
            <TableRowColumn>expression</TableRowColumn>
            <TableRowColumn>save</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default Outputs
