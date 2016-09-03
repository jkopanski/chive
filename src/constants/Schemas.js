import { Schema } from 'normalizr'

const simId = new Schema('simId', { idAttrinute: 'simId' })
const status = new Schema('status', { idAttribute: 'status' })

export const simSchema = simId
export const statusSchema = status
