import { Logger } from './logger'
import { LoggerConfig } from './interfaces/logger-config'

export = (namespace: string, config0?: LoggerConfig): Logger => {
  return new Logger(namespace, config0)
}
