import 'isomorphic-fetch'
import '../setup'
import test from 'tape'
import nock from 'nock'
import { either } from 'flow-static-land/lib/Either'

import { api } from '../../src/services'
import { apiUrl } from '../../src/config.js'

test('authenticate response handling', assert => {
  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json'
    }}).log(console.log)
  scope.post('/netlists/upload')
  .reply(200, {'status': 'ok'})

  let enet = api.netlistUpload('admin')
  enet.value(e => either(
    _ => assert.fail('should return right'),
    _ => assert.ok('netlist uploud succesful'),
    e
  ))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /netlists/upload by now')
  }

  scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json'
    }}).log(console.log)
  scope.post('/netlists/upload')
  .reply(501, {'status': 'netlist format not supported'})

  enet = api.netlistUpload('admin')
  enet.value(e => either(
    _ => assert.ok('should handle netlist upload failure'),
    _ => assert.fail('should return left'),
    e
  ))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /netlists/upload by now')
  }

  assert.end()
})
