import { jsdom } from 'jsdom'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator

// nasty localStorage hack
global.window.localStorage = {
  getItem: function (key) {
    return this[key]
  },
  setItem: function (key, value) {
    this[key] = value
  },
  removeItem: function (key) {
    delete this[key]
  }
}
