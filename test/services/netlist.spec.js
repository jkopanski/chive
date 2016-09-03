import 'isomorphic-fetch'
import '../setup'
import test from 'tape'
import nock from 'nock'
import FormData from 'form-data'

global.FormData = FormData
import { api } from '../../src/services'
import { apiUrl } from '../../src/config.js'

test('authenticate response handling', assert => {
  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json'
    }}).log(console.log)
  scope.post('/netlist')
  .reply(200, {'status': 'ok'})

  let res = api.netlist('admin')
  let p = Promise.resolve(res)
  p.then(e => assert.ok(e.isRight, 'Either is Right'))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /login by now')
  }

  scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json'
    }}).log(console.log)
  scope.post('/netlist')
  .reply(501, {'status': 'netlist format not supported'})

  res = api.netlist('admin')
  p = Promise.resolve(res)
  p.then(e => assert.ok(e.isLeft, 'Either is Left'))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /login by now')
  }

  assert.end()
})