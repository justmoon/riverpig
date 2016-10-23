import chalk = require('chalk')
import path = require('path')
import { format } from 'util'
import { LogEntry } from '../interfaces/log-entry'
import { CallSite } from '../interfaces/call-site'
import { CompleteLoggerConfig, LineinfoSetting } from '../interfaces/logger-config'

const levelColors = {
  debug: 'green',
  info: 'blue',
  warn: 'yellow',
  error: 'red'
}

const callsiteColors = [
  'cyan',
  'green',
  'yellow',
  'blue',
  'magenta',
  'red'
]

const createLocationInfoLogger = (config: CompleteLoggerConfig): ((callsite?: CallSite) => string) => {
  const PATH_SHORTENER_REGEX = /(?!\/)(.)[^\/]*(?=\/)/g
  const cwd = process.cwd()

  if (config.lineInfo === LineinfoSetting.None) {
    return () => ''
  } else {
    return (callsite?: CallSite): string => {
      if (!callsite) {
        return 'unknown:0 '
      }

      const pathName = callsite.getFileName()
      if (!pathName) {
        return 'eval:0 '
      }

      let name = 'unknown'
      if (config.lineInfo === LineinfoSetting.Long) {
        name = pathName
      } else if (config.lineInfo === LineinfoSetting.FileOnly) {
        name = path.basename(pathName)
      } else if (config.lineInfo === LineinfoSetting.Short) {
        name = pathName.replace(PATH_SHORTENER_REGEX, (_, firstChar) => firstChar)
      } else if (config.lineInfo === LineinfoSetting.Smart) {
        if (pathName.indexOf(cwd) === 0) {
          name = pathName.slice(cwd.length + 1)
        } else {
          name = pathName
        }
      }

      return name + ':' + callsite.getLineNumber() + ' '
    }
  }
}

function callsiteColor (name: string, id: number) {
  return chalk[callsiteColors[id % callsiteColors.length]](name)
}

export default (config: CompleteLoggerConfig) => {
  const getLocationInfo = createLocationInfoLogger(config)

  return (entry: LogEntry): string => {
    return chalk.gray(entry.timestamp.toISOString()) + ' ' +
      getLocationInfo(entry.callsite) +
      callsiteColor(entry.namespace, entry.namespaceId) + ' ' +
      chalk[levelColors[entry.level]](entry.level) + ' ' +
      format(entry.message, ...entry.arguments)
  }
}
