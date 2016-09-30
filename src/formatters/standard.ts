import chalk = require('chalk')
import path = require('path')
import { format } from 'util'
import { LogEntry } from '../interfaces/logentry'
import { CallSite } from '../interfaces/callsite'

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

const createLocationInfoLogger = (env: any) => {
  return function getLocationInfo (callsite?: CallSite) {
    const locConfig = String(process.env.RIVERPIG_LOC)
    if (['true', '1', 'long', 'short', 'filename'].indexOf(locConfig) !== -1) {
      if (!callsite) {
        return 'unknown:0 '
      }

      const pathName = callsite.getFileName()
      if (!pathName) {
        return 'eval:0 '
      }

      let name: string
      if (locConfig === 'long') {
        name = pathName
      } else if (locConfig === 'filename') {
        name = path.basename(pathName)
      } else {
        if (pathName.indexOf(process.cwd()) === 0) {
          name = pathName.slice(process.cwd().length + 1)
        } else {
          name = pathName
        }
      }

      return name + ':' + callsite.getLineNumber() + ' '
    } else {
      return ''
    }
  }
}

function callsiteColor (name: string, id: number) {
  return chalk[callsiteColors[id % callsiteColors.length]](name)
}

export = (env: any) => {
  const getLocationInfo = createLocationInfoLogger(env)

  return (entry: LogEntry): string => {
    return chalk.gray(entry.timestamp.toISOString()) + ' ' +
      getLocationInfo(entry.callsite) +
      callsiteColor(entry.namespace, entry.namespaceId) + ' ' +
      chalk[levelColors[entry.level]](entry.level) + ' ' +
      format(entry.message, ...entry.arguments)
  }
}
