const riverpig = require('../dist')('test')
const bunyan = require('bunyan').createLogger({name: 'myapp'})

const Benchmark = require('benchmark')

const altConsole = {
  assert: () => null,
  dir: () => null,
  time: () => null,
  timeEnd: () => null,
  log: console.log.bind(console),
  trace: () => null,
  info: () => null,
  warn: () => null,
  error: () => null
}

const suite = new Benchmark.Suite

suite.add('console.info', function () {
  console.info('test 123 123 123 123 123 123 123 123')
})
.add('riverpig.info', function () {
  riverpig.info('test 123 123 123 123 123 123 123 123')
})
.add('bunyan.info', function () {
  bunyan.info('test 123 123 123 123 123 123 123 123')
})
// add listeners 
.on('cycle', function(event) {
  console.error(String(event.target));
})
.on('complete', function() {
  console.error('Fastest is ' + this.filter('fastest').map('name'));
})
// run async 
.run({ 'async': true });