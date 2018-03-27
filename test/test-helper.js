import 'babel-polyfill'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
import dirtyChai from 'dirty-chai'
import jsdom from 'jsdom'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.NODE_ENV = 'testing'

global.document = new jsdom.JSDOM('<!doctype html><html><body></body></html>')

global.window = document.window
global.navigator = global.window.navigator
global.localStorage = mockLocalStorage()

chai.use(chaiImmutable)
chai.use(dirtyChai)

function mockLocalStorage () {
  let storage = {}
  return {
    setItem: function (key, value) {
      storage[key] = value || ''
    },
    getItem: function (key) {
      return key in storage ? storage[key] : null
    },
    removeItem: function (key) {
      delete storage[key]
    },
    get length () {
      return Object.keys(storage).length
    },
    key: function (i) {
      const keys = Object.keys(storage)
      return keys[i] || null
    }
  }
}
