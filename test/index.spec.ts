import sinon = require('sinon')
import riverpig = require('../src')

describe('riverpig', function () {
  describe('namespace', function () {
    it('should namespace a logger', function () {
      const fakeLogMethod = sinon.spy()
      const logger = Object.assign({}, console, {
        log: fakeLogMethod
      })

      const namespacedLogger = riverpig.namespace('test: ', logger)

      namespacedLogger.log('foo')

      sinon.assert.calledOnce(fakeLogMethod)
      sinon.assert.calledWith(fakeLogMethod, 'test: foo')
    })
  })
})
