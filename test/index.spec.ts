import sinon = require('sinon')
import chalk = require('chalk')
import through = require('through')
import riverpig = require('../src')

describe('riverpig', function () {
    it('should namespace a logger', function () {
    const fakeLogMethod = sinon.spy()
    const fakeClock = sinon.useFakeTimers('Date')

    const namespacedLogger = riverpig('test', { stream: through(fakeLogMethod) })

    namespacedLogger.info('foo')

    fakeClock.restore()
    sinon.assert.calledOnce(fakeLogMethod)
    sinon.assert.calledWith(
      fakeLogMethod,
      chalk.gray('1970-01-01T00:00:00.000Z') + ' ' +
      chalk.cyan('test') + ' ' +
      chalk.blue('info') + ' ' +
      'foo\n'
    )
  })
})
