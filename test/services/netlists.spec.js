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
  scope.post('/netlists/upload')
  .reply(200, {'status': 'ok'})

  let res = api.netlistUpload('admin')
  let p = Promise.resolve(res)
  p.then(e => assert.ok(e.isRight, 'Either is Right'))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /netlists/upload by now')
  }

  scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json'
    }}).log(console.log)
  scope.post('/netlists/upload')
  .reply(501, {'status': 'netlist format not supported'})

  res = api.netlistUpload('admin')
  p = Promise.resolve(res)
  p.then(e => assert.ok(e.isLeft, 'Either is Left'))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /netlists/upload by now')
  }

  assert.end()
})
