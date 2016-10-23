export enum LineinfoSetting {
  None = 0,
  Smart = 1,
  FileOnly = 2,
  Short = 3,
  Long = 4
}

export interface LoggerConfig {
  lineInfo?: LineinfoSetting,
  stream?: NodeJS.WritableStream,
  format?: (format: any, ...param: any[]) => string
}

export interface CompleteLoggerConfig {
  lineInfo: LineinfoSetting,
  stream: NodeJS.WritableStream,
  format: (format: any, ...param: any[]) => string
}
