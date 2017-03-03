import 'isomorphic-fetch'
import test from 'tape'
import nock from 'nock'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import { api } from '../../src/services'
import { apiUrl } from '../../src/config.js'

test('simulation start/stop', assert => {
  const netId = '348fcfef-29f5-4bfe-9328-b25a148092c9'
  const simId = 'b4acdb77-8b8c-427c-a598-fee0567b4812'
  const procs = 4

  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post(`/netlists/${netId}/simulate`, body => {
    assert.deepEqual(body, { nodes: procs },
      'simulation start should pass number of processes in the body')
    return true
  })
  .reply(200, {'id': simId})
  .get(`/simulations/${simId}/stop`)
  .reply(200, {})

  api.netlistSimulate(netId, procs)
  .then(
    e => {
      assert.ok(e.isRight, 'start: Either is Right')

      // test sim stop
      let id = Either.either(
        assert.fail,
        resp => resp.id,
        e
      )

      return api.simulationStop(id)
    }
  )
  .then(
    e => assert.ok(e.isRight, 'stop: Either is Right')
  )
  .then(e => {
    if (!scope.isDone()) {
      assert.fail('there should be api call to /simulations/:id/stop by now')
    }
    assert.end()
  })
})

test('simulation status', assert => {
  const netId = '348fcfef-29f5-4bfe-9328-b25a148092c9'
  const simId = 'b4acdb77-8b8c-427c-a598-fee0567b4812'
  const procs = 4

  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post(`/netlists/${netId}/simulate`, body => {
    assert.deepEqual(body, { nodes: procs },
      'simulation start should pass number of processes in the body')
    return true
  })
  .reply(200, {'id': simId})
  .get(`/simulations/${simId}`)
  .reply(200, {
    'progress': 80
  })

  api.netlistSimulate(netId, procs)
  .then(
    e => {
      assert.ok(e.isRight, 'start: Either is Right')

      // test sim stop
      let id = Either.either(
        assert.fail,
        resp => resp.id,
        e
      )

      return api.simulationStatus(id)
    }
  )
  .then(
    e => {
      assert.ok(e.isRight, 'status: either is Right')
      Either.either(
        left => assert.fail(),
        progress => assert.equal(80, R.prop('progress', progress)),
        e
      )
    }
  )
  .then(e => {
    if (!scope.isDone()) {
      assert.fail('there should be api call to /simulations/:id by now')
    }
    assert.end()
  })
})
