import { LogLevel } from './interfaces/log-entry'
import { getCallsite } from './blackmagic'
import { LoggerConfig, LineinfoSetting } from './interfaces/logger-config'
import { LogMethod } from './interfaces/log-method'
import { getEnvConfig } from './config'
import createFormatter from './formatters/standard'

let nextNamespaceId = 0

export class Logger {
  debug: LogMethod
  info: LogMethod
  warn: LogMethod
  error: LogMethod

  private stream: NodeJS.WritableStream
  private format: (format: any, ...param: any[]) => string

  constructor (namespace: string, config0?: LoggerConfig) {
    const config = Object.assign({}, getEnvConfig(), config0)

    this.stream = config.stream
    this.format = config.format

    const formatter = createFormatter(config)

    const namespaceId = nextNamespaceId++

    const debug = require('debug')
    const debugLog = debug(namespace)
    const shouldGetCallsite = config.lineInfo !== LineinfoSetting.None

    debugLog.riverpigNamespaceId = namespaceId

    debug.log = this.write.bind(this)
    debug.formatArgs = function (message: string, ...elements: any[]) {
      const callsite = shouldGetCallsite ? getCallsite(this) : undefined

      if (typeof this.riverpigNamespaceId === 'undefined') {
        this.riverpigNamespaceId = nextNamespaceId++
      }

      if (Array.isArray(message)) {
        // debug module versions >= 2.4.0
        message.splice(0, message.length, formatter({
          message: message[0] as string,
          callsite,
          namespace: this.namespace,
          namespaceId: this.riverpigNamespaceId,
          level: 'debug',
          timestamp: new Date(),
          arguments: (message as Array<any>).slice(1)
        }))
        return
      } else {
        // debug module versions <= 2.3.3
        return [formatter({
          message,
          callsite,
          namespace: this.namespace,
          namespaceId: this.riverpigNamespaceId,
          level: 'debug',
          timestamp: new Date(),
          arguments: elements
        })]
      }
    }

    const createLogFunction = (
      level: LogLevel,
      namespace: string,
      namespaceId: number
    ) => {
      const logFn = (message: any, ...elements: any[]) => {
        const callsite = shouldGetCallsite ? getCallsite(logFn) : undefined
        this.write(formatter({
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

    this.debug = debugLog
    this.info = createLogFunction('info', namespace, namespaceId)
    this.warn = createLogFunction('warn', namespace, namespaceId)
    this.error = createLogFunction('error', namespace, namespaceId)
  }

  setOutputStream (stream: NodeJS.WritableStream) {
    this.stream = stream
  }

  setStringFormatter (format: (message: string, ...elements: any[]) => string) {
    this.format = format
  }

  private write (...args: any[]) {
    this.stream.write(`${this.format.apply(null, args)}\n`)
  }
}
