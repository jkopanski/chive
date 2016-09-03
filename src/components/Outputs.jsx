import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn } from 'material-ui/Table'

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
