import 'isomorphic-fetch'
import '../setup'
import test from 'tape'
import nock from 'nock'

import { api } from '../../src/services'
import { apiUrl } from '../../src/config.js'

test('authenticate response handling', assert => {
  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post('/login', {
    username: 'admin',
    password: 'admin'
  })
  .reply(200, {'sessionId': 'b4acdb77-8b8c-427c-a598-fee0567b4812'})

  let res = api.authenticate('admin', 'admin')
  let p = Promise.resolve(res)
  p.then(e => assert.ok(e.isRight, 'Either is Right'))

  if (!scope.isDone()) {
    assert.fail('there should be api call to /login by now')
  }

  scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post('/login')
  .reply(401)

  res = api.authenticate('admin', 'aadmin')

  if (!scope.isDone()) {
    assert.fail('there should be api call,' +
                'with invalid credentials to /login by now')
  }

  p = Promise.resolve(res)
  p.then(e => assert.ok(e.isLeft, 'Either is Left'))
  assert.end()
})
