import 'isomorphic-fetch'
import test from 'tape'
import nock from 'nock'
import R from 'ramda'
import { Either } from 'ramda-fantasy'

import { api } from '../../src/services'
import { apiUrl } from '../../src/config.js'

let analyses = [{
  id: 0,
  enable: true,
  name: 'dcOp',
  type: 'dc',
  properties: {
    sweepVar: 'DC Source',
    sweepName: 'Vgs',
    sweepType: 'Linear',
    sweepSteps: '10',
    sweepStart: '0',
    sweepStop: '1.2'
  }
}, {
  id: 1,
  enable: true,
  name: 'gain',
  type: 'ac',
  properties: {
    sweepVar: 'Device parameter',
    sweepName: 'W',
    sweepSteps: '100',
    sweepStart: '1u',
    sweepStop: '100u'
  }
}]

let disAnalyses = [{
  id: 2,
  enable: false,
  name: 'noise',
  type: 'noise',
  properties: {
    sweepVar: 'Temperature',
    sweepSteps: '20',
    sweepStart: '-40',
    sweepStop: '125'
  }
}]

let sentAnalyses = [
  ...analyses,
  ...disAnalyses
]

test('simulation start/stop', assert => {
  const retId = 'b4acdb778b8c427ca598fee0567b4812'

  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post('/sim/run', body => {
    assert.deepEqual(body, analyses,
      'sim start should filter out disabled analyses')
    return true
  })
  .reply(200, {'simId': retId})
  .get(`/sim/terminate/${retId}`)
  .reply(200, {})

  api.simulationStart(sentAnalyses)
  .then(
    e => {
      assert.ok(e.isRight, 'start: Either is Right')

      // test sim stop
      let id = Either.either(
        assert.fail,
        id => id,
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
      assert.fail('there should be api call to /sim/stop/id by now')
    }
    assert.end()
  })
})

test('simulation status', assert => {
  const retId = 'b4acdb778b8c427ca598fee0567b4812'

  let scope = nock(apiUrl, {
    reqheaders: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }}).log(console.log)
  scope.post('/sim/run', body => {
    assert.deepEqual(body, analyses,
      'sim start should filter out disabled analyses')
    return true
  })
  .reply(200, {'simId': retId})
  .get(`/sim/status/${retId}`)
  .reply(200, {
    'progress': 80
  })

  api.simulationStart(sentAnalyses)
  .then(
    e => {
      assert.ok(e.isRight, 'start: Either is Right')

      // test sim stop
      let id = Either.either(
        assert.fail,
        id => id,
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
      assert.fail('there should be api call to /sim/status/id by now')
    }
    assert.end()
  })
})
