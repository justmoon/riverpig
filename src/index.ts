import { Logger } from './interfaces/logger'
import { LogLevel } from './interfaces/logentry'
import { getCallsite } from './blackmagic'

import createFormatter = require('./formatters/standard')
const formatter = createFormatter(process.env)

const createLogFunction = (
  level: LogLevel,
  namespace: string,
  namespaceId: number,
  target: (message: any, ...elements: any[]) => void
) => {
  const logFn = (message: any, ...elements: any[]) => {
    const callsite = getCallsite(logFn)
    target(formatter({
      message,
      callsite,
      namespace,
      namespaceId,
      level,
      timestamp: new Date(),
      arguments: elements
    }))
  }

  return logFn
}

let nextNamespaceId = 0
export = (namespace: string, targetLogger?: Logger | Console): Logger => {
  const log = targetLogger || console

  const namespaceId = nextNamespaceId++

  const debug = require('debug')
  const debugLog = debug(namespace)

  debugLog.namespaceId = namespaceId

  debug.formatArgs = function (message: string) {
    const callsite = getCallsite(this)

    if (typeof this.riverlogNamespaceId === 'undefined') {
      this.riverlogNamespaceId = nextNamespaceId++
    }

    return [formatter({
      message,
      callsite,
      namespace: this.namespace,
      namespaceId: this.riverlogNamespaceId,
      level: 'debug',
      timestamp: new Date(),
      arguments: []
    })]
  }

  const namespacedLogger: Logger = {
    assert: (value: any, message?: string, ...optionalParams: any[]) => {
      log.assert(value, namespace + (message ? message : ''), ...optionalParams)
    },
    dir: log.dir.bind(log),
    time: log.time.bind(log),
    timeEnd: log.timeEnd.bind(log),
    trace: log.trace.bind(log),
    debug: debugLog,
    info: createLogFunction('info', namespace, namespaceId, log.info),
    warn: createLogFunction('warn', namespace, namespaceId, log.warn),
    error: createLogFunction('error', namespace, namespaceId, log.error)
  }

  return namespacedLogger
}
