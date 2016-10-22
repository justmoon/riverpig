import { Logger } from './logger'

export enum LineinfoSetting {
  None = 0,
  Smart = 1,
  FileOnly = 2,
  Short = 3,
  Long = 4
}

export interface LoggerConfig {
  lineInfo?: LineinfoSetting,
  parentLogger?: Logger | Console
}

export interface CompleteLoggerConfig {
  lineInfo: LineinfoSetting,
  parentLogger: Logger | Console
}
