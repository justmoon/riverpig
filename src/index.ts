import { Logger, Logger as Logger_ } from './logger'
import { LoggerConfig, LoggerConfig as LoggerConfig_ } from './interfaces/logger-config'

const createLogger = (namespace: string, config0?: LoggerConfig): Logger => {
  return new Logger(namespace, config0)
}

export = createLogger

declare namespace createLogger {
  export type Logger = Logger_
  export type LoggerConfig = LoggerConfig_
}
