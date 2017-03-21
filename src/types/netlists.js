/* @flow */
export type NetlistId = string

export type Netlist = {
  id: NetlistId,
  filename: string
}

export type Netlists = Array<Netlist>
