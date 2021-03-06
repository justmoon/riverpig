const log = require('..')('scope')

class A {
  a () {
    log.info('test')
  }
}

var a = new A()
a.a()


function b () {
  log.info('test')
}

b()

eval('log.info("test")')

log.info('test')

const c = () => log.info('test')
c()

class D {
  constructor () {
    log.info('test')
  }
}
new D

log.info('test %s', 'replacement')

// Using debug (not shown by default)
log.debug('test')
log.debug('test %s', 'replacement')

// Another module using debug
const myDebug = require('debug')('other')
myDebug('test')